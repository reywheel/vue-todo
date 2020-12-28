import axios from '@/api/axios'

const register = (userCredentials) => {
	return axios.post('/auth/register', userCredentials)
}

const login = (userCredentials) => {
	return axios.post('/auth/login', userCredentials)
}

const refresh = () => {
	return axios.post('/auth/refresh')
}

const logout = () => {
	return axios.post('/auth/logout')
}

const getProfile = () => {
	return axios.get('/auth/user-profile')
}

export default {
	register,
	login,
	refresh,
	logout,
	getProfile,
}
