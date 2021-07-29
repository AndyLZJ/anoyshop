<template>
  <view class="he-page-content">
    <he-rich v-if="content" :content="content" :preview-img="false" :lazy-load="true"></he-rich>
  </view>
</template>

<script>
import heRich from '../../components/he-html/he-html';
import { agreement } from '../api';

export default {
  name: 'protocol',
  components: {
    heRich
  },
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    agreement().then(response => {
      uni.setNavigationBarTitle({
        title: response.agreement_title
      });
      this.content = response.agreement_content;
    });
  }
};
</script>
