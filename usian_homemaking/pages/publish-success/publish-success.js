Page({
    data: {},
    onLoad: function (options) {

    },
    handleCheckOrder : function (){
        wx.navigateTo({
            url : `/pages/my-order/my-order`
        })
    },
    handleNavToHome : function (){
        wx.switchTab({
            url : "/pages/home/home"
        })
    }
});