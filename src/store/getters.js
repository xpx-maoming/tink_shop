export default {
    foodPurchaseCount(state){
        return state.foodPurchase.reduce((acc,item)=>acc+item.cound,0);
    },
    foodPurchaseSumCountPrice(state){
        return state.foodPurchase.reduce((acc,item)=>acc+item.cound*item.price,0);
    }
}