import Vue from 'vue'
import Router from 'vue-router'
import Typography from '@/components/Content/Typography'
import Font from '@/components/Content/Font'
import About from '@/components/Content/About'
import Export from '@/components/Content/Export'

Vue.use(Router)

const router = new Router({
	base: '/FontFest',
	mode: 'history',
	routes: [
	{
		path: '/',
		name: 'Typography',
		component: Typography
	},
	{
		path: '/font/:name',
		name: 'Font',
		component: Font
	},
	{
		path: '/export',
		name: 'Export',
		component: Export
	},
	{
		path: '/about',
		name: 'About',
		component: About
	}
	]
})

router.afterEach((to, from) => {
	window.scrollTo(0, 0);
})

export default router