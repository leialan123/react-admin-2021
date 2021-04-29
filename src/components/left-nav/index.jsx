import React, { Component } from 'react';
import { Menu } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import { menuIcon, menuArray } from '../../config/menuArray';

import { menuTree, getNewMenuArray, initKeys } from '../../utils/menuListUtils';

const { SubMenu } = Menu;
// 一级菜单栏
const rootSubmenuKeys = ['/inventory_manage', '/base_data', '/home'];

class LeftNav extends Component {

    state = {
        openKeys: [],
    };

    path = this.props.location.pathname; // 当前路由的 path
    menuTreeObj = menuTree(menuArray); // 处理之后的菜单栏数据

    onOpenChange = keys => {
        const { openKeys } = this.state;
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);

        // 根据 path 应该展开的菜单栏数组
        const pathOpenKeys = getNewMenuArray(this.menuTreeObj, this.path);

        console.log(pathOpenKeys, '{}');

        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({
                openKeys: keys,
            })
        } else {
            let isCurrent = false; // 判断是否是包含当前 path 的菜单栏

            pathOpenKeys.map(item => {
                if (item === latestOpenKey) {
                    isCurrent = true;
                }
            });

            this.setState({
                openKeys: latestOpenKey ? ( isCurrent ? pathOpenKeys : [latestOpenKey]) : [],
            })

        }
    };

    // 没有子菜单的菜单栏点击事件
    onMenuItemClick = item => {
        if (item.keyPath.length === 1){
            initKeys();
        } else {
            initKeys(item.keyPath);
        }

        this.setState({
            openKeys: item.keyPath,
        })
    };

    getMenuList = menuArray => {
        return menuArray.map(menuObj => {
            if (menuObj.children.length === 0){
                if (menuObj.data.idDeleted === 'n') {
                    return (
                        <Menu.Item key={menuObj.data.url} icon={menuIcon[menuObj.id]}>
                            <NavLink exact to={menuObj.data.url}>{menuObj.data.name}</NavLink>
                        </Menu.Item>
                    )
                }
            }  else  {
                return (
                    <SubMenu key={menuObj.data.url} icon={menuIcon[menuObj.id]} title={menuObj.data.name}>
                        { this.getMenuList(menuObj.children) }
                    </SubMenu>
                )
            }
        })
    }

    // 使用新版即将废除的旧生命周期钩子
    UNSAFE_componentWillMount() {
        this.menuNode = this.getMenuList(menuArray);
        const openKeys = getNewMenuArray(this.menuTreeObj, this.path);
        this.setState({
            openKeys,
        })
    }

    render(){
        const { openKeys } = this.state;
        const selectedKeys = this.props.location.pathname;

        return (
            <Menu
                selectedKeys={[selectedKeys]}
                mode="inline"
                openKeys={openKeys}
                onOpenChange={this.onOpenChange}
                onClick={this.onMenuItemClick}
            >
                {
                    this.menuNode
                }
            </Menu>
        )
    }
}

export default withRouter(LeftNav);