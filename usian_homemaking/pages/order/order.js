import Order from "../../model/order"


Page({
    data: {
        service : null,
        address : null
    },
    onLoad: function (options) {
        const service = JSON.parse(options.service)
        this.setData({
            service
        })
    },
    handleOrder : async function (){

        if(!this.data.address){
            wx.showModal({
                title : '注意',
                content : '该服务必须指定服务地点',
                showCancel : false
            })
            return
        }

        const modalRes = await wx.showModal({
            title: '注意',
            content: '是否确认预约该服务？',
            showCancel: true,
        })

        if(!modalRes.confirm){
            return
        }

        wx.showLoading({ title: '正在预约...', mask: true })

        try{
            await Order.createOrder(this.data.service.id,this.data.address)
            wx.navigateTo({
                url : '/pages/order-success/order-success'
            })
            wx.hideLoading()
        }catch (e) {
            wx.hideLoading()
        }



    },
    handleSelectAddress : async function (){
        let address
        try {
            address = await wx.chooseAddress()
        }catch(e){
            address = null
        }

        this.setData({
            address
        })

    }
});