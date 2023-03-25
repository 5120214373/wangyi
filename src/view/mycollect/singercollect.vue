<template>
  <div class="singercollectcontainer">
    <search v-slot:singer>
      <template>
        <div class="left">收藏的歌手<span v-if="singerCollect.length">({{singerCollect.length}})</span></div>
        <div class="search">
          <input type="text" placeholder="搜索我收藏的歌手" />
          <span class="iconfont icon-sousuo"></span>
        </div>
      </template>
    </search>
    <div class="content">
      <ul>
        <li v-for="item in singerCollect" :key="item.id" @click="toSingerDetail(item)">
          <div class="img">
            <img :src="item.picUrl" alt="">
          </div>
          <div class="name">{{item.name}}</div>
          <div class="singer">专辑:{{item.albumSize}}</div>
          <div class="song">MV:{{item.mvSize}}首</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import search from "./search";
export default {
  data(){
    return {
      
    }
  },
  components: {
    search,
  },
  mounted(){
    //将active设置为当前页面 mycollect
    this.$store.dispatch("mycollect/changeactive",2)
  },
  methods:{
    //点击跳转到歌手详情页面
    async toSingerDetail(item){
      //保存点击歌手的信息
        this.$store.dispatch('singer/currentsinger',item)
        //获得歌手的热门50首歌
        let result=await this.$API.fiftySongs(item.id)
        //保存热门50首歌曲
        this.$store.dispatch('song/playlist',result.data.songs)
        // 获取歌手的mv
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
  },
  computed:{
    ...mapState({
      singerCollect:state=>state.mycollect.singerCollect
    })
  }
};
</script>

<style scoped>
.singermcollectcontainer {
  width: 100%;
}
.singercollectcontainer .content{
  width:100%;
}
.singercollectcontainer .content ul{
  list-style: none;
  width:100%;
}
.singercollectcontainer .content ul li{
  width:100%;
  height:80px;
  display:flex;
  margin-top:15px;
  align-items: center;
}
.singercollectcontainer .content ul li:first-child{
  background:#f7f7f7;
}
.singercollectcontainer .content ul li:hover{
  background: #f2f2f2;
}
.singercollectcontainer .content ul li .img{
  margin:0 20px;
  width:60px;
  height:60px;
}
.singercollectcontainer .content ul li .img img{
  width:100%;
  height:100%;
  border-radius: 5px;
}
.singercollectcontainer .content ul li .name{
  height:100%;
  width:45%;
  line-height:80px;
  font-weight: 100;
}
.singercollectcontainer .content ul li .singer{
  width:20%;
  height:100%;
  line-height:80px;
  text-align: center;
  color:#888;
  font-size: 13px;
}
.singercollectcontainer .content ul li .song{
  flex:1;
  height:100%;
  text-align: center;
  line-height:80px;
  color:#888;
  font-size: 13px;
}
</style>