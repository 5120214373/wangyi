<template>
  <div class="siderbarcontainer">
     <ul class="outter">
        <li :class="{active:current===1}" @click="addActive(1)"><router-link to="/findmusic/personality">发现音乐</router-link></li>
        <li :class="{active:current===2}" @click="addActive(2)"><router-link to="/Lebo">乐播</router-link></li>
        <li :class="{active:current===3}" @click="addActive(3)"><router-link to="/vedio">视频</router-link></li>
        <li :class="{active:current===4}" @click="addActive(4)"><router-link to="/focu">关注</router-link></li>
        <li :class="{active:current===5}" @click="addActive(5)"><router-link to="/live">直播</router-link></li>
        <li :class="{active:current===6}" @click="addActive(6)"><router-link to="/FM">私人FM</router-link></li>
        <li class="inner">
            <div>我的音乐</div>
            <ul>
                <li @click="mylove(7)" :class="{active:current===7}"><span class="iconfont icon-aixin"></span>我喜欢的音乐</li>
                <li @click="localAndDownload(8)" :class="{active:current===8}"><span class="iconfont icon-ziyuan"></span>本地与下载</li>
                <li @click="recentplay(9)" :class="{active:current===9}"><span class="iconfont icon-zuijinbofang"></span>最近播放</li>
                <li @click="myCloud(10)" :class="{active:current===10}"><span class="iconfont icon-yun"></span>我的音乐云盘</li>
                <li @click="myBole(11)" :class="{active:current===11}"><span class="iconfont icon-boke"></span>我的播客</li>
                <li @click="mycollect(12)" :class="{active:current===12}"><span class="iconfont icon-wodeshoucang"></span>我的收藏</li>
            </ul>
        </li>
     </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
        }
    },
    computed:{
         ...mapState({
            current:state=>state.sidebar.current
         })
    },
    methods:{
        //记录点击sidebar的位置
        addActive(index){
            this.$store.dispatch("sidebar/getcurrent",index)
        },
        //跳转到我的喜欢页面
        mylove(index){
            //修改sidebar
           this.$store.dispatch("sidebar/getcurrent",index)
           this.$router.push('/mylove')
        },
        //跳转到最近播放
        recentplay(index){
            //修改sidebar
            this.$store.dispatch("sidebar/getcurrent",index)
            this.$router.push('/recentplay')
        },
        //跳转到我的收藏
        mycollect(index){
            //修改sidebar
            this.$store.dispatch("sidebar/getcurrent",index)
            this.$router.push('/mycollect')
        },
        //跳转到本地和下载
        localAndDownload(index){
            //修改sidebar
            this.$store.dispatch("sidebar/getcurrent",index)
            this.$router.push('/localanddownload')
        },
        //跳转到我的云盘
        myCloud(index){
            //修改sidebar
            this.$store.dispatch("sidebar/getcurrent",index)
            this.$router.push('/mycloud')
        },
        //跳转到我的乐播
        myLebo(index){
            //修改sidebar
            this.$store.dispatch("sidebar/getcurrent",index)
            this.$router.push('/mylebo')
        }
    }
}
</script>

<style scoped>
ul{
    list-style: none;
}
a{
    text-decoration: none;
    color:#000;
}
.siderbarcontainer{
    box-sizing: border-box;
    width:100%;
    border-right:1px solid #e0e0e0;
    height:100%;
    overflow: hidden;
}
.siderbarcontainer .outter{
    width:220px;
    margin:0 auto;
}
.siderbarcontainer .outter li{
    box-sizing: border-box;
    margin-top:10px;
    height:30px;
    width:220px;
    border-radius: 10px;
    line-height:30px;
    font-size:15px;
}
.siderbarcontainer .outter li a{
    display:inline-block;
    width:100%;
    height:100%;
}
.siderbarcontainer .outter>li.active{
    background: #f6f6f7;
    font-size:18px;
    font-weight: bold;
}
.siderbarcontainer .outter .inner{
    font-size:12px;
    color:#ccc;
}
.siderbarcontainer .outter .inner div{
   height:30px;
   line-height:30px;
    font-size:15px;
    color:#000;
    width:100%;
}
.siderbarcontainer .outter .inner ul{
    width:100%;
}
.siderbarcontainer .outter .inner ul li{
    box-sizing: border-box;
    padding-left:10px;
    margin-top:10px;
    height:30px;
    width:230px;
    border-radius: 10px;
    line-height:30px;
    font-size:15px;
    color:#000;
}
.siderbarcontainer .inner,.outter li:hover{
    background:#f6f6f7;
}
.siderbarcontainer .outter .inner ul li.active{
    background:#f6f6f7;
    font-size:15px;
    font-weight: none;
}
.siderbarcontainer .outter .inner div{
    background:#fff;
}
.siderbarcontainer .inner li span{
    margin: 0 10px;
}
</style>