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

export function promotermaterial(page = 1, type = 0, size = 10) {
  return new Promise((resolve, reject) => {
    service
      .promotermaterial('get', {
        type: type
      })
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
        reject(error);
      });
  });
}

// 获取招募令
export function recruit() {
  return new Promise((resolve, reject) => {
    service
      .search(
        'post',
        {
          include: 'setting'
        },
        {
          keyword: 'promoter_recruit_make'
        }
      )
      .then(response => {
        resolve(response.content);
      })
      .catch(error => {
        reject(error);
      });
  });
}

// 是否启用分销协议
export function useAgreement() {
  return new Promise((resolve, reject) => {
    service
      .search(
        'post',
        {
          include: 'setting'
        },
        {
          keyword: 'promoter_setting',
          content_key: 'use_agreement'
        }
      )
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

// 获取分销协议
export function agreement() {
  return new Promise((resolve, reject) => {
    service
      .search(
        'post',
        {
          include: 'setting'
        },
        {
          keyword: 'promoter_setting'
        }
      )
      .then(response => {
        const { agreement_content, agreement_title } = response.content;
        resolve({
          agreement_content: agreement_content,
          agreement_title: agreement_title
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}

// 接令牌
export function receiveRecruitToken() {
  return new Promise((resolve, reject) => {
    service
      .promoter('get', {
        behavior: 'recruiting'
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
