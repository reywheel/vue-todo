import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/Login'),
	},
	{
		path: '/register',
		name: 'register',
		component: () => import('@/views/Register'),
	},
	{
		path: '/projects/:id',
		name: 'project',
		component: () => import('@/views/Project'),
		props: (route) => ({ id: Number(route.params.id) }),
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
