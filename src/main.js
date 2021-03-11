import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import {
  Field,
  Cell,
  CellGroup,
  Button,
  NavBar,
  Tabbar,
  TabbarItem,
  Row,
  Col,
  Icon,
  Swipe,
  SwipeItem,
  Lazyload,
  SubmitBar,
  Card,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Tab,
  Tabs,
  Rate,
  AddressList,
  AddressEdit,
  CouponList,
  Sku,
  Form
} from 'vant'
import './assets/iconfont/iconfont.css'
import axios from './http'

Vue.use(Field).use(Cell).use(CellGroup).use(Button).use(NavBar).use(Tabbar).use(TabbarItem).use(Row).use(Col).use(Icon).use(Swipe).use(SwipeItem).use(Lazyload).use(SubmitBar).use(Card).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(Tab).use(Tabs).use(Rate).use(AddressList).use(AddressEdit).use(CouponList).use(Sku).use(Form);
fastClick.attach(document.body) //移动点击延迟事件
Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')