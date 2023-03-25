import findmusic from './findmusic'
import login from './login'
import search from './search'
import sidebar from './sidebar'
import song from './song'
import vedio from './vedio'
import singer from './singer'
import playlist from './playlist'
import album from './album'
import mycollect from './mycollect'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
     modules:{
        findmusic,
        login,
        search,
        sidebar,
        song,
        vedio,
        singer,
        playlist,
        album,
        mycollect
     }
})