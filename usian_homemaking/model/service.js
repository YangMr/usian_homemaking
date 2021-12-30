/**
 * @author YangLing
 * @date 2021/12/30 2:48 PM
 */
import Http from "../utils/http";

class Service{
    /**
     * 分页获取服务列表的数据
     * @param page
     * @param count
     * @param category_id
     * @param type
     * @returns {Promise<*|undefined>}
     */
    static getServiceList(page,count,category_id = null,type = ""){
        return Http.request({
            url : "/v1/service/list",
            method : "GET",
            data : {
                page,
                count
            }
        })
    }
}

export default Service