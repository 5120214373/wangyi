<template>
  <div class="container">
    <div class="top">
        <div class="data">
            <span>{{userDetailInfo.eventCount}}</span>
            <div>动态</div>
        </div>
        <div class="data" @click="toFollowList">
            <span>{{userDetailInfo.follows}}</span>
            <div>关注</div>
        </div>
        <div class="data" @click="toFanList">
            <span>{{userDetailInfo.followeds}}</span>
            <div>粉丝</div>
        </div>
    </div>
    <div class="center">
        <div class="border"> 
            <div class="iconfont icon-qiandao"></div>
            <button>签到</button>
        </div>
    </div>
    <div class="bottom">
        <ul>
            <li>
                <div class="iconfont icon-huiyuan"></div>
                <span>会员中心</span>
                <div class="right">&gt;</div> 
            </li>
            <li>
                <div class="iconfont icon-dengji"></div>
                <span>等级</span>
                <div class="right"><span>Lv.{{grade}}</span>&gt;</div> 
            </li>
            <li>
                <div class="iconfont icon-shangcheng"></div>
                <span>商城</span>
                <div class="right">&gt;</div> 
            </li>
            <li class="litop">
                <div class="iconfont icon-gerenxinxi"></div>
                <span>个人信息设置</span>
                <div class="right">&gt;</div> 
            </li>
            <li>
                <div class="iconfont icon-bangding"></div>
                <span>绑定社交账号</span>
                <div class="right">&gt;</div> 
            </li>
            <li class="litop">
                <div class="iconfont icon-kefu"></div>
                <span>我的客服</span>
                <div class="right">&gt;</div> 
            </li>
            <li class="litop" @click="exitlogin">
                <div class="iconfont icon-icon"></div>
                <span>退出登录</span>
                <div class="right">&gt;</div> 
            </li>
        </ul>
    </div>
  </div>

</template>

<script>
import {setItem,getItem,removeItem} from '@/somefunction/localstorage'
export default {
    data(){
        return {
            userDetailInfo:{},
            grade:0
        }
    },
   methods:{
    //退出登录
    async exitlogin(){
        //发退出请求
        let result = await this.$API.logout()
        let res=await this.$API.checklogin()
        // console.log(res)
        if(result.data.code==200){
           alert('退出账号成功')
        }
        //删除用户信息
        removeItem('user')
        //修改successlogin
        this.$store.dispatch('login/successlogin',false)
        //关闭用户信息页面
        this.$store.dispatch('login/toexitlogin')
    },

     //获取用户详细信息
    async getUserDetailInfo(id) {
      let result = await this.$API.userDetailInfo(id);
      this.userDetailInfo = result.data.profile;
    },
    //跳转到用户的关注列表
    toFollowList(){
      this.$router.push('/followlist')
    },
    //跳转到用户的粉丝列表
    toFanList(){
      this.$router.push('/fanlist')
    },
    //获取用户账号等级
    async getUserGrade(){
        let res = await this.$API.userGrade()
        this.grade=res.data.data.level
    }
   },
   mounted(){
    //获取用户详细信息
      this.getUserDetailInfo(getItem('user').userId)
      //获取用户账号等级
      this.getUserGrade()
   }
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  background-color: #fff;
  box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}
.container .top{
    height:20%;
    width:100%;
    /* background:yellow; */
    display:flex;
    justify-content: space-around;
    align-items: center;
}
.container .top .data{
    height:60%;
    width:30%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.container .top .data span{
    font-size: 20px;
}
.container .center{
    height:10%;
    width:100%;
    /* background:orange; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.container .center .border{
    height:30px;
    width:70px;
    border:1px solid #ededed;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container .center .border button{
    border:none;
    background: none;
}
.container .bottom{
    height:70%;
    width:100%;
    /* background: skyblue; */
}
.container .bottom ul{
    height:99%;
    width:100%;
    display: flex;
    flex-direction: column;
    list-style: none;
}
.container .bottom ul li{
    flex:1;
    display: flex;
    align-items: center;
    position: relative;
}
.container .bottom ul li.litop{
    border-top:1px solid #ededed;
    
}
.container .bottom ul li .iconfont{
    margin:0 10px;
}
.container .bottom ul li .right{
    position:absolute;
    right:10px;
    top:10px;
    font-size:13px;
}
.container .bottom ul li .right span{
    margin-right:5px;
}
.container .bottom ul li span{
    font-size: 13px;
}
</style>