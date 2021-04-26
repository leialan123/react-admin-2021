import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.less'

import App from './App'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

// 读取 localStorage 中保存的 user，保存到内存中
const user = storageUtils.getUser();
memoryUtils.user = user;

// 入口js
ReactDOM.render(<App />,document.getElementById("root"))