<template>
  <div class="recommendmusic">
    <p v-if="active == 1">推荐歌单&gt;</p>
    <div class="imgcontainer">
      <div class="imgs" v-for="(item) in recommendlist" :key="item.id">
        <div class="img" @click="playlistsong(item.id)">
          <!-- <div class="font" ref="c" v-if="index == 0">
            根据您的音乐口味每日随机生成
          </div> -->
          <img :src="item.picUrl||item.coverImgUrl" alt="" />
          <div class="playcount"><span class="iconfont icon-bofangsanjiaoxing"></span>{{item.count}}</div>
          <div class="iconfont icon-sanjiaoxing1" ref="a"></div>
        </div>
        <span>{{ item.name }}</span>
      </div>
      <!-- 添加10个和原来盒子等宽的盒子，解决space-between最后一行盒子不能居左问题 -->
      <div class="hidden" v-for="n in 10" :key="n"></div>
    </div>
  </div>
</template>

<script>
import {mycount} from '@/somefunction/mycount'
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  name: "imgspan",
  methods: {
    //点击榜单，进入歌单页面
    async playlistsong(id) {
      //获得具体歌单内容
      let result = await this.$API.getplaylistsong(id);
      //存储歌单信息
      this.$store.dispatch('song/playlistinfo',result.data.playlist)
      //保存资源类型为歌单
      this.$store.dispatch('playlist/savetype',2)
      //存储具体歌单内容
      result.data.playlist.tracks.forEach((item) => {
        if (this.loveIds.indexOf(item.id) != -1) {
          this.$set(item, "islike", true);
        }else{
          this.$set(item, "islike", false);
        }
      });
      this.$store.dispatch("song/playlist", result.data.playlist.tracks);
      //将sidebar的效果取消
      this.$store.dispatch("sidebar/getcurrent", 0);
      //跳转到歌单页面
      this.$router.push({ path: "/song" });
    },
  },
  //接收数据
  props: ["recommendlist"],
  computed: {
    ...mapState({
      active: (state) => state.findmusic.active,
      loveIds: (state) => state.song.loveIds,
    }),
  },
  watch:{
    //监视recommendlist，添加上播放次数
    recommendlist:{
      deep:true,
      handler(){
        this.recommendlist.forEach(item=>{
          this.$set(item,'count',mycount(item.playCount))
        })
      }
    }
  }
};
</script>

<style scoped>
.recommendmusic {
  width: 100%;
}
.recommendmusic p {
  margin: 10px 0;
  font-size: 20px;
}
.recommendmusic .imgcontainer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* justify-content: flex-start; */
}
.recommendmusic .imgcontainer .imgs {
  overflow: hidden;
  width: 18%;
  /* border:1px solid red; */
  height: 200px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  position: relative;
}
.recommendmusic .imgcontainer .imgs span {
  width: 100%;
  height: 20%;
  font-size: 13px;
  line-height: 20px;
}
.recommendmusic .imgcontainer .imgs .img {
  height: 80%;
  width: 100%;
}
.recommendmusic .imgcontainer .imgs .img:hover > .icon-sanjiaoxing1 {
  opacity: 1;
  transition: all 0.5s linear;
}
.recommendmusic .imgcontainer .imgs .img:hover > .font {
  transform: translateY(0px);
  transition-delay: 0.5s;
  transition: all 0.5s linear;
}
.recommendmusic .imgcontainer .imgs .img .icon-sanjiaoxing1 {
  position: absolute;
  bottom: 45px;
  right: 5px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background: #fff;
  color: red;
  line-height: 25px;
  text-align: center;
  font-size: 12px;
  border: 1px solid red;
  opacity: 0;
  transition: all 0.5s linear;
}
/* .recommendmusic .imgcontainer .imgs .img .b {
  opacity: 1;
  transition: all 0.5s linear;
} */
.recommendmusic .imgcontainer .imgs .img img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.recommendmusic .imgcontainer .imgs .img .font {
  position: absolute;
  height: 30px;
  width: 100%;
  font-size: 12px;
  line-height: 30px;
  transform: translateY(-50px);
  transition: all 0.5s linear;
  background: #333;
  color: #fff;
  border-radius: 5px 5px 0 0;
  transition-delay: 0.5s;
  opacity: 0.9;
}
.recommendmusic .imgcontainer .imgs .img .playcount{
    font-size:13px;
    position: absolute;
    top:0;
    right:5px;
    color:#fff;
}
/* .recommendmusic .imgcontainer .imgs .img .d {
  transform: translateY(0px);
  transition-delay: 0.5s;
  transition: all 0.5s linear;
} */
.recommendmusic .imgcontainer .hidden{
  width:18%;
}
</style>