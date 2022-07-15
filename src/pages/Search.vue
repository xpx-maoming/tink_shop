<template>
  <section class="search">
      <HeaderTop tilte="搜索" />
      <form class="search_form" action="#" @submit.prevent="search">
        <input 
          type="search" 
          name="search" 
          placeholder="请输入商家或美食名称" 
          class="search_input"
          v-model="text"
        >
        <input 
          type="submit" 
          name="submit" 
          class="search_submit"
        >
      </form>
    </section>
</template>

<script>
import {mapActions} from 'vuex'
import HeaderTop from '../components/HeaderTop/HeaderTop.vue'
export default {
  name:'Search',
  data(){
    return {
      text:''
    }
  },
  components: {HeaderTop},
  methods:{
    ...mapActions(['getShopSearch']),
    search(){
      let {text}=this;
      if(text.trim()){
        this.getShopSearch(text)
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../common/stylus/search.styl'

</style>