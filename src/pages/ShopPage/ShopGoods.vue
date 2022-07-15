<template>
  <!-- 点餐 -->
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <!-- current 选中的样式 -->
        <li class="menu-item"
          v-for="(good,index) in goods" 
          :key="index"
          :class="{current:index===currentIndex}"
          @click="menuItem(index)"
        >
          <span class="text bottom-border-1px" >
            <img
              class="icon"
              :src="good.icon"
              v-if="good.icon"
            />
            {{good.name}}
          </span>
        </li>
      </ul>
    </div>

    <div class="foods-wrapper">
      <ul ref="foodsUl">
        <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li 
              class="food-item bottom-border-1px" 
              v-for="(food,index) in good.foods" 
              :key="index"
              @click="isFood(food)"
            >
              <div class="icon">
                <img
                  width="57"
                  height="57"
                  :src="food.icon"
                />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售 {{food.sellCount}} 份</span>
                  <span>好评率 {{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food" />
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShopCart />
    <Food v-if="foodIf.isShow" :foodIf="foodIf" :food="food" />
  </div>
    
</template>

<script>
import ShopCart from '../../components/ShopCart/ShopCart.vue'
import CartControl from '../../components/CartControl/CartControl.vue'
import Food from '../../components/Food/Food.vue'
import BScroll from '@better-scroll/core'
import {mapState,mapActions} from 'vuex'
export default {
  name: "ShopGoods",
  components:{CartControl,Food,ShopCart},
  data(){
    return {
      foodsListY:0,//商品右侧的Y轴距离
      foodsListArr:[],//商品列表这种li的高度
      foodIf:{
        isShow:false
      },
      food:{},
    }
  },
  computed:{
    ...mapState(['goods',]),
    currentIndex(){
      const {foodsListY,foodsListArr}=this;
      let i=foodsListArr.findIndex((item,index)=>{
        return foodsListY>=item && foodsListY<foodsListArr[index+1]
      });
      return i

    },
  },
  methods:{
    ...mapActions(['mockShopGoods',]),
    _foodsCroll(){
      this.scrollFoods=new BScroll('.foods-wrapper',{
            probeType: 2,
            click:true,
      });
      this.scrollFoods.on('scroll',({x,y})=>{
        this.foodsListY=parseInt(Math.abs(y+x));
      });
      this.scrollFoods.on('scrollEnd',({x,y})=>{
        this.foodsListY=parseInt(Math.abs(y+x));
      });
    },
    _foodsCrollLis(){
      //初始化数据
        let li=this.$refs.foodsUl.getElementsByClassName('food-list-hook');
        let jis=0;
        //操作数据
        let foodsListArr=[...li].reduce((acc,item)=>{
          jis+=item.clientHeight;
          return [...acc,Math.abs(jis)]
        },[0])
        //更新数据
        this.foodsListArr=foodsListArr;
    },
    //点击自动滑动效果
    menuItem(index){
      let foodsListY=this.foodsListArr[index];
      this.foodsListY=foodsListY;
      this.scrollFoods.scrollTo(0, -foodsListY, 300)
    },
    //点击传递数据给Food组件
    isFood(food){
      this.foodIf.isShow=true;
      this.food=food;
    }
  },
  mounted(){
    this.mockShopGoods(()=>{
      this.$nextTick(()=>{
        //滚动效果
        this.scrollMenu=new BScroll('.menu-wrapper',{
          click:true,
        });
        this._foodsCroll();
        this._foodsCrollLis();
      })
    });
  },
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
