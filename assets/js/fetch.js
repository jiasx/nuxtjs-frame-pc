import Axios from 'axios';
// import { getEncryptSign } from '~/assets/js/utils/gateWaySign';
import { referer, handleQuery } from '~/assets/js/utils';
import configOpt from '~/assets/js/config';
import sendMsg from '~/assets/js/dingding';
const env = process.env.NODE_ENV;
const fetch = async (obj, type, baseUrl = configOpt.baseUrl) => {
    const timestamp = new Date().getTime();
    const { url, method = 'get', params = {}, ...other } = obj;
    const { loading } = params;

    const localStore = () => {
        if (typeof localStorage == 'undefined') {
            return {
                getItem(k) {
                    return '';
                },
                setItem(k, v) {
                    return false;
                },
                removeItem(k) {
                    return false;
                },
                clear() {
                    return false;
                }
            };
        }

        return localStorage;
    };
    const queryObj = handleQuery();
    if (queryObj.token) {
        localStore().setItem('token', queryObj.token)
    }
    const config = {
        method: type || method,
        url,
        headers: {
            token: localStore().getItem('token') || queryObj.token || ''
        },
        ...other
    };

    // loading
    if (loading) {
        loading.target[loading.key] = true;
        delete params.loading;
    }

    if (config.method === 'post') {
        Object.assign(config, {
            data: params
        });
    } else {
        Object.assign(config, {
            params: {
                ...params,
                _r: timestamp
            }
        });
    }
    const axios = Axios.create({
        baseURL: url.indexOf('/node') === 0 || url.indexOf('/gateWayApi') === 0 ? '' : `${baseUrl}/api`,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        timeout: 10000
    });
    return await axios(config)
        .then(res => {
            const { code, msg, data } = res.data || {};
            if (code !== 0) {
                if (code === 1 && config.url === '/yp/tianyancha/search') {
                    return [];
                }
                if (code === 99) {
                    localStore().removeItem('token');
                    $nuxt && $nuxt.$cookies.remove('token');
                    $nuxt && referer.set($nuxt.$route.path);
                }
                msg && $nuxt && $nuxt.$message.error(msg);
            }
            if (type === 'get' || type === 'post') {
                return code === 0 ? data : Promise.reject(res.data || {});
            }
            return res.data;
        })
        .catch(async (err) => {
            await sendMsg(config.url, err);
            if (type === 'get' || type === 'post') {
                return Promise.reject(err);
            }
            if (!Axios.isCancel(err)) {
                return false;
            }
            return false;
        })
        .finally(() => {
            if (loading) {
                loading.target[loading.key] = false;
            }
        });
};

fetch.get = (url, params, baseUrl) => {
    if (url.indexOf('/gateWayApi') > -1) {
        if (env === 'development') {
            baseUrl = ''
        } else {
            url = url.replace('/gateWayApi', '');
        }
        // url+=`?sign=${getEncryptSign(params)}`
    }
    return fetch({ url, params }, 'get', baseUrl);
};
fetch.post = (url, params, baseUrl) => {
    if (url.indexOf('/gateWayApi') > -1) {
        if (env === 'development') {
            baseUrl = ''
        } else {
            url = url.replace('/gateWayApi', '');
        }
        // url+=`?sign=${getEncryptSign(params)}`
    }
    return fetch({ url, params }, 'post', baseUrl);
};

export default fetch;
