/**
 * 450登录超时错误过滤器
 * @author ljj-17773
 * @date 2018/12/13
 */
import Vue from 'vue';
import store from 'src/vuex/index';

export default function(error) {
  // 判断同一时间段内只允许有一个450请求弹出提示
  if (!window.error450) {
    window.error450 = true;
    window['error450-timeout'] = setTimeout(() => {
      window.error450 = false;
    }, 5000);
    // 提示是否跳转到登录页面
    // 440为账号再其他地方登陆，450为登录超时，460为未登录
    // let message = (error.response.status === 450 ? '登录超时，请重新登录！' : '您没有登录，请登录！');
    let message = '';
    if (error.response.status === 440) {
      message = '您的账号已经在其他地方登录！';
    } else if (error.response.status === 450) {
      message = '登录超时，请重新登录！';
    } else {
      message = '您没有登录，请登录！';
    }

    Vue.prototype
      .$confirm(message, '警告', {
        type: 'warning',
        showCancelButton: false,
        closeOnClickModal: false,
        showClose: false,
      })
      .then(() => {
        store.dispatch('auth/Logout');
      });
  } else {
    clearTimeout(window['error450-timeout']);
    window['error450-timeout'] = setTimeout(() => {
      window.error450 = false;
    }, 5000);
  }

  return Promise.reject(error);
}
