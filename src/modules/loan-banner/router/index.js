import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter("/loan-banner", [
        {
        path: '',
        name: 'loan-banner',
        meta: {
            login: true,
        },
        component: () => import(/* webpackChunkName: "loan-banner" */'../views/index'),
        },
    ]),
]
