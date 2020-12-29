import projectsApi from '@/api/projects'

export const getterTypes = {
	data: '[project] data',
	isLoading: '[project] isLoading',
	isSubmitting: '[project] isSubmitting',
	errors: '[project] errors',
}

export const mutationType = {
	createProjectStart: '[project] create project start',
	createProjectSuccess: '[project] create project success',
	createProjectFailure: '[project] create project failure',
}

export const actionTypes = {
	createProject: '[project] create project',
}

const state = {
	data: null,
	isLoading: false,
	isSubmitting: false,
	errors: null,
}

const getters = {
	[getterTypes.data]: (state) => state.data,
	[getterTypes.isLoading]: (state) => state.isLoading,
	[getterTypes.isSubmitting]: (state) => state.isSubmitting,
	[getterTypes.errors]: (state) => state.errors,
}

const mutations = {
	[mutationType.createProjectStart](state) {
		state.isSubmitting = true
		state.data = null
		state.errors = null
	},
	[mutationType.createProjectSuccess](state, project) {
		state.isSubmitting = false
		state.data = project
	},
	[mutationType.createProjectFailure](state, errors) {
		state.isSubmitting = false
		state.errors = errors
	},
}

const actions = {
	[actionTypes.createProject]({ commit }, { title }) {
		return new Promise((resolve) => {
			commit(mutationType.createProjectStart)
			projectsApi
				.createProject({ title })
				.then((response) => {
					commit(mutationType.createProjectSuccess, response.data)
					resolve(response.data)
				})
				.catch((e) => {
					commit(mutationType.createProjectFailure, e.response.data)
				})
		})
	},
}

export default {
	state,
	getters,
	mutations,
	actions,
}
