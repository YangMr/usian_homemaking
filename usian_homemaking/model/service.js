/**
 * @author YangLing
 * @date 2021/12/30 2:48 PM
 */
import Http from "../utils/http";

class Service{
    page = 1
    count = 4
    data = []
    hasMoreData = true
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

    reset(){
        this.page = 1
        this.count = 4
        this.data = []
        this.hasMoreData = true
        return this
    }
}

export default Service