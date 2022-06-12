
import Axios from 'axios';
import Vue from 'vue';
import refererObj from './referer';

export const referer = refererObj;
const vm = new Vue();
// 节流
export const throttle = (fn, time, flag) => {
    if (flag) {
        let prev = Date.now();
        return function() {
            const context = this;
            const args = arguments;
            const now = Date.now();
            if (now - prev >= time) {
                fn.apply(context, args);
                prev = Date.now();
            }
        };
    }
    let id = null;
    return function() {
        const that = this;
        const arg = arguments;
        if (!id) {
            id = setTimeout(() => {
                fn.apply(that, arg);
                id = null;
            }, time);
        }
    };
};

// imgUrl
export const imgUrlSvg = (url, params) => {
    if (!url) return '';
    var path = params;
    if (url.indexOf('x-oss-process=image/')>-1){
        return url.replace('x-oss-process=image/', `x-oss-process=image${params.replace('?x-oss-process=image/','/')}/`)
    }
    return url + (/.svg$/.test(url) ? '' : path);
};

// 富文本提取纯文本
export const editorText = string => {
    if (typeof string !=='string') return string;
    return string.replace(/<.+?>/g, '');
};

// 判断pc/pad/mobile
export const platform = req => {
    const isMob = ua => {
        return (typeof ua === 'string')&&!!ua.match(/AppleWebKit.*Mobile.*/);
    };
    let userAgent = req
        ? req.headers['user-agent']
        : (navigator && navigator.userAgent) || '';
    if (isMob(userAgent)) {
        return userAgent.toLowerCase().indexOf('pad') > -1 ? 'pad' : 'mobile';
    }
    return 'pc';
};

// 判断是否为iOS
export const isIOS = () => {
    const u = navigator.userAgent;
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isiOS;
};

// 判断是否为安卓
export const isAndroid= () => {
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    return isAndroid;
};

// 根据文件名获取文件后缀
export const fileExtension = (fileName) => {
    if (!fileName) return '';
    return fileName.slice(fileName.lastIndexOf('.'))
}

// 文件下载(异步)
export const downloadFile = (url, fileName) => {
    if (!url) return;
    Axios({
        method: 'get',
        url,
        withCredentials: true,
        responseType: 'blob'
    }).then(res => {
        const { data } = res;
        if (data.type !== 'application/json') {
            const blob = new Blob([data]);
            if ('download' in document.createElement('a')) { // 非IE下载
                const elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
            } else { // IE10+下载
                navigator.msSaveBlob(blob, fileName);
            }
        } else {
            // 通过FileReader来获取异常result
            const reader = new FileReader();
            reader.readAsText(data, 'utf-8');
            reader.onload = e => {
                const msg = JSON.parse(e.target.result);
                if (Object.prototype.hasOwnProperty.call(msg, 'code')) {
                    vm.$message.error(msg.detail);
                    return false;
                }
            };
        }
    }).catch(err => {
        console.log(err);
    });
}

// 判断浏览器类型是否为IE
export const isIE = () => {
    const u = window.userAgent || navigator.userAgent;
    return u.indexOf('MSIE') > 0 || u.indexOf('Trident') > 0;
};

/**
 * 日期格式化
 * (new Date(), 'yyyy-mm-dd hh:ii:ss.S')==> 2006-07-02 08:09:04.423
 * (new Date(), 'yyyy-mm-dd E HH:ii:ss') ==> 2009-03-10 二 20:09:04
 * (new Date(), 'yyyy-mm-dd EE hh:ii:ss') ==> 2009-03-10 周二 08:09:04
 * (new Date(), 'yyyy-mm-dd EEE hh:ii:ss') ==> 2009-03-10 星期二 08:09:04
 * (new Date(), 'yyyy-m-d h:m:s.S') ==> 2006-7-2 8:9:4.18
 * (new Date(), 'yyyy/mm/dd hh:ii:ss.S') ==> 2017/04/17 10:00:48.282
 */
export const formatDate = (value, fmt) => {
    if (!value) {
        return null;
    }
    // ie
    let date = value;
    let newFmt = fmt;
    if (isIE() && String(date).match('-')) {
        date = date.replace('-', '/');
    }
    /* eslint-disable no-param-reassign */
    date = new Date(date);
    /* eslint no-console: 'off' */
    if (date.toString() === 'Invalid Date') {
        console.log('日期不合法');
    }
    const o = {
        'M+': date.getMonth() + 1, // 月份,
        'm+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours() % 24 === 0 ? 0 : date.getHours() % 24, // 小时
        'H+': date.getHours(), // 小时
        'i+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
    };
    const week = {
        0: '/u65e5',
        1: '/u4e00',
        2: '/u4e8c',
        3: '/u4e09',
        4: '/u56db',
        5: '/u4e94',
        6: '/u516d'
    };
    if (/(y+)/.test(newFmt)) {
        newFmt = newFmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(newFmt)) {
        newFmt = newFmt.replace(RegExp.$1, (match, p1) => {
            if (p1.length > 1) {
                return (p1.length > 2 ? '/u661f/u671f' : '/u5468') + week[`${date.getDay()}`];
            }
            return week[`${date.getDay()}`];
        });
    }
    const keys = Object.keys(o);
    for (let k = 0, len = keys.length; k < len; k += 1) {
        const prop = keys[k];
        if (new RegExp(`(${prop})`).test(newFmt)) {
            newFmt = newFmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[prop] : `00${o[prop]}`.substr(`${o[prop]}`.length)
            );
        }
    }
    /* eslint-disable consistent-return */
    return newFmt;
};

