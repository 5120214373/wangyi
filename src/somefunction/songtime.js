//时间戳转化歌曲时长的封装
export const songtime = function(data){
    let time=new Date(data)
    let m = time.getMinutes()>=10?time.getMinutes():"0"+time.getMinutes()
    let s = time.getSeconds()>=10?time.getSeconds():"0"+time.getSeconds()
    return m+":"+s
}