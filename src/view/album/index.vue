<template>
  <div class="albumcontainer" ref="albumcontainer">
    <div class="title">
        <div class="img">
            <img :src="albumInfo.picUrl" alt="">
        </div>
        <div class="font">
            <div class="albumtitle">{{albumInfo.name}}</div>
            <div class="operation">
                <div  class="active"><span class="iconfont icon-sanjiaoxing1"></span>全部播放<span class="iconfont icon-jia"></span></div>
                <div><span class="iconfont icon-shoucang"></span>收藏(0)</div>
                <div><span class="iconfont icon-ziyuan"></span>下载</div>
                <div><span class="iconfont icon-fenxiang"></span>分享({{albumInfo.info.shareCount}})</div>
            </div>
            <div class="singer">歌手：<span>{{albumInfo.artist.name||albumInfo.artist[0].name}}</span></div>
            <div class="publishtime">时间：{{publishTime}}</div>
        </div>
    </div>
    <div class="mytitle">
        <mytitle/>
    </div>
  </div>
</template>

<script>
import mytitle from '@/view/recommendsong/mytitle'
import {timechange,timeconversion} from "@/somefunction/timeconversion"
import {mapState,mapGetters} from 'vuex'
export default {
    components:{
        mytitle
    },
  computed:{
    ...mapState({
        albumInfo:state=>state.album.albumInfo,
        albumSongs:state=>state.album.albumSongs,
        page:state=>state.playlist.page
    }),
    ...mapGetters("playlist",['playlistComment']),
    //计算发表时间
    publishTime(){
        return timechange(this.albumInfo.publishTime)
    },
  },
  mounted(){
    //获取album评论信息
    this.getAlbumComment()
  },
  methods:{
     //获取album评论信息
    async getAlbumComment(){
       let res= await this.$API.albumComment(this.albumInfo.id,(this.page-1)*20)
        this.$store.dispatch("playlist/playlistcomment", res.data);
        //保存资源类型为专辑
        this.$store.dispatch('playlist/savetype',3)
    }
  },
  watch:{
    //分页器切换，发送新数据的请求，并将页面上拉到评论区顶部
    page(){
        this.getAlbumComment()
        let albumcontainer=this.$refs['albumcontainer']
        albumcontainer.scrollTop=360
    },
    playlistComment:{
        deep:true,
         handler: function () {
        if (this.playlistComment != []) {
          this.playlistComment.map((item) => {
            this.$set(item, "publishtime", timeconversion(item.time));
          });
        }
      },
    }
  }
}
</script>

<style scoped>
.albumcontainer{
    width:100%;
    height:100%;
    overflow-y: scroll;
}
.albumcontainer .title{
    width:95%;
    margin:0 auto;
    height:180px;
    display:flex;
    align-items: center;
}
.albumcontainer .title .img{
    width:180px;
    height:100%;
}
.albumcontainer .title .img img{
    width:160px;
    height:160px;
    margin:10px;
    border-radius: 5px;
}
.albumcontainer .title .font{
    height:160px;
    margin:10px 0 10px 20px;
}
.albumcontainer .title .font .albumtitle{
    font-size:20px;
    font-weight: bold;
    margin-bottom: 20px;
}
.albumcontainer .title .font .operation{
    display:flex;
}
.albumcontainer .title .font .operation div{
    border:1px solid #dddddd;
    padding:5px 10px;
    margin-right:15px;
    border-radius: 20px;
}
.albumcontainer .title .font .operation div:hover{
    background:#f2f2f2;
}
.albumcontainer .title .font .operation div.active{
    background:red;
    color:#fff;
}
.albumcontainer .title .font .singer{
    font-size:13px;
    margin:10px 0 5px;
}
.albumcontainer .title .font .singer span{
    color:#507daf;
}
.albumcontainer .title .font .publishtime{
    font-size:13px;
}
.albumcontainer .mytitle{
    width:1290px;
}
</style>