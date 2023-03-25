<template>
  <div class="outter" v-if="user.userId">
    <div class="concern">
       <dynamic/>
    </div>
    <div class="userInfo">
      <userDetailInfo :user="user" :userDetailInfo="userDetailInfo" :hotTopic="hotTopic"/>
    </div>
  </div>
</template>

<script>
import dynamic from './dynamic.vue'
import userDetailInfo from '@/view/focu/userDetailInfo'
import { getItem } from "@/somefunction/localstorage";
export default {
  components:{
    userDetailInfo,
    dynamic
  },
  data() {
    return {
      user: {},
      userDetailInfo: {},
      hotTopic: [],
    };
  },
  methods: {
    //获取用户详细信息
    async getUserDetailInfo(id) {
      let result = await this.$API.userDetailInfo(id);
      this.userDetailInfo = result.data.profile;
    },
    //获取热门话题
    async getHotTopic() {
      let result = await this.$API.hotTopic(5, 0);
      this.hotTopic = result.data.hot;
    },
  },
  mounted() {
    //将sidebar的点击效果设置在当前页面
    this.$store.dispatch("sidebar/getcurrent", 4);
    //获取用户信息
    this.user = getItem("user");
    //用户没登陆就跳转到登录
    if (!this.user) {
      this.$store.dispatch("login/tologin");
    } else {
      //获取用户详细信息
      this.getUserDetailInfo(this.user.userId);
      //获取热门话题
      this.getHotTopic();
    }
  },
};
</script>

<style scoped>
.outter {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  justify-content: space-around;
}
.outter .concern {
  width: 84%;
  height: 200px;
  /* border:1px solid red; */
}
.outter .userInfo {
  /* float:right; */
  width: 15%;
  /* margin-right:10px; */
}
</style>