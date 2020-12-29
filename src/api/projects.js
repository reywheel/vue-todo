import axios from '@/api/axios'

const getProjects = () => {
	return axios.get('/projects')
}

const createProject = (projectData) => {
	return axios.post('/projects', projectData)
}

export default {
	getProjects,
	createProject,
}
