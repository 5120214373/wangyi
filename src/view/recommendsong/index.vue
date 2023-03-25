<template>
  <div class="outter" ref="outter">
    <v-header />
    <mytitle />
  </div>
</template>

<script>
import {timeconversion} from '@/somefunction/timeconversion'
import vHeader from "./vheader";
import mytitle from "./mytitle";
import { mapState,mapGetters } from "vuex";
export default {
  components: {
    vHeader,
    mytitle,
  },
  computed: {
    ...mapState({
      page: (state) => state.playlist.page,
      playlistInfo: (state) => state.song.playlistInfo,
    }),
     ...mapGetters('playlist',['playlistComment']),
  },
  watch: {
    async page() {
      if(this.$route.path.indexOf('comment')!==-1){
      //将页面滑到评论区顶部
      let outter = this.$refs["outter"];
      outter.scrollTop = 380;
      //获取歌单的评论
      this.getPlaylistComment()
      }
    },
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
  },
  mounted(){
    //获取歌单的评论
    this.getPlaylistComment()
  },
  methods:{
   async getPlaylistComment(){
      //获取歌单的评论
      let res = await this.$API.playlistComment(
        this.playlistInfo.id,
        (this.page - 1) * 20
      );
      //保存歌单评论
      this.$store.dispatch("playlist/playlistcomment", res.data);
    }
  }
};
</script>

<style scoped>
.outter {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}
</style>