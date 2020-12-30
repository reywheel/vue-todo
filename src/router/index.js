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
		path: '/projects/:projectId',
		name: 'project',
		component: () => import('@/views/Project'),
		props: (route) => ({ projectId: Number(route.params.projectId) }),
	},
	{
		path: '/projects/:projectId/tasks/create',
		name: 'createTask',
		component: () => import('@/views/CreateTask'),
		props: (route) => ({ projectId: Number(route.params.projectId) }),
	},
	{
		path: '/projects/:projectId/tasks/:taskId/edit',
		name: 'editTask',
		component: () => import('@/views/EditTask'),
		props: (route) => ({
			projectId: Number(route.params.projectId),
			taskId: Number(route.params.taskId),
		}),
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
