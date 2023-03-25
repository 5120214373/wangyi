<template>
  <div class="outter">
    <div class="title">
        <div class="top">
            <div class="toptitle">最近播放<span>共{{count}}首</span></div>
            <div class="clear">清除列表</div>
        </div>
        <div class="bottom">
            <div class="playall"><span class="iconfont icon-sanjiaoxing1"></span>播放全部<span class="iconfont icon-jia"></span></div>
        </div>
    </div>
    <div class="songlist">
        <songlist/>
    </div>
  </div>
</template>

<script>
import songlist from '@/view/recommendsong/songlist'
export default {
    data(){
        return {
            loveIds:[],
            count:0
        }
    },
    components:{
        songlist
    },
  methods: {
    async getRecentPlay() {
      let result = await this.$API.recentPlay();
      let arr=[]
      result.data.data.list.forEach(item=>{
        this.$set(item.data,'islike',false)
        arr.push(item.data)
      })
      this.count=arr.length
      this.$store.dispatch("song/playlist",arr)
    },
  },
  mounted() {
    //获得最近播放的数据
    this.getRecentPlay();
    //记录点击sidebar的位置 sidebar
    this.$store.dispatch("sidebar/getcurrent", 9);
  },
};
</script>

<style scoped>
.outter{
    width:100%;
    height:100%;
    overflow-y: scroll;
}
.outter .title{
    height:120px;
    width:90%;
    margin:0 auto;
}
.outter .title .top{
    height:60px;
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items:center
}
.outter .title .top .toptitle{
    width:150px;
    height:100%;
    line-height:60px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
}
.outter .title .top .toptitle span{
    font-size: 13px;
    font-weight:100;
    color:#888;
    margin-left:10px;
}
.outter .title .top .clear{
    color:#507daf;
}
.outter .title .bottom{
    height:60px;
    width:100%;
}
.outter .title .bottom .playall{
    width:120px;
    height:30px;
    border-radius: 20px;
    border:1px solid red;
    text-align: center;
    line-height:30px;
    color:#fff;
    background:red;
}
.outter .title .bottom .playall span{
    margin:0 5px;
}
.outter .songlist{
    width:100%;
}
</style>