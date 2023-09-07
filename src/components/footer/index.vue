<template>
  <div class="footercontainer">
    <div class="left">
      <img src="@/assets/image/unlogin.png" alt v-if="!currentsong.al"/>
      <img :src="currentsong.al.picUrl" alt v-else/>
      <div class="content">
        <p class="top">
          <span class="name">{{ !currentsong.name ? "未知" : currentsong.name }}</span>
          <span class="iconfont icon-aixin" v-if="!currentsong.islike" @click="change"></span>
          <span class="iconfont icon-aixin_shixin a" v-else @click="change"></span>
        </p>
        <p>{{ !currentsong.name ? "未知" : currentsong.ar[0].name }}</p>
      </div>
    </div>
    <div class="center">
      <div v-if="showLrc" class="lrcContainer" ref="lrcRef">
        <ul ref="ulRef">
          <li v-for="(lrc,index) in lrcArr" :key="lrc.time" :class="{'active':index===lrcIndex}">
            {{ lrc.lrcWord }}
          </li>

        </ul>
      </div>
      <div class="icon">
        <div>
          <div><span class="iconfont icon-24gl-repeat" v-if="!oneplay" @click="changeplay"></span></div>
          <div><span class="iconfont icon-24gl-repeatOnce" v-if="oneplay" @click="changeplay"></span></div>
        </div>
        <div><span class="iconfont icon-houtui" @click="presong"></span></div>
        <div>
          <span
              class="iconfont icon-zanting active"
              v-if="playState"
              @click="changeState()"
          ></span>
          <span
              class="iconfont icon-bofang active"
              @click="changeState()"
              v-else
          ></span>
        </div>
        <div><span class="iconfont icon-qianjin" @click="nextsong"></span></div>
        <div><span class="iconfont icon-geciweidianji" @click="getlrc"></span></div>
      </div>
      <div class="progress">
        <span>{{ currenttime }}</span>
        <div class="base">
          <van-slider
              v-model="value"
              @change="onChange"
              active-color="#ec4141"
              inactive-color="#eee"
              button-size="6"
          />
        </div>
        <span>{{ totaltime }}</span>
        <audio
            :src="playsonginfo.url"
            controls
            loop
            ref="audio"
            @canplay="getDuration"
            @timeupdate="updataTime"
            @durationchange="changesong"
            hidden
        ></audio>
      </div>
    </div>
    <div class="right">
      <div class="iconfont icon-biaozhun a"></div>
      <div class="iconfont icon-jingyunyinxiaopt"></div>
      <div class="iconfont icon-shengyin"></div>
      <div class="iconfont icon-erji"></div>
      <div class="iconfont icon-liebiao"></div>
    </div>
  </div>
</template>

<script>
import {myDebounce} from '@/somefunction/mydebounce'
import {mapState} from "vuex";

