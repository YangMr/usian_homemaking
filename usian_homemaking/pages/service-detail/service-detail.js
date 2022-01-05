import Service from "../../model/service"
import User from "../../model/user"
import Rating from "../../model/rating"
const rating = new Rating()
Page({
    data: {
        service : null,
        serviceId : null,
        isPublisher : false,
        ratingList : []
    },
    onLoad: async function (options) {
        this.data.serviceId = options.service_id
        await this._getService()
        await this._getServiceRatingList()
        this._checkRole()
    },
    _getService : async function (){
        const service = await Service.getService(this.data.serviceId)
        this.setData({
            service
        })
    },
    _getServiceRatingList : async function (){
        const ratingList = await rating.reset()._getServiceRatingList(this.data.serviceId)
        this.setData({ratingList})
    },
    /**
     * 检测当前登录的用户是否是当前服务详情的发布者，如果是的话，设置isPublisher true 否则 为 false
     * @private
     */
    _checkRole(){
       const userinfo = User.getUserInfoByLocal()
        if(this.data.service.publisher.id === userinfo.id){
            this.setData({
                isPublisher : true
            })
        }
    }

});