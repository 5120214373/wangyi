<template>
  <div class="albumcollectcontainer">
    <search v-slot:album>
      <template>
        <div class="left">收藏的专辑<span v-if="albumCollect.length">({{albumCollect.length}})</span></div>
        <div class="search">
          <input type="text" placeholder="搜索收藏专辑" />
          <span class="iconfont icon-sousuo"></span>
        </div>
      </template>
    </search>
    <div class="content">
      <ul>
        <li v-for="item in albumCollect" :key="item.id" @click="toAlbum(item)">
          <div class="img">
            <img :src="item.picUrl" alt="">
          </div>
          <div class="name">{{item.name}}</div>
          <div class="singer">{{item.artists[0].name}}</div>
          <div class="song">{{item.size}}首</div>
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
  methods:{
    //点击跳转到专辑页面
   async toAlbum(album){
       let result = await this.$API.albumContent(album.id)
        //保存album信息
        this.$store.dispatch('album/albuminfo',result.data.album)
        //保存album歌曲
        this.$store.dispatch('album/albumsongs',result.data.songs)
        this.$store.dispatch("song/playlist",result.data.songs)
        //跳转到歌曲页面
        this.$router.push('/album')
    }
  },
  computed:{
    ...mapState({
       albumCollect:state=>state.mycollect.albumCollect
    })
  },
  mounted(){
    //将active设置为当前页面 mycollect
    this.$store.dispatch("mycollect/changeactive",1)
  }
};
</script>

<style scoped>
.albumcollectcontainer {
  width: 100%;
}
.albumcollectcontainer .content{
  width:100%;
}
.albumcollectcontainer .content ul{
  list-style: none;
  width:100%;
}
.albumcollectcontainer .content ul li{
  width:100%;
  height:80px;
  display:flex;
  margin-top:15px;
  align-items: center;
}
.albumcollectcontainer .content ul li:first-child{
  background:#f7f7f7;
}
.albumcollectcontainer .content ul li:hover{
  background:#f2f2f2;
}
.albumcollectcontainer .content ul li .img{
  margin:0 20px;
  width:60px;
  height:60px;
}
.albumcollectcontainer .content ul li .img img{
  width:100%;
  height:100%;
  border-radius: 5px;
}
.albumcollectcontainer .content ul li .name{
  height:100%;
  width:45%;
  line-height:80px;
  font-weight: 100;
}
.albumcollectcontainer .content ul li .singer{
  width:20%;
  height:100%;
  line-height:80px;
  text-align: center;
  color:#888;
  font-size: 13px;
}
.albumcollectcontainer .content ul li .song{
  flex:1;
  height:100%;
  text-align: center;
  line-height:80px;
  color:#888;
  font-size: 13px;
}
</style>