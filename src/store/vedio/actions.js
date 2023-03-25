export default {
    //保存视频播放地址
    vediourl({commit},data){
        commit("VEDIOURL",data)
    },
    //保存视频详情
    vediodetail({commit},data){
        commit("VEDIODETAIL",data)
    },
    //保存相关视频
    linkvedio({commit},data){
        commit("LINKVEDIO",data)
    },
    //保存active的zhi
    active({commit},data){
        commit("ACTIVE",data)
    }
}