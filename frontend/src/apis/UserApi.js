import { api } from "../services/apiService"
const url = {
    login: '/user/login',
    register: '/user/register'
}

export const userRegister = (data, config) => {
    return api.post(url.register, data, config)
}

export const userLogin = (data, config) => {
    return api.post(url.login, data, config)
}

