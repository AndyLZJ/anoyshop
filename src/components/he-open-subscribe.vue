<template>
    <view class="he-open-subscribe" @click.stop.prevent="() => {}">
        <slot></slot>
        <wx-open-subscribe style="position:absolute;width:100%;height:100%;top:0;left: 0;"
                           @success="openSubscribeSuccess"
                           @error="openSubscribeError" :template="templateId"
                           :id="subscribeId">
            <script type="text/wxtag-template">
                <style>.btn {
                    width: 100%;
                    height: 500px;
                }</style>
                <div class="btn"></div>
            </script>
        </wx-open-subscribe>
    </view>
</template>

<script>
export default {
    name: "he-open-subscribe",
    props: {
        templateId: {
            type: Array,
            default: function () {
                return []
            }
        },
        digital: {
            type: [Array, Object, Number],
            default: function () {
                return {}
            }
        }
    },
    data() {
        return {
            subscribeId: this.$h.guid() + '_subscribe'
        }
    },
    methods: {
        openSubscribeSuccess() {
            this.$emit('open-subscribe-success', this.digital);
        },
        openSubscribeError(e) {
            this.$emit('open-subscribe-success', this.digital);
        }
    }
}
</script>

<style scoped>
.he-open-subscribe {
    position: relative;
    overflow: hidden;
}
</style>