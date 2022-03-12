import { withPrefixRouter } from '@/config/global';

export default [
    ...withPrefixRouter('/configuration', [
        {
            path: '',
            name: 'configuration',
            component: () => import(/* webpackChunkName: "configuration" */'../views/index'),
            meta: {
                login: true,
            }
        },
        {
            path: '/limit',
            name: 'configuration-limit',
            component: () => import(/* webpackChunkName: "configuration" */'../views/limit'),
            meta: {
                login: true,
            }
        },
        {
            path: '/register',
            name: 'configuration-register',
            component: () => import(/* webpackChunkName: "configuration" */'../views/register'),
            meta: {
                login: true,
            }
        },
        {
            path: '/login',
            name: 'configuration-login',
            component: () => import(/* webpackChunkName: "configuration" */'../views/login'),
            meta: {
                login: true,
            }
        },
        {
            path: '/share',
            name: 'configuration-share',
            component: () => import(/* webpackChunkName: "configuration" */'../views/share'),
            meta: {
                login: true,
            }
        },
        {
            path: '/guide-image-company',
            name: 'configuration-guide-image-company',
            component: () => import(/* webpackChunkName: "configuration" */'../views/guideImageCompany'),
            meta: {
                login: true,
            }
        },
        {
            path: '/guide-image-front-bank',
            name: 'configuration-guide-image-front-bank',
            component: () => import(/* webpackChunkName: "configuration" */'../views/guideImageFrontBank'),
            meta: {
                login: true,
            }
        },
        {
            path: '/guide-image-id-card',
            name: 'configuration-guide-image-id-card',
            component: () => import(/* webpackChunkName: "configuration" */'../views/guideImageIdCard'),
            meta: {
                login: true,
            }
        },
        {
            path: '/guide-image-labor-contract',
            name: 'configuration-guide-image-labor-contract',
            component: () => import(/* webpackChunkName: "configuration" */'../views/guideImageLaborContract'),
            meta: {
                login: true,
            }
        },
        {
            path: '/guide-image-portrait',
            name: 'configuration-guide-image-portrait',
            component: () => import(/* webpackChunkName: "configuration" */'../views/guideImagePortrait'),
            meta: {
                login: true,
            }
        },
    ])
];
