/* eslint-disable no-undef */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { getToken } from '@/libs/utils/cookies';
import { ElMessage } from 'element-plus';
// ! 声明一个MAP结构 用于存储每个请求的标识和取消函数
const pending = new Map()
const addPending = (config: AxiosRequestConfig) => {
    const url = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data)
    ].join('&');

    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pending.has(url)) {
            pending.set(url, cancel);
        }
    });
}
/**
* @description: 移除请求
* @version: 1.0.0
* @param {AxiosRequestConfig} config
* @return {*}
* @author: 天生不是宠儿
* @Date: 2021-12-10 10:18:05
*/
const removePending = (config: AxiosRequestConfig) => {
    const url = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data)
    ].join('&');
    if (pending.has(url)) { // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
        const cancel = pending.get(url);
        cancel(url);
        pending.delete(url);
    }
};
/**
 * @description: 清空pending中的请求 （在路由跳转时使用）
 * @version: 1.0.0
 * @param {*}
 * @return {*}
 * @author: 天生不是宠儿
 * @Date: 2021-12-10 10:18:22
 */

export const clearPending = () => {
    for (const [url, cancel] of pending) {
        cancel(url);
    }
    pending.clear();
};
/**
 * @description: 业务状态码
 * @version: 1.0.0
 * @param {number} status
 * @return {*}
 * @author: 天生不是宠儿
 * @Date: 2021-12-10 10:18:48
 */
const showStatus = (status: number) => {
    let message = '';

    switch (status) {
        case 400:
            message = '请求错误';
            break;
        case 401:
            message = '未授权，请重新登录';
            break;
        case 403:
            message = '拒绝访问';
            break;
        case 404:
            message = '请求出错';
            break;
        case 408:
            message = '请求超时';
            break;
        case 500:
            message = '服务器错误';
            break;
        case 501:
            message = '服务未实现';
            break;
        case 502:
            message = '网络错误';
            break;
        case 503:
            message = '服务不可用';
            break;
        case 504:
            message = '网络超时';
            break;
        case 505:
            message = 'HTTP版本不受支持';
            break;
        default:
            message = '连接出错';
            break;
    }
    return `${message}，请检查网络或联系管理员！`;
}

const service = axios.create({
    'timeout': 1000 * 60 * 5,
    'withCredentials': true,
    'transformRequest': [(data) => {
        data = JSON.stringify(data);
        return data;
    }],
    validateStatus() {
        // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
        return true;
    },
    'transformResponse': [(data) => {
        if (typeof data === 'string' && data.startsWith('{')) {
            data = JSON.parse(data);
        }
        return data;
    }]
});

service.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded;multipart/form-data;charset=UTF-8;application/json';
/**
 * @description: 请求拦截器
 * @version: 1.0.0
 * @param {AxiosRequestConfig} config
 * @return {*}
 * @author: 天生不是宠儿
 * @Date: 2021-12-10 10:19:10
 */
service.interceptors.request.use((config: AxiosRequestConfig) => {
    removePending(config); // 在请求开始前，对之前的请求做检查取消操作
    addPending(config); // 将当前请求添加到 pending 中
    let token = getToken();
    if (token && config.headers) {
        config.headers.Token = `${token}`;
    }
    return config;
}, (error) => {
    // 错误抛到业务代码
    error.data = {};
    error.data.msg = '服务器异常，请联系管理员！';
    return Promise.resolve(error);
});
/**
 * @description: response拦截器
 * @version: 1.0.0
 * @param {AxiosResponse} response
 * @return {*}
 * @author: 天生不是宠儿
 * @Date: 2021-12-10 10:19:50
 */
service.interceptors.response.use((response: AxiosResponse) => {
    removePending(response); // 在请求结束后，移除本次请求
    let message = '';
    const status = response.data.c;
    if (status === 200) {
        return response.data.v || status;
    }
    if (typeof response.data === 'string') {
        response.data = message;
    } else {
        response.data.message = message;
    }
    message = showStatus(status);
    return response;
},
    (error) => {
        if (axios.isCancel(error)) {
            console.log('repeated request: ' + error.message);
        } else {
            // handle error code
            // 错误抛到业务代码
            error.data = {};
            error.data.Message = '请求超时或服务器异常，请检查网络或联系管理员！';
            ElMessage.closeAll();
            ElMessage.error(error.data.Message);
        }
        return Promise.reject(error);
    }
);

export default service;
