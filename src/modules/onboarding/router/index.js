import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter('/onboarding', [
        {
            path: '',
            name: 'onboarding',
            meta: {
                layout: 'default-layout',
                login: true,
                showIconSearch: true,
            },
            component: () => import(/* webpackChunkName: "onboarding" */'../views/index'),
        },
        {   // only mobile
            path: '/add',
            name: 'onboarding-add',
            meta: {
                layout: 'default-layout',
                login: true,
            },
            component: () => import(/* webpackChunkName: "onboarding" */'../views/show-mobile'),
        },
        {   // only mobile
            path: '/:id',
            name: 'onboarding-show',
            meta: {
                layout: 'default-layout',
                login: true,
            },
            component: () => import(/* webpackChunkName: "onboarding" */'../views/show-mobile'),
        },
    ])
];
