import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter("/payment", [
        {
            path: '',
            name: 'payment',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "payment" */'../views/index'),
        },
        
        {
            path: '/find-user',
            name: 'payment-find-user',
            meta: {
                login: true,
                layout: 'not-base-layout'
            },
            component: () => import(/* webpackChunkName: "payment" */'../views/find-user'),
        },

        {
            path: '/find-company',
            name: 'payment-find-company',
            meta: {
                login: true,
                layout: 'not-base-layout'
            },
            component: () => import(/* webpackChunkName: "payment" */'../views/find-company'),
        },
        
        {
            path: '/:id',
            name: 'payment-show',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "payment" */'../views/show'),
        },
    ]),
      
    
];
