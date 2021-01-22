import axios from '@/api/axios'

const getProjects = () => {
	return axios.get('/projects', {
		appAlert: 'Не удалось загрузить проекты',
	})
}

const createProject = (projectData) => {
	return axios.post('/projects', projectData)
}

const getProject = (projectId) => {
	return axios.get(`/projects/${projectId}`)
}

const deleteProject = (projectId) => {
	return axios.delete(`/projects/${projectId}`)
}

export default {
	getProjects,
	createProject,
	getProject,
	deleteProject,
}
