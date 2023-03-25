<template>
  <div class="container">
    <div class="left">
        <img src="@/assets/image/top50.png" alt="">
    </div>
    <div class="right">
        <div class="title">
            <div class="name">热门50首</div>
            <div class="iconfont icon-bofang"></div>
            <div class="iconfont icon-shoucang"></div>
        </div>
        <songlist/>
    </div>
  </div>
</template>

<script>
import songlist from '@/view/recommendsong/songlist'
import {mapState} from 'vuex'
export default {
    components:{
        songlist
    },
   computed:{
    ...mapState({
        hotFiftySongs:state=>state.singer.hotFiftySongs,
        currentSinger:state=>state.singer.currentSinger,
    })
   },
   methods:{
       async getFiftySongs(){
          let result=await this.$API.fiftySongs(this.currentSinger.id)
        //保存热门50首歌曲
        this.$store.dispatch('song/playlist',result.data.songs)
       }
   },
   mounted(){
    //获得歌手的热门50首歌
    this.getFiftySongs()
   }
}
</script>

<style scoped>
.container{
    width:95%;
    margin:20px auto 0;
    display: flex;
    justify-content: space-between;
}
.container .left{
    width:15px;
}
.container .left img{
    width:120px;
    height:120px;
}
.container .right{
    width:85%;
}
.container .right .title{
    height:30px;
    width:90%;
    margin:0 auto;
    display: flex;
    align-items: center;
}
.container .right .title .name{
    font-weight:bold;
}
.container .right .title .iconfont{
    margin-left:20px;
    font-size: 20px;
    color:#888;
}
</style>