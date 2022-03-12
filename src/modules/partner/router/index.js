import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter('/partner', [
        {
            path: '',
            name: 'partner',
            meta: {
                login: true,
                showIconSearch: true,
            },
            component: () => import(/* webpackChunkName: "partner" */'../views/index'),
        },   
        {
            path: '/add',
            name: 'partner-add',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "partner-add" */'../views/show'),
        },   
        {
            path: '/employee/:id',
            name: 'partner-show-emplyee',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "partner-show-emplyee" */'../views/detail-employee'),
        },
        {
            path: '/:id_business/account-partner/add',
            name: 'account-partner-add',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "partner-show" */'../../account-admin/views/detail'),
        },
        {
            path: '/account-partner/:id',
            name: 'account-partner-show',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "partner-show" */'../../account-admin/views/detail'),
        },
        {
            path: '/:id',
            name: 'partner-show',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "partner-show" */'../views/show'),
        }
    ])   ,
    ...withPrefixRouter('/company-information', [
        {
            path: '',
            name: 'company-information',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "partner-show" */'../views/show'),
        },
        {
            path: '/account/add',
            name: 'company-information-account-add',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "partner-show" */'../../account-admin/views/detail'),
        },
        {
            path: '/account/:id',
            name: 'company-information-account-show',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "partner-show" */'../../account-admin/views/detail'),
        },
        {
            path: '/employee/:id',
            name: 'detail-employee',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "partner-show" */'../views/detail-employee'),
        },
        {
            path: '/create/employee',
            name: 'add-employee',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "partner-show" */'../views/detail-employee'),
        }   
    ])   
];
