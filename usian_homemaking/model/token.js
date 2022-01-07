/**
 * @author YangLing
 * @date 2022/1/7 9:34 AM
 */
import Http from "../utils/http";
import APIConfig from "../config/api";

class Token{
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
}

export default Token