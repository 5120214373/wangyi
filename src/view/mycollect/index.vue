<template>
  <div class="mycollectcontainer">
    <div class="header">
      <ul>
        <li @click="addactive(1)" :class="{ active: active == 1 }">
          <router-link to="/mycollect/albumcollect">专辑</router-link>
        </li>
        <li @click="addactive(2)" :class="{ active: active == 2 }">
          <router-link to="/mycollect/singercollect">歌手</router-link>
        </li>
        <li @click="addactive(3)" :class="{ active: active == 3 }">
          <router-link to="/mycollect/vediocollect">视频</router-link>
        </li>
        <li @click="addactive(4)" :class="{ active: active == 4 }">
          <router-link to="/mycollect/columncollect">专栏</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    //为当前页面添加active mycollect
    addactive(index) {
      this.$store.dispatch("mycollect/changeactive", index);
    },
  },
  computed: {
    ...mapState({
      active: (state) => state.mycollect.active,
    }),
  },
  mounted() {
    //记录点击sidebar的位置 sidebar
    this.$store.dispatch("sidebar/getcurrent", 12);
  },
};
</script>

<style scoped>
.mycollectcontainer {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.mycollectcontainer .header {
  width: 100%;
  height: 50px;
}
.mycollectcontainer .header ul {
  display: flex;
}
.mycollectcontainer .header ul li {
  height: 100%;
  line-height: 50px;
  margin: 0 20px;
}
.mycollectcontainer .header ul li.active {
  border-bottom: 2px solid red;
  font-size: 20px;
  font-weight: bold;
}
.mycollectcontainer .header ul li a {
  text-decoration: none;
  color: #000;
}
</style>