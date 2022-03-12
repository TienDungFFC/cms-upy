import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter("/user-manual", [
        {
        path: '',
        name: 'user-manual',
        meta: {
            login: true,
            showIconSearch: true,
        },
        component: () => import(/* webpackChunkName: "news" */'../views/index'),
        },
        {
        path: '/add',
        name: 'user-manual-add',
        meta: {
            login: true,
        },
        component: () => import(/* webpackChunkName: "news" */'../views/show'),
        },
        {
            path: '/:id',
            name: 'user-manual-show',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "news" */'../views/show'),
        },
    ]),
      
    ...withPrefixRouter("/loan-terms", [
        {
        path: '',
        name: 'loan-terms',
        meta: {
            login: true,
            showIconSearch: true,
        },
        component: () => import(/* webpackChunkName: "news" */'../views/index'),
        },
        {
        path: '/add',
        name: 'loan-terms-add',
        meta: {
            login: true,
        },
        component: () => import(/* webpackChunkName: "loan-terms" */'../views/show'),
        },
        {
            path: '/:id',
            name: 'loan-terms-show',
            meta: {
                login: true,                
            },
            component: () => import(/* webpackChunkName: "news" */'../views/show'),
        },
    ]),

    ...withPrefixRouter("/special-offers", [
        {
        path: '',
        name: 'special-offers',
        meta: {
            login: true,
            showIconSearch: true,
        },
        component: () => import(/* webpackChunkName: "news" */'../views/index'),
        },
        {
        path: '/add',
        name: 'special-offers-add',
        meta: {
            login: true,
        },
        component: () => import(/* webpackChunkName: "news" */'../views/show'),
        },
        {
            path: '/:id',
            name: 'special-offers-show',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "news" */'../views/show'),
        },
    ]),
    
];
