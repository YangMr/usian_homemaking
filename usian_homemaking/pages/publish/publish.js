import {getEventParams} from "../../utils/utils";
import Service from "../../model/service";

Page({
    data: {
        formData : {
            type: null,
            title: "",
            category_id: null,
            cover_image: null,
            description: "",
            designated_place: false,
            begin_date: "",
            end_date: "",
            price: ""
        }
    },
    onLoad: function (options) {

    },

    handleSubmit : async function (event){

        const res = await wx.showModal({
            title : "提示",
            content : '是否确认申请发布该服务?',
            showCancel : true
        })

        if(!res.confirm){
            return
        }

        wx.showLoading({title : '正在发布', mask : true})

        const formData = getEventParams(event,'formData')

        try{
            await Service.publishService(formData)
            this._resetForm()
            wx.navigateTo({
                url : "/pages/publish-success/publish-success"
            })
        }catch (e) {
            console.log(e)
        }

        wx.hideLoading()
    },
    _resetForm : function (){
        const formData = {
            type: null,
            title: "",
            category_id: null,
            cover_image: null,
            description: "",
            designated_place: false,
            begin_date: "",
            end_date: "",
            price: ""
        }

        this.setData({
            formData
        })
    }
});