<template>
  <div class="container">
    <div class="content">
        <div class="box" v-for="singer in singerSimi" :key="singer.id" @click="toSingerDetail(singer)">
            <img :src="singer.picUrl" alt="">
            <div class="font">{{singer.name}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState({
        singerSimi:state=>state.singer.singerSimi
    })
  },
  methods:{
     //跳转到歌手详情页面
    async toSingerDetail(singer){
        //保存点击歌手的信息
        this.$store.dispatch('singer/currentsinger',singer)
        //获得歌手的热门50首歌
        let result=await this.$API.fiftySongs(singer.id)
        //保存热门50首歌曲
        this.$store.dispatch('song/playlist',result.data.songs)
        //获取歌手的mv
        let res=await this.$API.singerMV(singer.id)
        //保存歌手mv
        this.$store.dispatch('singer/singermv',res.data.mvs)
        //获取歌手的详细信息
        let data=await this.$API.singerInfo(singer.id)
        //保存歌手的详细信息
        this.$store.dispatch("singer/singerinfo",data.data.data.artist.briefDesc)
        //获取相似歌手
        let info=await this.$API.singersimi(singer.id)
        //保存相似歌手
        this.$store.dispatch("singer/singersimi",info.data.artists)
        //将active改为1
        this.$store.dispatch('singer/changeactive',1)
        //页面跳转
        this.$router.push('/singerdetail')
    }
  }
}
</script>

<style scoped>
.container{
    margin-top:20px;
    width:100%;
}
.container .content{
    width:95%;
    margin:0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.container .content .box{
    width:19%;
    height:250px;
    margin-top:20px;
}
.container .content .box img{
    width:100%;
    height:220px;
    border-radius: 5px;
}
.container .content .box .font{
    width:100%;
    height:30px;
    line-height:30px;
    font-weight: 100;
    font-size: 14px;
}
</style>