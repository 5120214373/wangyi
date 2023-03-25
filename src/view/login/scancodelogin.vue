<template>
  <div class="scancontainer">
    <div class="code">
      <img :src="url" v-if="url">
    </div>
    <div class="font" @click="changesense(1)">
      选择其他登录方式
    </div>
  </div>
</template>

<script>
import {setItem,getItem} from '@/somefunction/localstorage'
import QRCode from "qrcode";
export default {
  data() {
    return {
        url:'',
    };
  },
  mounted() {
    //生成二维码并检查登录状态
    this.login();
  },
  methods: {
    async login() {
      //得到二维码的key
      let result1 = await this.$API.getkey();
      //得到生成二维码的id
      let res = await this.$API.createcode(result1.data.data.unikey);
      //生成二维码的url
      this.url = await QRCode.toDataURL(res.data.data.qrurl);
      //轮询登录状态
      this.timer=setInterval(async ()=>{
        let result = await this.$API.checkcode(result1.data.data.unikey)
        console.log(result)
        if(result.data.code=='803')
        {
            //扫码授权成功，查询登录状态
            this.open()
            //清除定时器
            clearInterval(this.timer)
        }else if(result.code=='800'){
            //二维码失效
            alert("二维码已失效")
            clearInterval(timer)
        }
        },5000)
    },
    async open(){
      let res = await this.$API.checklogin()
      console.log(res)
      if(res.data.data.code==200){
        //登录成功，保存用户的信息
        //避免一刷新就掉数据，将用户信息存在localstorage
        setItem('user',res.data.data.profile)
        //将successlogin设置为成功，让监控successlogin的roof修改数据
        this.$store.dispatch("login/successlogin", true);
        //退出登录
        this.$store.dispatch("login/exitlogin")
      }
    },
    //跳转到密码登录页面
    changesense(index){
      this.$store.dispatch('login/changesense',index)
    }
  },
  beforeDestroy() {
    //问题：页面加载完成后会开启定时器，只有扫码授权成功后才会关闭定时器，除刷新页面外无法关闭定时器
    //解决方法：在页面销毁前将定时器关闭
    clearInterval(this.timer)
  },
};
</script>

<style>
.scancontainer {
  height: 100%;
  width: 100%;
  /* border: 1px solid red; */
}
.scancontainer .code{
  height:90%;
  width:100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
}
.scancontainer .font{
  height:10%;
  width:100%;
  text-align: center;
  font-size: 13px;
}
</style>