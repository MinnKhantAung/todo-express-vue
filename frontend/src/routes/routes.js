import HomeView from '../pages/HomeView.vue';
import LoginView from '../pages/LoginView.vue';
import RegisterView from '../pages/RegisterView.vue'

export const routes = [
    { path: '/', component: HomeView },
    { path: '/register', component: RegisterView },
    { path: '/login', component: LoginView },
]


