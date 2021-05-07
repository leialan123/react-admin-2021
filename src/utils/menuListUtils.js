import { arrayUnique, arrayObjExistence } from './arrayUtils';

// 对后端返回的菜单栏数据进行处理
let menuTreeObj = [];
const menuTree = (menuArray = []) => {
    menuArray.map(menuObj => {
        let obj = {};
        if (menuObj.children.length === 0){
            obj[menuObj.data.url] = menuObj.parentUrl;
            const iseExistence = arrayObjExistence(menuTreeObj, obj, menuObj.data.url);
            if(!iseExistence) {
                menuTreeObj = [...menuTreeObj, obj];
            }
        }else {
            obj[menuObj.data.url] = menuObj.parentUrl;
            const iseExistence = arrayObjExistence(menuTreeObj, obj, menuObj.data.url);
            if(!iseExistence) {
                menuTreeObj = [...menuTreeObj, obj];
            }
            menuTree(menuObj.children)
        }
    });
    return menuTreeObj
};

// 根据当前 path 获取应该展开的菜单栏
let initOpenKeys = [];
const getNewMenuArray = (menuTrees = [], path) => {
    // 去除重复的菜单栏 path
    // initOpenKeys = arrayUnique(initOpenKeys);

    menuTrees.map(item => {
        if (item[path]) {
            initOpenKeys = [...initOpenKeys, item[path], path];
            getNewMenuArray(menuTrees, item[path]);
        }
    });

    // 去除重复的菜单栏 path
    return arrayUnique(initOpenKeys);
};

// 自定义应该默认展开的菜单栏
const initKeys = (array =[]) => {
    initOpenKeys = array;
};

export {
    menuTree,
    getNewMenuArray,
    initKeys,
}