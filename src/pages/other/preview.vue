<template>
  <view class="he-page-content">
    <he-image
      :width="750"
      :height="750"
      :src="pic"
      :image-style="{
        marginTop: '20vh',
      }"
      @click.native="navigateBack"
    ></he-image>
    <view class="he-name">
      {{ name }}
    </view>
  </view>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      pic: "",
      name: "",
    };
  },
  onLoad(options) {
    this.pic = decodeURIComponent(options.pic);
    this.name = options.name;
  },
  methods: {
    navigateBack: function () {
      uni.navigateBack({ delta: 1 });
    },
  },
};
</script>

<style scoped lang="scss">
.he-page-content {
  background-color: #000000;
  overflow: hidden;
}

.he-name {
  width: 356px;
  border: 2px solid #ffffff;
  border-radius: 47px;
  padding: 16px 40px;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 36px;
  text-align: center;
  margin: 40px auto 0 auto;
}
</style>