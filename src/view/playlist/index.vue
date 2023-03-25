<template>
  <div class="container" ref="container">
    <div class="content">
      <div class="header" @click="toBestPlaylist">
        <img src="@/assets/image/bestplaylistcover.png" alt="" />
      </div>
      <div class="tag">
        <div class="left">
          全部歌单<span class="iconfont icon-qianjin"></span>
        </div>
        <div class="right">
          <ul>
            <li v-for="tag in tags" :key="tag.id">{{ tag.name }}</li>
          </ul>
        </div>
      </div>
      <div class="playlist">
        <imgspan :recommendlist="playlist" />
      </div>
      <div class="footer">
        <pagination :totalPage="totalPage" />
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/pagination";
import imgspan from "@/components/imgspan";
import { mapState } from "vuex";
export default {
  data() {
    return {
      tags: [],
      playlist: [],
      //总页数
      totalPage: 7,
    };
  },
  computed: {
    ...mapState({
      page: (state) => state.playlist.page,
    }),
  },
  components: {
    imgspan,
    pagination,
  },
  methods: {
    //跳转精品歌单页面
    toBestPlaylist() {
      this.$router.push("/findmusic/bestplaylist");
    },
    //获取热门列表标签
    async getHotPlaylistTag() {
      let result = await this.$API.hotPlaylistTag();
      this.tags = result.data.tags;
    },
    //获取当前页数的数据
    async getHotPlaylist() {
      let result = await this.$API.hotPlaylist((this.page-1)*50);
      //统一数据
      result.data.playlists.map((item) => {
        item.picUrl = item.coverImgUrl;
      });
      this.playlist = result.data.playlists;
    },
  },
  mounted() {
    //修改active
    this.$store.dispatch("findmusic/changeactive", 3);
    //获取热门列表标签
    this.getHotPlaylistTag();
    //获取第一页的50个歌单
    this.getHotPlaylist();
  },
  watch: {
    page() {
      //监视分页器页码的变化获取歌单
      this.getHotPlaylist()
      //将页面滑到最顶部
      let container = this.$refs['container']
      container.scrollTop=0
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.container .content {
  width: 80%;
  margin: 0 auto;
}
.container .content .header {
  width: 100%;
  height: 150px;
}
.container .content .header img {
  height: 100%;
  width: 100%;
}
.container .content .tag {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container .content .tag .left {
  border: 1px solid #888;
  height: 30px;
  width: 80px;
  line-height: 30px;
  font-size: 13px;
  font-weight: 100;
  border-radius: 20px;
  text-align: center;
}
.container .content .tag .left:hover {
  background: #f2f2f2;
}
.container .content .tag .right {
  height: 100%;
}
.container .content .tag .right ul {
  height: 100%;
  display: flex;
  align-items: center;
}
.container .content .tag .right ul li {
  margin: 0 5px;
  font-size: 13px;
  color: #888;
}
.container .content .footer {
  height: 50px;
  width: 100%;
}
</style>