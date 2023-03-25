export default {
    //保存用于切换页面的active
    changeactive({commit},data){
        commit("CHANGEACTIVE",data)
    },
    //保存收藏专辑
    savealbumcollect({commit},data){
        commit("SAVEALBUMCOLLECT",data)
    },
    //保存收藏视频
    savevediocollect({commit},data){
        commit("SAVEVEDIOCOLLECT",data)
    },
    //保存收藏歌手
    savesingercollect({commit},data){
        commit("SAVESINGERCOLLECT",data)
    }
    //保存收藏专栏

}