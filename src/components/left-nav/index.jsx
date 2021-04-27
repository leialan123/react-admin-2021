import React, { Component } from 'react'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import { menuIcon, menuArray } from '../../config/menuArray'

const { SubMenu } = Menu;
// 一级菜单栏
const rootSubmenuKeys = ['inventory_manage', 'base_data', 'home'];

export default class LeftNav extends Component {

    state = {
        openKeys: [],
    }

    onOpenChange = keys => {
        const latestOpenKey = keys.find(key => this.state.openKeys.indexOf(key) === -1);
        console.log('keys', keys)
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({
                openKeys: keys,
            })
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            })
        }
    };

    onClick = item => {
        this.setState({
            openKeys: item.keyPath,
        })
    }


    getMenuList = menuArray => {
        return menuArray.map(menuObj => {
            if (menuObj.children.length === 0){
                if (menuObj.data.idDeleted === 'n') {
                    return (
                        <Menu.Item key={menuObj.id} icon={menuIcon[menuObj.id]}>
                            <NavLink exact to={menuObj.data.url}>{menuObj.data.name}</NavLink>
                        </Menu.Item>
                    )
                }
            }  else  {
                return (
                    <SubMenu key={menuObj.id} icon={menuIcon[menuObj.id]} title={menuObj.data.name}>
                        { this.getMenuList(menuObj.children) }
                    </SubMenu>
                )
            }
        })
    }

    render(){
        const { openKeys } = this.state;
        return (
            <Menu
                defaultSelectedKeys={['home']}
                mode="inline"
                openKeys={openKeys}
                onOpenChange={this.onOpenChange}
                // theme="dark"
                onClick={this.onClick}
            >
                {
                    this.getMenuList(menuArray)
                }
            </Menu>
        )
    }
}