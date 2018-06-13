
import Vue from 'vue'
import { store } from './store/index'
import App from './App'
import router from './router'

Vue.config.productionTip = false

router.beforeEach(function (to, from, next) {
	window.scrollTo(0, 0)
	next();
})
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	render: h => h(App)
})
