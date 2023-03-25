<template>
    <div class="box">
      <div class="header">{{ title }}</div>
      <div class="sort">
        <ul>
          <li
            v-for="(item, index) in sort"
            :key="index"
            :class="{ active: active == index }"
            @click="change(index)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  props: ["title", "sort"],
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    //修改样式
    change(index) {
        this.active = index;
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  margin:10px 0;
}
.box .header {
  height: 30px;
  width: 40px;
  /* border: 1px solid #000; */
  line-height: 30px;
  text-align: center;
  display: inline-block;
  font-size: 13px;
}
.box .sort {
  display: inline-block;
  width: calc(100% - 60px);
}
.box .sort ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.box .sort ul li {
  height: 30px;
  width: 60px;
  color: #888;
  line-height: 30px;
  font-size: 13px;
  border-radius: 20px;
  text-align: center;
}
.box .sort ul li:nth-child(1) {
  color: #000;
}
.box .sort ul li:hover {
  color: #000;
}
.box .sort ul li.active {
  background: #fdecec;
  color: red;
}
</style>