<template>
  <section class="msite">
    <HeaderTop :tilte="address.name" >
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span 
          class="header_login_text" 
          v-if="!userInfor._id" 
          @click="skipUserInfor('/login')"
        >登录|注册</span>
        <span 
          class="header_login_text iconfont icon-gerenzhongxin" 
          v-else 
          @click="skipUserInfor('/userInfor')"
        ></span>
      </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav" >
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(category,index) in navCategorys" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(item) in category" :key="item.id">
              <div class="food_container">
                <img :src="`${baseImageUrl}${item.image_url}`" />
              </div>
              <span>{{item.title}}</span>
            </a>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div v-else>
        <img src="./images/MSiteImg/msite_back.svg" alt="svg">
      </div>
    </nav>
    <ShopList/>
  </section>
</template>

<script>
import HeaderTop from "../components/HeaderTop/HeaderTop.vue";
import ShopList from '../components/ShopList/ShopList.vue'
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import {mapState} from 'vuex';

export default {
  name: "MSite",
  data(){
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com',
    }
  },
  components: { HeaderTop ,ShopList},
  computed:{
    ...mapState(['address','categorys','userInfor']),
    //首页导航
    navCategorys(){
      let maxArr=[];
      let minArr=[];
      this.categorys.forEach(item => {
        minArr.push(item);
        if(minArr.length===8){
          maxArr.push([...minArr]);
          minArr=[]
        }
      });
      if(minArr.length>0){
        maxArr.push([...minArr])
      }
      return maxArr
    },
  },
  watch:{
    categorys(){
      this.$nextTick(function(){
        new Swiper(".swiper-container", {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
          },
        });
      })
      
    }
  },
  methods:{
    skipUserInfor(url){
      this.$router.replace(url)
    }
  },
  mounted() {
    //发送地址请求
      this.$store.dispatch('getAddress');
    //发送首页导航请求
      this.$store.dispatch('getCategorys');
  },
};
</script>

<style lang="stylus" >
  @import '../common/stylus/mixins.styl'
  @import '../common/stylus/msite.styl'
</style>