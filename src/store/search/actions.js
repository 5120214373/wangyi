export default {
    //获取热搜榜歌单
    gethotlist({commit},data){
        commit('GETHOTLIST',data)
    },
    //关键字搜索的相关数据
    keysearch({commit},data){
        commit('KEYSEARCH',data)
    },
}