import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter("/loan-policy", [
        {
        path: '',
        name: 'loan-policy',
        meta: {
            login: true,
        },
        component: () => import(/* webpackChunkName: "loan-policy" */'../views/index'),
        },
        {
            path: '/:id',
            name: 'loan-policy-show',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "loan-policy" */'../views/show'),
        },
    ]),
    
];
