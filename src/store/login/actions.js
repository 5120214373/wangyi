export default {
    //登录
    tologin({commit}){
        commit('TOLOGIN')
    },
    //已登录后退出登录
    toexitlogin({commit}){
        commit('TOEXITLOGIN')
    },
    //退出登录界面
    exitlogin({commit}){
        commit('EXITLOGIN')
    },
    //改变登录的页面
    //1  密码登录
    //2  验证码登录
    //3  注册
    changesense({commit},index){
        commit('CHANGESENSE',index)
    },
    //是否成功登录
    successlogin({commit},data){
        commit('SUCCESSLOGIN',data)
    }
}