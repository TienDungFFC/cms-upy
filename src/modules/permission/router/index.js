import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter('/permission', [
        {
            path: '',
            name: 'permission',
            meta: {
                login: true,
                showIconSearch: true,
            },
            component: () => import(/* webpackChunkName: "permission" */'../views/index'),
        },
        {
            path: '/add',
            name: 'permission-add',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "permission" */'../views/show.vue'),
        },
        {
            path: '/:id',
            name: 'permission-show',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "permission" */'../views/show.vue'),
        },
    ])
];
