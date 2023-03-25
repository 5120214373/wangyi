<template>
  <div class="vediocollectcontainer">
    <search v-slot:vedio>
      <template>
        <div class="left">收藏的视频<span v-if="vedioCollect.length">({{vedioCollect.length}})</span></div>
        <div class="search">
          <input type="text" placeholder="搜索我收藏的视频" />
          <span class="iconfont icon-sousuo"></span>
        </div>
      </template>
    </search>
    <div class="vediomain" style="margin:0 20px;">
        <vediolist :vediolist="vedioCollect"/>
    </div>
  </div>
</template>

<script>
import vediolist from '@/view/vedio/vediolist'
import search from "./search";
import {mapState} from 'vuex'
export default {
  components: {
    search,
    vediolist
  },
  data(){
    return {
      
    }
  },
  methods:{
  },
  mounted(){
    
    //将active设置为当前页面 mycollect
    this.$store.dispatch("mycollect/changeactive",3)
  },
  computed:{
    ...mapState({
      vedioCollect:state=>state.mycollect.vedioCollect
    })
  }
};
</script>

<style scoped>
.vediomcollectcontainer {
  width: 100%;
}

</style>