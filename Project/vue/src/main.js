import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'


import '@/icons' // icon
import '@/permission' // permission control


Vue.prototype.formatDateTime = function (inputTime, strgs) {
    var date = new Date();
    date.setTime(inputTime * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    if (strgs == 'Y-m-d') return y + '-' + m + '-' + d;
    if (strgs == 'H:i:s') {return h + ':' + minute + ':' + second;}
    if (strgs == 'Y-m-d m-d H:i') return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
    if (strgs == 'm-d H:i') return m + '-' + d + ' ' + h + ':' + minute;
    if (strgs == 'H:i') return h + ':' + minute;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)


Vue.config.productionTip = false

window.axios = require('axios');
window.qs = require('qs');


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
