import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter("/expertise-1", [
        {
        path: '',
        name: 'expertise-1',
        meta: {
            login: true,
        },
        component: () => import(/* webpackChunkName: "expertise1" */'../views/expertise-1/index'),
        },

        {
        path: '/search',
        name: 'expertise-1-search',
        meta: {
            login: true,
            layout: 'not-base-layout'
        },
        component: () => import(/* webpackChunkName: "expertise1" */'../views/expertise-1/searchMobile'),
        },
        
        {
        path: '/:id',
        name: 'expertise-1-show',
        meta: {
            login: true,
        },
        component: () => import(/* webpackChunkName: "expertise1" */'../views/expertise-1/show'),
        }
    ]),
    ...withPrefixRouter("/expertise-2", [
        {
        path: '',
        name: 'expertise-2',
        meta: {
            login: true,
        },
        component: () => import(/* webpackChunkName: "expertise-2" */'../views/expertise-2/index'),
        },

        {
        path: '/search',
        name: 'expertise-2-search',
        meta: {
            login: true,
            layout: 'not-base-layout'
        },
        component: () => import(/* webpackChunkName: "expertise2" */'../views/expertise-2/searchMobile'),
        },
        
        {
        path: '/:id',
        name: 'expertise-2-show',
        meta: {
            login: true,
        },
        component: () => import(/* webpackChunkName: "expertise-2-show" */'../views/expertise-2/show'),
        }
    ]),    
];
