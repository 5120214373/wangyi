import Findmusic from '@/view/findmusic'
import Lebo from '@/view/lebo'
import Song from '@/view/recommendsong'
import Comment from '@/view/recommendsong/comment'
import Collect from '@/view/recommendsong/collect'
import Songlist from '@/view/recommendsong/songlist'
import Mylove from '@/view/mylove'
import Vedio from '@/view/vedio'
import vedio from '@/view/vedio/vedio'
import Mv from '@/view/vedio/mv'
import common from '@/view/vedio/common'
import Personality from '@/view/findmusic/personality'
import Singer from "@/view/findmusic/singer"
import SingerDetail from '@/view/singerdetail'
import singeral from '@/view/singerdetail/singeral'
import singerMV from '@/view/singerdetail/singermv'
import singerInfo from '@/view/singerdetail/singerinfo'
import singersimi from '@/view/singerdetail/singersimi'
import Playlist from '@/view/playlist'
import BestPlaylist from '@/view/playlist/bestplaylist'
import Focu from '@/view/focu'
import FollowList from '@/view/focu/followlist'
import FanList from '@/view/focu/fanlist'
import RecentPlay from '@/view/recentplay'
import Album from '@/view/album'
import Toplist from '@/view/findmusic/toplist'
import Live from '@/view/live'
import FM from '@/view/fm'
import Mycollect from '@/view/mycollect'
import AlbumCollect from '@/view/mycollect/albumcollect'
import VedioCollect from '@/view/mycollect/vediocollect'
import SingerCollect from '@/view/mycollect/singercollect'
import ColumnCollect from '@/view/mycollect/columncollect'
import MyCloud from '@/view/mycloud'
import LocalAndDownload from '@/view/localanddownload'
import Mylebo from '@/view/mylebo'
export default [
    {
        path:'/mylebo',
        component:Mylebo,
        meta:{show:true}
    },
    {
        path:'/mycloud',
        component:MyCloud,
        meta:{show:true}
    },
    {
        path:'/localanddownload',
        component:LocalAndDownload,
        meta:{show:true}
    },
    {
        path: '/findmusic',
        component: Findmusic,
        name: 'findmusic',
        redirect: '/findmusic/personality',
        meta: { show: true },
        children: [
            {
                path: 'personality',
                component: Personality,
                meta: { show: true },
            },
            {
                path: 'singer',
                component: Singer,
                meta: { show: true }
            }, 
            {
                path:'playlist',
                component:Playlist,
                meta:{show:true}
            },
            {
                path:'bestplaylist',
                component:BestPlaylist,
                meta:{show:true}
            },
            {
                path:'toplist',
                component:Toplist,
                meta:{show:true}
            }
        ]
    },
    {
        path: '/song',
        component: Song,
        meta: { show: true },
        redirect:'/song/songlist',
        children:[
            {
                path:'songlist',
                component:Songlist,
                meta:{show:true}
            },
            {
                path:'comment',
                component:Comment,
                meta:{show:true}
            },
            {
                path:'collect',
                component:Collect,
                meta:{show:true}
            }
        ]
    },
    {
        path: '/lebo',
        component: Lebo,
        meta: { show: true }
    },
    {
        path: '/mylove',
        component: Mylove,
        meta: { show: true },
        redirect:'/mylove/songlist',
        children:[
            {
                path:'songlist',
                component:Songlist,
                meta: { show: true }
            },
            {
                path:'comment',
                component:Comment,
                meta: { show: true }
            },
            {
                path:'collect',
                component:Collect,
                meta: { show: true }
            }
        ]
    },
    {
        path: '/vedio',
        component: Vedio,
        redirect: '/vedio/vedio',
        children: [
            {
                path: 'vedio',
                component: vedio,
                meta: { show: true }
            },
            {
                path: 'mv',
                component: Mv,
                meta: { show: true }
            }
        ]
    },
    {
        path: '/vediodetail',
        component: common,
        meta: { show: false }
    },
    {
        path: '/mvdetail',
        component: common,
        meta: { show: false }
    },
    {
        path: '/singerdetail',
        component: SingerDetail,
        meta: { show: true },
        redirect: '/singerdetail/singeral',
        children: [
            {
                path: 'singeral',
                component: singeral,
                meta: { show: true }
            },
            {
                path: 'singermv',
                component: singerMV,
                meta: { show: true }
            },
            {
                path: 'singerinfo',
                component: singerInfo,
                meta: { show: true }
            },
            {
                path: 'singersimi',
                component: singersimi,
                meta: { show: true }
            }
        ]
    },
    {
        path:'/focu',
        component:Focu,
        meta:{show:true}
    },
    {
        path:'/followlist',
        component:FollowList,
        meta:{show:true}
    },
    {
        path:'/fanlist',
        component:FanList,
        meta:{show:true}
    },
    {
        path:'/recentplay',
        component:RecentPlay,
        meta:{show:true}
    },
    {
        path:'/album',
        component:Album,
        meta:{show:true},
        redirect:'/album/songlist',
        children:[
            {
                path:'songlist',
                component:Songlist,
                meta: { show: true }
            },
            {
                path:'comment',
                component:Comment,
                meta: { show: true }
            },
            {
                path:'collect',
                component:Collect,
                meta: { show: true }
            }
        ]
    },
    {
        path:'/live',
        component:Live,
        meta:{show:true}
    },
    {
        path:'/FM',
        component:FM,
        meta:{show:true}
    },
    {
       path:'/mycollect',
       component:Mycollect,
       meta:{show:true},
       redirect:'/mycollect/albumcollect',
       children:[
        {
            path:'albumcollect',
            component:AlbumCollect,
            meta:{show:true}
        },
        {
            path:'vediocollect',
            component:VedioCollect,
            meta:{show:true}
        },
        {
            path:'columncollect',
            component:ColumnCollect,
            meta:{show:true}
        },
        {
            path:'singercollect',
            component:SingerCollect,
            meta:{show:true}
        }
       ]
    },
    {
        path: '*',
        redirect: '/findmusic/personality',
    },
]