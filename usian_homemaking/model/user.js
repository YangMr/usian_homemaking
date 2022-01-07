/**
 * @author YangLing
 * @date 2022/1/4 4:42 PM
 */
import Token from "./token";
import cache from "../enum/cache";
import Http from "../utils/http";

class User{
    /**
     * 获取本地存储的用户信息
     * @returns {any}
     */
    static getUserInfoByLocal(){
        return wx.getStorageSync(cache.USERINFO)
    }

    static async login(){
        const res = await Token.getToken()
        wx.setStorageSync(cache.TOKEN,res)
    }

    static async updateUserInfo(data){
        const res = await Http.request({
            url : '/v1/user',
            method : 'PUT',
            data
        })
        wx.setStorageSync(cache.USERINFO,res)
    }
}

export default User