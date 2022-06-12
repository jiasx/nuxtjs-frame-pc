export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover'
            },
            { hid: 'description', name: 'description', content: '36氪企业服务' },
            { name: 'applicable-device', content: 'pc,mobile' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        script: [
            {
                src: 'https://static.sensorsdata.cn/sdk/1.18.14/sensorsdata.min.js'
            },
            {
                src: '//www.36dianping.com/js/hitpoint-' + process.env.NODE_ENV + '.js'
            },
            // {
            //     src: '//www.36dianping.com/js/hm-baidu-pre.js',
            //     body: true
            // },
            {
                src: 'https://hm.baidu.com/hm.js?e0a48dd96e6a367177c2ae8889a85047',
                body: true
            },
            {
                src: 'https://sf1-scmcdn-tos.pstatp.com/goofy/ttzz/push.js?6d720fa35ad3631ccc2439b8b8e73b0e688894b14a58b05cad0f21d32119b3e833e2d43a9dc7f39b29ca68c1743fff9035917839a6b0ada31f59214ef24d7e2365a032a6f74cef7f403fad74862f7d2d',
                id: 'ttzz',
                body: true
            }
        ]
    },
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/assets/styles/reset.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['@/plugins/axios', '@/plugins/ant-design-vue'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        'cookie-universal-nuxt', // cookie
        '@nuxtjs/axios', // 发送请求方式
        '@nuxtjs/style-resources', // 全局引入样式文件
        '@nuxtjs/proxy', // 代理方式
        '@nuxtjs/component-cache', // 组件缓存
    ],

    axios: {
        baseURL: 'https://v.36kr.com'
    },

    proxy: {
        '/api': {
            target: 'https://v.36kr.com',
            changeOrigin: true,
            headers: {
                Host: 'v.36kr.com'
            }
        }
    },

    styleResources: {
        less: ['@/assets/styles/variables.less', '@/assets/styles/common.less']
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        publicPath:
            process.env.NODE_ENV === 'production'
                ? 'https://cdn.36dianping.com/_nuxt/qf'
                : 'https://www.36dianping.com/_nuxt/qf',
        transpile: [/ant-design-vue/],
        // analyze: true
        loaders: {
            less: {
                
            }
        },
        extractCSS: true,
        // extend(config, { isDev, isClient }) {
        //     config.module.rules.push({
        //         test: /\.swf$/,
        //         loader: 'url-loader',
        //         options: {
        //             limit: 10000
        //         }
        //     });
        // }
    },
    server: {
        port: 3002,
        host: '0.0.0.0' // default: localhost
    }
};
