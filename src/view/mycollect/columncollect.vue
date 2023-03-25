<template>
  <div class="columncollectcontainer">
    <search v-slot:column>
      <template>
        <div class="left">收藏的专栏</div>
        <div class="search">
          <input type="text" placeholder="搜索我收藏的专栏" />
          <span class="iconfont icon-sousuo"></span>
        </div>
      </template>
    </search>
  </div>
</template>

<script>
import search from "./search";
export default {
  components: {
    search,
  },
  mounted(){
    //将active设置为当前页面 mycollect
    this.$store.dispatch("mycollect/changeactive",4)
  }
};
</script>

<style scoped>
.columnmcollectcontainer {
  width: 100%;
}
</style>