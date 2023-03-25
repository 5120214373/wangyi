<template>
  <div class="outter">
    <div class="inputcontainer">
      <div class="username">
        <div class="left">
          <div class="iconfont icon-shouji"></div>
          <span>+86</span>
          <div class="iconfont icon-xiangxia1"></div>
        </div>
        <div class="right">
          <input type="text" placeholder="请输入手机号" v-model="phone" />
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <div class="iconfont icon-yuechi"></div>
          <input type="text" placeholder="请输入验证码" v-model="code" />
        </div>
        <div class="right" @click="getcode" v-if="flag">获取验证码</div>
        <div class="right" v-else>{{ waittime }}</div>
      </div>
    </div>
    <div class="font">
      <input type="checkbox" />
      <span>自动登录</span>
      <span class="password" @click="changesense(1)">密码登录</span>
    </div>
    <div class="bottons">
      <button @click="login">登 录</button>
      <button @click="changesense(3)">注 册</button>
    </div>
  </div>
</template>

<script>
import {setItem,getItem} from '@/somefunction/localstorage'
import { mapState } from "vuex";
export default {
  data() {
    return {
      code: "",
      phone: "",
      flag: true,
      waittime: 60,
    };
  },
  methods: {
    changesense(index) {
      this.$store.dispatch("login/changesense", index);
    },
    //点击获取验证码
    async getcode() {
      //将等待时间页面展示出来
      this.flag = false;
      //发送验证码的请求
      let result = await this.$API.sendcode(this.phone);
      // console.log(result)
      if (result.data.code != 200) {
        alert("验证码发送失败");
        //继续展示点击发送验证码页面
        this.flag = true;
        return;
      }
      //递减等待时间
      this.timer = setInterval(() => {
        this.waittime--;
        if (this.waittime == 0) {
          //等待时间为0后，清除定时器，展示点击发送验证码页面，将等待时间恢复为60
          clearInterval(this.timer);
          this.flag = true;
          this.waittime = 60;
        }
      }, 1000);
    },
    //点击登录
    async login() {
      //验证电话号码和验证码是否正确
      let result = await this.$API.verifycodeandphone(this.phone, this.code);
      // console.log(result)
      if (result.data.code == 200) {
        //如果正确就验证是否登录
        this.checklogin();
      } else {
        alert("验证码错误");
        return;
      }
    },
    async checklogin() {
      //检查登录状态
      let res = await this.$API.checklogin()
      // console.log(res)
      if(res.data.data.code==200){
        //登录成功，保存用户的信息
        //避免一刷新就掉数据，将用户信息存在localstorage
        // let result =await this.$API.getuserinfo()
        // console.log(result)
        setItem('user',res.data.data.profile)
        this.$store.dispatch('login/successlogin',true) 
        //退出登录
        this.$store.dispatch("login/exitlogin")
        //将登录页面设置为扫码登录页面
        this.$store.dispatch('login/changesense',4)
      }
    },
  },
};
</script>

<style>
.outter .inputcontainer {
  /* height: */
  /* margin:10px 0; */
  border: 1px solid #d9d9d9;
  height: 60px;
  width: 250px;
  margin: 15px 0;
  border-radius: 10px;
  /* display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center; */
}
.outter .inputcontainer .username {
  height: 30px;
  width: 100%;
  display: flex;
}
.outter .inputcontainer .username .left {
  width: 45%;
  height: 100%;
  display: flex;
  border-right: 1px solid #d9d9d9;
  /* border-radius: 5px; */
  align-items: center;
  justify-content: space-around;
  font-size: 13px;
}
.outter .inputcontainer .username .left .iconfont {
  font-size: 20px;
  /* line-height:30px */
}
.outter .inputcontainer .username .right {
  height: 100%;
  /* border:1px solid #d9d9d9; */
}
.outter .inputcontainer .username input {
  height: 100%;
  width: calc(100% - 10px);
  margin-left: 5px;
  outline: none;
  border: none;
  /* border:1px solid #d9d9d9; */
  /* color:#fff; */
  /* position: relative;
    z-index: 999; */
}

.container .info .inputcontainer .bottom {
  height: 30px;
  border-top: 1px solid #d9d9d9;
  width: 100%;
  box-sizing: border-box;
  display: flex;
}
.container .info .inputcontainer .bottom .left {
  height: 30px;
  border-top: 1px solid #d9d9d9;
  width: 65%;
  box-sizing: border-box;
  /* background:red; */
  display: flex;
}
.container .info .inputcontainer .bottom .left .iconfont {
  height: 30px;
  width: 20%;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
}
.container .info .inputcontainer .bottom .left input {
  height: 28px;
  width: 80%;
  box-sizing: border-box;
  /* width:calc(100% - 30px); */
  border-right: 1px solid #d9d9d9;
}
.container .info .inputcontainer .bottom .right {
  height: 30px;
  border-top: 1px solid #d9d9d9;
  width: 35%;
  text-align: center;
  line-height: 30px;
  box-sizing: border-box;
  /* background:yellow; */
}
/* .container .info .inputcontainer .bottom .right img{
  width:100%;
  height:100%;
} */
.container .info .font {
  font-size: 13px;
}
.container .info .font span {
  margin: 0 5px;
}
.container .info .font .password {
  float: right;
}
.container .bottons {
  margin-top: 10px;
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.container .bottons button {
  height: 40%;
  width: 80%;
  font-size: 15px;
}
</style>