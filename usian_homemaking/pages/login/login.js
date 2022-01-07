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
            title : '正在授权',
        })

        try{
            //2. 调用登录接口
            await User.login()
            //3. 更新数据库的用户信息
            await User.updateUserInfo(res.userInfo)
            //返回上一页
            wx.navigateBack()
        }catch (e){
            wx.showModal({
                title : "注意",
                content : '登录出错，请重新登录',
                showCancel : false
            })
            console.log(e)
        }


        //隐藏loading
        wx.hideLoading()



    },
    handleToHome : function (){
        console.log("tohome")
    }
});