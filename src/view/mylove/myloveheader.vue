<template>
  <div class="container">
    <div class="top">
      <div class="img">
        <img src="@/assets/image/mylove.png" alt="" />
      </div>
      <div class="font">
        <div class="iconfont icon-ttpodicon c"><span>我喜欢的音乐</span></div>
        <div>{{ username }} 于2019-05-05创建</div>
        <div class="icons">
          <div class="playall">
            <div class="iconfont icon-sanjiaoxing"></div>
            <div class="play">播放全部</div>
            <div class="iconfont icon-jia"></div>
          </div>
          <div class="iconfont icon-shoucang a"><span>收藏(0)</span></div>
          <div class="iconfont icon-fenxiang a"><span>分享(0)</span></div>
          <div class="iconfont icon-ziyuan a"><span>下载全部</span></div>
        </div>
        <div class="song">歌曲：{{count}} 播放：143</div>
      </div>
    </div>
  </div>
</template>

<script>
import {setItem,getItem} from '@/somefunction/localstorage'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      username: "",
    };
  },
  props:['count'],
  computed:{
    ...mapState({
      successlogin:state=>state.login.successlogin
    })
  },
  mounted() {
    //刷新页面
    if (getItem("user")) {
      //修改successlogin的状态
      this.$store.dispatch("login/successlogin", true);
    }
  },
  watch: {
    successlogin:{
      immediate:true,
      deep:true,
      handler:function(newvalue){
        if (newvalue) {
          //将localstorage中的用户信息展示在页面中
          let obj = getItem("user");
          this.username = obj.nickname;
        } else {
          //两种情况
          //1.刷新页面，但是用户信息仍然存在于localstorage中，直接在mounted中修改successlogin
          //2.退出登录
          //将页面数据清除
          this.username = "";
        }
      }
    },
  }
};
</script>

<style scoped>
.container {
  width: 100%;
}
.container .top {
  height: 200px;
  width: 100%;
  /* border:1px solid red; */
  display: flex;
  align-items: center;
}
.container .top .img {
  height: 100%;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border:1px solid red; */
}
.container .top .img img {
  height: 160px;
  width: 160px;
}
.container .top .font {
  height: 160px;
  width: 500px;
  display: flex;
  flex-direction: column;
}
.container .top .font .c {
  color: red;
  font-size: 20px;
  margin: 10px 0;
}
.container .top .font .c span {
  color: #000;
}
.container .top .font .icons {
  display: flex;
  margin: 10px 0;
}
.container .top .font .icons .playall {
  /* width:100px; */
  display: flex;
  background: red;
  /* border:1px solid red; */
  border-radius: 20px;
  align-items: center;
  color: #fff;
  margin: 0 5px;
  /* margin-right:20px; */
}
.container .top .font .icons .playall .iconfont {
  padding: 5px;
  font-size: 15px;
  color: #fff;
}
.container .top .font .icons .playall .play {
  padding: 0 5px;
}
.container .top .font .icons .a {
  border: 1px solid #888888;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 0 5px;
}
.container .top .font .icons .a span {
  margin: 0 5px;
}
.container .top .font .icons .icon-shoucang {
  color: #888888;
}
</style>