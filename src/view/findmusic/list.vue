<template>
  <div class="listcontainer">
    <div class="img">
      <img :src="listInfo.coverImgUrl" alt="" />
    </div>
    <div class="song">
      <ul>
        <li
          v-for="(song, index) in topFifve"
          :key="song.id"
          :class="{ active: index == cnt }"
          @click="changeactive(index)"
          @dblclick="playsong(song)"
        >
          <div class="index" :class="{ hot: index < 3 }">{{ index + 1 }}</div>
          <div class="songinfo">
            <div class="songname">{{ song.name }}</div>
            <div class="singer">
              <span v-for="(singer, index) in song.ar" :key="singer.id"
                ><span v-if="index != 0">/</span>{{ singer.name }}</span
              >
            </div>
          </div>
        </li>
      </ul>
      <div class="more" >
        查看更多<span class="iconfont icon-qianjin"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["listInfo"],
  data() {
    return {
      topFifve: [],
      cnt: -1,
    };
  },
  mounted() {
    //获得歌单的歌曲
    this.getplaylistsong();
  },
  methods: {
    //获取榜单的歌曲
    async getplaylistsong() {
      let res = await this.$API.getplaylistsong(this.listInfo.id);
      //展示前五首歌曲
      this.topFifve = res.data.playlist.tracks.slice(0, 5);
    },
    //添加点击效果
    changeactive(index) {
      this.cnt = index;
    },
    //点击更多，展示全部歌曲
    // moresong(){
    //     this.$store.dispatch('song/playlistinfo',this.listInfo)
    //     this.$router.push('/song/songlist')
    // },
    async playsong(song){
       //保存双击的歌曲
      this.$store.dispatch("song/currentsong", song);
      //获得双击歌曲的信息
      let result = await this.$API.playsonginfo(song.id);
      //保存双击歌曲信息
      this.$store.dispatch("song/playsonginfo", result.data.data[0]);
    }
  },
};
</script>

<style scoped>
.listcontainer {
  width: 100%;
  height: 100%;
  /* border:1px solid red; */
  display: flex;
  justify-content: space-between;
}

.listcontainer .img {
  height: 100%;
  width: 15%;
}
.listcontainer .img img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.listcontainer .song {
  width: 82%;
  height: 100%;
}
.listcontainer .song ul {
  width: 100%;
  height: 100%;
}
.listcontainer .song ul li {
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
}
.listcontainer .song ul li:nth-child(2n + 1) {
  background: #fafafa;
}
.listcontainer .song ul li:hover {
  background: #f5f5f5;
}
.listcontainer .song ul li.active {
  background: #f0f0f0;
}
.listcontainer .song ul li .index {
  height: 30px;
  width: 30px;
  text-align: center;
  line-height: 30px;
  font-weight: 100;
}
.listcontainer .song ul li .index.hot {
  color: red;
}
.listcontainer .song ul li .songinfo {
  flex: 1;
  display: flex;
  justify-content: space-between;
  height: 30px;
}
.listcontainer .song ul li .songinfo .songname {
  height: 30px;
  line-height: 30px;
  font-size: 13px;
}
.listcontainer .song ul li .songinfo .singer {
  font-size: 13px;
  line-height: 30px;
  height: 30px;
  color: #969696;
  margin-right: 10px;
}
.listcontainer .song .more {
  margin-top: 5px;
  font-size: 13px;
  margin-left: 10px;
}
.listcontainer .song .more span {
  font-size: 13px;
}
</style>