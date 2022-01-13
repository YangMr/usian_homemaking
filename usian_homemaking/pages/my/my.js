import Token from "../../model/token";
import cache from "../../enum/cache";
import {appointWithMeGrid, myAppointGrid, myProvideGird, mySeekGrid} from "../../config/grid"
Page({
    data: {
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
        mySeekGrid
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
        }

    },
    handleToLogin : function (){
        wx.navigateTo({
            url : '/pages/login/login'
        })
    }
});