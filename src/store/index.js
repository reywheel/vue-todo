import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/auth'
import projects from '@/store/projects'
import project from '@/store/project'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		auth,
		projects,
		project,
	},
})
