import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter("/user", [
        {
            path: '',
            name: 'user',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "user-management" */'../views/index'),
        },
        {
            path: '/find-company',
            name: 'user-find-company',
            meta: {
                login: true,
                layout: 'not-base-layout'
            },
            component: () => import(/* webpackChunkName: "user-management" */'../views/find-company'),
        },
        {
            path: '/show',
            name: 'user-detail',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "user" */'../views/detail-loan'),
        },
        {
            path: '/:id',
            name: 'user-show',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "user-management" */'../views/show'),
        },

    ]),
      
    
];
