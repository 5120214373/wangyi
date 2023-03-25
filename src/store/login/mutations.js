export default {
    TOLOGIN(state){
        state.isLogin=true
    },
    TOEXITLOGIN(state){
        state.isExitLogin=!state.isExitLogin
    },
    EXITLOGIN(state){
        state.isLogin=false
    },
    CHANGESENSE(state,index){
        state.loginSense=index
    },
    SUCCESSLOGIN(state,data){
        state.successlogin=data
    }
}