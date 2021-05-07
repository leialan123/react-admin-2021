// 数组去重
const arrayUnique = arr => {
    if (!Array.isArray(arr)) {
        console.log('type error!');
        return
    }
    let array = [];
    for (let i = 0; i < arr.length; i++) {
        if (array.indexOf(arr[i]) === -1) {
            array.push(arr[i])
        }
    }
    return array;
};

// 判断数组对象是否存在相同的对象 true：存在，false：不存在
// arr: 数组对象；obj: 要判断是否存在的对象；key: 根据对象的 key 进行判断
const arrayObjExistence = (arr, obj, key) => {
    let iseExistence = false;
    arr.map(arrObj => {
        if (arrObj[key] === obj[key]) {
            iseExistence = true;
        }
    });

    return iseExistence
};

// 判断2个数组是否相等
const arrayIsEqual = (arr1,arr2) => {//判断2个数组是否相等
    if(arr1 === arr2){//如果2个数组对应的指针相同，那么肯定相等，同时也对比一下类型
        return true;
    }else{
        if(arr1.length !== arr2.length){
            return false;
        }else{//长度相同
            for(let i in arr1){//循环遍历对比每个位置的元素
                if(arr1[i] !== arr2[i]){//只要出现一次不相等，那么2个数组就不相等
                    return false;
                }
            }//for循环完成，没有出现不相等的情况，那么2个数组相等
            return true;
        }
    }
};

export {
    arrayUnique,
    arrayObjExistence,
    arrayIsEqual,
}