// 判断是否是百度小程序环境
export const isSmartApp = function () {
    // 写法一
    // swan.webView.getEnv(function (res) {
    //     console.log(res.smartprogram);
    //     alert(`当前页面是否运行在小程序中：${res.smartprogram}`); // true
    // });
    // 写法二
    const isWebView = /swan\//.test(window.navigator.userAgent) || /^webswan-/.test(window.name);
    // alert(`当前页面是否运行在小程序中：${isWebView}`); // true
    return isWebView
};

// $pageView打点公共方法
export const autoTrackFun = function (customParam = {}) {
    const obj = {};
    const queryStr = location.search.split('?')[1];
    if (queryStr) {
        queryStr.split('&').forEach(item => {
            const key = item.split('=')[0];
            const value = decodeURIComponent(item.split('=')[1]);
            obj[key] = value;
        });
    }
    const autoTrackParam = {};
    if (obj.mp && obj.mp !== 'undefined') {
        autoTrackParam.mp = obj.mp;
    }
    if (obj.channel && obj.channel !== 'undefined') {
        autoTrackParam.channel = obj.channel;
    }
    autoTrackParam.UserLogin = localStorage.getItem('token') ? 'login' : 'logout'
    autoTrackParam.Userid = localStorage.getItem('user_id') || 0
    autoTrackParam.$url_host = document.domain
    autoTrackParam.UserAgent = navigator.userAgent

    window.sensors.quick('autoTrack', {
        ...autoTrackParam,
        ...customParam
    });
}

export const getTimeKey = () => {
    const curtime = new Date();
    const hour = curtime.getHours();
    let timeKey = 1;
    if (hour >= 3 && hour < 9) {
        timeKey = 1
    } else if (hour >= 9 && hour < 11) {
        timeKey = 2
    } else if (hour >= 11 && hour < 13) {
        timeKey = 3
    } else if (hour >= 13 && hour < 17) {
        timeKey = 4
    } else {
        timeKey = 5
    }
    return timeKey
};

// 超出多长...  obj为对象类型时必须传type值为deviceType：{pc:30,pad:20,mob:10,type:deviceType} type必填其他非必填，继承样式同@media媒体查询
export const textEllipsis = (text, obj) => {
    if (typeof obj !== 'number') {
        if (!obj[obj.type]) {
            if (obj.type==='pc') {
                return text;
            } else if (obj.type==='pad') {
                obj[obj.type] = obj.pc;
            } else {
                obj[obj.type] = obj.pc || obj.pad;
            }
        }
        return text.length > (obj[obj.type]+1) ? text.slice(0, obj[obj.type])+'...' : text;
    }
    return text.length > (obj+1) ? text.slice(0, obj)+'...' : text;
};

// 数字三位加,
export const toThousands = (num) => {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}

// 富文本编辑器a标签添加rel
export const editorArel = (html = '', target) => {
    if (!html) {
        return html;
    }
    const str = html.replace(
        /<a.+?a>/g,
        function(word) {
            let res = word;
            if (word.indexOf('rel="')&&!word.indexOf(target)) {
                res = word.replace('rel="',`rel="${target} `);
            } else if (!word.indexOf('rel="')) {
                res = word.replace('<a',`<a rel="${target}"`)
            }
            return res;
        }
    )
    return str;
}
// 数字超出1万展示1w多的文字
export const getNumStr = (num)=> {
    let str = '';
    if (num >= 10000) {
        let count = (num / 10000).toString();
        str = count.indexOf('.') > -1 ? count.substring(0, count.indexOf('.') + 2) + '万' : count + '万';
        return str;
    } else {
        return num;
    }
}

export const handleQuery = () => {
    const obj = {};
    if (process.browser && location) {
      const queryStr = location.search.split("?")[1];
      if (queryStr) {
        queryStr.split("&").forEach((item) => {
          const key = item.split("=")[0];
          const value = decodeURIComponent(item.split("=")[1]);
          obj[key] = value;
        });
      }
    }
    return obj;
}

export function genStar(score = 35, showVal = true) {
    const smallScore = (score / 10).toFixed(1)
    let arr = [0, 0, 0, 0, 0];
    const intNum = Math.floor(smallScore);
    const floatNum = smallScore - intNum;
    if (!(intNum === 0 && floatNum === 0)) {
        arr = arr.map((status, index) => {
            if (index + 1 <= intNum) {
                return 2;
            }
            if (floatNum > 0 && index === intNum) {
                return 1;
            }
            return 0;
        });
    }
    const tempArr = arr.map(i => {
        if (i === 1) {
            return `<li class="status-1"><span class="left star"></span><span class="right star"></span></li>`
        } else if (i === 2) {
            return `<li class="status-2"><span class="left star"></span><span class="right star"></span></li>`
        } else {
            return `<li><span class="left star"></span><span class="right star"></span></li>`
        }
    })
    let tempStr = tempArr.join('')
    let temp = ''
    if (showVal) {
        temp = `<ul class="product_score_in_rich">${tempStr}${smallScore != '-0.1' ? `<li class="star-value">${smallScore}</li>`:''}</ul>`
    } else {
        temp = `<ul class="product_score_in_rich">${tempStr}</ul>`
    }
    return temp;
}

export function isSLike(str) {
    const reg = /Baiduspider|Googlebot|AdsBot|Sogou web spider|YisouSpider|Sogou News Spider|Sogou Video Spider|Sogou web spider|360Spider|HaosouSpider|bingbot|Bytespider/
    return reg.test(str)
}

