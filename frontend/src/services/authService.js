import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        token: localStorage.getItem(import.meta.env.VITE_TOKEN_HEADER) || null,
        user: localStorage.getItem(import.meta.env.VITE_USER_HEADER) || null
    }),
    getters: {
        isAuth: (state) => !!state.token
    },
    actions: {
        storeAuth: (token, user) => {
            this.token = token;
            this.user = user;
            localStorage.setItem(import.meta.env.VITE_TOKEN_HEADER, token);
            localStorage.setItem(import.meta.env.VITE_USER_HEADER, user);
        },
        clearAuth: () => {
            this.token = null;
            this.user = null;
            localStorage.removeItem(import.meta.env.VITE_TOKEN_HEADER);
            localStorage.removeItem(import.meta.env.VITE_USER_HEADER);
        },
        getToken: () => {
            return localStorage.getItem(import.meta.env.VITE_TOKEN_HEADER) || null;
        }
    }
})