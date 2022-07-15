import Vue from 'vue'
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
    RECEIVE_ELIMINATE_FOOD,
    SEARCH_SHOP
} from './mutations-types'

export default {
    [RECEIVE_ADDRESS](state,{address}){
        state.address=address
    },
    [RECEIVE_CATEGORYS](state,{categorys}){
        state.categorys=categorys
    },
    [RECEIVE_SHOPS](state,{shops}){
        state.shops=shops
    },
    [RECEIVE_USER_INFOR](state,{userInfor}){
        state.userInfor=userInfor
    },
    [RECE_USER_INFOR](state){
        state.userInfor={}
    },
    //3个mock模拟数据
    [RECEIVE_SHOP_GOODS](state,{goods}){
        state.goods=goods
    },
    [RECEIVE_SHOP_INFO](state,{info}){
        state.info=info
    },
    [RECEIVE_SHOP_RATING](state,{rating}){
        state.rating=rating
    },
    [ADD_FOOD_COUND](state,{food}){
        if(!food.cound){
            Vue.set(food,'cound',1);
            //给foodPurchase添加数据
            state.foodPurchase.push(food);
        }else{
            food.cound++;
        }
    },
    [RE_FOOD_COUND](state,{food}){
        if(food.cound){
            food.cound--;
            //当food.cound为0时，移除foodPurchase中的food属性
            if(food.cound===0){
                state.foodPurchase.splice(state.foodPurchase.indexOf(food),1)
            }
        }
    },
    //清空选择菜单列表
    [RECEIVE_ELIMINATE_FOOD](state){
        //清除菜单列表中的cound
        state.foodPurchase.forEach((item)=>{
            return item.cound=0
        })

        //重置foodPurchase
        state.foodPurchase=[];
    },
    
    //异步获取用户搜索信息
    [SEARCH_SHOP](state,{shopSearch}){
        state.shopSearch=shopSearch
    }
}