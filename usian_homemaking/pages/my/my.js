import Token from "../../model/token";
import cache from "../../enum/cache";
import {appointWithMeGrid, myAppointGrid, myProvideGird, mySeekGrid} from "../../config/grid"
import Order from "../../model/order";
import roleType from "../../enum/role-type";
import Service from "../../model/service";
import serviceType from "../../enum/service-type";
Page({
    data: {
        count : 10,
        userInfo : {
            avatar : '../../images/logo.png',
            nickname : '点击授权登录'
        },
        //Grid的配置绑定
        // 预约我的
        appointWithMeGrid,
        // 我的预约
        myAppointGrid,
        // 我在提供
        myProvideGird,
        // 正在找
        mySeekGrid,
        appointWithMeStatus : null,
        myAppointStatus : null,
        provideServiceStatus : null,
        seekServiceStatus : null
    },
    onLoad: function (options) {

    },
    onShow : async function (){
        //验证token是否过期
        const verifyToken = await Token.verifyToken()
        if(verifyToken.valid){
           const userInfo =  wx.getStorageSync(cache.USERINFO)
            console.log(userInfo)
           this.setData({
               ['userInfo.avatar'] : userInfo.avatar,
               ['userInfo.nickname'] : userInfo.nickname
           })

            this._getOrderStatus()
            this._getServiceStatus()
        }


    },
    handleToLogin : function (){
        wx.navigateTo({
            url : '/pages/login/login'
        })
    },
    //获取订单的统计数量
    _getOrderStatus :async function (){
        //获取预约我的统计数量
       const appointWithMeStatus =  Order.getOrderStatus(roleType.PUBLISHER)
        //获取我的预约的统计数量
       const myAppointStatus =   Order.getOrderStatus(roleType.CONSUMER)


        this.setData({
            appointWithMeStatus : await appointWithMeStatus,
            myAppointStatus : await myAppointStatus
        })
    },
    //获取服务的统计数量
    _getServiceStatus :async function() {
        //获取我在提供的统计数量
        const provideServiceStatus = Service.getServiceStatus(serviceType.PROVIDE)
        //获取在提供的统计数量
        const seekServiceStatus = Service.getServiceStatus(serviceType.SEEK)

        this.setData({
            provideServiceStatus : await provideServiceStatus,
            seekServiceStatus : await seekServiceStatus
        })
    }
});