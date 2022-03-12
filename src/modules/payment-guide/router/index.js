import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter("/payment-guide", [
        {
        path: '',
        name: 'payment-guide',
        meta: {
            login: true,
            showIconSearch: true,
        },
        component: () => import(/* webpackChunkName: "payment-guide" */'../views/index'),
        },
        {
            path: '/add',
            name: 'payment-guide-add',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "payment-guide" */'../views/show'),
        },
        {
            path: '/:id',
            name: 'payment-guide-show',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "payment-guide" */'../views/show'),
        },
    ]),
    
];

