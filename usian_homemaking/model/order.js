/**
 * @author YangLing
 * @date 2022/1/8 3:55 PM
 */
import Http from "../utils/http";

class Order{
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
}

export default Order