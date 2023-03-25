<template>
  <div class="outter">
    <div class="container">
      <div class="swipercontainer">
        <myswiper :imgs="swiperdata" />
      </div>
      <div class="recommend">
        <imgspan :recommendlist="recommendlist" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //存轮播图数据
      swiperdata: [],
      //存榜单数据
      recommendlist: [],
    };
  },
  mounted() {
    //获取轮播图数据
    this.getswiperdata();
    //获取10个推荐歌单
    this.getplaylists();
    //将active设置为当前页面 findmusic
    this.$store.dispatch("findmusic/changeactive", 1);
  },
  methods: {
    //获取轮播图数据
    async getswiperdata() {
      let result = await this.$API.swiperdata();
      this.swiperdata = result.data.banners;
    },
    //获取10个推荐歌单
    async getplaylists() {
      let result = await this.$API.recommendlist(10);
      this.recommendlist = result.data.result;
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
.container {
  width: 80%;
  margin:0 auto;
}
.container .swipercontainer {
  height: 150px;
  width: 1015px;
}
.container .recommend {
  width: 100%;
}
</style>