export default {
    /**
     * 设置cookie
     * @param {*} key
     * @param {*} value
     * @param {*} expireGap 2592000000 30day 毫秒级别
     */
    setCookie(key, value, expireGap = 2592000000) {
        const current = new Date().getTime();
        const expireTime = new Date(current + expireGap);
        let encodeVal = encodeURIComponent(value);
        document.cookie = `${key}=${encodeVal};expires=${expireTime.toUTCString()}`;
    },
    delCookie(key) {
        document.cookie = `${key}='';expires=${new Date(0).toUTCString()}`;
    },
    getCookie(key) {
        if (document.cookie.length > 0) {
            let start = document.cookie.indexOf(key + '=');
            if (start != -1) {
                start = start + key.length + 1;
                let end = document.cookie.indexOf(';', start);
                if (end == -1) {
                    end = document.cookie.length;
                }
                return decodeURIComponent(document.cookie.slice(start, end));
            }
        }
        return '';
    },
    getCookieFromStr(str, key) {
        if (str && key) {
            let start = str.indexOf(key + '=');
            if (start != -1) {
                start = start + key.length + 1;
                let end = str.indexOf(';', start);
                if (end == -1) {
                    end = str.length;
                }
                return decodeURIComponent(str.slice(start, end));
            }
        }
        return '';
    }
};
