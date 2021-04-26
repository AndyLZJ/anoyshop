<template>
    <view>
        <!--#ifndef H5-->
        <button @click="requestSubscribeMessage">订阅消息</button>
        <!--#endif-->
        <!--#ifdef H5-->
        <wx-open-subscribe template="6WnCL3FgOb5rjhtFpF0h9w8T9bSei08ayfg5n4D6tBo" id="subscribe">
            <button class="subscribe-btn">
                一次性模版消息订阅
            </button>
        </wx-open-subscribe>
        <button @click="subscribe">尝试点击起来</button>
        <!--#endif-->
    </view>
</template>
<script type="text/javascript">
export default {
    data() {
        return {}
    },
    methods: {
        // #ifndef H5
        requestSubscribeMessage: function () {
            wx.requestSubscribeMessage({
                tmplIds: ['qkIqVoZ8vGOWYDniHg_vBekQ6tLXVj796ruHWCMCFFg'],
                success: function (e) {
                    console.log(e);
                },
                fail: function (e) {
                    console.log(e);
                },
                complete: function (e) {
                    console.log(e);
                }
            });
        },
        // #endif
        // #ifdef H5
        subscribe: function () {
            document.getElementById('subscribe').click();
        }
        // #endif
    },
    onLoad() {
        // #ifdef H5
        this.$wechat.init();
        // #endif
    }
}
</script>

<style>

</style>