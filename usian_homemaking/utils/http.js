import APIConfig from "../config/api";
import {wxToPromise} from "./wx";
import exceptionMessage from "../config/exception-message";

/**
 * @author YangLing
 * @date 2021/12/30 1:44 PM
 */

class Http{
    static async request({url,data = {}, method = "GET"}){
        const res = await wxToPromise("request",{
             url : APIConfig.baseUrl + url,
             method,
             data,
        })

        //TODO 请求成功
        if(res.statusCode < 400){
            return res.data.data
        }

        //TODO 请求失败
        if(res.statusCode === 401){
            //TODO 令牌过期相关的业务逻辑处理
            return
        }

        Http._showError(res.data.error_code, res.data.message)
        console.log("res=>",res)
    }

    static _showError(errorCode,message){
        let title
        title = exceptionMessage[errorCode] || message || "未知异常"
        title = typeof title === 'object' ? Object.values(title).join("") : title

        wx.showToast({
            title,
            icon : "none",
            duration : 3000
        })
    }
}

export default Http