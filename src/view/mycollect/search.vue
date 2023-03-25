<template>
  <div class="searchcontainer">
    <slot name="album"></slot>
    <slot name="vedio"></slot>
    <slot name="singer"></slot>
    <slot name="column"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.searchcontainer {
  margin-top: 20px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.searchcontainer .left {
  font-size: 15px;
  margin-left: 20px;
  line-height: 40px;
  font-weight: bold;
}
.searchcontainer .left span{
    color:#ddd;
    font-size:13px;
    font-weight: none;
    margin-left:5px;
}
.searchcontainer .search {
  height: 60%;
  width: 200px;
  background: #f7f7f7;
  border-radius: 20px;
  margin-right: 20px;
  display: flex;
  align-items: center;
}
.searchcontainer .search input {
  outline: none;
  border: none;
  background: #f7f7f7;
  margin-left: 15px;
  height: 100%;
  /* color:#c6c6c6; */
  line-height: 30px;
  width: 160px;
  font-size: 13px;
}
</style>