import axios from '@/api/axios'

const getTasks = () => {
	return axios.get('/tasks')
}

const getTask = (taskId) => {
	return axios.get(`/tasks/${taskId}`)
}

const editTask = (taskId, taskData) => {
	return axios.put(`/tasks/${taskId}`, taskData)
}

export default {
	getTasks,
	getTask,
	editTask,
}
