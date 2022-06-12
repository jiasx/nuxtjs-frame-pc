const axios = require('axios');

async function sendMsg(url, errorMsg) {
    try {
        const env = process.env.NODE_ENV;
        let requestUrl = ''
        switch (env) {
            // case 'development':
            //     requestUrl = 'https://oapi.dingtalk.com/robot/send?access_token=71880b27fd4b37eced3f0d41e1e43ccc23bbd68364f8997bab858e722447db39'
            //     break
            case 'test':
                requestUrl = 'https://oapi.dingtalk.com/robot/send?access_token=71880b27fd4b37eced3f0d41e1e43ccc23bbd68364f8997bab858e722447db39'
                break
            case 'production':
                requestUrl = 'https://oapi.dingtalk.com/robot/send?access_token=6eccba8819dde48d42319ec3be2f444aba73fd7c60778c52b9fa4024dadfa9a5'
                break
        }
        await axios.post(requestUrl, {
            msgtype: "markdown",
            markdown: {
                "title": "服务报警:前端",
                "text": `服务报警:前端; 请求地址:${url}; 错误信息:${errorMsg};`,
            },
        })
    } catch (error) {
        console.error('dingdingsendMsg', error)
    }
}
export default sendMsg;