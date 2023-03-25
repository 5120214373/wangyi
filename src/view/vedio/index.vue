<template>
  <div class="container">
    <div class="top">
      <ul>
        <li :class="{ active: active == 1 }" @click="change(1)">
          <router-link to="/vedio/vedio"> 视频 </router-link>
        </li>
        <li :class="{ active: active == 2 }" @click="change(2)">
          <router-link to="/vedio/mv">MV</router-link>
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
     
    };
  },
  computed:{
    ...mapState({
      active:state=>state.vedio.active
    })
  },
  methods: {
    //修改页面
    change(index) {
      //修改头部样式 vedio
      this.$store.dispatch('vedio/active',index)
    },
  },
  mounted() {
    //记录点击sidebar的位置 sidebar
   this.$store.dispatch("sidebar/getcurrent", 3);
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* overflow: hidden; */
}
.container .content {
  height: calc(100% - 60px);
  width: 100%;
}
.container .top {
  height: 50px;
  width: 100%;
  margin-bottom: 10px;
  position: sticky;
  top: 0;
  left: 0;
  background: #fff;
}
.container .top ul {
  list-style: none;
  display: flex;
}
.container .top li {
  height: 100%;
  width: 90px;
  line-height: 50px;
  text-align: center;
  font-size: 15px;
}
.container .top li a {
  color: #000;
}
.container .top li.active a {
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 2px solid #ec4141;
  color: #000;
}
</style>