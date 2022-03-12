import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter("/disbursement", [
        {
            path: '',
            name: 'disbursement',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "disbursement-management" */'../views/index'),
        },
        
        {
            path: '/find-user',
            name: 'disbursement-find-user',
            meta: {
                login: true,
                layout: 'not-base-layout'
            },
            component: () => import(/* webpackChunkName: "disbursement-management" */'../views/find-user'),
        },

        {
            path: '/find-company',
            name: 'disbursement-find-company',
            meta: {
                login: true,
                layout: 'not-base-layout'
            },
            component: () => import(/* webpackChunkName: "disbursement-management" */'../views/find-company'),
        },
        
        {
            path: '/:id',
            name: 'disbursement-show',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "disbursement-management" */'../views/show'),
        },

    ]),
      
    
];
