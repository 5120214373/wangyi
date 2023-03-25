<template>
  <div id="app">
    <home />
  </div>
</template>

<script>
import QRCode from "qrcode";
import home from "@/view/home";
export default {
  name: "App",
  components: {
    home,
  },
  mounted() {
    // this.check()
    //  this.logout()
    // this.getuserinfo()
    // this.toplist()
  },
  methods: {
    async toplist(){
      let result =await this.$API.topList()
      console.log(result)
    },
    async check() {
      let res = await this.$API.checklogin();
      console.log(res);
    },
    async logout() {
      let res = await this.$API.logout();
      console.log(res);
    },
    async getuserinfo() {
      let result = await this.$API.getuserinfo();
      console.log(result);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
/* 修改滑动条的样式 */
::-webkit-scrollbar {
  width: 10px; /* 纵向滚动条 宽度 */
  background: #fff; /* 整体背景 */
  border-radius: 10px; /* 整体 圆角 */
}

::-webkit-scrollbar-thumb {
  background: #e0e0e0;
  border-radius: 15px; /* 整体 圆角 */
}
</style>
