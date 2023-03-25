<template>
  <div class="commentcontainer" ref="commentcontainer">
    <div class="comment">
      <textarea name="" id="" cols="30" rows="10" @input="countlength" v-model="len"></textarea>
      <span>{{ count }}</span>
    </div>
    <div class="footer">
        <div class="top">
            <div class="iconfont icon-jinghao"></div>
            <div class="iconfont icon-24gl-atSign"></div>
            <div class="iconfont icon-xiaolian"></div>
        </div>
        <div class="center" v-if="!playlistCommentInfo.total">还没有评论，快来抢沙发~</div>
        <div class="bottom">评论</div>
    </div>
    <div class="info">
      <div class="title">最新评论</div>
      <div class="commentinfo">
        <ul>
          <li v-for="comment in playlistComment" :key="comment.commentId">
            <div class="img">
              <img :src="comment.user.avatarUrl" alt="">
            </div>
            <div class="userinfo">
              <div class="nameandcomment"><span>{{comment.user.nickname}}：</span>{{comment.content}}</div>
              <div class="publishtime">{{comment.publishtime}}</div>
            </div>
            <div class="operation">
              <div class="agree"><span class="iconfont icon-good" @click="changeAgree($event,comment)"></span></div>
              <div class="share"><span class="iconfont icon-fenxiang"></span></div>
              <div class="response"><span class="iconfont icon-pinglun"></span></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <pagination totalPage="10"/>
  </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex'
import pagination from "@/components/pagination";
export default {
  data() {
    return {
      count: 140,
      len:'',
    };
  },
  methods:{
    //计算字数
    countlength(){
       this.count=140
       this.count-=this.len.length
    },
    //修改点赞样式
    async changeAgree(e,comment){
      if(e.target.className.indexOf("isAgree")!==-1)
      {
          //去掉点赞属性
          e.target.className="iconfont icon-good"
          let result =await this.$API.addOrDelAgree(this.playlistCommentInfo.userId,comment.commentId,0,this.type)
      }else{
        //添加点赞属性
         e.target.className="iconfont icon-good isAgree"
         let result =await this.$API.addOrDelAgree(this.playlistCommentInfo.userId,comment.commentId,1,this.type)
      }
    }
  },
  computed:{
    ...mapState({
      playlistCommentInfo:state=>state.playlist.playlistCommentInfo,
      page:state=>state.playlist.page,
      type:state=>state.playlist.type
    }),
    ...mapGetters('playlist',['playlistComment']),
  },
  components:{
     pagination
  },
  beforeDestroy() {
    this.$store.dispatch('playlist/pagecount',1)
  },
};
</script>

<style scoped>
.commentcontainer {
  margin-top: 30px;
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.commentcontainer .comment {
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;;
}
.commentcontainer .comment textarea {
  height: 100%;
  width: 100%;
  resize: none;
  outline: none;
  border: none;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  font-size: 15px;
  padding:5px;
  box-sizing: border-box;
}
.commentcontainer .comment span{
    position: absolute;
    bottom:5px;
    right:5px;
    font-size: 13px;
    color:#e5e5e5;
}
.commentcontainer .footer{
    height:40px;
    width:100%;
    /* border:1px solid red; */
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.commentcontainer .footer .top{
    width:80px;
    height:40px;
    display:flex;
    justify-content: space-around;
    align-items: center;
}
.commentcontainer .footer .top div{
    font-size:18px;
}
.commentcontainer .footer .center{
    height:100%;
    width:200px;
    font-size: 15px;
    line-height:40px;
    color:#e5e5e5;
}
.commentcontainer .footer .bottom{
    height:20px;
    border:1px solid #e5e5e5;
    border-radius: 10px;
    width:60px;
    line-height:20px;
    text-align: center;
    font-size: 15px;
}
.commentcontainer .info{
  width:100%;
}
.commentcontainer .info .title{
  height:40px;
  width:100%;
  font-size:14px;
  font-weight: bold;
  line-height:40px;
}
.commentcontainer .info .commentinfo{
  width:100%;
}
.commentcontainer .info .commentinfo ul{
  list-style:none;
  width:100%;
}
.commentcontainer .info .commentinfo ul li{
  width:100%;
  height:60px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}
.commentcontainer .info .commentinfo ul li .img{
  height:40px;
  width:40px;
  margin-right:15px;
}
.commentcontainer .info .commentinfo ul li .img img{
  width:100%;
  height:100%;
  border-radius: 50%;
}
.commentcontainer .info .commentinfo ul li .userinfo{
  height:40px;
  width:85%;
}
.commentcontainer .info .commentinfo ul li .userinfo .nameandcomment{
  font-size:12px;
  height:20px;
  line-height:20px;
  width:100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.commentcontainer .info .commentinfo ul li .userinfo .nameandcomment span{
  color:#507daf;
}
.commentcontainer .info .commentinfo ul li .userinfo .publishtime{
  height:20px;
  font-size:12px;
  line-height:20px;
}
.commentcontainer .info .commentinfo ul li .operation{
  display: flex;
  height:100%;
  align-items: center;
}
.commentcontainer .info .commentinfo ul li .operation div{
  padding:0 5px;
  border-right:1px solid #ddd;
}
.commentcontainer .info .commentinfo ul li .operation div:last-child{
  border-right:none;
}
.commentcontainer .info .commentinfo ul li .operation div span{
  font-size:13px;
}
.commentcontainer .info .commentinfo ul li .operation div span.isAgree{
  color:red;
}
</style>