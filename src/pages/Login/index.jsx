import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {Form, Input, Button, Checkbox, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import styles from './index.module.less'

export default class Login extends Component {
    // async 和 await 的作用：
    // 1.简化 promise 对象的使用，不再使用 .then() 来指定成功/失败的回调函数；
    // 2.以同步编码（没有回调函数了）方式实现异步流程
    // 哪里写 await：在返回 promise 的表达式左侧写 await：不想要 promise，想要 promise 异步执行的成功的 value 数据
    // 哪里写 async：await 所在函数（最近的）定义的左侧写 async

    onFinish = async values => {
        // 校验成功
        console.log('Received values of form: ', values);
        // 请求登录验证接口
        const { username, password } = values;

        // 不加 await 就还是 promise，加了就是 response,等待返回成功的 response
        // const response = await reqLogin(username, password);
        // message.success('接口请求成功');
        // console.log('接口返回内容', response.data);// { status: 0, data: {}} / { status: 1, msg: 'XXX'}

        // 不加 await 就还是 promise，加了就是 response,等待返回成功的 response.data
        const result =  await reqLogin(username, password); // { status: 0, data: {}} / { status: 1, msg: 'XXX'}
        // 模拟登录验证成功返回用户信息数据
        // const  result = {status: 0, data: {username: '张三'}};
        if (result.status === 0) {
            message.success('登录验证成功');
            console.log('返回数据：', result.data);

            // 登录的用户信息
            const user = result.data;
            memoryUtils.user = user; // 把登录的用户信息保存到内存中
            storageUtils.saveUser(user); // 把登录的用户信息保存到 localStorage 中

            // 跳转到系统首页（不需要再回退到登录，使用 replace ）
            this.props.history.replace('/home'); // this.props.history.replace('/'); // 或者重定向到首页

        } else {
            message.error('登录验证失败', result.msg);
        }
    };

    render(){
        const user = memoryUtils.user;
        // 如果用户已经登录，则自动跳转到应用首页
        if (user && user.username){
            return <Redirect to='/home' />
        }
        return(
            <div className={styles.loginWrap}>
                <Form
                    name="normal_login"
                    className={styles.loginForm}
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={// 声明式验证规则
                            [
                                { required: true, message: '请输入手机号或工号!' },
                                { whitespace: true, message: '不能包含空格'}
                            ]
                        }
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入手机号或工号" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={
                            [
                                // 自定义验证规则
                                { validator: (rule, value) => {
                                        if (!value){
                                            return Promise.reject('密码不能为空！')
                                        } else if (value.length < 4) {
                                            return Promise.reject('密码长度至少4位！')
                                        }
                                        return Promise.resolve()
                                    }
                                },
                                { whitespace: true, message: '不能包含空格'}
                            ]
                        }
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="请输入密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>记住密码</Checkbox>
                        </Form.Item>

                        <a className={styles.loginFormForgot} href="www.baidu.com">
                            忘记密码
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
                            登录
                        </Button>
                        Or <a href="www.baidu.com">立即注册!</a>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}