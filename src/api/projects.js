import axios from '@/api/axios'

const getProjects = () => {
	return axios.get('/projects')
}

export default {
	getProjects,
}
