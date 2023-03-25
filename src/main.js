import Vue from 'vue'
import App from './App.vue'
//引入element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale })
//引入路由
import VueRouter from 'vue-router'
import router from '@/router'
//设置全局事件总线
import * as API from "@/api"
Vue.use(VueRouter)
Vue.config.productionTip = false
//引入vue-amap
import AmapVue from '@amap/amap-vue';
Vue.use(AmapVue);
//引入全局组件
import imgspan from '@/components/imgspan'
import swiper from '@/components/swiper'
Vue.component(imgspan.name,imgspan)
Vue.component(swiper.name,swiper)
//引入store vuex
import store from '@/store'
//引入mock数据
import '@/api/mockdata.js'
//引入vant插件中的滑块组件
import { Slider } from 'vant';
Vue.use(Slider);
import 'vant/lib/slider/style'
// import VueAwesomeSwiper from  'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper)
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$API=API
  },
  router,
  store
}).$mount('#app')
