<template>
  <div class="outter" @scroll="pageScroll" ref="outter">
    <div class="container" ref="container">
      <div class="top">
        <div class="allvedio">
          全部视频<span class="iconfont icon-qianjin"></span>
        </div>
        <ul>
          <li v-for="vediotag in vediotaglist" :key="vediotag.id">
            {{ vediotag.name }}
          </li>
        </ul>
      </div>
      <vediolist :vediolist="recommendvedio"/>
    </div>
  </div>
</template>

<script>
import vediolist from './vediolist'
import {myDebounce} from '@/somefunction/mydebounce'
export default {
  components:{
    vediolist
  },
    data(){
        return {
            recommendvedio:[],
            vediotaglist:[],
            offset:0
        }
    },
  beforeDestroy() {
    //退出视频页面时将数据清除
    this.recommendvedio=[]
    this.vediotaglist=[]
  },
  methods: {
    //下拉加载更多
    pageScroll() {
        //获取父元素
      let outter=this.$refs['outter']
      //求子元素的高度
      let containerheight=this.$refs['container'].offsetHeight
      //如果卷去的高度+父元素的高度>=子元素的高度
      //即滑到距离底部时
      if(outter.scrollTop+outter.offsetHeight>=containerheight-100){
        //下滑时会触发多次，设置一个防抖
        this.openmyDebounce()
      }
    },
    //将数据复制一遍
    openmyDebounce:myDebounce(function(){
        this.getrecommendvedio(this.offset++)
    },1000),
    //获取vediotag列表
    async getvediotaglist() {
      let result = await this.$API.vediotaglist();
      //保存vedio标签列表
      this.vediotaglist=result.data.data
    },
    //获取推荐视频
    async getrecommendvedio(index) {
      let result = await this.$API.recommendvedio(index);
      //保存推荐的视频
      this.recommendvedio=this.recommendvedio.concat(result.data.datas)
    },
  },
  mounted() {
    //获取vediotag列表
    this.getvediotaglist();
    //获取推荐视频，因为一次请求数据只有8条，数据不够，就再发一次,把数据叠加起来
    //避免相同的视频，每一次偏移量都要加1
    this.getrecommendvedio(this.offset++);
    this.getrecommendvedio(this.offset++);
    //让active在当前页面
    this.$store.dispatch('vedio/active',1)
  },
};
</script>

<style scoped>
.outter {
  height:100%;
  width: 100%;
  overflow-y: scroll;
}
.outter .container {
  width: 80%;
  margin: 0 auto;
}
.outter .container .top {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.outter .container .top .allvedio {
  border: 1px solid #d9d9d9;
  width: 100px;
  height: 30px;
  border-radius: 20px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
}
.outter .container .top .allvedio:hover {
  background: #f2f2f2;
}
.outter .container .top ul {
  height: 100%;
  display: flex;
}
.outter .container .top ul li {
  font-size: 12px;
  margin: 0 10px;
  line-height: 30px;
}
</style>