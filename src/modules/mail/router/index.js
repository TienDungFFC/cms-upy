import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter("/mail", [
        {
        path: '',
        name: 'mail',
        meta: {
            login: true,
        },
        component: () => import(/* webpackChunkName: "mail" */'../views/index'),
        },
        {
        path: '/add',
        name: 'mail-add',
        meta: {
            login: true,
        },
        component: () => import(/* webpackChunkName: "mail" */'../views/show'),
        },
        {
            path: '/:id',
            name: 'mail-show',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "mail" */'../views/show'),
        },
    ]),
    
];
