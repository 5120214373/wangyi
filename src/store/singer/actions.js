export default {
    //保存歌手信息
    currentsinger({commit},data){
        commit("CURRENTSINGER",data)
    },
    //保存歌手mv
    singermv({commit},data){
        commit("SINGERMV",data)
    },
    //保存歌手简介
    singerinfo({commit},data){
        commit("SINGERINFO",data)
    },
    //保存相似歌手
    singersimi({commit},data){
        commit("SINGERSIMI",data)
    },
    //保存用于切换页面的active
    changeactive({commit},data){
        commit("CHANGEACTIVE",data)
    }
}