import tasksApi from '@/api/tasks'

export const getterTypes = {
	data: '[task] data',
	isLoading: '[task] isLoading',
	isSubmitting: '[task] isSubmitting',
	errors: '[task] errors',
	isEmpty: '[task] isEmpty',
}

export const mutationTypes = {
	createTaskStart: '[task] create task start',
	createTaskSuccess: '[task] create task success',
	createTaskFailure: '[task] create task failure',

	getTaskStart: '[task] get task start',
	getTaskSuccess: '[task] get task success',
	getTaskFailure: '[task] get task failure',

	editTaskStart: '[task] edit task start',
	editTaskSuccess: '[task] edit task success',
	editTaskFailure: '[task] edit task failure',

	deleteTaskStart: '[task] delete task start',
	deleteTaskSuccess: '[task] delete task success',
	deleteTaskFailure: '[task] delete task failure',
}

export const actionTypes = {
	createTask: '[task] create task',
	getTask: '[task] get task',
	editTask: '[task] edit task',
	deleteTask: '[task] delete task',
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
	[mutationTypes.createTaskStart](state) {
		state.data = null
		state.isSubmitting = true
		state.errors = null
	},
	[mutationTypes.createTaskSuccess](state) {
		state.isSubmitting = false
	},
	[mutationTypes.createTaskFailure](state, errors) {
		state.isSubmitting = false
		state.errors = errors
	},

	[mutationTypes.getTaskStart](state) {
		state.isLoading = true
		state.data = null
		state.errors = null
	},
	[mutationTypes.getTaskSuccess](state, task) {
		state.isLoading = false
		state.data = task
	},
	[mutationTypes.getTaskFailure](state, errors) {
		state.isLoading = false
		state.errors = errors
	},

	[mutationTypes.editTaskStart](state) {
		state.isSubmitting = true
		state.errors = null
	},
	[mutationTypes.editTaskSuccess](state) {
		state.isSubmitting = false
	},
	[mutationTypes.editTaskFailure](state, errors) {
		state.isSubmitting = false
		state.errors = errors
	},

	[mutationTypes.deleteTaskStart](state) {
		state.isSubmitting = true
		state.errors = null
	},
	[mutationTypes.deleteTaskSuccess](state) {
		state.isSubmitting = false
		state.data = null
	},
	[mutationTypes.deleteTaskFailure](state, errors) {
		state.isSubmitting = false
		state.errors = errors
	},
}

const actions = {
	[actionTypes.createTask](
		{ commit },
		{ title, description, deadline, project_id },
	) {
		return new Promise((resolve) => {
			commit(mutationTypes.createTaskStart)
			tasksApi
				.createTask({ title, description, deadline, project_id })
				.then((response) => {
					commit(mutationTypes.createTaskSuccess)
					resolve(response.data)
				})
				.catch((e) => {
					commit(mutationTypes.createTaskFailure, e.response.data)
				})
		})
	},
	[actionTypes.getTask]({ commit }, { taskId }) {
		return new Promise((resolve) => {
			commit(mutationTypes.getTaskStart)
			tasksApi
				.getTask(taskId)
				.then((response) => {
					commit(mutationTypes.getTaskSuccess, response.data)
					resolve()
				})
				.catch((e) => {
					commit(mutationTypes.getTaskFailure, e.response.data)
				})
		})
	},
	[actionTypes.editTask]({ commit }, { taskId, taskData }) {
		return new Promise((resolve) => {
			commit(mutationTypes.editTaskStart)
			tasksApi
				.editTask(taskId, taskData)
				.then(() => {
					commit(mutationTypes.editTaskSuccess)
					resolve()
				})
				.catch((e) => {
					commit(mutationTypes.editTaskFailure, e.response.data)
				})
		})
	},
	[actionTypes.deleteTask]({ commit }, { taskId }) {
		return new Promise((resolve) => {
			commit(mutationTypes.deleteTaskStart)
			tasksApi
				.deleteTask(taskId)
				.then(() => {
					commit(mutationTypes.deleteTaskSuccess)
					resolve()
				})
				.catch((e) => {
					commit(mutationTypes.deleteTaskFailure, e.response.data)
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
