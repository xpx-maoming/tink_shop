<template>
  <section class="order">
    <!-- <header class="header">
      <a class="header_title">
        <span class="header_title_text">订单列表</span>
      </a>
    </header> -->
    <HeaderTop tilte="订单"></HeaderTop>
    <section class="order_no_login">
      <img src="./images/order/person.png" />
      <h3>登录后查看外卖订单</h3>
      <button>立即登陆</button>
    </section>
  </section>
</template>

<script>
import HeaderTop from '../components/HeaderTop/HeaderTop.vue'
export default {
  name: "Order",
  components: {HeaderTop},
  

};
</script>

<style lang="stylus">
@import "../common/stylus/mixins.styl"
@import '../common/stylus/order.styl'

</style>