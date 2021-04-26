import ajax from './ajax'
// 包含应用中所有接口请求函数的模块
// 每个函数的返回值都是 promise
// 登录
export const reqLogin = ( username, password ) => ajax('/login', { username, password }, 'POST')