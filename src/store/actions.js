import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFOR,
    RECE_USER_INFOR,
    RECEIVE_SHOP_GOODS,
    RECEIVE_SHOP_INFO,
    RECEIVE_SHOP_RATING,
    ADD_FOOD_COUND,
    RE_FOOD_COUND,
    REPLACE_FOOD,
    RECEIVE_ELIMINATE_FOOD,
    SEARCH_SHOP
} from './mutations-types'

import {
    reqAddress,
    reqFooter,
    reqShps,
    reqUserinfo,
    reqLogout,
    reqShopGoods,
    reqShopInfo,
    reqShopRating,
    reqShopSousuo
} from '../api'


export default {
    //异步获取经纬度位置详情
    async getAddress({commit,state}){
        const geohash=`${state.longitude},${state.latitude}`;
        const result=await reqAddress(geohash);
        if(result.code===0){
            const address=result.data;
            commit(RECEIVE_ADDRESS,{address})
        }
    },
    //异步获取食品分类列表
    async getCategorys({commit}){
        const result=await reqFooter();
        if(result.code===0){
            const categorys=result.data;
            commit(RECEIVE_CATEGORYS,{categorys})
        }
    },
    //异步获取商铺列表
    async getShops({commit,state}){
        const longitude=state.longitude;//维度
        const latitude=state.latitude;//经度
        const result= await reqShps(longitude,latitude);
        if(result.code===0){
            const shops=result.data;
            commit(RECEIVE_SHOPS,{shops})
        }
    },

    //同步获取用户信息
    setUserInfor({commit},userInfor){
        commit(RECEIVE_USER_INFOR,{userInfor})
    },
    //异步获取会话用户信息
    async getUserInfor({commit}){
        const result=await reqUserinfo();
        if(result.code===0){
            const userInfor=result.data;
            commit(RECEIVE_USER_INFOR,{userInfor})
        }
    },
    //异步登出
    async secedeUserInfor({commit}){
        const result=await reqLogout();
        if(result.code===0){
            commit(RECE_USER_INFOR)
        }
    },

    //3个mock模拟数据
    async mockShopGoods({commit},fn){
        const result=await reqShopGoods();
        if(result.code===0){
            const goods= result.data
            commit(RECEIVE_SHOP_GOODS,{goods})
            fn && fn();
        }
    },
    async mockShopInfo({commit}){
        const result=await reqShopInfo();
        if(result.code===0){
            const info= result.data
            commit(RECEIVE_SHOP_INFO,{info})
        }
    },
    async mockShopRating({commit}){
        const result=await reqShopRating();
        if(result.code===0){
            const rating= result.data
            commit(RECEIVE_SHOP_RATING,{rating})
        }
    },

    //同步更新goods中food数据
    upFoodCound({commit},{isAdd,food}){
        if(isAdd){
            commit(ADD_FOOD_COUND,{food})
        }else{
            commit(RE_FOOD_COUND,{food})
        }
    },

    //同步获取foodPurchase数据
    upfoodPurchase({commit}){
        commit(REPLACE_FOOD);
    },

    //同步清除foodPurchase数据
    cleanUpFoodPurchase({commit}){
        commit(RECEIVE_ELIMINATE_FOOD);
    },

    //异步获取用户搜索数据
    async getShopSearch({commit},{keyword}){
        const result=await reqShopSousuo({keyword});
        if(result.code===0){
            const shopSearch=result.data;
            commit(SEARCH_SHOP,{shopSearch})
        }
    }
}