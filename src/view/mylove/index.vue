<template>
  <div class="outter">
    <div class="container" v-if="user.userId">
      <myloveheader :count="count" />
      <mytitle />
    </div>
  </div>
</template>


<script>
import { setItem, getItem } from "@/somefunction/localstorage";
import mytitle from "@/view/recommendsong/mytitle";
import myloveheader from "./myloveheader.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      count: 0,
      user: {},
    };
  },
  components: {
    myloveheader,
    mytitle,
  },
  methods: {
    async getlovelist() {
      //确保有loveIds
      if (this.loveIds[0]) {
        let res = await this.$API.lovesong(this.loveIds.join());
        // 添加一个是否是心动歌曲的属性
        res.data.songs.forEach((item) => {
          this.$set(item, "islike", true);
        });
        this.count = res.data.songs.length;
        //保存所有的心动歌曲到当前榜单中
        this.$store.dispatch("song/playlist", res.data.songs);
      }
    },
  },
  mounted() {
    //记录点击sidebar的位置 sidebar
    this.$store.dispatch("sidebar/getcurrent", 7);
    //获取用户信息
    this.user = getItem("user");
    //用户没登陆就跳转到登录
    if (!this.user) {
      this.$store.dispatch("login/tologin");
    } else {
      //获得心动歌单
      this.getlovelist();
    }
  },
  computed: {
    ...mapState({
      playlist: (state) => state.song.playlist,
      loveIds: (state) => state.song.loveIds,
    }),
  },
  watch: {
    //获取心动歌单的歌曲数
    playlist: {
      deep: true,
      handler: function () {
        this.count = this.playlist.length;
      },
    },
    //监视loveIds，刷新页面后等到loveIds有数据了再进行发请求
    loveIds: {
      deep: true,
      handler() {
        if (this.loveIds[0]) {
          this.getlovelist();
        }
      },
    },
  },
};
</script>

<style scoped>
.outter {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
</style>