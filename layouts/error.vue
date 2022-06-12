<!--
 * @Author: jiashuangxi
 * @Date: 2022-04-04 21:57:26
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2022-06-12 15:08:41
 * @Describe: 
-->
<template>
    <div class="container">
        <div v-if="error.statusCode === 404" class="status-404">
            <div class="img-404"></div>
        </div>
        <div v-else-if="error.statusCode === 500" class="status-500">
            抱歉服务出错了...
        </div>
        <div v-else>{{ error.message }}</div>
        <!-- <NuxtLink to="/"></NuxtLink> -->
    </div>
</template>

<script>
export default {
    props: ['error'],
    head() {
        return {
            title: '小娄农家服务平台-SERVER-ERROR',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        '北京密云农家乐致力于为广大游客提供精品农家住宿，体验宁静的乡村生活。使久居都市的人们，在享受惬意环境的同时，尽享农家美味'
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '密云,小娄农家,金叵罗村,农家乐,农家院,乡村旅游,住宿,金谷开镰节,樱桃采摘,贡米打包饭,水库鱼,特色农品,民宿饮食'
                }
            ]
        };
    }
};
</script>
<style lang="less" scoped>
.status-404 {
    display: flex;
    min-height: calc(100vh - 229px);
    padding: 160px 0 200px 0;
    width: 100%;
    background: linear-gradient(180deg, #f1efff 0%, #ffffff 100%) #ffffff
        no-repeat top / 100% 300px;
    .img-404 {
        width: 232px;
        height: 199px;
        position: relative;
        margin: 0 auto;
        background: url('~assets/images/404.png') no-repeat center / 100% 100%;
    }
}
.status-500 {
    text-align: center;
    font-size: 20px;
    color: #666;
    padding: 100px 0;
}
</style>
