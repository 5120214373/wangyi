<template>
  <div class="homecontainer">
    <div class="roof">
      <roof />
    </div>
    <div class="center">
      <div class="sidebar" v-if="$route.meta.show">
        <sidebar />
      </div>
      <div class="content">
        <router-view></router-view>
        <div v-if="isLogin" class="mask">
          <login/>
        </div>
        <div v-if="isExitLogin" class="smallmenu">
          <userinfo/>
        </div>
      </div>
    </div>
    <div class="footer" v-if="$route.meta.show">
      <bottom />
    </div>
  </div>
</template>

<script>
import login from "@/view/login";
import userinfo from "@/view/userinfo"
import sidebar from "@/components/sidebar";
import roof from "@/components/roof";
import findmusic from "@/view/findmusic";
import bottom from "@/components/footer";
import { mapState } from "vuex";
export default {
  components: {
    roof,
    sidebar,
    findmusic,
    bottom,
    login,
    userinfo
  },
  computed: {
    ...mapState({
      isLogin:state=>state.login.isLogin,
      isExitLogin:state=>state.login.isExitLogin
    }),
  },
};
</script>

<style scoped>
.homecontainer {
  height: 100%;
  width: 100%;
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: column;
  box-sizing: border-box;
  justify-content: flex-start;
  align-content: flex-start;
}
.roof {
  height: 60px;
  width: 100%;
  z-index: 99999;
  position: sticky;
  top:0;
  left:0;
}
.center{
  height:calc(100% - 120px);
  /* flex:1; */
  width:100%;
  display: flex;
}
.center .sidebar {
  width: 250px;
  height:100%;
}
.center .content {
  flex:1;
  height: 100%;
  position: relative;
  z-index: 1;
}
.content .mask {
  position: absolute;
  top: calc(50% - 200px);
  left: calc(50% - 150px);
  height: 400px;
  width: 300px;
  z-index: 9999;
}
.content .smallmenu {
  position: absolute;
  top: 0;
  right:50px;
  height: 400px;
  width: 300px;
  z-index: 9999;
}
.footer {
  height: 60px;
  width: 100%;
}
</style>