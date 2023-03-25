<template>
  <div class="container">
    <div class="title">{{ user.nickname }}的{{title}}</div>
    <ul>
      <li v-for="item in list" :key="item.userId">
        <div class="img">
          <img :src="item.avatarUrl" alt="" />
        </div>
        <div class="font">
          <div class="name">{{ item.nickname }}</div>
          <div class="word">{{ item.signature }}</div>
          <div class="playlistandfan">
            <div class="playlist">歌单：{{ item.playlistCount }}</div>
            <div class="fan">粉丝：{{ item.followeds }}</div>
          </div>
        </div>
        <div class="send"><span class="iconfont icon-sixin"></span>私信</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:['user','list','title']
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.container .title {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
}
.container ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}
.container ul li {
  width: 33%;
  height: 100px;
  display: flex;
  align-items: center;
}
.container ul li:hover{
    background:#fafafa;
}
.container ul li .img {
  width: 100px;
  height: 100px;
}
.container ul li .img img {
  margin: 10px;
  width: 80%;
  height: 80%;
  border-radius: 50%;
}
.container ul li .font {
  width: 240px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.container ul li .font .name {
  font-size: 15px;
  font-weight: 100;
  margin: 10px 0;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.container ul li .font .word {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 13px;
  white-space: nowrap;
  color: #888;
}
.container ul li .font .playlistandfan {
  display: flex;
  width: 100%;
   font-size:13px;
}
.container ul li .font .playlistandfan .playlist{
   padding-right:15px;
   border-right:1px solid #888;
}
.container ul li .font .playlistandfan .fan{
    margin-left:15px;
}
.container ul li .send{
    height:20px;
    width:60px;
    border:1px solid #888;
    border-radius: 20px;
    font-size: 12px;
    text-align: center;
    line-height:20px;
}
.container ul li .send span{
    font-size: 13px;
}
.container ul li .send:hover{
    background:#ededed;
}
</style>