<template>
  <view
    class="he-page-content"
    :class="loading ? 'flex justify-center align-center' : ''"
  >
    <he-loading size="50" mode="flower" v-if="loading"></he-loading>
    <template v-else>
      <submit-address :consignee-info="consigneeInfo"></submit-address>
      <submit-product :goods-data="detail.goods_data"></submit-product>
      <submit-price
        :goods-amount="detail.goods_amount"
        :freight-amount="detail.freight_amount"
        :goods-data="detail.goods_data"
        @apply="couponPreview"
        :coupon-reduced="detail.coupon_reduced"
        :user-coupon-id="userCouponId"
      ></submit-price>
      <submit-comments :note="note"></submit-comments>
      <view class="safe-area-inset-bottom">
        <view class="he-button-height"></view>
      </view>
      <submit-button
        @submit="submit"
        :disabled="disabled"
        :goods-number-amount="detail.goods_number_amount"
        :pay-amount="detail.pay_amount"
      ></submit-button>
    </template>
  </view>
</template>

<script>
import submitAddress from "./components/submit-address.vue";
import submitProduct from "./components/submit-product.vue";
import submitPrice from "./components/submit-price.vue";
import submitButton from "./components/submit-button.vue";
import submitComments from "./components/submit-comments.vue";
import heLoading from "../../components/he-loading.vue";

export default {
  name: "submit",
  components: {
    submitAddress,
    submitProduct,
    submitPrice,
    submitButton,
    submitComments,
    heLoading,
  },
  data() {
    return {
      detail: {
        goods_data: [],
        pay_amount: 0,
        coupon_reduced: null,
      },
      goodsData: [],
      consigneeInfo: null,
      userCouponId: null,
      note: "",
      loading: true,
      disSubmit: false,
    };
  },
  computed: {
    disabled: function () {
      let goodsData = this.detail.goods_data ? this.detail.goods_data : [];
      let bool = goodsData.findIndex(function (item) {
        return item.failure_reason;
      });
      return bool > -1 ? true : false;
    },
  },
  methods: {
    getAddress: function () {
      let _this = this;
      return new Promise(function (resolve, reject) {
        // 获取默认地址
        _this.$heshop
          .address("get", {
            behavior: "default",
          })
          .then(function (res) {
            if (res) {
              _this.consigneeInfo = res;
              resolve();
            } else {
              // 获取地址列表
              _this.$heshop
                .address("get")
                .then(function (res) {
                  if (!_this.$h.test.isEmpty(res)) {
                    _this.consigneeInfo = res[0];
                  }
                  resolve();
                })
                .catch(function () {
                  reject();
                });
            }
          })
          .catch(function (err) {
            _this.$toError(err);
            reject();
          });
      });
    },
    getPreview: function () {
      let _this = this;
      return new Promise(function (resolve, reject) {
        _this.$heshop
          .order(
            "post",
            {
              calculate: "calculate",
            },
            {
              goods_data: _this.goodsData,
              consignee_info: _this.consigneeInfo,
              user_coupon_id: _this.userCouponId,
            }
          )
          .then(function (res) {
            _this.detail = res;
            resolve();
          })
          .catch(function (err) {
            _this.$toError(err);
            reject();
          });
      });
    },
    couponPreview: function (user_coupon_id) {
      this.userCouponId = user_coupon_id;
      this.getPreview();
    },
    submit: function () {
      let _this = this;
      if (this.$h.test.isEmpty(this.consigneeInfo))
        return uni.showToast({
          title: "收货地址不能为空",
          icon: "none",
        });
      if (this.disSubmit) return;
      this.disSubmit = true;
      this.$heshop
        .order("post", {
          goods_data: this.goodsData,
          consignee_info: this.consigneeInfo,
          note: this.note,
          user_coupon_id: this.userCouponId,
          source: 1,
        })
        .then(function (res) {
          _this.$store.commit("cart/setCartAdd", true);
          if (res.pay_total_amount !== 0) {
            _this.$heshop
              .pay({
                order_sn: res.order_sn,
              })
              .then(function (data) {
                // #ifdef MP_WEIXIN
                uni.redirectTo({
                  url:
                    "/pages/order/successful?order_id=" +
                    res.order_id +
                    "&order_sn=" +
                    res.order_sn,
                });
                // #endif
                // #ifdef H5
                _this.$wechat.chooseWXPay({
                  nonceStr: data.nonceStr,
                  packAge: data.package,
                  paySign: data.paySign,
                  signType: data.signType,
                  timestamp: data.timeStamp,
                  success: function () {
                    uni.redirectTo({
                      url:
                        "/pages/order/successful?order_id=" +
                        res.order_id +
                        "&order_sn=" +
                        res.order_sn,
                    });
                  },
                  fail: function (err) {
                    _this.$toError(err);
                  },
                  cancel: function () {
                    uni.redirectTo({
                      url: "/pages/order/index?tabCur=unpaid",
                    });
                  },
                });
                // #endif
              })
              .catch(function (err) {
                if (err.status === 403) {
                  _this.$h.toast(err.data.message);
                }
                if (err.errMsg === "requestPayment:fail cancel") {
                  uni.redirectTo({ url: "/pages/order/index?tabCur=unpaid" });
                }
              });
          } else {
            uni.redirectTo({
              url:
                "/pages/order/successful?order_id=" +
                res.order_id +
                "&order_sn=" +
                res.order_sn,
            });
          }
        })
        .catch(function (err) {
          if (err.status === 403) {
            _this.$h.toast(err.data.message);
            _this.$store.dispatch("setting/resetting");
            setTimeout(function () {
              uni.navigateBack({
                delta: 1,
              });
            }, 1000);
          } else {
            _this.$toError(err);
          }
        });
    },
  },
  async onLoad(options) {
    let _this = this;
    // #ifdef H5
    _this.$wechat.init();
    // #endif
    _this.goodsData = JSON.parse(options.data);
    await _this.getAddress();
    await _this.getPreview();
    _this.loading = false;
  },
  onShow() {
    let address_submit = this.getStorageSync(this.$storageKey.address_submit);
    let comments_submit = this.getStorageSync(this.$storageKey.comments_submit);
    // 选择地址
    if (address_submit) {
      this.consigneeInfo = address_submit;
      this.getPreview();
      uni.removeStorageSync(this.$storageKey.address_submit);
    }
    // 留言
    if (comments_submit) {
      this.note = comments_submit;
      uni.removeStorageSync(this.$storageKey.comments_submit);
    }
  },
};
</script>

<style>
.he-button-height {
  height: 112px;
}
</style>
