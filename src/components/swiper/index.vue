<template>
  <div class="swiper">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="img in imgs" :key="img.id">
        <img :src="img.imageUrl" alt="" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/css/swiper.min.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "myswiper",
  props: ["imgs"],
  data() {
    return {
      swiperOption: {
        loop:true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next", //自动隐藏
          prevEl: ".swiper-button-prev", //自动隐藏
        },
      },
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
};
</script>

<!-- 设置css可使用stylus插件写法 -->
<!-- >>>穿透：因为动态轮播还有的样式在swiper插件内显示 -->
<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}
.swiper-container {
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
</style>
