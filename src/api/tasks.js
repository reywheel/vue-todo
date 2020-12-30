import axios from '@/api/axios'

const getTasks = (projectId) => {
	return axios.get(`/tasks?filter=project_id:${projectId}`)
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
