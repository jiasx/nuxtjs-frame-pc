import CryptoJS from 'crypto-js';
const password = 'qtdND6p2f2A42o2NFIHFAw';
export const getEncryptSign = params => {
    const paramsStr = JSON.stringify(params);
    const str = paramsStr + password;
    const sign = CryptoJS.MD5(str);
    return sign
};
