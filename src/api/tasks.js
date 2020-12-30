import axios from '@/api/axios'

const getTasks = (projectId) => {
	return axios.get(`/tasks?filter=project_id:${projectId}`)
}

const getTask = (taskId) => {
	return axios.get(`/tasks/${taskId}`)
}

const createTask = (taskData) => {
	return axios.post('/tasks', taskData)
}

const editTask = (taskId, taskData) => {
	return axios.put(`/tasks/${taskId}`, taskData)
}

const deleteTask = (taskId) => {
	return axios.delete(`/tasks/${taskId}`)
}

export default {
	getTasks,
	getTask,
	createTask,
	editTask,
	deleteTask,
}
