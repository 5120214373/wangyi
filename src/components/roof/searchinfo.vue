<template>
  <div class="container">
      <div class="box">
        <span class="iconfont icon-sousuo"></span>
        <div class="title">{{title}}</div>
      </div>
    <ul>
      <li v-for="(item) in info" :key="item.id" @click="play(item)">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
   props:['info','title'],
   computed:{
    ...mapState({
      loveIds:state=>state.song.loveIds
    })
   },
   methods:{
    async play(item){
      //点击单曲
      if(this.title=="单曲"){
        //获得歌曲的资源
        let result = await this.$API.playsonginfo(item.id)
        this.$store.dispatch('song/playsonginfo',result.data.data[0])
        //获得歌曲信息
        let res=await this.$API.lovesong(item.id)
        //如果是心动歌曲就添加islike=true
        if(this.loveIds.indexOf(res.data.songs[0].id)!=-1){
          this.$set(res.data.songs[0],'islike',true)
        }
        this.$store.dispatch('song/currentsong',res.data.songs[0])
      }
      //点击歌手
      if(this.title=="歌手"){
        //保存点击歌手的信息
        this.$store.dispatch('singer/currentsinger',item)
        //获得歌手的热门50首歌
        let result=await this.$API.fiftySongs(item.id)
        //保存热门50首歌曲
        this.$store.dispatch('song/playlist',result.data.songs)
        获取歌手的mv
        let res=await this.$API.singerMV(item.id)
        //保存歌手mv
        this.$store.dispatch('singer/singermv',res.data.mvs)
        //获取歌手的详细信息
        let data=await this.$API.singerInfo(item.id)
        //保存歌手的详细信息
        this.$store.dispatch("singer/singerinfo",data.data.data.artist.briefDesc)
        //获取相似歌手
        let info=await this.$API.singersimi(item.id)
        //保存相似歌手
        this.$store.dispatch("singer/singersimi",info.data.artists)
        //页面跳转
        this.$router.push('/singerdetail')
      }
      //点击专辑
      if(this.title=="专辑"){
        let result = await this.$API.albumContent(item.id)
        //保存album信息
        this.$store.dispatch('album/albuminfo',result.data.album)
        //保存album歌曲
        this.$store.dispatch('album/albumsongs',result.data.songs)
        this.$store.dispatch("song/playlist",result.data.songs)
        //跳转到歌曲页面
        this.$router.push('/album')
      }
      if(this.title=="歌单"){
        //获得具体歌单内容
      let result = await this.$API.getplaylistsong(item.id);
      //存储歌单信息
      this.$store.dispatch('song/playlistinfo',result.data.playlist)
      //存储具体歌单内容
      result.data.playlist.tracks.forEach((item) => {
        if (this.loveIds.indexOf(item.id) != -1) {
          this.$set(item, "islike", true);
        }else{
          this.$set(item, "islike", false);
        }
      });
      this.$store.dispatch("song/playlist", result.data.playlist.tracks);
      //跳转到歌单页面
      this.$router.push({ path: "/song" });
      //将sidebar的效果取消
      this.$store.dispatch("sidebar/getcurrent", 0);
      }
    }
   }
}
</script>

<style scoped>
.container {
  width: 100%;
  float: right;
}
.container .box{
  height:40px;
  width:100%;
  display:flex;
  align-items: center;
  color:#888888;
}
.container .box:hover{
  color:#000;
}
.container span {
  display: inline-block;
  height: 30px;
  width: 30px;
  line-height: 30px;
  text-align: center;
  margin-left:10px;
}
.container .title {
  display: inline-block;
  height: 40px;
  width: 100px;
  line-height: 40px;
  font-size: 15px;
  /* margin-left:20px; */
}
.container ul {
  list-style: none;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.container ul li {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 40px;
  font-size: 13px;
   text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.container ul li:hover {
  background: #f2f2f2;
}
</style>