import { withPrefixRouter } from '@/config/global';

export default [
    {
        path: '/general',
        name: 'general',
        meta: {
            layout: 'default-layout',
            login: true,
        },
        component: () => import(/* webpackChunkName: "onboarding" */'../views/index'),
    }
];
