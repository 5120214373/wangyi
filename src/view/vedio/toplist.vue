<template>
   <div class="container">
       <div class="content" v-for="(item,index) in mvinfo" :key="item.id">
          <div class="index">{{index+1<10?"0"+(index+1):index+1}}</div>
          <img :src="item.cover" alt="">
          <div class="font">
            <div class="mvname">{{item.name}}</div>
            <div class="creaetor">{{item.artistName}}</div>
          </div>
       </div>
   </div>
</template>

<script>
export default {
props:['mvinfo']
}
</script>

<style scoped>
.container{
    width:100%;
    display: flex;
    flex-wrap: wrap;
}
.container .content{
    width:49%;
    height:100px;
    display: flex;
    padding:10px 0;
    border-bottom:1px solid #f2f2f2;
}
.container .content:nth-child(2n+1) 
{
    border-right:1px solid #f2f2f2;
}
.container .content .index{
    height:100%;
    width:50px;
    text-align: center;
    line-height:100px;
    font-size: 22px;
    color:#888;
    font-family: 'Courier New', Courier, monospace;
}
.container .content img{
    border-radius: 5px;
}
.container .content .font{
    padding-left:10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 13px;
}
</style>