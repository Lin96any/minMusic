import Vue from 'vue'
import App from './App'
import 'static/style/global.scss'
import Api from 'api/automatic.js'
import store from 'store/index.js'

Vue.config.productionTip = false
Vue.prototype.$api = Api

App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
