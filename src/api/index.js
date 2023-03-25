import requests from './requests'
import mockrequest from './mock'
import qs from 'qs'
//mock数据
export const getdata=()=>mockrequest({url:'/goods/goodAll',method: 'post'})
//获取登录验证码
export const getcode=()=>mockrequest({url:'/getcode',method:'post'})
//返回歌单歌曲
export const getsongdata=()=>mockrequest({url:'/songdata',method:'post'})


// --------------------------------------------------------------------------------
//登录有关的请求
//二维码登录得到二维码的key
export const getkey=()=>requests({url:'/login/qr/key',method:'get'})
//二维码生成
export const createcode=(data)=>requests({url:`/login/qr/create?key=${data}`,method:'post'})
//检查是否扫了二维码
export const checkcode=(data)=>requests({url:`/login/qr/check?key=${data}`,method:'post'})
//验证登录状态
export const checklogin=()=>requests({url:'/login/status',method:'get'})
//验证码登录给手机号发送验证码
export const sendcode=(data)=>requests({url:`/captcha/sent?phone=${data}`,method:'post'})
//验证验证码和手机号
export const verifycodeandphone=(phone,code)=>requests({url:`/captcha/verify?phone=${phone}&captcha=${code}`})
//注册网易云音乐账号
export const registeruser=(phone,password,code,nickname)=>requests({url:`/register/cellphone?phone=${phone}&password=${password}&captcha=${code}&nickname=${nickname}`,method:'post'})
//验证手机号是否已注册
export const verifyregister=(phone)=>requests({url:`/cellphone/existence/check?phone=${phone}`,method:'post'})
//退出登录
export const logout=()=>requests({url:'/logout',method:'get'})


// ----------------------------------------------------------------------------------
//与findmusic组件有关的
//首页轮播图的数据
export const swiperdata = ()=>requests({url:'/banner',method:'get'})




//-----------------------------------------------------------------------------------
//和专辑有关
//获得专辑内容
export const albumContent=(id)=>requests({url:`/album?id=${id}`,method:'post'})
//获得专辑评论
export const albumComment=(id,offset)=>requests({url:`/comment/album?id=${id}&offset=${offset}`,method:'post'})














//---------------------------------------------------------------------------------
//和歌曲相关的请求
//获得歌曲的全部信息
export const lovesong=(data)=>requests({url:`/song/detail?ids=${data}`,method:'post'})
//获得具体歌单的歌曲
export const getplaylistsong=(data)=>requests({url:`/playlist/detail?id=${data}`,method:'post'})
//点击歌曲获得播放的资源
export const playsonginfo=(data)=>requests({url:`/song/url?id=${data}`,method:'post'})
//返回热搜榜歌单
export const gethot=()=>requests({url:'/search/hot/detail',method:'get'})
//默认搜索的关键词
export const keyDefault=()=>requests({url:'/search/default',method:'get'})
//搜索歌曲
export const keysearch=(data)=>requests({url:`/search/suggest?keywords=${data}`,method:'post'})
//10个推荐榜单
export const recommendlist=(data)=>requests({url:`/personalized?limit=${data}`,method:'post'})
//获得歌曲的歌词
export const getlyric=(data)=>requests({url:`/lyric/new?id=${data}`,method:'post'})
//最近播放的100首歌
export const recentPlay=()=>requests({url:`/record/recent/song`,method:'get'})


//---------------------------------------------------------------------------------
//与用户信息有关
//获得用户的心动歌单的所有歌曲的id
export const lovelist=(data)=>requests({url:`/likelist?uid=${data}`,method:'post'})
//获取用户的关注列表
export const userFocuList=(data)=>requests({url:`/user/follows?uid=${data}`,method:'post'})
//获取用户的粉丝列表
export const userFanList=(data)=>requests({url:`/user/followeds?uid=${data}`,method:'post'})
//获取用户账号信息
export const userDetailInfo=(data)=>requests({url:`/user/detail?uid=${data}`,method:'post'})
//获取热门话题
export const hotTopic=(limit,offset)=>requests({url:`/hot/topic?limit=${limit}&offset=${offset}`})
//是否喜欢歌曲
export const isLikeSong=(data,id)=>requests({url:`/like?id=${id}&like=${data}`,method:'post'})
//获取用户账号等级
export const userGrade=()=>requests({url:"/user/level",method:'get'})
//对评论进行点赞或者取消点赞 id:视频，mv，歌手，专辑的id cid：是评论的id t:是否点赞(1为点赞，0取消点赞) type:资源类型(视频，mv等)
export const addOrDelAgree=(id,cid,t,type)=>requests({url:`/comment/like?id=${id}&cid=${cid}&t=${t}&type=${type}`,method:'post'})










