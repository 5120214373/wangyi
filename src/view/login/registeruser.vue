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
          <input type="text" placeholder="请输入手机号" v-model="phone"/>
        </div>
      </div>
      <div class="userinfo">
        <input type="text" placeholder="请输入用户名" class="username" v-model="nickname"/>
        <div class="sex">
          <div>
            <label for="nan">男</label>
            <input type="radio" id="nan" name="a">
          </div>
          <div>
            <label for="nv">女</label>
            <input type="radio" id="nv" name="a">
          </div>
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
      <div class="check">
        <input type="password" placeholder="请再次输入密码" v-model="password"/>
      </div>
    </div>
    <div class="bottons">
      <button @click="register">注 册</button>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            phone:'',
            password:'',
            nickname:'',
            code:'',
            flag:true,
            waittime:60
        }
    },
  methods: {
    //点击注册
    async register(){
      //检测手机号是否注册
      let res=await this.$API.verifyregister(this.phone)
      console.log(res)
      if(res.data.exist!=3){
        alert('手机号已注册')
        return
      }else{
        let result =this.$API.registeruser(this.phone,this.password,this.code,this.nickname)
        
      }
    },
    //点击获取验证码
    async getcode() {
      //将等待时间页面展示出来
      this.flag = false;
      //发送验证码的请求
      let result = await this.$API.sendcode(this.phone);
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
  },
};
</script>

<style scoped>
/* .ouuter {
  width: 100%;
  height: 100%;
} */
.outter .inputcontainer {
  /* height: */
  /* margin:10px 0; */
  border: 1px solid #d9d9d9;
  height: 120px;
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
  /* border-right: 1px solid #d9d9d9; */
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
}

.outter .inputcontainer .bottom {
  height: 30px;
  border-top: 1px solid #d9d9d9;
  width: 100%;
  box-sizing: border-box;
  display: flex;
}
.outter  .inputcontainer .bottom .left {
  height: 30px;
  border-top: 1px solid #d9d9d9;
  width: 65%;
  box-sizing: border-box;
  /* background:red; */
  display: flex;
}
.outter .inputcontainer .bottom .left .iconfont {
  height: 30px;
  width: 20%;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
}
.outter  .inputcontainer .bottom .left input {
  height: 28px;
  width: 80%;
  box-sizing: border-box;
  /* width:calc(100% - 30px); */
  border-right: 1px solid #d9d9d9;
}
.outter  .inputcontainer .bottom .right {
  height: 30px;
  border-top: 1px solid #d9d9d9;
  width: 35%;
  text-align: center;
  line-height: 30px;
  box-sizing: border-box;
  /* background:yellow; */
}
.container .info .inputcontainer .check {
  height: 30px;
  width: 100%;
  border-top: 1px solid #d9d9d9;
  width: 100%;
  box-sizing: border-box;
}
.container .info .inputcontainer .check input {
  height: 100%;
  width: 240px;
  outline: none;
  /* text-align: center; */
  border: none;
  margin-left: 5px;
  /* border:1px solid #d9d9d9; */
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
.container .info .inputcontainer .userinfo {
  height: 30px;
  width: 100%;
  border-top: 1px solid #d9d9d9;
  width: 100%;
  box-sizing: border-box;
  display: flex;
}
.container .info .inputcontainer .userinfo .username,.sex {
  height: 100%;
  width: 120px;
  outline: none;
  /* text-align: center; */
  border: none;
  /* border:1px solid #d9d9d9; */
}
.container .info .inputcontainer .userinfo .username{
margin-left: 5px;
border-right:1px solid #d9d9d9;
}
.container .info .inputcontainer .userinfo .sex{
  height:100%;
  width:100%;
  display:flex;
  align-items: center;
}
.container .info .inputcontainer .userinfo .sex div{
  width:50%;
  height:100%;
  display:flex;
  justify-content: center;
  align-items: center;
}
.container .info .inputcontainer .userinfo .sex div input{
  margin:0 5px;
}
</style>