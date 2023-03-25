<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="left">
          精品歌单<span class="iconfont icon-wenhao"></span>
        </div>
        <div class="right">
          <span class="iconfont icon-quanbu">全部歌单</span>
        </div>
      </div>
      <div class="main">
        <div class="playlist" v-for="list in playlist" :key="list.id">
          <div class="img" @click="playlistsong(list.id)">
            <img :src="list.coverImgUrl" alt="" />
          </div>
          <div class="font">
            <div class="one">{{ list.name }}</div>
            <div class="two">by {{ list.creator.nickname }}</div>
            <div class="three">
              <div class="tag">
                <span v-for="tag in list.tags" :key="tag">{{ tag }}</span>
              </div>
              <div class="writer">{{ list.copywriter }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offset: 0,
      playlist: [],
    };
  },
  mounted() {
    //获取精品歌单数据
    this.getBestPlaylist();
    //将active设置为当前页面
    this.$store.dispatch("findmusic/changeactive", 3);
  },
  methods: {
    //获取精品歌单数据
    async getBestPlaylist() {
      let result = await this.$API.bestPlaylist(this.offset);
      this.playlist = result.data.playlists;
    },
     //点击榜单，进入歌单页面
    async playlistsong(id) {  
      //获得具体歌单内容
      let result = await this.$API.getplaylistsong(id)
      //存储具体歌单内容
      this.$store.dispatch('song/playlist',result.data.playlist.tracks)
      //跳转到歌单页面
      this.$router.push({path:"/song"});
      //将sidebar的效果取消
      this.$store.dispatch("sidebar/getcurrent", 0);
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.container .content {
  width: 95%;
  margin: 0 auto;
}
.container .content .top {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container .content .top .left {
  font-size: 20px;
  font-weight: bold;
  line-height: 50px;
  height: 100%;
}
.container .content .top .left .iconfont {
  color: #888;
}
.container .content .top .right {
  height: 20px;
  width: 80px;
  border: 1px solid #888;
  border-radius: 20px;
  line-height: 20px;
  text-align: center;
  color: #333;
}
.container .content .top .right span {
  font-size: 13px;
}
.container .content .main {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.container .content .main .playlist {
  margin-top: 15px;
  width: 32%;
  height: 140px;
  display: flex;
  justify-content: space-between;
}
.container .content .main .playlist .img {
  height: 100%;
  width: 35%;
}
.container .content .main .playlist .img img {
  height: 100%;
  width: 100%;
  border-radius: 5px;
}
.container .content .main .font {
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.container .content .main .font .one {
  font-weight: 100;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.container .content .main .font .two {
  font-size: 13px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.container .content .main .font .three {
  height: 20px;
  font-size: 12px;
  color: #aaa;
  display: flex;
}
.container .content .main .font .three .tag {
  border: 1px solid red;
  color: red;
  border-radius: 3px;
}
.container .content .main .font .three .writer {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex:1;
  margin-left:5px;
}
</style>