import APIConfig from "../config/api";
import {wxToPromise} from "./wx";
import exceptionMessage from "../config/exception-message";
import cache from "../enum/cache";
import User from "../model/user";

/**
 * @author YangLing
 * @date 2021/12/30 1:44 PM
 */

class Http{
    /**
     * http请求方法
     * @param url
     * @param data
     * @param method
     * @returns {Promise<*>}
     */
    static async request({url,data = {}, method = "GET",refetch = true}){
        const res = await wxToPromise("request",{
             url : APIConfig.baseUrl + url,
             method,
             data,
             header : {
                 token : wx.getStorageSync(cache.TOKEN)
             }
        })

        // res.statusCode = 500

        //TODO 请求成功
        if(res.statusCode < 400){
            return res.data.data
        }

        //TODO 请求失败
        if(res.statusCode === 401){
            //TODO 令牌过期相关的业务逻辑处理
            if(res.data.error_code === 10001){
                wx.navigateTo({
                    url : "/pages/login/login"
                })
                throw new Error("请求未携带令牌")
            }


            if(refetch){
                //token失效时，重新在进行登录
                return await  Http._refetch({url,data, method,refetch})
            }
        }

        Http._showError(res.data.error_code, res.data.message)

        const error = Http._generateMessage(res.data.message)
        throw new Error(error)

    }

    /**
     * 请求发生错误时，进行信息提示
     * @param errorCode
     * @param message
     * @private
     */
    static _showError(errorCode,message){
        let title
        title = exceptionMessage[errorCode] || message || "未知异常"
        title = Http._generateMessage(message)

        wx.showToast({
            title,
            icon : "none",
            duration : 3000
        })
    }

    /**
     * 对抛出异常的错误信息进行封装
     * @param message
     * @returns {string|*}
     * @private
     */
    static _generateMessage(message){
        return typeof message === 'object' ? Object.values(message).join("") : message
    }

    /**
     * 当令牌失效时，重新调用登录方法，再次重新发送请求
     * @returns {Promise<void>}
     * @private
     */
    static async _refetch(data){
        await User.login()
        data.refetch = false
        await Http.request(data)
    }
}

export default Http