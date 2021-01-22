export const getterTypes = {
	isEmpty: '[alerts] is empty',
	all: '[alerts] all',
}

export const mutationTypes = {
	addAlert: '[alerts] add alert',
	clearAlerts: '[alerts] clear alerts',
}

export const actionTypes = {
	addAlert: '[alerts] add alerts',
	clearAlerts: '[alerts] clear alerts',
}

const state = {
	alerts: [],
}

const getters = {
	[getterTypes.isEmpty]: (state) => state.alerts.length === 0,
	[getterTypes.all]: (state) => state.alerts,
}

const mutations = {
	[mutationTypes.addAlert](state, { type, text }) {
		state.alerts.push({ type, text })
	},
	[mutationTypes.clearAlerts](state) {
		state.alerts.splice(0, state.alerts.length)
	},
}

const actions = {
	[actionTypes.addAlert]({ commit }, { type, text }) {
		commit(mutationTypes.addAlert, { type, text })
	},
	[actionTypes.clearAlerts]({ commit }) {
		commit(mutationTypes.clearAlerts)
	},
}

export default {
	state,
	getters,
	mutations,
	actions,
}
