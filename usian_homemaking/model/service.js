/**
 * @author YangLing
 * @date 2021/12/30 2:48 PM
 */
import Http from "../utils/http";
import Base from "./base";

class Service extends Base{

    /**
     * 分页获取服务列表的数据
     * @param page
     * @param count
     * @param category_id
     * @param type
     * @returns {Promise<*|undefined>}
     */
    async getServiceList(category_id = null,type = ""){
        const serviceList = await Http.request({
            url : "/v1/service/list",
            method : "GET",
            data : {
                page : this.page,
                count : this.count,
                category_id :category_id || "",
                type : type || ""
            }
        })
        this.data = this.data.concat(serviceList.data)
        this.hasMoreData = !(this.page === serviceList.last_page)
        this.page++
        return this.data
    }

    /**
     * 获取服务详情的数据
     * @param serviceId
     * @returns {Promise<*|undefined>}
     */
    static getService(serviceId){
        return Http.request({
            url : `/v1/service/${serviceId}`,
            method : "GET"
        })
    }

    /**
     * 更新服务的状态
     * @param {Number} serviceId
     * @param {Number} action
     * @returns {Promise<*|undefined>}
     */
    static updateServiceStatus(serviceId,action){
        return Http.request({
            url : `/v1/service/${serviceId}`,
            method : "POST",
            data : {
                action
            }
        })
    }

    /**
     * 创建服务
     * @param serviceData
     * @returns {Promise<*>}
     */
    static publishService(serviceData){
        return Http.request({
            url : '/v1/service',
            method : 'POST',
            data : serviceData
        })
    }

    /**
     * 编辑服务接口
     * @param serviceId
     * @param serviceData
     * @returns {Promise<*>}
     */
    static editService (serviceId,serviceData){
        return Http.request({
            url : `/v1/service/${serviceId}`,
            method : 'PUT',
            data : serviceData
        })
    }

    /**
     * 查询我的服务状态统计
     * @param type
     * @returns {Promise<*>}
     */
    static getServiceStatus(type){
        return Http.request({
            url : `/v1/service/count?type=${type}`,
            method : 'GET'
        })
    }
}

export default Service