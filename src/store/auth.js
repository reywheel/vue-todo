import authApi from '@/api/auth'
import token from '@/helpers/token'

export const getterTypes = {
	data: '[auth] data',
	isLoading: '[auth] isLoading',
	isSubmitting: '[auth] isSubmitting',
	errors: '[auth] errors',
	isAuth: '[auth] isAuth',
	isAnonymous: '[auth] isAnonymous',
}

export const mutationTypes = {
	loginStart: '[auth] login start',
	loginSuccess: '[auth] login success',
	loginFailure: '[auth] login failure',

	getProfileStart: '[auth] get profile start',
	getProfileSuccess: '[auth] get profile success',
	getProfileFailure: '[auth] get profile failure',

	logoutStart: '[auth] logout start',
	logoutSuccess: '[auth] logout success',
	logoutFailure: '[auth] logout failure',

	registerStart: '[auth] register start',
	registerSuccess: '[auth] register success',
	registerFailure: '[auth] register failure',
}

export const actionTypes = {
	login: '[auth] login',
	getProfile: '[auth] get profile',
	logout: '[auth] logout',
	register: '[auth] register',
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
	[getterTypes.isAuth]: (state) => state.data !== null,
	[getterTypes.isAnonymous]: (state) => state.data === null,
}

const mutations = {
	[mutationTypes.loginStart](state) {
		state.isSubmitting = true
		state.errors = null
	},
	[mutationTypes.loginSuccess](state, user) {
		state.isSubmitting = false
		state.data = user
	},
	[mutationTypes.loginFailure](state, errors) {
		state.isSubmitting = false
		state.errors = errors
	},

	[mutationTypes.getProfileStart](state) {
		state.isLoading = true
		state.errors = null
		state.data = null
	},
	[mutationTypes.getProfileSuccess](state, user) {
		state.isLoading = false
		state.data = user
	},
	[mutationTypes.getProfileFailure](state, errors) {
		state.isLoading = false
		state.errors = errors
	},

	[mutationTypes.logoutStart](state) {
		state.isSubmitting = true
		state.errors = null
	},
	[mutationTypes.logoutSuccess](state) {
		state.isSubmitting = false
		state.data = null
	},
	[mutationTypes.logoutFailure](state, errors) {
		state.isSubmitting = false
		state.errors = errors
	},

	[mutationTypes.registerStart](state) {
		state.isSubmitting = true
		state.errors = null
	},
	[mutationTypes.registerSuccess](state) {
		state.isSubmitting = false
	},
	[mutationTypes.registerFailure](state, errors) {
		state.isSubmitting = false
		state.errors = errors
	},
}

const actions = {
	async [actionTypes.register](
		{ commit },
		{ name, email, password, password_confirmation },
	) {
		try {
			commit(mutationTypes.registerStart)
			const response = await authApi.register({
				name,
				email,
				password,
				password_confirmation,
			})
			commit(mutationTypes.registerSuccess)
			return Promise.resolve()
		} catch (e) {
			commit(mutationTypes.registerFailure, e.response.data)
			throw e
		}
	},
	async [actionTypes.login]({ commit }, { email, password }) {
		try {
			commit(mutationTypes.loginStart)
			const response = await authApi.login({ email, password })
			commit(mutationTypes.loginSuccess, response.data.user)
			token.set(response.data['access_token'])
			return Promise.resolve()
		} catch (e) {
			commit(mutationTypes.loginFailure, e.response.data)
			throw e
		}
	},
	async [actionTypes.getProfile]({ commit }) {
		try {
			commit(mutationTypes.getProfileStart)
			const response = await authApi.getProfile()
			commit(mutationTypes.getProfileSuccess, response.data)
			return Promise.resolve(response.data)
		} catch (e) {
			commit(mutationTypes.getProfileFailure, e.response.data)
		}
	},
	async [actionTypes.logout]({ commit }) {
		try {
			commit(mutationTypes.logoutStart)
			await authApi.logout()
			token.remove()
			commit(mutationTypes.logoutSuccess)
		} catch (e) {
			commit(mutationTypes.logoutFailure, e.response.data)
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
