<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="signShannel?'on':''" @click="signShannel=!signShannel"
          >短信登录</a>
          <a href="javascript:;" :class="signShannel?'':'on'" @click="signShannel=!signShannel">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="signShannel?'on':''">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button  
                  class="get_verification" 
                  :class="phoneRegular?'phones':''"
                  @click.prevent="changeCode()"
                  >{{codeChange?`已发送(剩余${codeTime}秒)`:'获取验证码'}}</button>
                <!-- disabled="disabled" -->
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
          </div>
          <div :class="signShannel?'':'on'">
            <section>
              <section class="login_message">
                  <input 
                    type="tel" 
                    maxlength="11" 
                    placeholder="手机/邮箱/用户名"
                    v-model="name"
                  >
              </section>
              <section class="login_verification">
                  <input type="tel" maxlength="8" placeholder="密码" v-model="pwd" v-if="pwdJudge">
                  <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                  <div 
                    class="switch_button" 
                    @click="pwdJudge=!pwdJudge"
                    :class="pwdJudge?'off':'on'"
                  >
                    <div class="switch_circle" :class="{right:pwdJudge}"></div>
                    <span class="switch_text">{{pwdJudge?'...':'abc'}}</span>
                  </div>
              </section>
              <section class="login_message">
                  <input 
                    type="text" 
                    maxlength="11" 
                    placeholder="验证码" 
                    v-model="captcha"
                  >
                  <img 
                    class="get_verification" 
                    src="http://localhost:4000/captcha" 
                    alt="captcha" 
                    @click="loadCaptcha" 
                    ref="captchaImg"
                  >
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="addEnroll()">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-zuojiantou"></i>
      </a>
      </div>
      <AlertTip v-show="changeAlertTip" :alertText="alertText" @closeTip="closeTip" />
  </section>
</template>

<script>
import {reqSendcode,reqLoginSms,reqLoginPwd,} from '../../api'
import {mapState} from 'vuex'
import AlertTip from '../../components/AlertTip/AlertTip.vue'
export default {
    namne:'Login',
    components:{AlertTip,},
    data(){
      return {
        signShannel:false,//登录渠道
        pwdJudge:true,//密码切换
        phone:'',//手机号
        code:'',//手机验证码
        codeTime:30,//手机验证码所需时间
        codeChange:false,//手机验证码是否可以点击
        name:'',//用户名
        pwd:'',//密码
        captcha:'',//图形验证码 transform translateX(30px)
        changeAlertTip:false,//切换AlertTip组件
        alertText:'',
      }
    },
    computed:{
      //手机检验正则表达式
      phoneRegular(){
        return /^(13[0-9]|14[01456879]|15[0-35-9]|17[0-8]|18[0-9]|19[0-35-9])\d{8}/.test(this.phone)
      },
      ...mapState(['imgCode'])
    },
    methods:{
      //验证码点击功能
      async changeCode(){
        if(this.phoneRegular){
          this.codeChange=true;
          if(this.codeChange){
            //倒计时功能
            this.dingshiqi=setInterval(()=>{
              this.codeTime--;
              if(this.codeTime<=0){
                this.codeTime=30;
                this.codeChange=true
                clearInterval(this.dingshiqi)
              }
            },1000)
            //发送AJAX请求
            const res=await reqSendcode(this.phone);
            //请求失败
            if(res.code===1){
              //显示提示框
              this.tipsAlertTip(res.msg);
              //停止计时器
              clearInterval(this.dingshiqi)
              this.codeChange=false;
              this.dingshiqi=undefined;
            }
          }
        }
      },
      //登录提示
      tipsAlertTip(item){
        this.alertText=item;
        this.changeAlertTip=true;
      },
      //登录功能
      async addEnroll(){
        if(this.signShannel){
          //短信登录
          if(!this.phoneRegular){
            //判断手机号是否正确
            this.tipsAlertTip('手机号码不正确');
            return ;          
          }else if(!/^\d{6}$/.test(this.code)){
            //判断验证码是否正确 
            this.tipsAlertTip('验证码不正确');
            return;
          }
          const result=await reqLoginSms(this.phone,this.code);
          if(result.code===0){
            //跳转路径
            this.$router.back();
          }else{
            this.tipsAlertTip(result.msg)
          }
        }else{
          //密码登录
          let {name,pwd,captcha}=this
          const result=await reqLoginPwd({name,pwd,captcha});
          if(result.code===0){
            //跳转路径
            this.$router.back();
            //获取用户信息
            const data=result.data;
            this.$store.dispatch('setUserInfor',data)
          }else{
            this.loadCaptcha();
            this.tipsAlertTip(result.msg);
            //清空图形验证码
            this.captcha='';
          }
        }
      },
      //点击登录警告框确定
      closeTip(){
        this.changeAlertTip=false;
        this.alertText='';
      },
      //重新加载图形验证码
      loadCaptcha(){
        this.$refs.captchaImg.src='http://localhost:4000/captcha?'+Date.now();
      },
    },

}
</script>

<style lang="stylus">
    .icon-zuojiantou
        font-size 30px
    .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.phones
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(30px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>