import User from "../../model/user";

Page({
    data: {},
    onLoad: function (options) {

    },
    handleLogin :async function (){
        //1. 让用户授权获取用户信息
        const res = await wx.getUserProfile({
            desc : '完善用户信息',
        })


        //加载loading
        wx.showLoading({
            title : '正在授权'
        })


        //2. 调用登录接口
        await User.login()


        //3. 更新数据库的用户信息
        await User.updateUserInfo({
            nickname : res.userInfo.nickName,
            avatar : res.userInfo.avatarUrl
        })

        //隐藏loading
        wx.hideLoading()

    },
    handleToHome : function (){
        console.log("tohome")
    }
});