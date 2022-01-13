/**
 * @author YangLing
 * @date 2022/1/7 9:34 AM
 */
import Http from "../utils/http";
import APIConfig from "../config/api";
import cache from "../enum/cache";

class Token{
    /**
     * 获取令牌
     * @returns {Promise<any>}
     */
    static async getToken(){
        const res = await Http.request({
            url : '/v1/token',
            method : 'POST',
            data : {
                i_code : APIConfig.iCode,
                order_no : APIConfig.orderNo
            }
        })
        return res.token
    }

    /**
     * 验证令牌是否过期
     * @returns {Promise<*>}
     */
    static async verifyToken(){
        const token = wx.getStorageSync(cache.TOKEN)
        return Http.request({
            url : '/v1/token/verify',
            method : "POST",
            data : {
                token
            }
        })
    }
}

export default Token