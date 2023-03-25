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
          <input type="text" placeholder="请输入手机号" v-model="phoneNumber"/>
        </div>
      </div>
      <div class="bottom">
        <input type="password" placeholder="请输入密码" v-model="password"/>
      </div>
    </div>
    <div class="font">
      <input type="checkbox" />
      <span>自动登录</span>
      <span class="forget">忘记密码</span>
      <span @click="changesense(2)">验证码登录</span>
    </div>
    <div class="bottons">
      <button @click="login">登 录</button>
      <button @click="changesense(3)">注 册</button>
    </div>
  </div>
</template>

<script>
import {setItem,getItem} from '@/somefunction/localstorage'
export default {
  data(){
    return {
      phoneNumber:'',
      password:''
    }
  },
  methods: {
    login(){
      if(this.phoneNumber.length!=11)
      {
        alert('手机号出错')
        return
      }
      let arr=getItem('user')
      let result=arr.some(item=>item.phone==this.phoneNumber)
      if(!result){
        alert('该手机号还未注册')
        return
      }
      else{
        let res=arr.some(item=>item.phone==this.phoneNumber&&item.password==this.password)
        if(res){
          arr.map(item=>{
            if(item.phone==this.phoneNumber&&item.password==this.password){
              item.login=true
            }
          })
          alert('登录成功')
          setItem('user',arr)
          this.$store.dispatch('exitlogin')
        }
        else{
          alert('密码错误')
          return
        }
      }
      // if(!localStorage.getItem('phonenumber')){
      //   alert('该手机号还未注册')
      //   return
      // }
      // if(localStorage.getItem('phonenumber')==this.phoneNumber)
      // {
      //   if(localStorage.getItem('password')==this.password){
      //     alert('登录成功')
      //     this.$store.dispatch('exitlogin')
      //     this.$store.dispatch('addusername',localStorage.getItem('username'))
      //   }
      // }
      // if(localStorage.getItem('phonenumber')!=this.phoneNumber){
      //    alert('该手机号还未注册')
      //    return
      // }
      // if(localStorage.getItem('password')!=this.password){
      //   alert('密码出错')
      //   return 
      // }
    },
    changesense(index){
        this.$store.dispatch('login/changesense',index)
    }
  },
};
</script>

<style>
/* .ouuter {
  width: 100%;
  height: 100%;
} */
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
}
.container .info .inputcontainer .bottom input {
  height: 100%;
  width: 240px;
  outline: none;
  /* text-align: center; */
  border: none;
  margin-left: 5px;
}
.container .info .font {
  font-size: 13px;
}
.container .info .font span {
  margin: 0 5px;
}
.container .info .font .forget {
  margin-left: 35px;
  padding-right: 10px;
  border-right: 1px solid #d9d9d9;
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