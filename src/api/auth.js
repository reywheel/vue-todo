import axios from '@/api/axios'

const register = (userCredentials) => {
	return axios.post('/auth/register', userCredentials, {
		appAlert: 'Не удалось зарегистрироваться',
	})
}

const login = (userCredentials) => {
	return axios.post('/auth/login', userCredentials, {
		appAlert: 'Не удалось войти в систему',
	})
}

const refresh = () => {
	return axios.post('/auth/refresh')
}

const logout = () => {
	return axios.post('/auth/logout', null, {
		appAlert: 'Не выйти из аккаунта',
	})
}

const getProfile = () => {
	return axios.get('/auth/user-profile', {
		appAlert: 'Не удалось получить даннные пользователя',
	})
}

export default {
	register,
	login,
	refresh,
	logout,
	getProfile,
}
