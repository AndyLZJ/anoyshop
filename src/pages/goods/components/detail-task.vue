<template>
  <view class="detail-parameter" v-if="$manifest('task', 'status') && is_display">
    <view class="he-top">
      <view class="he-item">
        <view style="width: 100%;">
          <text class="he-item__label he-item__label2">活动</text>
          <text class="he-item__value he-item__value2">
<!--             {{taskList['goods'].status?taskList['goods'].declare:''}} {{taskList['order'].status?taskList['order'].declare:''}} -->
            {{getShowTextInfo(taskList)}}
          </text>
          <div class="clear"></div>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "detail-task",
  props: {

  },
  data() {
    return {
      taskList: {}
    }
  },
  computed: {
    is_display() {
      if (Object.getOwnPropertyNames(this.taskList).length > 0) {
        if (this.taskList['goods'] && this.taskList['goods'].status) {
          return true;
        }
        if (this.taskList['order'] && this.taskList['order'].status) {
          return true;
        }
      }
      return false;
    }
  },
  mounted() {
    this.handleTaskList();
  },
  methods: {
    /**
     * 处理逗号是否显示用
     * @return {[type]} [description]
     */
    getShowTextInfo(taskList) {
      let a = taskList['goods'].status;
      let b = taskList['order'].status;
      let text = "";
      if (a) {
        text += taskList['goods'].declare;
      }
      if (a && b) {
        text += "，";
      }
      if (b) {
        text += taskList['order'].declare;
      }
      return text;
    },
    /**
     * 签到列表计算
     * @return {[type]} [description]
     */
    handleTaskList() {
      this.$heshop.plugin("get", { include: "task", model: "task" }).then(res => {
        this.taskList = res;
      }).catch(err => {
        console.log("handleTaskList", err)
      })
    },
  }
}

</script>
<style scoped>
.detail-parameter {
  margin: 20px 20px 0 20px;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 16px 24px 8px 24px;
}

.he-bottom {

  border-top: 1px solid #E5E5E5;
}

.clear {
  clear: both;
}

.iconbtn_arrow {
  font-size: 22px;
  width: 22px;
  height: 22px;
  color: RGBA(190, 190, 190, 1);
}

.he-item {
  min-height: 72rpx;
  position: relative;
}

.he-item__label {
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #999999;
  float: left;
  display: inline-block;
  line-height: 72px;
}


.he-item__value {
  width: calc(100% - 75px);
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #222222;
  margin-left: 10px;
  display: inline-block;
  float: right;
  padding-top: 19rpx;
}


.he-item__value-0 {
  color: #999999;
}

.iconproductdetails_goodsservices {
  font-size: 22px;
  color: RGBA(162, 162, 162, 1);
}

.he-serve__value {
  font-size: 22px;
  margin: 0 0 0 7px;
}

.he-service {
  margin: 10px 31px 10px 0;
  padding: 8px 0;
}

</style>
