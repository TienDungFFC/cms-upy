import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter("/loan-amount", [
        {
        path: '',
        name: 'loan-amount',
        meta: {
            login: true,
        },
        component: () => import(/* webpackChunkName: "loan-amount-management" */'../views/index'),
        },
        {
            path: '/find-user',
            name: 'loan-amount-find-user',
            meta: {
                login: true,
                layout: 'not-base-layout'
            },
            component: () => import(/* webpackChunkName: "user-management" */'../views/find-user'),
        },
        {
        path: '/:id',
        name: 'loan-amount-show',
        meta: {
            login: true,
        },
        component: () => import(/* webpackChunkName: "loan-amount-management" */'../views/show'),
        }

    ]),
      
    
];
