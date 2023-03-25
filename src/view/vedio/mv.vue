<template>
  <div class="mvcontainer">
     <div class="box">
       <mvkind>
        <template v-slot:newmv>
           <div class="title">
            <div class="left">最新MV<span class="iconfont icon-qianjin"></span></div>
              <div class="right">
                <ul>
                    <li :class="{active:active==1}"  @click="changeactive(1)">内地</li>
                    <li :class="{active:active==2}"  @click="changeactive(2)">港台</li>
                    <li :class="{active:active==3}"  @click="changeactive(3)">欧美</li>
                    <li :class="{active:active==4}"  @click="changeactive(4)">韩国</li>
                    <li :class="{active:active==5}"  @click="changeactive(5)">日本</li>
                </ul>
              </div>
       </div>
        </template>
        <template v-slot:hotmv>
           <div class="title">
            <div class="left">网易出品<span class="iconfont icon-qianjin"></span></div>
           </div>
        </template>
        <template v-slot:toplistmv>
           <div class="title">
            <div class="left">MV排行榜<span class="iconfont icon-qianjin"></span></div>
            <div class="right">
                <ul>
                    <li :class="{active:active==1}"  @click="changeactive(1)">内地</li>
                    <li :class="{active:active==2}"  @click="changeactive(2)">港台</li>
                    <li :class="{active:active==3}"  @click="changeactive(3)">欧美</li>
                    <li :class="{active:active==4}"  @click="changeactive(4)">韩国</li>
                    <li :class="{active:active==5}"  @click="changeactive(5)">日本</li>
                </ul>
              </div>
           </div>
        </template>
       </mvkind>
     </div>
  </div>
</template>

<script>
import mvkind from './mvkind'
export default {
   data(){
    return {
      active:1
    }
   },
   components:{
       mvkind
   },
   methods:{
    //点击添加样式
    changeactive(index){
      this.active=index
    }
   },
   mounted() {
    //让active在当前页面 active
    this.$store.dispatch('vedio/active',2)
   },
}
</script>

<style scoped>
.mvcontainer{
  width:100%;
  height:100%;
  overflow-y: scroll;
}
.mvcontainer .box{
  width:80%;
  margin:0 auto;
}
</style>