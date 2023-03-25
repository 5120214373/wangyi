<template>
  <div class="container">
    <div class="top">
      <div class="img">
        <img :src="currentSinger.picUrl" alt="" />
      </div>
      <div class="font">
        <div class="c"><span>{{currentSinger.name}}</span></div>
        <div class="name"><div v-for="name in currentSinger.alias" :key="name">{{name}};</div></div>
        <div class="icons">
          <div class="iconfont icon-shoucang a" v-if="!isCollect" @click="collectOrNot"><span>收藏</span></div>
          <div class="iconfont icon-yishoucang a" v-else @click="collectOrNot"><span>已收藏</span></div>
        </div>
        <div class="song">
            <div>单曲数：{{currentSinger.musicSize?currentSinger.musicSize:0}} </div>
            <div>专辑数：{{currentSinger.albumSize?currentSinger.albumSize:0}} </div>
            <div>MV数：0</div>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return {
        isCollect:false
    }
  },
    computed:{
        ...mapState({
            currentSinger:state=>state.singer.currentSinger,
            singerCollect:state=>state.mycollect.singerCollect
        })
    },
    mounted(){
      //判断是否收藏了该歌手
      this.singerCollect.forEach(item=>{
        if(item.id==this.currentSinger.id)
        {
          this.isCollect=true
        }
      })
    },
    methods:{
      //收藏或者取消收藏
      async collectOrNot(){
        //取消收藏
        if(this.isCollect){
          let result =await this.$API.addOrDelSingerCollect(this.currentSinger.id,0)
          console.log(result)
        }else{
          //收藏
          let result = await this.$API.addOrDelSingerCollect(this.currentSinger.id,1)
          console.log(result)
        }
        this.isCollect=!this.isCollect
      }
    }
}
</script>

<style scoped>
.container {
  width: 100%;
}
.container .top {
  height: 200px;
  width: 100%;
  /* border:1px solid red; */
  display: flex;
  align-items: center;
}
.container .top .img {
  height: 100%;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border:1px solid red; */
}
.container .top .img img {
  height: 160px;
  width: 160px;
  border-radius: 5px;
}
.container .top .font {
  height: 160px;
  width: 500px;
  display: flex;
  flex-direction: column;
}
.container .top .font .c {
  color: red;
  font-size: 20px;
  margin: 10px 0;
  font-weight: bold;
}
.container .top .font .name{
  height:20px;
  width:100%;
  display: flex;
  font-size: 15px;
  color:#888;
}
.container .top .font .c span {
  color: #000;
}
.container .top .font .icons {
  display: flex;
  margin: 10px 0;
}
.container .top .font .icons .playall {
  /* width:100px; */
  display: flex;
  background: red;
  /* border:1px solid red; */
  border-radius: 20px;
  align-items: center;
  color: #fff;
  margin: 0 5px;
  /* margin-right:20px; */
}
.container .top .font .icons .playall .iconfont {
  padding: 5px;
  font-size: 15px;
  color: #fff;
}
.container .top .font .icons .playall .play {
  padding: 0 5px;
}
.container .top .font .icons .a {
  border: 1px solid #888888;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 0 5px;
  font-size:13px;
}
.container .top .font .icons .a span {
  margin: 0 5px;
}
.container .top .font .song{
    height:20px;
    font-size: 13px;
    display: flex;
}
.container .top .font .song div{
    margin-right:10px;
}
</style>