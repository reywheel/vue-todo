import projectsApi from '@/api/projects'

export const getterTypes = {
	data: '[project] data',
	isLoading: '[project] isLoading',
	isSubmitting: '[project] isSubmitting',
	errors: '[project] errors',
	isEmpty: '[project] isEmpty',
}

export const mutationTypes = {
	createProjectStart: '[project] create project start',
	createProjectSuccess: '[project] create project success',
	createProjectFailure: '[project] create project failure',

	getProjectStart: '[project] get project start',
	getProjectSuccess: '[project] get project success',
	getProjectFailure: '[project] get project failure',
}

export const actionTypes = {
	createProject: '[project] create project',
	getProject: '[project] get project',
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
	[getterTypes.isEmpty]: (state) =>
		state.data === null || state.data.length === 0,
}

const mutations = {
	[mutationTypes.createProjectStart](state) {
		state.isSubmitting = true
		state.errors = null
	},
	[mutationTypes.createProjectSuccess](state, project) {
		state.isSubmitting = false
		state.data = project
	},
	[mutationTypes.createProjectFailure](state, errors) {
		state.isSubmitting = false
		state.errors = errors
	},

	[mutationTypes.getProjectStart](state) {
		state.isLoading = true
		state.data = null
		state.errors = null
	},
	[mutationTypes.getProjectSuccess](state, project) {
		state.isLoading = false
		state.data = project
	},
	[mutationTypes.getProjectFailure](state, errors) {
		state.isLoading = false
		state.errors = errors
	},
}

const actions = {
	[actionTypes.createProject]({ commit }, { title }) {
		return new Promise((resolve) => {
			commit(mutationTypes.createProjectStart)
			projectsApi
				.createProject({ title })
				.then((response) => {
					commit(mutationTypes.createProjectSuccess, response.data)
					resolve(response.data)
				})
				.catch((e) => {
					commit(mutationTypes.createProjectFailure, e.response.data)
				})
		})
	},
	[actionTypes.getProject]({ commit }, { projectId }) {
		return new Promise((resolve) => {
			commit(mutationTypes.getProjectStart)
			projectsApi
				.getProject(projectId)
				.then((response) => {
					commit(mutationTypes.getProjectSuccess, response.data)
					resolve()
				})
				.catch((e) => {
					commit(mutationTypes.getProjectFailure, e.response.data)
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