export default {
  data() {
    return {
      //false为暂停 true为播放
      playState: false,
      //当前的播放的时间
      currenttime: "00:00",
      //总时长的时间
      totaltime: "00:00",
      //滑块点的位置
      value: 0,
      //单曲播放还是按列表播放
      oneplay: true,
      //是否展示歌词
      showLrc: false,
      //歌词数组
      lrcArr: [],
      //正在播放歌词的序号
      lrcIndex: -1,
      divH:0,
      ulH:0,
      liH:0
    };
  },
  computed: {
    ...mapState({
      playsonginfo: (state) => state.song.playsonginfo,
      currentsong: (state) => state.song.currentsong,
      playlist: state => state.song.playlist,
      loveIds: state => state.song.loveIds
    }),
  },
  methods: {
    //修改播放方式
    changeplay() {
      this.oneplay = !this.oneplay
      //是单曲循环就把循环播放打开
      if (this.oneplay) {
        this.$refs['audio'].loop = true
      } else {
        //不是单曲循环就把循环播放关闭
        this.$refs['audio'].loop = false
      }
    },
    //获取歌曲总时长并转化为分秒
    getDuration() {
      this.totaltime = this.s_hs(parseInt(this.$refs.audio.duration));
    },
    //获取歌曲当前时长并转化为分秒
    updataTime() {
      this.currenttime = this.s_hs(parseInt(this.$refs.audio.currentTime));
      if(this.showLrc){
        this.lrcIndex = this.findLrcIndex()
        this.setOffset()
      }
      //修改滑块点的位置
      this.value =
          (parseInt(this.$refs.audio.currentTime) /
              parseInt(this.$refs.audio.duration)) *
          100;
      //如果不是单曲循环且已经播放完了
      if (!this.oneplay && this.value == 100) {
        //防止一下子跳过多首歌使用防抖
        this.Debouncenext()
      }
    },
    Debouncenext: myDebounce(function () {
      //播放下一首歌
      this.nextsong()
    }, 1000),
    //将秒转化分秒
    s_hs(sec) {
      var min;
      min = Math.floor(sec / 60);
      sec = sec % 60;
      min += "";
      sec += "";
      min = min.length == 1 ? "0" + min : min;
      sec = sec.length == 1 ? "0" + sec : sec;
      return min + ":" + sec;
    },
    //拉扯进度条
    onChange(value) {
      //通过进度条的长度与总长度的比例，求得歌曲播放的进度
      this.$refs["audio"].currentTime = Math.round(
          (value / 100) * this.$refs["audio"].duration
      );
      //播放音乐
      this.$refs["audio"].play();
      //将按键切换为播放
      this.playState = true;
    },
    //播放或者暂停
    changeState() {
      //判断歌曲是否暂停
      let type = this.$refs["audio"].paused;
      if (type) {
        //如果是暂停，那么就播放
        this.$refs["audio"].play();
        //将按键切换为播放
        this.playState = true;
      } else {
        //如果是播放，那么就暂停
        this.$refs["audio"].pause();
        //将按键切换为暂停
        this.playState = false;
      }
    },
    //如果切换歌曲
    changesong() {
      this.totaltime = this.s_hs(parseInt(this.$refs.audio.duration));
      //播放音乐
      this.$refs["audio"].play();
      //将按键切换为播放
      this.playState = true;
    },
    //上一首歌曲
    async presong() {
      //寻找到当前歌曲在当前榜单中的位置
      let index = 0;
      for (let i = 0; i < this.playlist.length; i++) {
        if (this.playlist[i] == this.currentsong) {
          index = i;
          break;
        }
      }
      //如果不是第一首歌，直接前一首
      if (index != 0) {
        this.$store.dispatch('song/currentsong', this.playlist[index - 1])
        let result = await this.$API.playsonginfo(this.playlist[index - 1].id)
        this.$store.dispatch("song/playsonginfo", result.data.data[0])
      } else {
        //如果是最后一首直接最后一首
        this.$store.dispatch('song/currentsong', this.playlist[this.playlist.length - 1])
        let result = await this.$API.playsonginfo(this.playlist[this.playlist.length - 1].id)
        this.$store.dispatch("song/playsonginfo", result.data.data[0])
      }
    },
    async nextsong() {
      //寻找到当前歌曲在当前榜单中的位置
      let index = 0;
      for (let i = 0; i < this.playlist.length; i++) {
        if (this.playlist[i] == this.currentsong) {
          index = i;
          break;
        }
      }
      //如果不是第一首歌，直接后一首
      if (index != this.playlist.length - 1) {
        this.$store.dispatch('song/currentsong', this.playlist[index + 1])
        let result = await this.$API.playsonginfo(this.playlist[index + 1].id)
        this.$store.dispatch("song/playsonginfo", result.data.data[0])
      } else {
        //如果是最后一首直接第一首
        this.$store.dispatch('song/currentsong', this.playlist[0])
        let result = await this.$API.playsonginfo(this.playlist[0].id)
        this.$store.dispatch("song/playsonginfo", result.data.data[0])
      }
    },
    async change() {
      //取消心动歌曲
      if (this.currentsong.islike) {
        this.currentsong.islike = false
        let result = await this.$API.isLikeSong(false, this.currentsong.id)
        this.$store.dispatch('song/delloveid', this.currentsong.id)
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
        //添加心动歌曲
        this.$set(this.currentsong, 'islike', true)
        let result = await this.$API.isLikeSong(true, this.currentsong.id)
        this.$store.dispatch('song/addloveid', this.currentsong.id)
        if (this.$route.path.indexOf("/mylove") !== -1) {
          let res = await this.$API.lovesong(this.loveIds.join());
          res.data.songs.forEach((item) => {
            this.$set(item, "islike", true);
          });
          //保存所有的心动歌曲到当前榜单中
          this.$store.dispatch("song/playlist", res.data.songs);
        }
      }
    },
    async getlrc() {
      const id = this.currentsong.id
      if (id) {
        let data = await this.$API.getlyric(id)

        this.lrcArr = this.handleLyricToObj(data.data.lrc.lyric)
        this.lrcIndex = this.findLrcIndex()

        this.showLrc = true
        this.$nextTick(()=>{
          this.divH=this.$refs.lrcRef.clientHeight
          this.ulH=this.$refs.ulRef.clientHeight
          this.liH=this.$refs.ulRef.children[0].clientHeight
          this.setOffset()
        })
        // console.log(this.$refs)
        // if(!this.$refs['lrcRef']){
        // this.setOffset()
        // }
      }
      // console.log(this.currentsong.id)
    },
    findLrcIndex() {
      let songTime = this.handleTime(this.currenttime)
      for (let i = 0; i < this.lrcArr.length; i++) {
        if (this.lrcArr[i].time > songTime) {
          return i - 1
        }
      }
      return this.lrcArr.length - 1
    },
    handleLyricToObj(lrcStr) {
      let lrcArr = lrcStr.split('\n')
      let result = []
      for (let i = 0; i < lrcArr.length - 1; i++) {
        let parts = lrcArr[i].split(']')
        let time = parts[0].substring(1)
        let obj = {
          time: this.handleTime(time),
          lrcWord: parts[1]
        }
        result.push(obj)
      }
      return result
    },
    handleTime(time) {
      let parts = time.split(':')
      return +parts[0] * 60 + +parts[1]
    },
    setOffset() {
      let offset = this.liH*this.lrcIndex-this.divH/2+this.liH/2
      if(offset<0){
        offset=0
      }
      // console.log(offset,this.lrcIndex)
      // console.log(this.$refs.ulRef.style.transform
      this.$refs.ulRef.style.transform= `translateY(-${offset}px)`
      // console.log(this.$refs.ulRef.style.transform)
    }
  },
  mounted(){
    document.body.addEventListener('click',()=>{
      if(this.showLrc){
        this.showLrc=false
      }
    })
  }
}
;
</script>

