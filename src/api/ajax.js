import axios from 'axios'
import { message } from 'antd';
// 能发送异步 ajax 请求的函数模块
// 封装 axios 库
// 函数的返回值是 promise 对象
// 1.优化：统一处理请求异常，在外层包一个自己创建的 promise 对象，在请求出错时，不去 reject(error),而是显示错误提示
// 2.优化：异步得到的不是 response，而是 response.data，在请求成功 resolve 时：resolve(response.data)
export default function ajax(url, data = {}, type = 'GET'){

    return new Promise(( resolve, reject ) => {
        let promise;

        // 1. 执行异步 ajax 请求
        if (type === 'GET') { // get 请求
            promise = axios.get(url,{
                params: data
            })
        } else { // post 请求
            promise = axios.post(url,data);
        }

        // 2. 如果成功，调用 resolve
        promise.then(response => {
            resolve(response.data);


        // 3. 如果失败，不调用 reject，而是提示异常信息
        }).catch(error => {
            message.error('请求失败：' + error.message);
        })
    })
}