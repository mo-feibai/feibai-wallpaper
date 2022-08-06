// 路由懒加载
const Home = () => import('@views/Home.vue')
const PicGallery = () => import('@views/PicGallery.vue')
const TodayPic = () => import('@views/TodayPic.vue')

// 路由配置信息
export default [
    {
        name: "home",
        path: '/home',
        component: Home,

    },
    {
        name: "PicGallery",
        path: '/picGallery',
        component: PicGallery,
    },
    {
        name: "todayPic",
        path: '/todayPic',
        component: TodayPic,
    },
    {
        path: '/',
        redirect: '/todayPic'
    },
]