<template>
  <div class="container">
    <div class="header">
        <div class="title">
            <div class="dynamicname">动态</div>
            <div class="send"><span class="iconfont icon-gaixie"></span>发动态</div>
        </div>
        <div class="write">
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <div class="placeholder">近三个月无新歌</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container{
    width:90%;
    margin:0 auto;
}
.container .header{
    width:100%;
    height:150px;
}
.container .header .title{
    height:70px;
    width:100%;
    display: flex;
    align-items: center;
}
.container .header .title .dynamicname{
    height:100%;
    width:70px;
    line-height: 70px;
    font-size: 20px;
    font-weight: bold;
}
.container .header .title .send{
    height:30px;
    width:90px;
    line-height:30px;
    border-radius: 20px;
    text-align: center;
    background:red;
    color:#fff;
    font-size:13px;
    display:flex;
    align-items: center;
    justify-content: center;
}
.container .header .title .send span{
    font-size:20px;
}
.container .header .write{
    width:100%;
    height:60px;
    position: relative;
}
.container .header .write textarea{
  height: 100%;
  width: 100%;
  resize: none;
  outline: none;
  border: none;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 15px;
  padding:5px;
  box-sizing: border-box;
}
.container .header .write .placeholder{
   position: absolute;
   top:50%;
   left:50%;
   transform: translate(-50%,-50%);
   color:#e0e0e0;
}
</style>