<style scoped>
.lrcContainer {
  position: absolute;
  height: 400px;
  width: 500px;
  border: 1px solid red;
  top: -500px;
  background: #000;
  color: #666;
  z-index: 9999;
  text-align: center;
  overflow: hidden;
}

.lrcContainer ul {
//height: 100%;
  overflow: hidden;
  transition: 0.4s;
}

.lrcContainer ul li {
  height: 20px;
  border: 1px solid #000;
  transition: 0.6s;
}

.lrcContainer ul li.active {
  transform: scale(1.3);
  color: #fff;
}

a {
  text-decoration: none;
}

.footercontainer {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-top: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left {
  width: 300px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.left img {
  height: 40px;
  width: 40px;
  border-radius: 5px;
  margin-right: 10px;
}

.left .content {
  width: 200px;
  display: flex;
  height: 40px;
  /* width:60px; */
  flex-direction: column;
  justify-content: space-around;
  font-size: 13px;
}

.left .content .top {
  font-size: 15px;
}

.left .content .top .name {
  max-width: 180px;
  font-size: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
}

.left .content .top span {
  font-size: 18px;
}

.left .content .top .a {
  color: #ed4e4e;
}

.center {
  width: 555px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.center .icon {
  display: flex;
  width: 275px;
  justify-content: space-between;
  align-items: center;
}

.center .icon span {
  font-size: 22px;
}

.center .icon .active {
  font-size: 30px;
}

.center .progress {
  height: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center .progress .base {
  height: 4px;
  width: 390px;
  /* background: #cecece;
  position: relative; */
}

/* .center .progress .base .cover {
  width: 0;
  position: absolute;
  left: 0;
  top: 0;
  height: 2px;
  background: #ed4e4e;
}*/
.center .progress span {
  margin: 0 5px;
  color: #e0e0e0;
}

.right {
  width: 250px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.right div {
  height: 40px;
  width: 40px;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
}

.right div.a {
  font-size: 30px;
}
</style>
