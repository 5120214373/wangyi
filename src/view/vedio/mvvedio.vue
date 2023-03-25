<template>
  <div class="outter">
    <div class="container">
      <div class="content">
        <div class="vedio" v-for="vedio in mvinfo" :key="vedio.id">
          <img :src="vedio.cover" alt="" @click="mvplay(vedio,vedio.id)"/>
          <div class="font">
            <span class="title">{{ vedio.name }}</span>
            <span class="creator" v-if="vedio.name"
              >by {{ vedio.artistName }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["mvinfo"],
  methods:{
    //播放mv
    //将mv数据和vedio数据进行互相匹配
    async mvplay(vedio,id){
      //mv的播放资源
      let result= await this.$API.mvurl(id)
      this.$store.dispatch('vedio/vediourl',result.data.data.url)
      //相关mv
      let res= await this.$API.simimv(id)
      res.data.mvs.map(item=>{
        item.coverUrl=item.cover
        item.title=item.name
      })
      this.$store.dispatch('vedio/linkvedio',res.data.mvs)
      //mv详细数据
      let data=await this.$API.mvdata(id)
      data.data.praisedCount=data.data.likedCount
      data.data.creatorname=vedio.artistName
      data.data.img=vedio.cover
      data.data.playTime=vedio.playCount
      data.data.title=vedio.name
      data.data.subscribeCount=0
      data.data.id=id
      this.$store.dispatch('vedio/vediodetail',data.data)
      //跳转页面
      this.$router.push('/mvdetail')
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
}
.container .content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.container .content .vedio {
  width: 23%;
  height: 190px;
  /* border:1px solid red; */
  margin: 15px 0;
}
.container .content .vedio img {
  width: 100%;
  height: 150px;
  border-radius: 5px;
}
.container .content .vedio .font {
  display: flex;
  height: 40px;
  width: 100%;
  font-size: 11px;
  justify-content: space-around;
  flex-direction: column;
}
.container .content .vedio .font .title {
  width: 100%;
  height: 20px;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.container .content .vedio .font .creator {
  width: 100%;
  height: 20px;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #cccccc;
}
</style>