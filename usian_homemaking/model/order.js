/**
 * @author YangLing
 * @date 2022/1/8 3:55 PM
 */
import Http from "../utils/http";

class Order{
    /**
     * 创建订单
     * @param serviceId
     * @param address
     * @returns {Promise<*>}
     */
    static createOrder(serviceId,address){
        return Http.request({
            url : "/v1/order",
            method : "POST",
            data : {
                service_id : serviceId,
                address
            }
        })
    }

    /**
     * 查询我的订单状态统计
     * @param role
     * @returns {Promise<*>}
     */
    static getOrderStatus(role){
        return Http.request({
            url :`/v1/order/count?role=${role}`,
            method : 'GET'
        })
    }
}

export default Order