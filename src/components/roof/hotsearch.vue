<template>
  <div class="hotcontainer">
    <div class="title">热搜榜</div>
    <ul>
      <li v-for="(item, index) in hotList" :key="item.score">
        <div class="index" :class="{ hot: index <= 2 }">{{ index + 1 }}</div>
        <div class="font">
          <div class="top" :class="{ bold: index <= 2 }">
            {{ item.searchWord }}<span>{{ item.score }}</span
            ><img :src="item.iconUrl" v-if="item.iconUrl"/>
          </div>
          <div class="bottom">{{ item.content }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      hotList:state=>state.search.hotList
    }),
  },
  data() {
    return {
     
    };
  },
};
</script>

<style scoped>
.hotcontainer {
  height: 550px;
  width: 400px;
  /* border:1px solid red; */
  position: absolute;
  left: -40px;
  top: 70px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.5);
  overflow-y: scroll;
}
.hotcontainer .title {
  height: 40px;
  width: 100px;
  font-size: 15px;
  line-height: 40px;
  margin-left: 20px;
  color: #666666;
}
.hotcontainer ul {
  width: 100%;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
.hotcontainer ul li {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
}
.hotcontainer ul li:hover {
  background: #f2f2f2;
}
.hotcontainer ul li .index {
  height: 50px;
  width: 30px;
  line-height: 50px;
  text-align: center;
  color: #999999;
  margin: 0 10px;
}
.hotcontainer ul li .hot {
  color: #ff5959;
}
.hotcontainer ul li .font {
  height: 50px;
  width: 400px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  justify-content: space-around;
}
.hotcontainer ul li .bottom {
  color: #999999;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width:320px;
}
/* .hotcontainer ul li .top{
  color:#858585;
} */
.hotcontainer ul li .bold {
  font-weight: bold;
  display: flex;
  align-items: center;
}
.hotcontainer ul li .top span {
  color: #999999;
  margin: 0 5px;
  font-weight: normal;
}

.hotcontainer ul li .top img {
  height: 16px;
  width: 25px;
}
</style>