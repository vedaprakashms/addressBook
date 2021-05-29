import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Address Entry',
        component: Home,
    },
    {
        path: '/addressList',
        name: 'Address List',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/AddressList.vue'),
    },
    {
        path: '/addressmodify/:id',
        name: 'Address Modify',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "about" */ '../views/AddressModify.vue'
            ),
    },
    {
        path: '/Miscellaneous',
        name: 'Scan QR',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/ScanQr.vue'),
    },
    {
        path: '/Miscellaneous2',
        name: 'Scan QR2',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/QRScan.vue'),
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
]

const router = createRouter({
    history: process.env.IS_ELECTRON
        ? createWebHashHistory()
        : createWebHistory(),
    routes,
})

export default router
