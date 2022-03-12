import { withPrefixRouter } from '@/config/global';

export default [
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */'../views/login'),
            meta: {
                layout: 'not-base-layout',
                login: false,
            }
        },
        {
            path: '/',
            name: 'layout',
            component: () => import(/* webpackChunkName: "dashboard" */'@/components/layouts/default-layout'),
            meta: {
                layout: 'not-base-layout',
                login: true,
            }
        },
    ...withPrefixRouter("/profile", [
        {
            path: '/',
            name: 'profile',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "profile" */'../views/index'),
        },
    ])
    
];
