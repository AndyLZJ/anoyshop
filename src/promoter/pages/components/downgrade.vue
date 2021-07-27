<template>
  <he-popup mode="center" v-model="showModel" background-color="transparent">
    <view class="he-down-grade">
      <image :src="ipAddress + '/promoter-demote-grade.png'" class="he-image" />
    </view>
  </he-popup>
</template>

<script>
import HePopup from '../../../components/he-popup.vue';

export default {
  name: 'downgrade',
  components: {
    HePopup
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showModel: {
      get: function ({ value }) {
        return value;
      },
      set: function (value) {
        this.$emit('input', value);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.he-down-grade {
  width: 590px;
  height: 460px;
  background: #fff;
  position: relative;
  border-radius: 16px;
  .he-image {
    width: 540px;
    height: 280px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
