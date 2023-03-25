<template>
  <div class="outter">
    <div class="findmusiccontainer">
      <div class="top">
        <ul>
          <li :class="{ active: active == 1 }" @click="change(1)">
            <router-link to="/findmusic/personality">个性推荐 </router-link>
          </li>
          <li :class="{ active: active == 2 }" @click="change(2)">专属定制</li>
          <li :class="{ active: active == 3 }" @click="change(3)">
            <router-link to="/findmusic/playlist">歌单</router-link>
          </li>
          <li :class="{ active: active == 4 }" @click="change(4)">
            <router-link to="/findmusic/toplist">排行榜</router-link>
          </li>
          <li :class="{ active: active == 5 }" @click="change(5)">
            <router-link to="/findmusic/singer">歌手</router-link>
          </li>
          <li :class="{ active: active == 6 }" @click="change(6)">最新音乐</li>
        </ul>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import personality from "./personality.vue";
import swiper from "@/components/swiper";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    swiper,
    personality,
  },
  methods: {
    //修改被选中的样式 findmusic
    change(index) {
      this.$store.dispatch("findmusic/changeactive", index);
    },
  },
  computed: {
    ...mapState({
      active: (state) => state.findmusic.active,
    }),
  },
  mounted() {
    //记录点击sidebar的位置 sidebar
    this.$store.dispatch("sidebar/getcurrent",1);
  },
  beforeDestroy() {
    //离开findmusic页面，将sidebar设为-1
    //记录点击sidebar的位置 sidebar
    this.$store.dispatch("sidebar/getcurrent",-1);
  },
};
</script>

<style scoped>
.outter {
  height: 100%;
  width: 100%;
}
.findmusiccontainer {
  width: 100%;
  height: 100%;
}
.top {
  height: 50px;
  width: 100%;
  margin-bottom: 10px;
  /* position: sticky;
   top:0;
  left:0;
  background: #fff;
  z-index:999; */
}
.top ul {
  list-style: none;
  display: flex;
}
.top li {
  height: 100%;
  width: 90px;
  line-height: 50px;
  text-align: center;
  font-size: 15px;
}
.top li a {
  display: inline-block;
  text-decoration: none;
  color: black;
  height: 100%;
  width: 100%;
}
.top li.active {
  font-size: 18px;
  font-weight: bold;
  border-bottom: 2px solid #ec4141;
}
.findmusiccontainer .content {
  width: 100%;
  height: calc(100% - 60px);
}
</style>