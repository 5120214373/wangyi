<template>
  <div class="outter" ref="outter">
    <div class="container">
      <div class="vedio">
        <div class="title">
          <span
            class="iconfont icon-houtui"
            v-if="$route.path.indexOf('vedio') != -1"
            @click="exit"
            >视频详情</span
          >
          <span class="iconfont icon-houtui" v-else @click="exit">MV详情</span>
        </div>
        <div class="main">
          <video :src="vediourl" controls></video>
          <div class="info">
            <div class="actor">
              <img :src="vediodetail.img" alt="" />
              <div class="name">{{ vediodetail.creatorname }}</div>
            </div>
            <div class="vedioinfo">
              <div class="vedioname">{{ vediodetail.title }}</div>
              <div class="box">
                <div class="pulish">
                  发布：{{ vediodetail.publishTime ? publishTime : "未知" }}
                </div>
                <div class="playcount">
                  播放量：{{ vediodetail.playTime }}次
                </div>
              </div>
            </div>
            <div class="icons">
              <div class="icon">
                <div class="iconfont icon-good">
                  点赞({{ vediodetail.praisedCount }})
                </div>
              </div>
              <div class="icon">
                <div class="iconfont icon-shoucang">
                  收藏({{ vediodetail.subscribeCount }})
                </div>
              </div>
              <div class="icon">
                <div class="iconfont icon-fenxiang">
                  分享({{ vediodetail.shareCount }})
                </div>
              </div>
              <div class="icon">
                <div class="iconfont icon-ziyuan">下载</div>
              </div>
            </div>
          </div>
        </div>
        <div class="comment">
          <div class="commenttitle">
            评论
            <div class="commentcount">({{ vediodetail.commentCount }})</div>
          </div>
          <comment />
        </div>
      </div>
      <div class="linkvedio">
        <div class="header">相关推荐</div>
        <ul>
          <li
            v-for="item in linkvedio"
            :key="item.coverUrl"
            @click="play(item, item.vid, item.id)"
          >
            <img :src="item.coverUrl" alt="" />
            <div class="linkinfo">
              <div class="top">{{ item.title }}</div>
              <div class="bottom">by {{ item.artistName }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import comment from "@/view/recommendsong/comment";
import { timeconversion } from "@/somefunction/timeconversion";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    comment,
  },
  computed: {
    ...mapState({
      vediourl: (state) => state.vedio.vediourl,
      linkvedio: (state) => state.vedio.linkvedio,
      vediodetail: (state) => state.vedio.vediodetail,
      page: (state) => state.playlist.page,
    }),
    ...mapGetters("playlist", ["playlistComment"]),
    //计算发布时间
    publishTime: function () {
      return timeconversion(this.vediodetail.publishTime);
    },
  },
  methods: {
    //退出当前页面,返回上一个页面
    exit() {
      this.$router.back();
    },
    //点击相关视频
    async play(mv, vid, mvid) {
      //如果是vedio
      if (vid) {
        //发请求获得详情页面数据
        let result = await this.$API.vediourl(vid);
        //保存视频播放地址
        this.$store.dispatch("vedio/vediourl", result.data.urls[0].url);
        //获取视频的相关视频
        let res = await this.$API.linkvedio(vid);
        res.data.data.map((item) => {
          item.artistName = item.creator[0].userName;
        });
        //保存视频的相关视频
        this.$store.dispatch("vedio/linkvedio", res.data.data);
        //获得视频详情
        let data = await this.$API.vediodetail(vid);
        //保存视频详情信息
        data.data.data.creatorname = data.data.data.creator.nickname;
        data.data.data.img = data.data.data.creator.avatarUrl;
        this.$store.dispatch("vedio/vediodetail", data.data.data);
      }
      //如果是mv
      if (mvid) {
        //mv的播放资源
        let result = await this.$API.mvurl(mvid);
        this.$store.dispatch("vedio/vediourl", result.data.data.url);
        //相关mv
        let res = await this.$API.simimv(mvid);
        res.data.mvs.map((item) => {
          item.coverUrl = item.cover;
          item.title = item.name;
        });
        this.$store.dispatch("vedio/linkvedio", res.data.mvs);
        //mv详细数据
        let data = await this.$API.mvdata(mvid);
        data.data.praisedCount = data.data.likedCount;
        data.data.creatorname = mv.artistName;
        data.data.img = mv.cover;
        data.data.playTime = mv.playCount;
        data.data.title = mv.name;
        data.data.subscribeCount = 0;
        data.data.id=mvid
        this.$store.dispatch("vedio/vediodetail", data.data);
      }
    },
    async getVedioComment() {
      //获取视频评论信息
      let info = await this.$API.vedioComment(
        this.vediodetail.vid,
        (this.page - 1) * 20
      );
      //保存评论信息
      this.$store.dispatch("playlist/playlistcomment", info.data);
      //保存资源类型为视频
        this.$store.dispatch('playlist/savetype',5)
    },
    //获取mv评论
    async getMvComment() {
      let result = await this.$API.mvComment(
        this.vediodetail.id,
        (this.page - 1) * 20
      );
      this.$store.dispatch("playlist/playlistcomment", result.data);
      //保存资源类型为mv
        this.$store.dispatch('playlist/savetype',1)
    },
  },
  watch: {
    //分页器切换，发送新数据的请求，并将页面上拉到评论区顶部
    async page() {
      if (this.$route.path.indexOf("vedio") != -1) {
        this.getVedioComment();
      } else {
        this.getMvComment();
      }
      let outter = this.$refs["outter"];
      outter.scrollTop = 718;
    },
    //监视评论，添加发布时间
    playlistComment: {
      deep: true,
      handler: function () {
        if (this.playlistComment != []) {
          this.playlistComment.map((item) => {
            this.$set(item, "publishtime", timeconversion(item.time));
          });
        }
      },
    },
    //视频或者mv切换时修改评论信息
    vediodetail: {
      deep: true,
      handler: function () {
        if (this.$route.path.indexOf("vedio") != -1) {
          this.getVedioComment();
        } else {
          this.getMvComment();
        }
      },
    },
  },
  mounted() {
    //页面加载时，获取评论信息
    if (this.$route.path.indexOf("mv") != -1) {
      this.getMvComment();
    } else {
      this.getVedioComment();
    }
  },
};
</script>

