import Vue from 'vue';
import { transformPageHeaders } from './helper';
const service = Vue.prototype.$heshop;

// 获取分销商商品
export function goods(page = 1, keyword = { search: '', sort_key: 'created_time', sort_value: 'ASC' }, size = 10) {
  return new Promise((resolve, reject) => {
    service
      .promotergoods('get', keyword)
      .page(page, size)
      .then(response => {
        transformPageHeaders(response);
        const { data, pagination } = response;
        resolve({
          data: data,
          pagination
        });
      })
      .catch(error => {
        console.log(error);
      });
  });
}
