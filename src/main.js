import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button,Row,MessageBox } from 'element-ui';
import './mock/mockServer'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Row)


new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$confirm=MessageBox
  }
}).$mount('#app')