<style scoped>
.outter {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.container {
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.container .vedio {
  /* height:500px; */
  width: 60%;
}
.container .vedio .title {
  height: 50px;
  line-height: 50px;
  width: 100%;
  font-size: 17px;
  font-weight: bold;
}
.container .vedio .title span {
  margin: 0 10px;
}
.container .vedio .main {
  width: 100%;
}
.container .vedio .main video {
  height: 320px;
  width: 100%;
}
.container .vedio .main .info .actor {
  height: 60px;
  width: 100%;
  line-height: 60px;
  display: flex;
}
.container .vedio .main .info .actor img {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin-right: 10px;
}
.container .vedio .main .info .vedioinfo {
  /* height:100px; */
  width: 100%;
  font-size: 20px;
  font-weight: bold;
}
.container .vedio .main .info .vedioinfo .vedioname {
  margin: 15px 0;
}
.container .vedio .main .info .vedioinfo .box {
  display: flex;
  font-size: 13px;
  font-weight: normal;
  color: #888;
}
.container .vedio .main .info .vedioinfo .box .pulish {
  margin-right: 20px;
}
.container .vedio .main .info .icons {
  width: 100%;
  margin: 10px 0;
  display: flex;
}
.container .vedio .main .info .icons .icon {
  height: 30px;
  width: 100px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #888;
  border-radius: 20px;
  margin-right: 15px;
}
.container .vedio .main .info .icons .icon:hover {
  background: #f2f2f2;
}
.container .vedio .main .info .icons .icon .iconfont {
  font-size: 13px;
  color: #000;
}
.container .linkvedio {
  width: 35%;
}
.container .linkvedio .header {
  height: 50px;
  line-height: 50px;
  width: 100%;
  font-size: 17px;
  font-weight: bold;
}
.container .linkvedio ul {
  margin-top: 5px;
  list-style: none;
  width: 100%;
}
.container .linkvedio ul li {
  height: 80px;
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.container .linkvedio ul li img {
  height: 100%;
  width: 50%;
  border-radius: 5px;
}
.container .linkvedio ul li .linkinfo {
  height: 100%;
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.container .linkvedio ul li .linkinfo .top {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.container .linkvedio ul li .linkinfo .bottom {
  font-size: 13px;
  color: #888;
}
.container .vedio .comment {
  width: 100%;
}
.container .vedio .comment .commenttitle {
  height: 30px;
  width: 100%;
  display: flex;
  font-size: 20px;
  font-weight: bold;
}
.container .vedio .comment .commenttitle .commentcount {
  font-size: 10px;
  font-weight: normal;
  color: #888;
  margin-left: 5px;
  line-height: 30px;
}
</style>