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
        },
        service : null
    },
    onLoad: function (options) {
        const service = JSON.parse(options.service)
        this.data.formData = {
            type: service.type,
            title: service.title,
            category_id: service.category.id,
            cover_image: service.cover_image,
            description: service.description,
            designated_place: service.designated_place,
            begin_date: service.begin_date,
            end_date: service.end_date,
            price: service.price
        }
        this.setData({
            formData : this.data.formData,
            service
        })
    },
    handleSubmit : async function (event){

        const res = await wx.showModal({
            title : "提示",
            content : '是否确认更新该服务?',
            showCancel : true
        })

        if(!res.confirm){
            return
        }

        wx.showLoading({title : '正在更新', mask : true})
        const formData = getEventParams(event,'formData')

        try{
            await Service.editService(this.data.service.id,formData)
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