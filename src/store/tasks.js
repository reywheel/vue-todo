import tasksApi from '@/api/tasks'

export const getterTypes = {
	data: '[tasks] data',
	isLoading: '[tasks] isLoading',
	errors: '[tasks] errors',
	isEmpty: '[tasks] isEmpty',
}

export const mutationTypes = {
	getTasksStart: '[tasks] get tasks start',
	getTasksSuccess: '[tasks] get tasks success',
	getTasksFailure: '[tasks] get tasks failure',

	completeTaskStart: '[tasks] complete task start',
	completeTaskSuccess: '[tasks] complete task success',
	completeTaskFailure: '[tasks] complete task failure',
}

export const actionTypes = {
	getTasks: '[tasks] get tasks',
	completeTask: '[tasks] complete task',
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
	[mutationTypes.getTasksStart](state) {
		state.isLoading = true
		state.data = null
		state.errors = null
	},
	[mutationTypes.getTasksSuccess](state, tasks) {
		state.isLoading = false
		state.data = tasks
	},
	[mutationTypes.getTasksFailure](state, errors) {
		state.isLoading = false
		state.errors = errors
	},

	[mutationTypes.completeTaskStart]() {},
	[mutationTypes.completeTaskSuccess](state, taskId) {
		const index = state.data.findIndex((task) => task.id === taskId)
		state.data[index].is_done = !state.data[index].is_done
	},
	[mutationTypes.completeTaskFailure](state, taskId) {
		const index = state.data.find((task) => task.id === taskId)
		state.data[index].is_done = !state.data[index].is_done
	},
}

const actions = {
	[actionTypes.getTasks]({ commit }, { projectId }) {
		return new Promise((resolve) => {
			commit(mutationTypes.getTasksStart)
			tasksApi
				.getTasks(projectId)
				.then((response) => {
					commit(mutationTypes.getTasksSuccess, response.data)
					resolve()
				})
				.catch((e) => {
					commit(mutationTypes.getTasksFailure, e.response.data)
				})
		})
	},
	[actionTypes.completeTask]({ commit }, { taskId, isDone }) {
		commit(mutationTypes.completeTaskStart)
		commit(mutationTypes.completeTaskSuccess, taskId)
		tasksApi
			.editTask(taskId, { is_done: !isDone })
			.then(() => {})
			.catch(() => {
				commit(mutationTypes.completeTaskFailure, taskId)
			})
	},
}

export default {
	state,
	getters,
	mutations,
	actions,
}
