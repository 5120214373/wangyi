<template>
  <div class="keycontainer">
    <searchinfo :title="title[0]" :info="keysearchInfo.songs"/>
    <searchinfo :title="title[1]" :info="keysearchInfo.artists"/>
    <searchinfo :title="title[2]" :info="keysearchInfo.albums"/>
    <searchinfo :title="title[3]" :info="keysearchInfo.playlists"/>
  </div>
</template>

<script>
import searchinfo from './searchinfo'
import { mapState } from "vuex";
export default {
    components:{
        searchinfo
    },
  computed:{
      ...mapState({
        keysearchInfo:state=>state.search.keysearchInfo
      })
  },
  data(){
    return {
    title:['单曲','歌手','专辑','歌单'],
    }
  }
};
</script>

<style scoped>
.keycontainer {
  height: 500px;
  width: 400px;
  /* border:1px solid red; */
  position: absolute;
  left: -40px;
  top: 70px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.5);
  overflow-y: scroll;
  /* overflow-y: scroll; */
}
/* .keycontainer .guesslike {
  width: 100%;
}
.keycontainer .guesslike span {
  display: inline-block;
  height: 40px;
  width: 40px;
  line-height: 40px;
  text-align: center;
}
.keycontainer .guesslike .title {
  display: inline-block;
  height: 40px;
  width: 100px;
  line-height: 40px;

}
.keycontainer .guesslike ul {
  list-style: none;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.keycontainer .guesslike ul li {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
}
.keycontainer .guesslike ul li:hover {
  background: #f2f2f2;
} */
</style>