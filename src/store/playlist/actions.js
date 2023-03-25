export default {
    //保存分页器的页数
    pagecount({commit},data){
        commit('PAGECOUNT',data)
    },
    //保存歌单评论
    playlistcomment({commit},data){
        commit('PLAYLISTCOMMENT',data)
    },
    //保存资源类型
    savetype({commit},data){
        commit('SAVETYPE',data)
    }
}