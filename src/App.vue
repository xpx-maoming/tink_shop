<template>
  <div id="app">
    <router-view />
    <FooterGuide v-if="$route.meta.showFooterGuide"></FooterGuide>
  </div>
</template>

<script>
import {mapActions,} from 'vuex'
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  name: "App",
  components: {FooterGuide},
  methods:{
    ...mapActions(['getUserInfor'])
  },
  mounted(){
    this.getUserInfor()
  }
};
</script>

<style lang="stylus">
  @import "./common/stylus/mixins.styl"

  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative


</style>