//-----------------------------------------------------------------------------------
//与vedio有关
//获取视频标签列表
export const vediotaglist=()=>requests({url:'/video/category/list'})
//获取推荐视频
export const recommendvedio=(data)=>requests({url:`/video/timeline/recommend?offset=${data}`})
//获取全部视频
export const allvedio=()=>requests({url:'/video/timeline/all'})
//获取视频详情
export const vediodetail=(data)=>requests({url:`/video/detail?id=${data}`,method:'post'})
//获取视频播放资源
export const vediourl=(data)=>requests({url:`/video/url?id=${data}`,method:'post'})
//获取视频的相关视频
export const linkvedio=(data)=>requests({url:`/related/allvideo?id=${data}`,method:'post'})
//获取视频的评论
export const vedioComment=(id,offset)=>requests({url:`/comment/video?id=${id}&offset=${offset}`})



//----------------------------------------------------------------------------------------
//与mv相关
//获取最新mv
export const newmv=()=>requests({url:'/mv/first?limit=8',method:'post'})
//获取网易出品mv
export const wangyimv=()=>requests({url:'/mv/exclusive/rcmd?limit=8',method:'post'})
//获取mv排行榜
export const toplistmv=()=>requests({url:'/top/mv?limit=10',method:'post'})
//获取相似mv
export const simimv=(data)=>requests({url:`/simi/mv?mvid=${data}`,method:'post'})
//获取mv地址
export const mvurl=(data)=>requests({url:`/mv/url?id=${data}`,method:'post'})
//获取mv数据
export const mvdata=(data)=>requests({url:`/mv/detail/info?mvid=${data}`,method:'post'})
//获取mv的评论
export const mvComment=(id,offset)=>requests({url:`/comment/mv?id=${id}&offset=${offset}`,method:'post'})



//-----------------------------------------------------------------------------------------
//与歌手相关
//获取热门歌手
export const hotSinger=(data)=>requests({url:`/artist/list?type=-1&area=-1&initial=-1&offset=${data}`,method:'post'})
//歌手的50首歌曲
export const fiftySongs=(data)=>requests({url:`/artist/top/song?id=${data}`,method:'post'})
//获得歌手的MV
export const singerMV=(data)=>requests({url:`/artist/mv?id=${data}`,method:'post'})
//获得歌手详情
export const singerInfo=(data)=>requests({url:`/artist/detail?id=${data}`,method:'post'})
//获取相似歌手
export const singersimi=(data)=>requests({url:`/simi/artist?id=${data}`,method:'post'})



//-------------------------------------------------------------------------------------
//和歌单有关
//获得热门歌单分类
export const hotPlaylistTag=()=>requests({url:'/playlist/hot',method:'get'})
//获得精品歌单
export const bestPlaylist=(offset)=>requests({url:`/top/playlist/highquality?before=${offset}&limit=30`,method:'post'})
//获得热门歌单
export const hotPlaylist=(offset)=>requests({url:`/top/playlist?limit=50&order=hot&offset=${offset}`,method:'post'})
//获取歌单评论
export const playlistComment=(id,offset)=>requests({url:`/comment/playlist?id=${id}&offset=${offset}`,method:'post'})




//----------------------------------------------------------------------------------------
//与排行榜相关
//获取排行榜
export const topList=()=>requests({url:'/toplist',method:'get'})






//------------------------------------------------------------------------------------------
//与我的收藏相关
//专辑收藏
export const albumCollect=()=>requests({url:'/album/sublist',method:'get'})
//收藏专辑或者取消收藏专辑 t:1收藏，0取消收藏
export const addOrDelAlbumCollect=(id,t)=>requests({url:`/album/sub?t=${t}&id=${id}`,method:'post'})
//获取歌单收藏者数据
export const playlistCollector=(id,offset)=>requests({url:`/playlist/subscribers?id=${id}&limit=30&offset=${offset}`,method:'post'})
//收藏歌单或者取消收藏歌单 t:1收藏，2取消收藏
export const addOrDelPlaylistCollect=(id,t)=>requests({url:`/playlist/subscribe?t=${t}&id=${id}`,method:'post'})
//mv收藏
export const mvCollect=()=>requests({url:'/mv/sublist',method:'get'})
//收藏或取消收藏mv t:1为收藏，其他为取消收藏
export const addOrDelMvCollect=(id,t)=>requests({url:`/mv/sub?t=${t}&mvid=${id}`,method:'post'})
//收藏或取消收藏视频 t:1为收藏，其他为取消收藏
export const addOrDelVedioCollect=(id,t)=>requests({url:`/video/sub?t=${t}&id=${id}`,method:'post'})
//专栏收藏 
export const columnCollect=(offset)=>requests({url:`/topic/sublist?limit=30&offset=${offset}`})
//歌手收藏
export const singerCollect=()=>requests({url:`/artist/sublist`,method:'get'})
//收藏或取消收藏歌手 t:1为收藏，其他为取消收藏
export const addOrDelSingerCollect=(id,t)=>requests({url:`/artist/sub?t=${t}&id=${id}`,method:'post'})
