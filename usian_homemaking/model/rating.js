/**
 * @author YangLing
 * @date 2022/1/5 1:36 PM
 */
import Base from "./base";
import Http from "../utils/http";

class Rating extends Base{
    async _getServiceRatingList(serviceId){
        if(!this.hasMoreData){
            return this.data
        }
        const ratingList = await Http.request({
            url : "/v1/rating/service",
            method : "GET",
            data : {
                page : this.page,
                count : this.count,
                service_id : serviceId
            }
        })
        this.data = this.data.concat(ratingList.data)
        this.hasMoreData = !(this.page === ratingList.last_page)
        this.page++
        return this.data
    }
}

export default  Rating