<template>
  <div class="container">
    <div class="logo">
      <div class="btns">
        <span class="back" v-if="loginSense==3" @click="changesense(1)">&lt;返回登录</span>
        <span class="back" v-if="loginSense!=3&&loginSense!=4" @click="changesense(4)">扫码登录</span>
        <span class="iconfont icon-cha" @click="exitlogin"></span>
      </div>
      <img src="@/assets/image/biglogo.png" alt="" />
    </div>
    <div class="info">
      <passwordlogin v-if="loginSense === 1" />
      <codelogin v-else-if="loginSense === 2" />
      <registeruser v-else-if="loginSense===3" />
      <scancodelogin v-else/>
    </div>
    <div class="icons">
      <span class="iconfont icon-weixin" style="background: #02de6c"></span>
      <span class="iconfont icon-QQ" style="background: #1991ff"></span>
      <span
        class="iconfont icon-xinlangweibo"
        style="background: #ed462f"
      ></span>
      <span class="iconfont icon-wangyi0" style="background: #ed462f"></span>
    </div>
    <div class="care">
      <input type="checkbox" name="" id="" />
      <span>同意</span>
      <span>《服务条款》</span>
      <span>《隐私政策》</span>
      <span>《儿童隐私政策》</span>
    </div>
  </div>
</template>

<script>
import registeruser from "./registeruser.vue";
import passwordlogin from "./passwordlogin.vue";
import codelogin from "./codelogin.vue";
import scancodelogin from './scancodelogin.vue'
import { mapState } from "vuex";
export default {
  components: {
    passwordlogin,
    codelogin,
    registeruser,
    scancodelogin,
  },
  methods: {
    //点击叉号关闭登录页面
    exitlogin() {
      this.$store.dispatch("login/exitlogin");
      //将changesense改为4，下次点击登录时出现扫码页面
      this.changesense(4)
    },
    //点击返回登录，退出注册页面，进入密码登录页面
    changesense(index){
      this.$store.dispatch('login/changesense',index)
    }
  },
  computed: {
    ...mapState({
      loginSense:state=>state.login.loginSense
    }),
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  /* position: absolute;
  top:100px;
  left:450px; */
  background-color: #fff;
  box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.container .logo {
  height: 20%;
  width: 100%;
  /* border:1px solid red; */
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container .logo .btns {
  width:100%;
  position: relative;
}
.container .logo .btns .iconfont{
  position: absolute;
  right:5px;
  top:5px;
}
.container .logo .btns .back{
  position: absolute;
  left:5px;
  top:5px;
}
.container .logo img {
  height: 100%;
  width: 80px;
  /* text-align: center; */
}
.container .info {
  height: 50%;
  width: 100%;
  /* border:1px solid red; */
  /* background-color: yellow; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* box-sizing: border-box; */
}
/* .container .bottons {
  height: 20%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
} */
/* .container .bottons button {
  height: 40%;
  width: 80%;
  font-size: 15px;
} */
.container .icons {
  height: 10%;
  width: 100%;
  /* border:1px solid red; */
  /* background-color: green; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.container .icons span {
  /* height:100%;
    width:20%; */
  font-size: 30px;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  color: #fff;
}
.container .care {
  height: 5%;
  width: 100%;
  /* border:1px solid red; */
  /* background-color: orange; */
  font-size: 12px;
  display: flex;
  justify-content: space-around;
}
</style>