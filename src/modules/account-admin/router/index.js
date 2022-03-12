import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter('/account-admin', [
        {
            path: '',
            name: 'account-cms',
            meta: {
                login: true,
                showIconSearch: true,
            },
            component: () => import(/* webpackChunkName: "account-admin" */'../views/index'),
        },   
        {
            path: '/add',
            name: 'account-cms-add',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "account-admin" */'../views/detail'),
        },
        {
            path: '/:id',
            name: 'account-cms-show',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "account-admin" */'../views/detail'),
        }, 
    ])
];
