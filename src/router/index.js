import Vue from 'vue'
import VueRouter from 'vue-router'
import BookManage from '../views/BookManage'
import AddBook from '../views/AddBook'
import Index from '../views/Index'
import BookUpdate from '../views/BookUpdate'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
    {
        path:"/BookManage",
        name:"查询图书",
        component:BookManage,
        meta:{
            keepalive:true
        }
    },
    { path: '/', redirect: '/Book' },
    {
        path:"/Book",
        name:"图书管理",
        component:Index,
        show:true,
        redirect:"/BookManage",
        children:[
            {
                path:"/BookManage",
                name:"查询图书",
                component:BookManage
            },
            {
                path:"/AddBook",
                name:"添加图书",
                component:AddBook

            }
        ]
    },
    {
        path:'/update',
        component:BookUpdate,
        show:false

    },
    {
        path:"/Login",
        name:"登陆页面",
        
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
