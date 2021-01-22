import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/auth'
import projects from '@/store/projects'
import project from '@/store/project'
import tasks from '@/store/tasks'
import task from '@/store/task'
import alerts from '@/store/alerts'

import { addErrorHandler } from '@/api/axios'
import { actionTypes as alertsActionTypes } from '@/store/alerts'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		auth,
		projects,
		project,
		tasks,
		task,
		alerts,
	},
})

addErrorHandler((error) => {
	// if (error.response.status === 401 && 'appAlert' in error.response.config) {
	// 	store.dispatch(alertsActionTypes.addAlert, {
	// 		type: 'warning',
	// 		text: error.response.config.appAlert,
	// 	})
	// }

	if (error.response.status === 500 && 'appAlert' in error.response.config) {
		store.dispatch(alertsActionTypes.addAlert, {
			type: 'error',
			text: 'Ошибка сервера: ' + error.response.config.appAlert,
		})
	}

	return Promise.reject(error)
})

export default store
