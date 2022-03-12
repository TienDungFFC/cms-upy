import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter('/formLoans', [
        {
        path: '',
        name: 'formLoans',
        meta: {
            login: true,
        },
        component: () => import(/* webpackChunkName: "formLoans" */'../views/index'),
        },
        {
            path: '/show',
            name: 'formLoans-detail',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "formLoans" */'../views/detail'),
            },
    ]),
]
