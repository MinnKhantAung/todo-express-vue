import axios from 'axios';
import { useAuthStore } from './authService';
import { reactive, toRefs } from 'vue';

const AuthStore = useAuthStore();

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: { "Content-Type": "application/json" }
});

interceptors.request.use(function (config) {
    config.headers.Authorization = AuthStore.isAuth ? `Bearer ${AuthStore.getToken()}` : null;
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export const api = instance;

export const API_STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
}

export const useApi = (cb) => {
    const result = reactive({
        status: API_STATUS.IDLE,
        response: null,
        error: null,
    })

    async function call(data, config) {
        result.status = API_STATUS.LOADING;

        try {
            const requestResponse = await cb(data, config);

            result.response = requestResponse;
            result.status = API_STATUS.SUCCESS
        } catch (error) {
            result.status = API_STATUS.ERROR;
        }

    }
    return { ...toRefs(result), call }
}