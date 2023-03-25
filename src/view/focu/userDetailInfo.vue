<template>
  <div class="container">
    <div class="userInfo">
      <div class="infoContent">
        <div class="info">
          <div class="username">
            <img :src="user.avatarUrl" alt="" />
            <div class="font">
              <div class="name">{{ user.nickname }}</div>
            </div>
            <div class="sex">
              <span
                class="iconfont icon-xingbienan"
                v-if="user.gender == 1"
              ></span>
              <span class="iconfont icon-xingbienv" v-else></span>
            </div>
          </div>
          <div class="num">
            <div class="one">
              <div class="count">{{ userDetailInfo.eventCount }}</div>
              <div class="title">动态</div>
            </div>
            <div class="one" @click="toFollowList">
              <div class="count">{{ userDetailInfo.follows }}</div>
              <div class="title">关注</div>
            </div>
            <div class="one">
              <div class="count" @click="toFanList">{{ userDetailInfo.followeds }}</div>
              <div class="title">粉丝</div>
            </div>
          </div>
        </div>
        <div class="topic">
          <div class="topicTitle">
            <div class="left">热门话题</div>
            <div class="right">
              更多<span class="iconfont icon-qianjin"></span>
            </div>
          </div>
          <ul>
            <li v-for="item in hotTopic" :key="item.actId">
              <div class="img">
                <img :src="item.sharePicUrl" alt="" />
              </div>
              <div class="topicInfo">
                <div class="topicName">#{{ item.title }}#</div>
                <div class="name">{{ item.participateCount }}人参与</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="know">
          <div class="knowTitle">
            <div class="knowleft">认识的人</div>
            <div class="knowright">
              更多<span class="iconfont icon-qianjin"></span>
            </div>
          </div>
          <div class="bind"><span>绑定微博</span>，寻找更多好友</div>
        </div>
        <div class="add">
          <div class="addTitle">添加关注</div>
          <ul>
            <li><span class="iconfont icon-v" style="color:red;"></span>明星</li>
            <li><span class="iconfont icon-wujiaoxing" style="color:#ffbd20;"></span>音乐达人</li>
            <li><span class="iconfont icon-yinleyule" style="color:#f54e6a;"></span>DJ</li>
            <li><span class="iconfont icon-yinlexiangqing" style="color:#ed4036;"></span>网易音乐人</li>
          </ul>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
export default {
   props:['user','userDetailInfo','hotTopic'],
   methods:{
    //跳转到用户的关注列表
    toFollowList(){
      this.$router.push('/followlist')
    },
    //跳转到用户的粉丝列表
    toFanList(){
      this.$router.push('/fanlist')
    }
   },
}
</script>

<style scoped>
.container{
   width:100%;
}
.container .userInfo {
  width: 100%;
}
.container .userInfo .infoContent {
  border-left: 1px solid #dcdcde;
  width: 100%;
}
.container .userInfo .info {
  height: 170px;
  width: 100%;
  background: #f5f5f7;
}
.container .userInfo .info .username {
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;
}
.container .userInfo .info .username img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 0 10px;
}
.container .userInfo .info .username .font {
  font-size: 12px;
}
.container .userInfo .info .username .icon-xingbienan {
  background: #f5f5f7;
  color: skyblue;
  font-size: 20px;
}
.container .userInfo .info .username .icon-xingbienv {
  background: #f5f5f7;
  color: red;
  font-size: 20px;
}
.container .userInfo .info .num {
  width: 100%;
  height: 80px;
  align-items: center;
  display: flex;
}
.container .userInfo .info .num .one:nth-child(3) {
  border-right: none;
}
.container .userInfo .info .num .one {
  flex: 1;
  height: 60%;
  border-right: 1px solid #dcdcde;
}
.container .userInfo .info .num .one .count {
  height: 60%;
  width: 100%;
  font-size: 20px;
  text-align: center;
}
.container .userInfo .info .num .one .title {
  height: 40%;
  width: 100%;
  font-size: 13px;
  text-align: center;
}
.container .userInfo .topic {
  width: 100%;
}
.container .userInfo .topic .topicTitle {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.container .userInfo .topic .topicTitle .left,
.right {
  height: 100%;
  width: 60px;
  font-size: 13px;
  font-weight: bold;
  line-height: 40px;
  text-align: center;
}
.container .userInfo .topic .topicTitle .right {
  font-size: 12px;
  color: #888;
}
.container .userInfo .topic .topicTitle .right span {
  font-size: 12px;
}
.container .userInfo .topic ul {
  width: 100%;
  list-style: none;
}
.container .userInfo .topic ul li {
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
}
.container .userInfo .topic ul li:hover {
  background: #dcdcde;
}
.container .userInfo .topic ul li .img {
  width: 30px;
  height: 30px;
  margin: 0 10px;
}
.container .userInfo .topic ul li .img img {
  width: 100%;
  height: 100%;
  border-radius: 3px;
}
.container .userInfo .topic ul li .topicInfo {
  height: 30px;
  width: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.container .userInfo .topic ul li .topicInfo .topicName {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 10px;
}
.container .userInfo .topic ul li .topicInfo .name {
  font-size: 10px;
  color: #888;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.container .userInfo .know {
  height: 140px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container .userInfo .know .knowTitle {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.container .userInfo .know .knowTitle .knowleft,
.knowright {
  height: 40px;
  width: 60px;
  line-height: 40px;
  text-align: center;
  font-size: 13px;
  font-weight: bold;
}
.container .userInfo .know .knowTitle .knowright {
  font-size: 12px;
  color: #888;
}
.container .userInfo .know .knowTitle .knowright span {
  font-size: 12px;
}
.container .userInfo .know .bind{
  width:80%;
  margin:10px auto 0;
  background:#f5f5f5;
  font-size: 12px;
  height:30px;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
  font-weight: 100;
  color:#626262;
}
.container .userInfo .know .bind span{
  color:#507daf;
}
.container .userInfo .add{
  width:100%;
}
.container .userInfo .add .addTitle{
  width:60px;
  height:40px;
  line-height: 40px;
  text-align: center;
  font-size: 13px;
  font-weight: bold;
}
.container .userInfo .add ul{
  width:100%;
}
.container .userInfo .add ul li{
  height:40px;
  width:100%;
  font-size: 13px;
  line-height:40px;
}
.container .userInfo .add ul li:hover{
  background:#dcdcde;
}
.container .userInfo .add ul li span{
  margin:0 10px;
  font-size: 25px;
}
</style>