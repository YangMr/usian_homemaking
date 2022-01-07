import Service from "../../model/service"
import User from "../../model/user"
import Rating from "../../model/rating"
import serviceType from "../../enum/service-type";
import serviceStatus from "../../enum/service-status";
import {getEventParams} from "../../utils/utils"
import serviceAction from "../../enum/service-action";
import cache from "../../enum/cache";
const rating = new Rating()
Page({
    data: {
        service : null,
        serviceId : null,
        isPublisher : false,
        ratingList : [],
        loading : true,
        serviceTypeEnum : serviceType,
        serviceStatusEnum : serviceStatus
    },
    onLoad: async function (options) {
        this.data.serviceId = options.service_id
        await this._getService()
        await this._getServiceRatingList()
        this.setData({loading : false})
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
    handleUpdateStatus :async function (event){

        const action = getEventParams(event,'action')

        const content = this._generateModelContent(action)

        const res = await wx.showModal({
            title : "注意",
            content
        })

        if(!res.confirm){
            return
        }

        await Service.updateServiceStatus(this.data.serviceId,action)
        await this._getService()

        console.log(res)

    },
    handleEditService : function (){
        //服务详情信息
        const service = JSON.stringify(this.data.service)
        wx.navigateTo({
            url : `/pages/service-edit/service-edit?service=${service}`
        })
    },
    handleChat : function (){
        //发布者的id
        const targetId = this.data.service.publisher.id
        //服务详情信息
        const service = JSON.stringify(this.data.service)
        wx.navigateTo({
            url : `/pages/conversation/conversation?targetUserId=${targetId}&service=${service}`
        })
    },
    handleOrder : function (){
        //服务详情信息
        const service = JSON.stringify(this.data.service)

        if(!wx.getStorageSync(cache.TOKEN)){
            wx.navigateTo({
                url : "/pages/login/login"
            })
            return
        }

        wx.navigateTo({
            url : `/pages/order/order?service=${service}`
        })
    },
    _generateModelContent(action){
        let content

        switch (action){
            case serviceAction.PUBLISH:
                content = ""
                break
            case serviceAction.PAUSE :
                content = "发布后即可在广场页面中被浏览到，是否确认发布?"
                break
            case serviceAction.CANCEL :
                content = "取消后不可恢复，需重新发布并提交审核，已关联服务的订单且订单状态正在进行中的，仍需正常履约，是否确认取消该服务?"
                break
        }

        return content
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