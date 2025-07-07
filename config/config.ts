// import path from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = fileURLToPath(new URL('.', import.meta.url));


import menus from './hooks';

export default {
    exportStatic: {},

    nodeModulesTransform: {
        type: 'none',
        exclude: [],
    },
    history: {
        type: 'hash',
    },
    publicPath: '/monorepo-template/',
    extraBabelPlugins: [
        [
            'babel-plugin-import',
            {
                libraryName: '@alifd/next',
                style: false,
            },
            'fusion',
        ],
    ],
    // 用于设定文档的展现模式，默认为文档模式，配置为 site 时可无缝切换为站点模式。
    mode: 'site',
    title: 'React Hooks',
    dynamicImport: {},
    manifest: {},
    hash: true,
    resolve: {
        includes: ['docs', 'packages/hooks/src']
    },
    logo: '/h-logo.svg',
    links: [
        {
            rel: 'stylesheet',
            href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
        },
        { rel: 'stylesheet', href: '/style.css' },
    ],
    navs: [
        { title: '指南', path: '/guide' },
        { title: 'Hooks', path: '/hooks' },
    ],
    menus: {
        '/': [
            {
                title: '首页',
                path: 'index',
            },
        ],
        '/guide': [
            {
                title: '介绍',
                path: '/guide',
            },
        ],
        '/hooks': menus,
    },
}