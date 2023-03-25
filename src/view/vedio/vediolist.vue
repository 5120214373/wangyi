<template>
  <div class="vediolistcontent">
    <div class="vedio" v-for="vedio in vediolist" :key="vedio.data.vid">
      <img
        :src="vedio.data.coverUrl"
        alt=""
        @click="tovediodetail(vedio.data.vid)"
      />
      <div class="font">
        <span class="title">{{ vedio.data.title }}</span>
        <span class="creator" v-if="vedio.data.creator"
          >by {{ vedio.data.creator.nickname|| vedio.data.creator[0].userName}}</span
        >
      </div>
    </div>
    <div style="width:23%;" v-for="n in 10" :key="n"></div>
  </div>
</template>

<script>
export default {
  props: ["vediolist"],
  methods: {
    //点击视频，跳转到视频详情页面
    async tovediodetail(id) {
      //发请求获得详情页面数据
      let result = await this.$API.vediourl(id);
      //保存视频播放地址
      this.$store.dispatch("vedio/vediourl", result.data.urls[0].url);
      //获取视频的相关视频
      let res = await this.$API.linkvedio(id);
      res.data.data.map((item) => {
        item.artistName = item.creator[0].userName;
      });
      //保存视频的相关视频
      this.$store.dispatch("vedio/linkvedio", res.data.data);
      //获得视频详情
      let data = await this.$API.vediodetail(id);
      //保存视频详情信息
      data.data.data.creatorname = data.data.data.creator.nickname;
      data.data.data.img = data.data.data.creator.avatarUrl;
      this.$store.dispatch("vedio/vediodetail", data.data.data);
      //跳转页面
      this.$router.push("/vediodetail");
    },
  },
};
</script>

<style scoped>
.vediolistcontent {
  margin: 15px 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.vediolistcontent .vedio {
  width: 23%;
  height: 190px;
  /* border:1px solid red; */
  margin: 15px 0;
}
.vediolistcontent .vedio img {
  width: 100%;
  height: 150px;
  border-radius: 5px;
}
.vediolistcontent .vedio .font {
  display: flex;
  height: 40px;
  width: 100%;
  font-size: 11px;
  justify-content: space-around;
  flex-direction: column;
}
.vediolistcontent .vedio .font .title {
  width: 100%;
  height: 20px;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.vediolistcontent .vedio .font .creator {
  width: 100%;
  height: 20px;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #cccccc;
}
</style>