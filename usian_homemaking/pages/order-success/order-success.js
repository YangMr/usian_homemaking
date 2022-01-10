import roleType from "../../enum/role-type";
import orderStatus from "../../enum/order-status";

Page({
    data: {
        roleTypeEnum : roleType,
        orderStatusEnum : orderStatus
    },
    onLoad: function (options) {

    },
    handleCheckOrder : function (){
        wx.navigateTo({
            url : `/pages/my-order/my-order?role=${this.data.roleTypeEnum.CONSUMER}&status=${this.data.orderStatusEnum.UNAPPROVED}`
        })
    },
    handleNavToHome : function (){
        wx.switchTab({
            url : "/pages/home/home"
        })
    }
});