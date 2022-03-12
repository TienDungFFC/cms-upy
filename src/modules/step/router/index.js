import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter("/step", [
        {
        path: '',
        name: 'step',
        meta: {
            login: true,
        },
        component: () => import(/* webpackChunkName: "step" */'../views/index'),
        },
        {
            path: '/:id',
            name: 'step-show',
            meta: {
                login: true,
            },
            component: () => import(/* webpackChunkName: "step" */'../views/show'),
        },
    ]),
    
];
