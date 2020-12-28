const getToken = () => {
	return localStorage.getItem('jwt-token')
}

const setToken = (token) => {
	localStorage.setItem('jwt-token', token)
}

const removeToken = () => {
	localStorage.removeItem('jwt-token')
}

export default {
	get: getToken,
	set: setToken,
	remove: removeToken,
}
