<template>
    <view class="user-features">
        <template v-if="isLogin">
            <!--#ifndef H5-->
            <button v-if="!mobile" class="he-item he-item__btn flex justify-between" open-type="getPhoneNumber" hover-class="" @getphonenumber="getPhoneNumber">
                <view class="flex">
                    <view class="iconfont iconpersonalcenter_phone"></view>
                    <text class="he-text">绑定手机号</text>
                </view>
                <view class="iconfont iconbtn_arrow"></view>
            </button>
            <view class="he-item flex justify-between" v-else @click="bindPhone">
                <view class="flex">
                    <view class="iconfont iconpersonalcenter_phone"></view>
                    <text class="he-text">绑定手机号</text>
                </view>
                <view class="flex">
                    <text class="he-mobile">{{ mobile }}</text>
                    <view class="iconfont iconbtn_arrow"></view>
                </view>
            </view>
            <!--#endif-->
            <!--#ifdef H5-->
            <view class="he-item flex justify-between" @click="bindPhone">
                <view class="flex">
                    <view class="iconfont iconpersonalcenter_address"></view>
                    <text class="he-text">绑定手机号</text>
                </view>
                <view class="flex">
                    <text class="he-mobile" v-if="mobile">{{ mobile }}</text>
                    <view class="iconfont iconbtn_arrow"></view>
                </view>
            </view>
            <!--#endif-->
            <view class="he-item flex justify-between" @click="navigateTo('/pages/user/shipping-address')">
                <view class="flex">
                    <view class="iconfont iconpersonalcenter_address"></view>
                    <text class="he-text">收货地址</text>
                </view>
                <view class="iconfont iconbtn_arrow"></view>
            </view>
        </template>
        <view class="he-item flex justify-between" @click="clearStorage">
            <view class="flex">
                <view class="iconfont iconpersonalcenter_clearcache"></view>
                <text class="he-text">清除缓存</text>
            </view>
            <view class="iconfont iconbtn_arrow"></view>
        </view>
        <view class="he-item flex justify-between" v-if="storeSetting.contact.phone.bool" @click="isHeTell = true">
            <view class="flex">
                <view class="iconfont iconpersonalcenter_phone2"></view>
                <view class="he-content-text">
                    <view class="he-text">电话客服</view>
                    <view class="he-time" v-if="isEmpty(storeSetting.contact.phone)">{{
                        storeSetting.contact.phone.time
                        }}</view>
                </view>
            </view>
            <view class="iconfont iconbtn_arrow"></view>
        </view>
        <!-- #ifndef H5 -->
        <button open-type="contact" class="he-item flex justify-between he-item__btn" v-if="storeSetting.contact.online.bool">
            <view class="flex">
                <view class="iconfont iconpersonalcenter_contactus"></view>
                <view class="he-content-text">
                    <view class="he-text">在线客服</view>
                    <view class="he-time" v-if="isEmpty(storeSetting.contact.online)">{{
                        storeSetting.contact.online.time
                        }}</view>
                </view>
            </view>
            <view class="iconfont iconbtn_arrow"></view>
        </button>
        <!-- #endif -->
        <view class="he-item flex justify-between" v-if="storeSetting.contact.friend.bool" @click="isQrcode = true">
            <view class="flex">
                <view class="iconfont iconpersonalcenter_add"></view>
                <view class="he-content-text">
                    <view class="he-text">加好友联系</view>
                    <view class="he-time" v-if="isEmpty(storeSetting.contact.friend)">{{
                        storeSetting.contact.friend.time
                        }}</view>
                </view>
            </view>
            <view class="iconfont iconbtn_arrow"></view>
        </view>
        <he-tell v-model="isHeTell" :phone-number="storeSetting.contact && storeSetting.contact.phone.value"></he-tell>
        <user-qrcode v-model="isQrcode"></user-qrcode>
        <!--清理缓存-->
        <he-clear-storage v-model="isClear"></he-clear-storage>
        <!--绑定手机-->
        <user-bind-phone v-model="isBind"></user-bind-phone>
    </view>
</template>
<script>
import userQrcode from "./user-qrcode.vue";
import heClearStorage from "@/components/he-clear-storage.vue";
import userBindPhone from "./user-bind-phone.vue";
import heTell from "@/components/he-tell.vue";

export default {
    name: "user-features",
    components: {
        userQrcode,
        heClearStorage,
        userBindPhone,
        heTell,
    },
    computed: {
        mobile: function() {
            let data = this.$store.state.apply.userInfo.mobile;
            if (!data) return null;
            data = data + "";
            return data ?
                data
                .match(/(\d{3})(\d{4})(\d{4})/)
                .slice(1)
                .reduce(function(value, item, index) {
                    return index === 1 ? value + "****" : value + item;
                }) :
                null;
        },
    },
    data() {
        return {
            isQrcode: false,
            isTell: false,
            isClear: false,
            isHeTell: false,
            isBind: false,
        };
    },
    methods: {
        // 跳转
        navigateTo: function(url) {
            uni.navigateTo({ url: url });
        },
        //  清理缓存
        clearStorage: function() {
            this.isClear = true;
        },
        bindPhone: function() {
            if (this.mobile) {
                this.isBind = true;
            } else {
                this.navigateTo("/pages/user/bind-phone");
            }
        },
        // #ifndef H5
        getPhoneNumber: function(e) {
            let _this = this;
            let errMsg = e.detail.errMsg;
            if (errMsg === "getPhoneNumber:ok") {
                uni.login({
                    success(res) {
                        if (res.code) {
                            setTimeout(function() {
                                _this.$heshop
                                    .users(
                                        "put", {
                                            behavior: "bindMobile",
                                        }, {
                                            code: res.code,
                                            encryptedData: e.detail.encryptedData,
                                            iv: e.detail.iv,
                                        }
                                    )
                                    .then(function(res) {
                                        _this.$store.state.apply.userInfo.mobile = res.mobile;
                                        let userInfo = uni.getStorageSync("userInfo");
                                        userInfo.mobile = res.mobile;
                                        uni.setStorageSync("userInfo", userInfo);
                                    })
                                    .catch(function(err) {
                                        _this.$toError(err);
                                    });
                            }, 800);
                        } else {
                            _this.$toError(res);
                        }
                    },
                });
            } else if (errMsg === "getPhoneNumber:fail user deny") {}
        },
        // #endif
        isEmpty: function(data) {
            return !this.$h.test.isEmpty(data.time);
        },
    },
};
</script>
<style scoped lang="scss">
.user-features {
    margin: 20px 20px 0 20px;
    padding: 20px 0;
    background: #ffffff;
    border-radius: 16px;
}

.he-item {
    line-height: 80px;
    padding: 0 24px;

    .he-content-text {
        .he-text {
            text-align: left;
        }
    }

    .he-time {
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #8c8c8c;
        line-height: 1.2;
        margin-top: -10px;
        padding-left: 20px;
    }
}

.iconbtn_arrow {
    font-size: 22px;
}

.iconpersonalcenter_contactus,
.iconpersonalcenter_clearcache,
.iconpersonalcenter_phone,
.iconpersonalcenter_address,
.iconpersonalcenter_phone2,
.iconpersonalcenter_add {
    font-size: 28px;
    color: #d7d7d7;
}

.he-text {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin-left: 20px;
}

/*#ifndef H5*/
.he-item__btn {
    background-color: #ffffff;
}

.he-item__btn:after {
    display: none;
}

/*#endif*/
.he-mobile {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    margin-right: 14px;
}
</style>