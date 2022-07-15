import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../pages/MSite.vue'
import Search from '../pages/Search.vue'

Vue.use(VueRouter)


export default new VueRouter({
    routes: [
        {
            path: '/mSite',
            component: MSite,
            meta:{
                showFooterGuide:true,
            },
        },
        {
            path:'/search',
            component:Search,
            meta:{
                showFooterGuide:true,
            },
        },
        {
            path:'/order',
            component:()=>import('../pages/Order'),
            meta:{
                showFooterGuide:true,
            },
        },
        {
            path:'/profile',
            component:()=>import('../pages/Profile'),
            meta:{
                showFooterGuide:true,
            },
        },
        {
            path:'/login',
            component:()=>import('../pages/Login/Login.vue'),
        },
        {
            path:'/shop',
            component:()=>import('../pages/Shop/Shop.vue'),
            children:[
                {
                    path:'shopGoods',
                    component:()=>import('../pages/ShopPage/ShopGoods'),
                },
                {
                    path:'shopRating',
                    component:()=>import('../pages/ShopPage/ShopRating'),
                },
                {
                    path:'shopInfo',
                    component:()=>import('../pages/ShopPage/ShopInfo'),
                },
                {
                    path:'/',
                    redirect:'shopGoods',
                }
            ]
        },
        {
            path:'/shop',
            component:()=>import('../pages/Shop/Shop.vue')
        },
        {
            path:'/',
            redirect:'/mSite',
        }
    ]
})