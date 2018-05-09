// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/HelloFromVux'
import Register from './components/Register'

import { Tabbar,ButtonTab, ButtonTabItem,TabbarItem,Icon,XInput,Flexbox,FlexboxItem,XButton} from 'vux'

Vue.use(VueRouter)
Vue.component('x-input', XInput)
Vue.component('icon', Icon)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('button-tab', ButtonTab)
Vue.component('button-tab-item', ButtonTabItem)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('x-button', XButton)

const routes = [
  {
  path: '/',
  component: Register
  },
  {
    path:'/home',
    component:Home
  }
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
