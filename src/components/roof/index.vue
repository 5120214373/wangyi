<template>
  <div class="container">
    <div class="logo">
      <img src="@/assets/image/logo.png" alt="" />
    </div>
    <button class="left">&lt;</button>
    <button class="right">&gt;</button>
    <div class="search">
      <a href="" class="iconfont icon-sousuo"></a>
      <input
        type="text"
        :placeholder="keyDefault"
        @click="showhotsearch"
        @input="search"
        @blur="hiddenhotandkeysearch"
        v-model="keyword"
      />
      <hotsearch v-show="hotshow" />
      <search v-show="keyshow" />
    </div>
    <button class="iconfont icon-tinggeshiqu right"></button>
    <div class="rightInfo">
      <img :src="img" alt="" v-if="img" />
      <img src="@/assets/image/unlogin.png" v-else />
      <span @click="tologin">{{ username ? username : "未登录" }}</span>
      <a href="" class="iconfont icon-pifu"></a>
      <a href="" class="iconfont icon-duanxin"></a>
      <a href="" class="iconfont icon-shezhi"></a>
    </div>
  </div>
</template>

<script>
import { myDebounce } from "@/somefunction/mydebounce";
import { setItem, getItem } from "@/somefunction/localstorage";
import search from "./search";
import hotsearch from "./hotsearch";
import { mapState } from "vuex";
export default {
  data() {
    return {
      //展示热搜榜
      hotshow: false,
      //展示搜索关键字内容
      keyshow: false,
      //关键字
      keyword: "",
      //登录信息
      username: "",
      img: "",
      keyDefault: "",
    };
  },
  components: {
    search,
    hotsearch,
  },
  methods: {
    tologin() {
      if (this.username) {
        //有用户信息就可以打开用户信息页面
        this.$store.dispatch("login/toexitlogin");
      } else {
        //没有用户信息就可以打开登录页面
        this.$store.dispatch("login/tologin");
      }
    },
    //点击展示
    showhotsearch() {
      if (!this.keyword) {
        this.hotshow = true;
        this.keyshow = false;
      } else {
        this.hotshow = false;
        this.keyshow = true;
      }
    },
    //失去焦点后关闭两个表
    hiddenhotandkeysearch() {
      //设置定时器，防止点击歌曲时，失去焦点，直接将榜单关闭，无法获取数据
      setTimeout(() => {
        this.hotshow = false;
        //  this.hotshow = true;
        this.keyshow = false;
        // this.keyshow = true;
      }, 500);
    },
    //搜索关键字展示
    async search() {
      //如果没有输入关键字，展示热搜榜
      if (!this.keyword) {
        this.hotshow = true;
        this.keyshow = false;
      } else {
        //有关键字就展示关键字相关信息，关闭热搜榜
        this.hotshow = false;
        this.keyshow = true;
        //防止用户输入过快，使用防抖
        this.debounce();
      }
    },
    debounce: myDebounce(async function () {
      let result = await this.$API.keysearch(this.keyword);
      this.$store.dispatch("search/keysearch", result.data.result);
    }, 500),
    // //保存热搜榜
    async gethotlist() {
      let result = await this.$API.gethot();
      this.$store.dispatch("search/gethotlist", result.data.data);
    },
    //获取默认的搜索关键字
    async getKeyDefault() {
      let result = await this.$API.keyDefault();
      this.keyDefault = result.data.data.showKeyword;
    },
    //获取收藏专辑的数据
    async getAlbumCollect(){
      let result = await this.$API.albumCollect()
      this.$store.dispatch("mycollect/savealbumcollect",result.data.data)
    },
    //获取收藏歌手的数据
    async getSingerCollect(){
      let result = await this.$API.singerCollect()
      this.$store.dispatch("mycollect/savesingercollect",result.data.data)
    },
    //获得收藏视频，mv
    async getMvCollect(){
       let res = await this.$API.mvCollect()
       res.data.data.map(item=>{
        item.data=item
       })
       this.$store.dispatch("mycollect/savevediocollect",res.data.data)
    }
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.login.isLogin,
      isExitLogin: (state) => state.login.isExitLogin,
      successlogin: (state) => state.login.successlogin,
    }),
  },
  mounted() {
    this.gethotlist();
    //刷新页面
    if (getItem("user")) {
      //修改successlogin的状态
      this.$store.dispatch("login/successlogin", true);
    }
    //获取搜索的默认关键字
    this.getKeyDefault();
  },
  watch: {
    //监视是否成功登录
    successlogin: {
      immediate: true,
      handler: async function (newvalue) {
        //登录成功，保存用户的心动歌曲
        if (newvalue) {
          //将localstorage中的用户信息展示在页面中
          let obj = getItem("user");
          this.username = obj.nickname;
          this.img = obj.avatarUrl;
          //获得心动歌曲的ids
          let result = await this.$API.lovelist(obj.userId);
          //保存心动歌曲的ids
          this.$store.dispatch("song/saveloveids",result.data.ids);
          //获得收藏专辑//获取收藏专辑的数据
          this.getAlbumCollect()
          //获取收藏歌手
          this.getSingerCollect()
          //获取收藏视频,mv
          this.getMvCollect()
        } else {
          //两种情况
          //1.刷新页面，但是用户信息仍然存在于localstorage中，直接在mounted中修改successlogin
          //2.退出登录
          //将页面数据清除
          this.username = "";
          this.img = "";
        }
      },
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  background-color: #ec4141;
  display: flex;
  align-items: center;
  position: relative;
}
.logo {
  width: 202px;
  text-align: center;
  margin-right: 68px;
}
.logo img {
  height: 60px;
  width: 120px;
}
.left,
.right {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  font-size: 15px;
  background-color: #d93c3c;
  border: none;
  color: #eee;
  margin-left: 15px;
}
.search {
  margin: 0 15px;
  height: 40px;
  width: 242px;
  border-radius: 20px;
  background-color: #d93c3c;
  position: relative;
}
.search input {
  height: 40px;
  width: 162px;
  border: none;
  outline: none;
  background-color: #d93c3c;
  position: absolute;
  left: 40px;
  color: #fff;
}
.iconfont {
  font-size: 20px;
  height: 40px;
  width: 40px;
  text-align: center;
  line-height: 40px;
  color: #eee;
}
.icon-sousuo {
  position: absolute;
}
.left,
.right {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  font-size: 15px;
  background-color: #d93c3c;
  border: none;
  color: #eee;
  margin-left: 15px;
  line-height: 30px;
}
.icon-tinggeshiqu {
  margin: 0;
}
.rightInfo {
  width: 300px;
  margin-left: 650px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  font-size: 13px;
}
.rightInfo img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
a {
  text-decoration: none;
  color: #eee;
}
</style>