import React, { Component } from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import './index.less'

// 应用根组件
export default class App extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login} ></Route>
                    <Route path='/home' component={Home} ></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}