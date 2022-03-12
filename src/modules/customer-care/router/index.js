import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter("/customer-care", [
        {
        path: '',
        name: 'customer-care',
        meta: {
            login: true,
        },
        component: () => import(/* webpackChunkName: "customer-care" */'../views/index'),
        },
        {
            path: '/show',
            name: 'customer-care-detail',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "customer-care" */'../views/detail-loan'),
            },
    ]),
]
