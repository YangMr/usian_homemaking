/**
 * @author YangLing
 * @date 2022/1/4 4:42 PM
 */

class User{
    /**
     * 获取本地存储的用户信息
     * @returns {any}
     */
    static getUserInfoByLocal(){
        return wx.getStorageSync("user-info")
    }
}

export default User