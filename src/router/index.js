import Router from "vue-router"
import Vue from "vue"
import LoginPage from "../pages/account/index.vue"
import Home from "../pages/home/index.vue"

Vue.use(Router)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
}, {
    path: '/login',
    name: 'Login',
    component: LoginPage
}]

const router = new Router({
    routes
})

export default router