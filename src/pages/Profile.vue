<template>
  <section class="profile">
    <HeaderTop tilte="我的" />
    <section class="profile-number">
      <router-link :to="userInfor._id?'/userInfor':'/login'" class="profile-link">
        <div class="profile_image">
          <i class="iconfont icon-wode-wode"></i>
        </div>
        <div class="user-info">
          <p class="user-info-top" v-if="!userInfor.phone">{{userInfor.name||'登录/注册'}}</p>
          <p>
            <span class="user-icon">
              <i class="iconfont icon-shouji"></i>
            </span>
            <span class="icon-mobile-number">{{userInfor.phone||'暂无绑定手机号'}}</span>
          </p>
        </div>
        <span class="arrow">
          <i class="iconfont icon-jiantou1"></i>
        </span>
      </router-link>
    </section>
    <section class="profile_info_data border-1px">
      <ul class="info_data_list">
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0.00</span>元</span>
          <span class="info_data_bottom">我的余额</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>个</span>
          <span class="info_data_bottom">我的优惠</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>分</span>
          <span class="info_data_bottom">我的积分</span>
        </a>
      </ul>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 我的订单 -->
      <a href='javascript:' class="my_order">
        <span>
          <i class="iconfont icon-order-s"></i>
        </span>
        <div class="my_order_div">
          <span>我的订单</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
      <!-- 积分商城 -->
      <a href='javascript:' class="my_order">
        <span>
          <i class="iconfont icon-jifen"></i>
        </span>
        <div class="my_order_div">
          <span>积分商城</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
      <!-- 硅谷外卖会员卡 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-vip"></i>
        </span>
        <div class="my_order_div">
          <span>硅谷外卖会员卡</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 服务中心 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-fuwu"></i>
        </span>
        <div class="my_order_div">
          <span>服务中心</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px" v-if="userInfor._id">
       <el-button type="danger" class="elebutton" @click="open">点击退出</el-button>
    </section>
  </section>
</template>

<script>
import HeaderTop from '../components/HeaderTop/HeaderTop.vue'
import {mapState,mapActions} from 'vuex';

export default {
    name:'Profile',
    components: {HeaderTop},
    computed:{
      ...mapState(['userInfor',])
    },
    methods:{
      ...mapActions(['secedeUserInfor']),
      open() {
        this.$confirm('是否确认删除?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.secedeUserInfor();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },


}
</script>

<style lang="stylus">
  @import "../common/stylus/mixins.styl"
  @import '../common/stylus/profile.styl'
  .icon-wode-wode
    font-size 62px
  .icon-shouji
    font-size 22px 
  .elebutton
    width 100% !important

</style>