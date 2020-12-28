import projectsApi from '@/api/projects'

export const getterTypes = {
	data: '[projects] data',
	isLoading: '[projects] isLoading',
	errors: '[projects] errors',
	isEmpty: '[projects] isEmpty',
}

export const mutationTypes = {
	getProjectsStart: '[projects] get projects start',
	getProjectsSuccess: '[projects] get projects success',
	getProjectsFailure: '[projects] get projects failure',
}

export const actionTypes = {
	getProjects: '[projects] get projects',
}

const state = {
	data: null,
	isLoading: false,
	errors: null,
}

const getters = {
	[getterTypes.data]: (state) => state.data,
	[getterTypes.isLoading]: (state) => state.isLoading,
	[getterTypes.errors]: (state) => state.errors,
	[getterTypes.isEmpty]: (state) =>
		state.data === null || state.data.length === 0,
}

const mutations = {
	[mutationTypes.getProjectsStart](state) {
		state.isLoading = true
		state.errors = null
		state.data = null
	},
	[mutationTypes.getProjectsSuccess](state, projects) {
		state.isLoading = false
		state.data = projects
	},
	[mutationTypes.getProjectsFailure](state, errors) {
		state.isLoading = false
		state.errors = errors
	},
}

const actions = {
	async [actionTypes.getProjects]({ commit }) {
		try {
			commit(mutationTypes.getProjectsStart)
			const response = await projectsApi.getProjects()
			commit(mutationTypes.getProjectsSuccess, response.data)
			return Promise.resolve()
		} catch (e) {
			commit(mutationTypes.getProjectsFailure, e.response.data)
			throw e
		}
	},
}

export default {
	state,
	getters,
	mutations,
	actions,
}
