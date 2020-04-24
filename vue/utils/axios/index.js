import axios from 'axios';
import store from '../../vuex/index';
import { Loading, Notification } from 'element-ui';
import filter450 from './error-handle/450-filter';
import Vue from 'vue';

// create an axios instance
const Axios = axios.create({
  // baseURL: '/api', // api的测试接口
  baseURL: globals.serverUrl, // api的base_url
  timeout: 20000, // request timeout
  responseType: 'json',
  withCredentials: false, // 是否允许带cookie这些
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'Content-Type': 'application/json;charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest',
  },
  showModal: false, // 显示loading的配置，默认true显示，false不显示
});

var loadinginstace;
// // request interceptor

var justOne = false; // 是否让警告只显示一次，当为 401 和 402 时为 true

Axios.interceptors.request.use(
  (config) => {
    // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改

    let accessToken = store.getters['auth/hasToken']();

    if (accessToken) {
      // 在这个地方如果使用store.getters获取不到token
      config.headers.Authorization = 'Bearer ' + accessToken;
    }
    // element ui Loading方法，判断showModal字段，控制是否显示loading
    if (config.showModal) {
      if (window.loadingCloseTimeOut) {
        clearTimeout(window.loadingCloseTimeOut);
      }
      loadinginstace = Loading.service({
        fullscreen: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background:
          store.state.interfaceSkin === 'dark'
            ? 'rgba(255, 255, 255, 0.5)'
            : '',
      });
    }
    return config;
  },
  (error) => {
    // Do something with request error
    if (loadinginstace) {
      loadinginstace.close();
    }
    Notification({
      showClose: true,
      duration: 2000, // 弹框显示时间，毫秒
      message: '加载超时!', // 返回 response 里的错误信息
      type: 'error',
    });
    console.log(error); // for debug
    Promise.reject(error);
  },
);

// respone interceptor 返回状态判断(添加响应拦截器)
//  如果成功就把token的到期时间顺延
Axios.interceptors.response.use(
  (response) => {
    if (loadinginstace) {
      window.loadingCloseTimeOut = setTimeout(() => {
        loadinginstace.close();
      }, 200);
    }
    // 对响应数据做些事
    if (
      response.config.responseType === 'blob' ||
      response.config.responseType === 'arraybuffer'
    ) {
      // 判断返回的是否是二进制流的文件，目前用于下载二进制文件
      if (!response.data) {
        // 接口请求不成功消息弹窗组件
        Notification({
          showClose: true, // 是否显示关闭按钮
          duration: 2000, // 弹框显示时间，毫秒
          message:
            !response.data.message || response.data.message.length === 0
              ? '请求失败，缺少状态码，请联系管理员！'
              : response.data.message,
          type: 'error',
        });
        return;
      }
    } else if (response.data && response.data.code.toString() === '1000') {
    } else if (response.data && response.data.code.toString() !== '1') {
      if (loadinginstace) {
        window.loadingCloseTimeOut = setTimeout(() => {
          loadinginstace.close();
        }, 200);
      }
      // 接口请求不成功消息弹窗组件
      Notification({
        showClose: true, // 是否显示关闭按钮
        duration: 2000, // 弹框显示时间，毫秒
        message:
          !response.data.message || response.data.message.length === 0
            ? '请求失败，缺少状态码，请联系管理员！'
            : response.data.message,
        type: 'error',
      });
      return Promise.reject(response.data.message);
    }
    // 请求成功后延长token的过期时间，改为双token后无需刷新过期时间
    // store.dispatch('auth/freshTokenExpires');
    return response;
  },
  (error) => {
    if (loadinginstace) {
      loadinginstace.close();
    }
    if (typeof error.response === 'undefined') {
      // session失效，请求302重定向时，页面跳转到登录页面
      store.state.isLogin = false;
      // window.location.href = globals.serverUrl + '/toLogout';
      return;
    } else if (error && error.response) {
      switch (error.response.status) {
        case 1000:
          error.message = error.response.data.message;
          break;
        case 400:
          error.message = '错误请求';
          break;
        case 401:
          // filter401(error);
          // 未登陆
          Vue.prototype.$login({});
          break;
        case 440:
          // 450登录超时处理
          filter450(error);
          return;
        case 450:
          // filter401(error);
          // 450登录超时处理
          filter450(error);
          return;
        case 460:
          // 未登录
          filter450(error);
          return;
        case 402:
          error.message = `${error.response.data.message}，${error.response.data.data}`;
          break;
        case 403:
          error.message = '您没有访问权限！';
          break;
        case 404:
          error.message = '请求错误,未找到该资源！';
          break;
        case 405:
          error.message = '请求方法未允许';
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器端出错，请联系管理员！';
          break;
        case 501:
          error.message = '网络未实现';
          break;
        case 502:
          error.message = '网络错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网络超时';
          break;
        case 505:
          error.message = 'http版本不支持该请求';
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      Promise.reject(error.message);
      error.message = '连接到服务器失败';
    }

    if (justOne === false) {
      // 接口报错消息弹窗组件
      Notification({
        title: '警告',
        message: error.message,
        type: 'warning',
      });
      if (loadinginstace) {
        loadinginstace.close();
      }
    }
    // 当状态码为 401 和 402 时，警告框只显示一次，避免刷多个警告
    if (error.response.status === 401 || error.response.status === 402) {
      justOne = true;
    }

    return Promise.reject(error);
  },
);

// 抛出接口请求方法，方便一些不依赖vue的组件调用
export default Axios;
