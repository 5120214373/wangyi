<template>
   <div class="toplistcontainer">
       <div class="content">
        <div class="official">
            <div class="officialtitle">官方榜</div>
            <div class="list" v-for="list in officalListInfo" :key="list.id">
                <list :listInfo="list"/>
            </div>
        </div>
        <div class="world">
            <div class="worldtitle">全球榜</div>
            <div class="worldbox">
                <imgspan :recommendlist="worldListInfo"/>
            </div>
        </div>
       </div>
   </div>
</template>

<script>
import list from './list'
export default {
    data(){
       return {
           topListInfo:[],
           officalListInfo:[],
           worldListInfo:[]
       }
    },
  components:{
    list
  },
  methods:{
     //获取排行榜数据
     async getTopList(){
        let res = await this.$API.topList()
        this.topListInfo=res.data.list
        this.officalListInfo=res.data.list.slice(0,4)
        this.worldListInfo=res.data.list.slice(4)
     }
  },
  mounted(){
    //获取排行榜数据
    this.getTopList()
    //将active设置为当前页面 findmusic
    this.$store.dispatch("findmusic/changeactive", 4);
  }
}
</script>

<style scoped>
.toplistcontainer{
    width:100%;
    height:100%;
    overflow-y: scroll;
}
.toplistcontainer .content{
    width:80%;
    margin:0 auto;
}
.toplistcontainer .content .official{
    width:100%;
}
.toplistcontainer .content .official .officialtitle{
    height:50px;
    line-height:50px;
    font-size: 15px;
    font-weight: bold;
}
.toplistcontainer .content .official  .list{
    width:100%;
    height:150px;
    margin-bottom:30px;
}
.toplistcontainer .content .world{
    width:100%;
} 
.toplistcontainer .content .worldtitle{
    height:50px;
    width:100%;
    line-height:50px;
    font-size:15px;
    font-weight: bold;
}
.toplistcontainer .content .world .worldbox{
    width:100%;
}
</style>