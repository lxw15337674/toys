/*
 * @Date: 2020-04-11 15:23:52
 * @LastEditors: bhwa233
 * @LastEditTime: 2020-04-11 15:25:12
 */

import Axios from 'axios';
import Vue from 'vue';


export default function request() {
    let queue = {};
    /**
     * @ClassName get
     * @Description : get请求封装
     * @Params: url [string] 请求地址，data[object] 请求参数， debounce[Boolean]是否防抖
     * @Return :
     * @Date : 2020/4/10 17:24
     */
    this.get = async (url, data, config = { debounce: false }) => {
        async function request() {
            try {
                let res = await Axios.get(url, { params: data });
                res = res.data;
                return new Promise((resolve, reject) => {
                    if (res.code === '1') {
                        resolve(res.data);
                    } else {
                        Vue.prototype.$notify({
                            showClose: true,
                            duration: 2000, // 弹框显示时间，毫秒
                            message: res.message,
                            type: 'warning',
                            offset: 50,
                        });
                        reject(res);
                    }
                });
            } catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        }
        if (config.debounce) {
            return new Promise((suc, err) => {
                if (queue[url]) {
                    clearTimeout(queue[url]);
                }
                queue[url] = setTimeout(() => {
                    suc(request());
                }, 500);
            });
        } else {
            return request();
        }
    };

    /**
     * @ClassName post
     * @Description : post请求封装
     * @Params: url [string] 请求地址，data[object] 请求参数，
     * @configParams notify[Boolean]请求完成后是否弹出提示信息 message[string]自定义提示信息 debounce[Boolean]是否节流
     * @Return :
     * @Date : 2020/4/10 17:24
     */
    this.post = (url, data, config = { notify: false, message: '', throttle: false }) => {
        let request = async function () {
            try {
                let res = await Axios.post(url, data);
                res = res.data;
                return new Promise((resolve, reject) => {
                    if (res.code === '1') {
                        if (config.notify) {
                            Vue.prototype.$notify({
                                showClose: true,
                                duration: 2000, // 弹框显示时间，毫秒
                                message: config.message || res.message,
                                type: 'success',
                                offset: 50,
                            });
                        }
                        resolve(res.data);
                    } else {
                        Vue.prototype.$notify({
                            showClose: true,
                            duration: 2000, // 弹框显示时间，毫秒
                            message: res.message,
                            type: 'warning',
                            offset: 50,
                        });
                        reject(res);
                    }
                });
            } catch (err) {
                console.error(err);
            }
        };
        if (config.throttle) {
            return new Promise((suc, err) => {
                if (!queue[url]) {
                    queue[url] = setTimeout(() => {
                        queue[url] = null;
                        request()
                            .then((e) => suc(e))
                            .catch((e) => err(e));
                    }, 300);
                }
            });
        } else {
            return request();
        }
    };
}
