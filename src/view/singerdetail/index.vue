<template>
  <div class="outter">
    <div class="contianer">
        <singer-header/>
        <div class="choice">
            <ul>
                <li :class="{active:active==1}" @click="change(1)"><router-link to="/singerdetail/singeral">专辑</router-link></li>
                <li :class="{active:active==2}" @click="change(2)"><router-link to="/singerdetail/singermv">MV</router-link></li>
                <li :class="{active:active==3}" @click="change(3)"><router-link to="/singerdetail/singerinfo">歌手详情</router-link></li>
                <li :class="{active:active==4}" @click="change(4)"><router-link to="/singerdetail/singersimi">相似歌手</router-link></li>
            </ul>
        </div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import singerHeader from './header'
import {mapState} from 'vuex'
export default {
    data(){
        return {
           
        }
    },
    computed:{
        ...mapState({
            currentSinger:state=>state.singer.currentSinger,
            active:state=>state.singer.active
        })
    },
  components:{
    singerHeader
  },
  methods:{
    //点击添加样式
    change(index){
       this.$store.dispatch('singer/changeactive',index)
    },
  },

}
</script>

<style scoped>
.outter{
    width:100%;
    height:100%;
    overflow-y: scroll;
}
.container{
    width:100%;
}
.outter .choice{
    height: 50px;
    width:100%;
}
.outter .choice ul{
    list-style:none;
    display: flex;
    height:100%;
    margin-left:10px;
}
.outter .choice ul li{
    height:100%;
    margin:0 10px;
    line-height:50px;
    color:#555;
}
.outter .choice ul li a{
    height:100%;
    width:100%;
    display: inline-block;
    text-decoration: none;
    color: #555;
}
.outter .choice ul li:hover a{
    color:#000;
}
.outter .choice ul li.active a{
    font-size:20px;
    font-weight: bold;
    border-bottom: 2px solid red;
    color:#000;
}
</style>