<template>
  <div class="container">
    <slot name="newmv"></slot>
    <mvvedio :mvinfo="newmv"/>
    <slot name="hotmv"></slot>
    <mvvedio :mvinfo="wangyimv"/>
    <slot name="toplistmv"></slot>
    <toplist :mvinfo="toplistmv"/>
  </div>
</template>

<script>
import mvvedio from './mvvedio'
import toplist from './toplist'
export default {
    data(){
        return {
            newmv:[],
            wangyimv:[],
            toplistmv:[]
        }
    },
  components:{
    mvvedio,
    toplist
  },
  mounted(){
    //获得最新mv
    this.getnewmv()
    //获得网易出品mv
    this.getwangyimv()
    //获取mv排行榜
    this.gettoplistmv()
  },
  methods:{
     //获得最新mv
    async getnewmv(){
       let result=await this.$API.newmv()
       this.newmv=result.data.data
    },
    //获得网易出品mv
    async getwangyimv(){
      let result=await this.$API.wangyimv()
      this.wangyimv=result.data.data
    },
    async gettoplistmv(){
      let result = await this.$API.toplistmv()
      this.toplistmv=result.data.data
    }
  }
}
</script>

<style scoped>
.container{
  width:100%;
}
.container .title{
  height:30px;
  width:100%;
  display:flex;
  justify-content: space-between;
}
.container .title .left{
   font-size: 15px;
   font-weight: bold;
}
.container .title .left span{
  margin-left:5px;
}
.container .title .right{
    height:100%;
    float: right;
}
.container .title .right ul{
   width:100%;
   list-style: none;
   display:flex;
}
.container .title .right ul li{
  margin:0 10px;
  font-size: 13px;
  color:#888;
  height:20px;
  width:40px;
  border-radius: 10px;
  text-align: center;
  line-height: 20px;
}
.container .title .right ul li:hover{
  color:#000;
}
.container .title .right ul li.active{
  background:#fdecec;
  color:red;
}
</style>