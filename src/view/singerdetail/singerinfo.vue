<template>
  <div class="container">
    <div class="content">
        <div class="title">
            歌手简介
        </div>
        <div class="info">
            {{singerInfo}}
        </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState({
        singerInfo:state=>state.singer.singerInfo
    })
  }
}
</script>

<style scoped>
.contianer{
    width:100%;
}
.contianer .content{
    width:90%;
    margin:0 auto;
}
.contianer .content .title{
    height:50px;
    line-height:50px;
    font-size: 15px;
    font-weight: bold;
}
.contianer .content .info{
    width:100%;
    font-size:15px;
    color:#888;
}
</style>