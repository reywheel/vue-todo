import axios from 'axios'
import token from '@/helpers/token'

const instance = axios.create({
	baseURL: process.env.API_URL,
})

instance.interceptors.request.use((config) => {
	config.headers = {
		Authorization: `Bearer ${token.get()}`,
	}
	return config
})

export default instance
