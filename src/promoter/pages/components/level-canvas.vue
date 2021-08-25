<template>
  <view class="commission-rate flex justify-around">
    <view class="item flex flex-direction align-center justify-between">
      <canvas :canvas-id="`firstCanvas-${index}`" :id="`firstCanvas-${index}`"></canvas>
      <view class="percentage" v-if="show">{{Number(info.first)}}</view>
      <text>一级分销佣金</text>
    </view>
    <view class="item flex flex-direction align-center justify-between">
      <canvas :canvas-id="`secondCanvas-${index}`" :id="`secondCanvas-${index}`"></canvas>
      <view class="percentage" v-if="show">{{Number(info.second)}}</view>
      <text>二级分销佣金</text>
    </view>
    <view class="item flex flex-direction align-center justify-between">
      <canvas :canvas-id="`thirdCanvas-${index}`" :id="`thirdCanvas-${index}`"></canvas>
      <view class="percentage" v-if="show">{{Number(info.third)}}</view>
      <text>三级分销佣金</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "level-canvas",
  data() {
    return {
      show: false
    }
  },
  props: {
    index: {
      type: Number
    },
    info: {
      type: Object
    }
  },
  methods: {
    initCanvasFirst() {
      this.initCanvas(`firstCanvas-${this.index}`, this.info.first);
    },
    initCanvasSecond() {
      this.initCanvas(`secondCanvas-${this.index}`, this.info.second);
    },
    initCanvasThird() {
      this.initCanvas(`thirdCanvas-${this.index}`, this.info.third);
    },
    initCanvas(id, percentage) {
      percentage = Number(percentage);
      let context = uni.createCanvasContext(id, this);
      context.beginPath();
      context.arc(uni.upx2px(58), uni.upx2px(58), uni.upx2px(58), 0, 2 * Math.PI);
      context.setFillStyle('#F9EFE6');
      context.fill();
      context.closePath();
      context.beginPath();
      context.arc(uni.upx2px(58), uni.upx2px(58), uni.upx2px(53), 0, 2 * Math.PI, false);
      context.lineWidth = 5;
      context.lineCap = 'round';
      context.strokeStyle = '#F3E0D2';
      context.stroke();
      context.closePath();
      context.beginPath();
      context.arc(uni.upx2px(58), uni.upx2px(58), uni.upx2px(53), -Math.PI / 2, (percentage * 3.6 - 90) * Math.PI / 180, false);
      context.lineWidth = 5;
      context.lineCap = 'round';
      context.strokeStyle = '#C9875E';
      context.stroke();
      context.closePath();
      // context.setFontSize(uni.upx2px(30));
      // context.textAlign = 'center';
      // context.setFillStyle('#A06640');
      // context.fillText(percentage, uni.upx2px(50), uni.upx2px(70));
      // context.setFontSize(uni.upx2px(20));
      // context.textAlign = 'center';
      // context.setFillStyle('#A06640');
      // context.fillText('%', uni.upx2px(80), uni.upx2px(70));
      context.draw();
    }
  },
  mounted() {
    setTimeout(() => {
      this.initCanvasFirst();
      this.initCanvasSecond();
      this.initCanvasThird();
      this.show = true;
    }, 500);
  }
}
</script>

<style scoped lang="scss">
@import "./../../main.less";

.commission-rate {
  height: 164px;
  margin-top: 40px;

  .item {
    width: 140px;
    font-size: 20px;
    @extend .font-family-sc;
    font-weight: 400;
    color: #A06640;
    position: relative;
    .percentage {
      position: absolute;
      font-size: 28px;
      @extend .font-family-sc;
      font-weight: bold;
      color: #A06640;
      top: 40px;
      &:after {
        content: '%';
        font-size: 20px;
        @extend .font-family-sc;
        font-weight: 500;
      }
    }
    canvas {
      width: 116px;
      height: 116px;
    }
  }
}
</style>
