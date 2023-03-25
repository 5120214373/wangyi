<template>
  <div class="container">
    <ul>
      <li>
        <div class="songtitle left">音乐标题</div>
        <div class="singer">歌手</div>
        <div class="al">专辑</div>
        <div class="time">时长</div>
      </li>
      <li
        v-for="(item, index) in playlist"
        :key="item.id"
        @mouseover="getindex(index)"
        :class="{
          active: !(index % 2),
          hover: index == currentIndex,
          clickstyle: clickIndex == index,
        }"
        @click="getclickindex(index)"
        @dblclick="play(item)"
      >
        <div class="songtitle">
          <span
            v-if="dbclickId == item.id"
            class="iconfont icon-yangshengqi click a"
          ></span>
          <span class="default a" v-else>{{
            index + 1 < 10 ? "0" + (index + 1) : index + 1
          }}</span>
          <span
            class="iconfont icon-aixin default"
            @click="addorremovelike(item)"
            v-if="!item.islike"
          ></span>
          <span
            class="iconfont icon-aixin_shixin click"
            v-else
            @click="addorremovelike(item)"
          ></span>
          <span class="iconfont icon-xiazai default"></span>
          <span :class="{ click: dbclickId == item.id }">{{ item.name }}</span>
          <span class="iconfont icon-MV tag" v-if="item.tag1 == '1'"></span>
          <span class="iconfont icon-vip-l tag" v-if="item.tag2 == '1'"></span>
        </div>
        <div class="singer">{{ item.ar[0].name }}</div>
        <div class="al">{{ item.al.name }}</div>
        <div class="time default">{{ time(item.dt) }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getItem } from "@/somefunction/localstorage";
import { songtime } from "@/somefunction/songtime";
import { mapState } from "vuex";
export default {
  data() {
    return {
      //mouseover的index
      currentIndex: 1,
      //click的index
      clickIndex: -1,
      //dbclick的index
      dbclickId: -1,
      user: {},
      // loveIds: [],
    };
  },
  methods: {
    //得到mouseover的index
    getindex(index) {
      this.currentIndex = index;
    },
    //获取click的index
    getclickindex(index) {
      this.clickIndex = index;
    },
    //获取双击的歌曲
    async play(song) {
      //获得双击效果
      this.dbclickId = song.id;
      //保存双击的歌曲
      this.$store.dispatch("song/currentsong", song);
      //获得双击歌曲的信息
      let result = await this.$API.playsonginfo(song.id);
      //保存双击歌曲信息
      this.$store.dispatch("song/playsonginfo", result.data.data[0]);
    },
    //添入或取消喜欢
    async addorremovelike(song) {
      //如果取消心动歌曲
      if (song.islike) {
        this.$store.dispatch('song/delloveid',song.id)
        song.islike=false
        let result = await this.$API.isLikeSong(false, song.id);
        //如果是心动榜单，直接删除歌曲
        if (this.$route.path.indexOf("/mylove") !== -1) {
          let res = await this.$API.lovesong(this.loveIds.join());
          res.data.songs.forEach((item) => {
            this.$set(item, "islike", true);
          });
          //保存所有的心动歌曲到当前榜单中
          this.$store.dispatch("song/playlist", res.data.songs);
        }
      } else {
        //如果添加心动歌曲
        this.$store.dispatch('song/addloveid',song.id)
        this.$set(song,'islike',true)
        let result = await this.$API.isLikeSong(true, song.id);
      }
    },
    //计算歌曲时长
    time(dt) {
      return songtime(dt);
    },
    // async getlovelist() {
    //   //获得心动歌曲的ids
    //   let result = await this.$API.lovelist(this.user.userId);
    //   this.loveIds = result.data.ids;
    // },
    judgeLove(){
      this.playlist.map((item) => {
          if (this.loveIds.indexOf(item.id) !== -1) {
            //是心动歌曲
            item.islike = true;
          } else {
            //不是心动歌曲
            item.islike = false;
          }
        });
    }
  },
  computed: {
    ...mapState({
      currentsong: (state) => state.song.currentsong,
      playlist: (state) => state.song.playlist,
      loveIds:state=>state.song.loveIds
    }),
  },
  watch: {
    //监视footer切换歌曲，修改songlist的播放效果
    currentsong: function () {
      this.dbclickId = this.currentsong.id;
    },
    // 监视loveIds,一旦添加或者删除心动歌曲，就马上进行判断
    loveIds: {
      deep: true,
      handler() {
          this.judgeLove()
      },
    },
    playlist:{
      handler(){
        this.judgeLove()
      }
    }
  },
  mounted() {
    // //获取用户信息
    // this.user = getItem("user");
    // //如果用户登陆
    // if (this.user) {
    //   //获得心动歌单
    //   this.getlovelist();
    // }
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}
.container ul {
  width: 100%;
  border-top: 1px solid #c8c8c8;
}
.container ul li {
  display: block;
  height: 30px;
  width: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  font-size: 13px;
}
.container ul li.active {
  background: #fafafa;
}
.container ul li.hover {
  background: #f2f2f3;
}
.container ul li.clickstyle {
  background: #e5e5e5;
}
.container ul li .time,
.singer {
  width: 15%;
  text-align: center;
  line-height: 30px;
  /* margin-right:50px; */
}
.container ul li .songtitle {
  width: 50%;
  height: 100%;
  line-height: 30px;
  margin-left: 20px;
  /* position: relative;
  top: 0;
  left: 90px; */
}
.container ul li div.songtitle .tag {
  color: #ed4e4e;
}
.container ul li div.left {
  position: relative;
  top: 0;
  left: 100px;
}
.container ul li div.songtitle .iconfont,
.a {
  display: inline-block;
  height: 20px;
  width: 20px;
  margin: 0 5px;
}
.container ul li .al {
  width: 20%;
  text-align: center;
  line-height: 30px;
}
.container ul li .default {
  color: #c8c8c8;
}
.container ul li .default:hover {
  color: #000;
}
.container ul li .click {
  color: #ed4e4e;
}
</style>