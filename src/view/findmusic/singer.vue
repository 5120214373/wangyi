<template>
  <div class="outter" ref="outter" @scroll="pageScroll">
      <div class="container" ref="container">
        <div class="top">
            <singerheader :title="title[0]" :sort="language"/>
            <singerheader :title="title[1]" :sort="sort"/>
            <singerheader :title="title[2]" :sort="select"/>
        </div>
        <div class="content">
            <div class="info" v-for="singer in singers" :key="singer.id">
                <div class="img" @click="toSingerDetail(singer)">
                    <img :src="singer.img1v1Url" alt="">
                </div>
                <div class="font">{{singer.name}}</div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import {myDebounce} from '@/somefunction/mydebounce'
import singerheader from './singerheader'
export default {
  data() {
    return {
      offset: 0,
      title:['语种:','分类:','筛选:'],
      language: ["全部", "华语", "欧美", "日本", "韩国", "其他"],
      sort:[ '全部','男歌手','女歌手','乐队组合'],
      select:[],
      singers:[]
    };
  },
  mounted() {
    //获取热门歌手
    this.getHotSinger();
    //添加筛选数据
    this.selectData();
    //将active设置为当前页面 findmusic
    this.$store.dispatch("findmusic/changeactive",5)
  },
  methods: {
    //获取热门歌手
    async getHotSinger(index) {
      let result = await this.$API.hotSinger(this.offset);
      //偏移量加30
      this.offset+=30
    this.singers=this.singers.concat(result.data.artists);
    },
     //添加筛选数据
     selectData(){
        for(let i =0 ;i<26;i++){
            this.select.push(String.fromCharCode(i+97))
        }
     },
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
        this.getHotSinger()
    },1000),
    //跳转到歌手详情页面
    async toSingerDetail(singer){
        //保存点击歌手的信息
        this.$store.dispatch('singer/currentsinger',singer)
        //获取歌手的详细信息
        let data=await this.$API.singerInfo(singer.id)
        //保存歌手的详细信息
        this.$store.dispatch("singer/singerinfo",data.data.data.artist.briefDesc)
        //获取相似歌手
        let info=await this.$API.singersimi(singer.id)
        //保存相似歌手
        this.$store.dispatch("singer/singersimi",info.data.artists)
        //页面跳转
        this.$router.push('/singerdetail')
    }
  },
  components:{
    singerheader
  }
};
</script>

<style scoped>
.outter{
  width: 100%;
  height:100%;
   overflow-y: scroll;
}
.container {
    width:80%;
    margin:0 auto;
}
.container .top{
    width:100%;
}
.content{
    width:100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.content .info{
    width:15%;
    height:180px;
}
.content .info .img{
     width:100%;
     height:150px;
}
.content .info img{
    height:100%;
    width:100%;
    border-radius: 5px;
}
.content .info .font{
    height:30px;
    line-height:30px;
    margin-left:5px;
}
</style>