//添加插件文件 plugins/axios.js
import sendMsg from '~/assets/js/dingding';
export default ({ redirect, $axios, app }) => {
    let url = ''
    // request拦截器
    $axios.onRequest(config => {
        url = config.url
        config.timeout = config.timeout || 10000
        // console.log('onRequest', config.url);
        return new Promise((resolve, reject) => {
            let token = app.$cookies.get('token');
            // 将获取到token加入到请求头中
            if (token) config.headers.token = token;
            //其他的请求前业务逻辑 比如：api map
            resolve(config);
        });
    });

    // response拦截器，数据返回后，可以先在这里进行一个简单的判断
    $axios.onResponse(res => {
        // console.log('onResponse', res.status);
        return new Promise((resolve, reject) => {
            //返回数据逻辑处理 比如：error_code错误处理
            resolve(res);
        });
    });
    
    $axios.onError(async (message) => {
        console.error('axios-err', url, message);
        await sendMsg(url, message)
    });
};
