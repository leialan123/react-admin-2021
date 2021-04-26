const USER_KEY = 'user_key' // 用户信息


const storageUtils = {
    // 保存user
    saveUser (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user))
    },

    // 读取user
    getUser () {
        return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    },

    // 删除user
    removeUser () {
        localStorage.removeItem(USER_KEY)
    },

    // 删除 user
    deleteUser: () => {
        localStorage.removeItem(USER_KEY)
    }
};

export default storageUtils;