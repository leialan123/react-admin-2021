import {
    AppstoreOutlined,
    PieChartOutlined,
    MailOutlined,
} from '@ant-design/icons';

const menuIcon ={
    home: <AppstoreOutlined />,
    base_data: <PieChartOutlined />,
    inventory_manage: <MailOutlined />
}

const menuArray = [
    {
        id: "home",
        children: [],
        data: {
            name: '首页',
            url: '/home',
            idDeleted: 'n'
        },
    },
    {
        id: "base_data",
        children: [
            {
                id: "main_data_manage",
                children: [],
                data: {
                    name: '主数据维护',
                    url: '/main_data_manage',
                    idDeleted: 'n'
                },
            },
            {
                id: "depreciation_category",
                children: [],
                data: {
                    name: '折旧类别',
                    url: '/depreciation_category',
                    idDeleted: 'y'
                },
            },
            {
                id: "entry_name",
                children: [],
                data: {
                    name: '项目名称',
                    url: '/entry_name',
                    idDeleted: 'n'
                },
            },
            {
                id: "warehouse_name",
                children: [],
                data: {
                    name: '仓库名称',
                    url: '/warehouse_name',
                    idDeleted: 'n'
                },
            },
            {
                id: "warehouse_allocation",
                children: [],
                data: {
                    name: '仓库分配',
                    url: '/warehouse_allocation',
                    idDeleted: 'n'
                },
            },
        ],
        data: {
            name: '基础数据',
            url: '/base_data',
            idDeleted: 'n'
        },
    },
    {
        id: 'inventory_manage',
        children: [
            {
                id: "warehouse_in",
                children: [],
                data: {
                    name: '入库管理',
                    url: '/warehouse_in',
                    idDeleted: 'n'
                },
            },
            {
                id: "warehouse_out",
                children: [],
                data: {
                    name: '出库管理',
                    url: '/warehouse_out',
                    idDeleted: 'n'
                },
            },
            {
                id: "warehouse_init",
                children: [],
                data: {
                    name: '库存初始化',
                    url: '/warehouse_init',
                    idDeleted: 'n'
                },
            },
            {
                id: "inventory_depreciation",
                children: [
                    {
                        id: "fixed_assets_list",
                        children: [],
                        data: {
                            name: '固定资产清单',
                            url: '/fixed_assets_list',
                            idDeleted: 'n'
                        },
                    },
                    {
                        id: "inventory_depreciation_list",
                        children: [],
                        data: {
                            name: '库存折旧清单',
                            url: '/inventory_depreciation_list',
                            idDeleted: 'y'
                        },
                    },
                ],
                data: {
                    name: '库存折旧',
                    url: '/inventory_depreciation',
                    idDeleted: 'n'
                },
            },
        ],
        data: {
            name: '库存管理',
            url: '/inventory_manage',
            idDeleted: 'n'
        }
    },
]

export {
    menuIcon,
    menuArray,
}