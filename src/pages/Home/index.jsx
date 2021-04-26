import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

export default class Home extends Component {

    loginOut = () => {
        storageUtils.deleteUser();
        memoryUtils.user = {};
        this.props.history.replace('/login');
    }


    render(){
        const user = memoryUtils.user;
        console.log('用户信息：', user);
        // 如果内存中没有存储 user，user为{}，则说明没有登录，自动返回到登录页面
        if (!user.username) {
            // 在render()中实现自动跳转到登录页面
            return <Redirect to='/login' />
        }

        return(
            <div>
                Hello, { user.username }
                <Button type='primary' onClick={this.loginOut}>退出登录</Button>
            </div>
        )
    }
}