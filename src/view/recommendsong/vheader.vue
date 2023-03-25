<template>
  <div class="container">
    <div class="top">
      <div class="img">
        <img :src="playlistInfo.coverImgUrl" alt="" />
      </div>
      <div class="font">
        <div class="iconfont icon-zheshiyigegedan c"><span>{{playlistInfo.name}}</span></div>
        <div class="create" v-if="playlistInfo.creator"><img :src="playlistInfo.creator.avatarUrl" alt="">
         <span> {{playlistInfo.creator.nickname}}</span> 于{{createTime}}创建</div>
        <div class="icons">
          <div class="playall">
            <div class="iconfont icon-sanjiaoxing"></div>
            <div class="play">播放全部</div>
            <div class="iconfont icon-jia"></div>
          </div>
          <div class="iconfont icon-shoucang a"><span>收藏({{subscribedCount}})</span></div>
          <div class="iconfont icon-fenxiang a"><span>分享({{shareCount}})</span></div>
          <div class="iconfont icon-ziyuan a"><span>下载全部</span></div>
        </div>
        <div class="tag">标签：<span v-for="tag in playlistInfo.tags" :key="tag">{{tag}}</span></div>
        <div class="song">歌曲：{{playlistInfo.trackCount}} 播放：{{playCount}}次</div>
        <div class="desc">{{playlistInfo.description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {timechange} from '@/somefunction/timeconversion'
import {mycount} from '@/somefunction/mycount'
export default {
  computed:{
    ...mapState({
      playlistInfo:state=>state.song.playlistInfo,
    }),
    //计算时间
    createTime(){
      return timechange(this.playlistInfo.createTime)
    },
    //计算播放次数
    playCount(){
      return mycount(this.playlistInfo.playCount)
    },
    //计算分享次数
    shareCount(){
      return mycount(this.playlistInfo.shareCount)
    },
    //计算收藏次数
    subscribedCount(){
      return mycount(this.playlistInfo.subscribedCount)
    }
  },
};
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
}
.container .top .font {
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.container .top .font .create{
  height:24px;
  display: flex;
  align-items: center;
  font-size: 13px;
}
.container .top .font .create img{
  height:24px;
  width:24px;
  border-radius: 50%;
}
.container .top .font .create span{
  color:#507daf;
  margin-right:5px;
}
.container .top .font .c {
  color: red;
  margin-bottom:10px;
}
.container .top .font .icon-zheshiyigegedan{
  font-size:30px;
}
.container .top .font .c span {
  color: #000;
  font-size: 20px;
  margin-left:5px;
}
.container .top .font .icons {
  display: flex;
  margin: 5px 0;
  font-size: 15px;
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
  color: #fff;
}
.container .top .font .icons .playall .play {
  padding: 0 5px;
   font-size: 13px;
}
.container .top .font .icons .a {
  border: 1px solid #888888;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 0 5px;
    font-size: 13px;
}
.container .top .font .icons .a span {
  margin: 0 5px;
}
.container .top .font .icons .icon-shoucang {
  color: #888888;
}
.container .top .font .tag{
  font-size:13px;
}
.container .top .font .tag span{
   margin-right:5px;
   color:#507daf;
}
.container .top .font .song{
  font-size:13px;
}
.container .top .font .desc{
  width:300px;
  height:20px;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>