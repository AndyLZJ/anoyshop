import Vue from 'vue';
import {transformPageHeaders} from './helper';

const service = Vue.prototype.$heshop;

// 获取分销商商品
export function goods(page = 1, keyword = {search: '', sort_key: 'created_time', sort_value: 'ASC'}, size = 10) {
  return new Promise((resolve, reject) => {
    service
      .promotergoods('get', keyword)
      .page(page, size)
      .then(response => {
        transformPageHeaders(response);
        const {data, pagination} = response;
        resolve({
          data: data,
          pagination
        });
      })
      .catch(reject);
  });
}

export function promotermaterial(page = 1, type = 0, content = '', size = 10) {
  return new Promise((resolve, reject) => {
    service
      .promotermaterial('get', {
        type: type,
        content
      })
      .page(page, size)
      .then(response => {
        transformPageHeaders(response);
        const {data, pagination} = response;
        resolve({
          data: data,
          pagination
        });
      })
      .catch(reject);
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
      .catch(reject);
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
      .then(resolve)
      .catch(reject);
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
        const {agreement_content, agreement_title} = response.content;
        resolve({
          agreement_content: agreement_content,
          agreement_title: agreement_title
        });
      })
      .catch(reject);
  });
}

// 接令牌
export function receiveRecruitToken() {
  return new Promise((resolve, reject) => {
    service
      .promoter('get', {
        behavior: 'recruiting'
      })
      .then(resolve)
      .catch(reject);
  });
}

// 申请检测
export function applyMonitoring() {
  return new Promise((resolve, reject) => {
    service
      .promoter('get', {
        behavior: 'apply_check'
      })
      .then(resolve)
      .catch(reject);
  });
}

// 申请成为分销商
export function applyPromoter(applyContent = []) {
  return new Promise((resolve, reject) => {
    service
      .promoter('post', {
        apply_content: applyContent
      })
      .then(resolve)
      .catch(reject);
  });
}

// 分销商中心
export function personalCenter() {
  return new Promise((resolve, reject) => {
    service.promoter('get').then(resolve).catch(reject);
  });
}

// 获取申请结果
export function applyAudit() {
  return new Promise((resolve, reject) => {
    service
      .promoter('get', {
        behavior: 'apply_audit'
      })
      .then(resolve)
      .catch(reject);
  });
}

// 空间动态列表
export function promoterzone(page = 1) {
  return new Promise((resolve, reject) => {
    service
      .promoterzone('get')
      .page(page, 10)
      .then(response => {
        transformPageHeaders(response);
        const {data, pagination} = response;
        resolve({
          data: data,
          pagination
        });
      })
      .catch(reject);
  });
}

// 动态点赞
export function dynamicLike(zone_id) {
  return new Promise((resolve, reject) => {
    service
      .promoterzone(
        'post',
        {
          behavior: 'vote'
        },
        {
          zone_id: zone_id
        }
      )
      .then(resolve)
      .then(reject);
  });
}

// 删除动态
export function dynamicDel(zone_id) {
  return new Promise((resolve, reject) => {
    service.promoterzone('delete', zone_id).then(resolve).then(reject);
  });
}

// 发布动态
export function publishDynamic(body = {}) {
  return new Promise((resolve, reject) => {
    service
      .promoterzone('post', body)
      .then(resolve)
      .catch(reject);
  });
}

// 动态详情
export function dynamicDetail(id) {
  id = parseInt(id)
  return new Promise((resolve, reject) => {
    service
      .promoterzone('get', id)
      .then(resolve)
      .catch(reject);
  });
}

// 编辑动态详情
export function dynamicEdit(id, body) {
  id = parseInt(id)
  return new Promise((resolve, reject) => {
    service
      .promoterzone('put', id, body)
      .then(resolve)
      .catch(reject);
  });
}

// 搜索普通商品
export function searchGoods(page = 1, keyword = {}) {
  return new Promise((resolve, reject) => {
    service.search('post', {
      include: 'goods'
    }, {
      keyword: keyword
    }).page(page, 10).then(response => {
      transformPageHeaders(response);
      const {data, pagination} = response;
      resolve({
        data: data,
        pagination
      });
    }).catch(reject);
  })
}
