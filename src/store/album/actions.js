export default {
    //album信息
   albuminfo({commit},data){
      commit('ALBUMINFO',data)
   },
   //album歌曲
   albumsongs({commit},data){
      commit('ALBUMSONGS',data)
   }
}