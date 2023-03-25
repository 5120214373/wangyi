<template>
  <div class="mytitlecontainer">
    <div class="title">
        <ul>
            <li :class="{active:active==1}" @click="changeactive(1)"><router-link :to='`${path}/songlist`'>歌曲列表</router-link></li>
            <li :class="{active:active==2}" @click="changeactive(2)"><router-link :to='`${path}/comment`'>评论({{playlistCommentInfo.total?playlistCommentInfo.total:0}})</router-link></li>
            <li :class="{active:active==3}" @click="changeactive(3)"><router-link :to='`${path}/collect`'>收藏者</router-link></li>
        </ul>
        <div class="search" v-if="active==1">
             <input type="text" placeholder="搜索歌单歌曲">
             <span class="iconfont icon-sousuo"></span>
        </div>
    </div>
    <div :class="{box:$route.path.indexOf('comment')!=-1}">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import songlist from "./songlist";
import comment from './comment'
import collect from './collect'
import {mapState,mapGetters} from 'vuex'
export default {
   data(){
    return {
        active:1,
        path:''
    }
   },
   components:{
    songlist,
    comment,
    collect
   },
    methods:{
    //修改active
    changeactive(index){
        this.active=index
    }
  },
  computed:{
     ...mapState({
        playlistCommentInfo:state=>state.playlist.playlistCommentInfo
     })
  },
  mounted(){
    //判断是心动歌单还是其他歌单
    if(this.$route.path.indexOf('mylove')!==-1){
        this.path='/mylove' 
    }else if(this.$route.path.indexOf('album')!==-1){
        this.path='/album'
    }else{
        this.path='/song'
    }
  },
  //页面销毁前，清除数据
  beforeDestroy() {
    this.$store.dispatch('playlist/playlistcomment',{})
  },
}
</script>

<style scoped>
.mytitlecontainer{
    width:100%;
}
.mytitlecontainer .title{
    height:30px;
    width:100%;
    display: flex;
    justify-content: space-between;
    margin:15px 0;
}
.mytitlecontainer .title ul{
    list-style: none;
    display:flex;
    width:300px;
    height:100%;
    align-items: center;
    padding-left:20px;
    box-sizing: border-box;
}
.mytitlecontainer .title ul li{
    height:100%;
    font-size:13px;
    margin:0 10px;
    text-align: center;
    line-height:30px;
}
.mytitlecontainer .title ul li a{
    color:#000;
}
.mytitlecontainer .title ul li.active{
    font-size:15px;
    font-weight: bold;
    border-bottom:3px solid red;
}
.mytitlecontainer .title .search{
    height:100%;
    width:200px;
    background:#f7f7f7;
    border-radius: 20px;
    margin-right:100px;
    display: flex;
    align-items: center;

}
.mytitlecontainer .title .search input{
    outline: none;
    border:none; 
    background:#f7f7f7;
    margin-left:15px;
    /* color:#c6c6c6; */
    line-height:30px;
    width:160px;
}
.mytitlecontainer .box{
    width:90%;
    margin:0 auto;
}
</style>