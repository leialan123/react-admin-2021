import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

import LeftNav from '../../components/left-nav';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

import Home from '../Home';
import Supplier from '../Supplier';
import MainData from '../MainData';

import styles from './index.module.less';


const { Header, Sider, Content } = Layout;

export default class Admin extends Component {

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    loginOut = () => {
        storageUtils.deleteUser();
        memoryUtils.user = {};
        this.props.history.replace('/login');
    }


    render(){
        const user = memoryUtils.user;

        // 如果内存中没有存储 user，user为{}，则说明没有登录，自动返回到登录页面
        if (!user.username) {
            // 在render()中实现自动跳转到登录页面
            return <Redirect to='/login' />
        }

        return(
            <Layout style={{ height: '100vh'}}>
                <Header className={styles.header}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: this.toggle,
                        style: {fontSize: '20px'},
                    })}
                </Header>
                <Layout>
                    <Sider className={styles.leteMenu} trigger={null} collapsible collapsed={this.state.collapsed}>
                        <LeftNav />
                    </Sider>
                    <Content>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/supplier' component={Supplier}/>
                            <Route path='/main_data_manage' component={MainData}/>
                            <Redirect to='/home' />
                            {/*<Route exact path='/' render={() => <Redirect to='/home' />}/>*/}
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}