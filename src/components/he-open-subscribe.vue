<template>
    <view class="he-open-subscribe" @click.stop="subscribe">
        <slot></slot>
        <wx-open-subscribe style="
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      " :template="templateId" :id="subscribeId">
            <script type="text/wxtag-template">
                <style>
          .btn {
            width: 100%;
            height: 500px;
          }
        </style>
        <div class="btn"></div>
      </script>
        </wx-open-subscribe>
    </view>
</template>
<script>
export default {
    name: "he-open-subscribe",
    data() {
        return {
            isShow: true,
        };
    },
    props: {
        templateId: {
            type: Array,
            default: function() {
                return [];
            },
        },
        digital: {
            type: [Array, Object, Number],
            default: function() {
                return {};
            },
        },
    },
    data() {
        return {
            subscribeId: this.$h.guid() + "_subscribe",
        };
    },
    methods: {
        subscribe: function() {
            if (!this.isShow) {
                this.$emit("open-subscribe-success", this.digital);
            } else {
                return;
            }
        },
    },
    mounted() {
        //console.log("templateId", templateId)
        let _this = this;
        let btn = document.getElementById(_this.subscribeId);
        btn.addEventListener("success", function() {
            _this.$emit("open-subscribe-success", _this.digital);
        });
        btn.addEventListener("error", function(error) {
            console.log("error", error)
            _this.isShow = false;
            btn.style.display = "none";
        });
    },
};
</script>
<style scoped>
.he-open-subscribe {
    position: relative;
    overflow: hidden;
}
</style>