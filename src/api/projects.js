import axios from '@/api/axios'

const getProjects = () => {
	return axios.get('/projects')
}

const createProject = (projectData) => {
	return axios.post('/projects', projectData)
}

const getProject = (projectId) => {
	return axios.get(`/projects/${projectId}`)
}

export default {
	getProjects,
	createProject,
	getProject,
}
