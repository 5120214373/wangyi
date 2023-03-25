<template>
  <div class="container">
    <div class="content" v-for="MV in singerMV" :key="MV.id">
      <div class="img" @click="mvplay(MV, MV.id)">
        <img :src="MV.imgurl" alt="" />
      </div>
      <div class="font">{{ MV.name }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      singerMV: (state) => state.singer.singerMV,
      currentSinger:state=>state.singer.currentSinger,
    }),
  },
  methods: {
    //获取歌手的mv
    async getSingerMv(){
        let res=await this.$API.singerMV(this.currentSinger.id)
        //保存歌手mv
        this.$store.dispatch('singer/singermv',res.data.mvs)
    },
    //播放mv
    //将mv数据和vedio数据进行互相匹配
    async mvplay(vedio, id) {
      //mv的播放资源
      let result = await this.$API.mvurl(id);
      this.$store.dispatch("vedio/vediourl", result.data.data.url);
      //相关mv
      let res = await this.$API.simimv(id);
      res.data.mvs.map((item) => {
        item.coverUrl = item.cover;
        item.title = item.name;
      });
      this.$store.dispatch("vedio/linkvedio", res.data.mvs);
      //mv详细数据
      let data = await this.$API.mvdata(id);
      data.data.praisedCount = data.data.likedCount;
      data.data.creatorname = vedio.artistName;
      data.data.img = vedio.artist.picUrl;
      data.data.playTime = vedio.playCount;
      data.data.title = vedio.name;
      data.data.subscribeCount = 0;
      this.$store.dispatch("vedio/vediodetail", data.data);
      //跳转页面
      this.$router.push("/mvdetail");
    },
  },
  mounted(){
    //获取歌手的mv
    this.getSingerMv()
  }
};
</script>

<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.container .content {
  margin-top: 20px;
  width: 19%;
  height: 150px;
}
.container .content .img {
  width: 100%;
  height: 120px;
}
.container .content .img img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.container .content .font {
  line-height: 30px;
  height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 13px;
}
</style>