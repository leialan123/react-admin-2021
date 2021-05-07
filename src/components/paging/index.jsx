import React, { Component } from 'react';
import { Pagination, Button,  } from 'antd';
import {
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';

import styles from  './index.module.less';

class Paging extends Component{
    state = {
        current: 1, // 当前页数
        pageSize: 10, // 每页显示条数
        total: 50, // 数据总数
        pageSizeOptions: [10,20,30], // 指定每页显示条数
        showPageSizeOptions: false, // 是否显示指定每页条数选择
    };

    // 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
    onChange = (current, pageSize) => {
        console.log('当前页：' + current, '每页显示条数：' + pageSize);
    };


    // pageSize 变化的回调
    onShowSizeChange = () => {

    }

    render(){
        return(
            <div>
                分页组件
                <Pagination defaultCurrent={1} total={50} />
                <hr />
                <ul className={styles.pagination}>
                    <li className={`${styles.paginationPrev} ${styles.paginationDisabled}`}><Button  icon={<LeftOutlined style={{ fontSize: '12px'}} />}/></li>
                    <li className={`${styles.paginationItem} ${styles.paginationActive}`}>
                        <Button type='link'>1</Button>
                    </li>
                    <li className={styles.paginationItem}>
                        <Button type='link'>2</Button>
                    </li>
                    <li className={styles.paginationItem}>
                        <Button type='link'>3</Button>
                    </li>
                    <li className={styles.paginationItem}>
                        <Button type='link'>4</Button>
                    </li>
                    <li className={styles.paginationItem}>
                        <Button type='link'>5</Button>
                    </li>
                    <li className={styles.paginationNext}><Button icon={<RightOutlined style={{ fontSize: '12px'}} />}/></li>
                </ul>
            </div>
        )
    }
}

export default Paging;