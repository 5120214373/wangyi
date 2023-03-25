<template>
  <div class="outter">
    <div class="content">
      <div
        class="left iconfont icon-houtui1"
        @click="back"
        :class="{ disable: page == 1 }"
      ></div>
      <div
        class="num"
        v-for="index in totalPageArr"
        :key="index"
        @click="changePage(index)"
        :class="{ active: page == index }"
      >
        {{ index }}
      </div>
      <div
        class="right iconfont icon-qianjin"
        :class="{ disable: page == totalPage }"
        @click="next"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  //totalCount 总数据的条数
  //pageCount 每页的数据条数
  props: ["totalPage"],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      page: (state) => state.playlist.page,
    }),
    //将总页数转化成数组，以便遍历
    totalPageArr() {
      let arr = [];
      for (var i = 0; i < this.totalPage; i++) {
        arr.push(i + 1);
      }
      return arr;
    },
  },
  methods: {
    //修改分页码
    changePage(index) {
      this.$store.dispatch("playlist/pagecount", index);
    },
    //点击上一页
    back() {
      if (this.page != 1) {
        this.$store.dispatch("playlist/pagecount", this.page - 1);
      }
    },
    //点击下一页
    next(){
        if(this.page!=this.totalPage){
            this.$store.dispatch("playlist/pagecount", this.page + 1);
        }
    }
  },
};
</script>

<style scoped>
.outter {
  height: 100%;
  width: 100%;
}
.outter .content {
  height: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
}
.outter .content .right,
.left,
.num {
  width: 20px;
  height: 20px;
  margin: 0 3px;
  border: 1px solid #aaa;
  border-radius: 3px;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  font-weight: 100;
  color: #000;
}
.outter .content .right:hover,
.left:hover,
.num:hover {
  background: #f2f2f2;
}
.outter .content .active {
  background: red;
  color: #fff;
}
.outter .content .right.disable,.left.disable {
  background: #fff;
  color: #aaa;
}
</style>