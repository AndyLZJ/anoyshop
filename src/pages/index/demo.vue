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
      <button @click="livePlayer">去直播</button>
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
                },
                fail: function (e) {
                },
                complete: function (e) {
                }
            });
        },
        // #endif
        // #ifdef H5
        subscribe: function () {
            document.getElementById('subscribe').click();
        },
        // #endif
        livePlayer() {
          const roomId = [11];
          const customParams = encodeURIComponent(JSON.stringify({ path: 'pages/index/index', pid: 1 }));
          wx.navigateTo({
            url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${customParams}`
          });
        }
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