import Fetch from '~/assets/js/fetch';

// 登录二维码
export const loginQrcode = params =>
    Fetch.get('/vip/user/getLoginQrCode', params);

// 登录
export const userLogin = params =>
    Fetch.get('/vip/user/getTokenByCode', params);

// 获取用户信息
export const getUserInfo = () => Fetch.get('/yp/user/info');

// 登出
export const userLoginout = params => Fetch.get('/yp/user/exist', params);

// 获取产品信息
export const getProjectInfo = params => Fetch.get('/yp/comment/project/simpleDetail', params);
