import serviceType from "../../enum/service-type";
import {getDataSet, getEventParams} from "../../utils/utils";
import Category from "../../model/category";

Component({
    properties: {
        //接收的是修改服务传递过来的表单数据
        form: {
            type: Object
        }
    },
    data: {
        typeList: [
            {
                id: serviceType.PROVIDE,
                name: '提供服务'
            },
            {
                id: serviceType.SEEK,
                name: '找服务'
            }
        ],
        //保存的是表单要提交的数据
        formData: {
            type: null,
            title: "",
            category_id: null,
            cover_image_id: null,
            description: "",
            designated_place: false,
            begin_date: "",
            end_date: "",
            price: ""
        },
        categoryList : [],
        typePickerIndex: null,
        categoryPickerIndex: null
    },
    observers : {
        'form' : function (value){
            console.log(value)
            this.setData({
                formData : value
            })
            this._init()
        }
    },
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
            this._init()
        },
    },
    methods: {
        _init: async function () {
            const categoryList = await Category.getCategoryList()
            const typePickerIndex = this.data.typeList.findIndex(item => item.id === this.data.form.type)
            const categoryPickerIndex = categoryList.findIndex(item => item.id === this.data.form.category_id)
            this.setData({
                categoryList,
                typePickerIndex: typePickerIndex !== -1 ? typePickerIndex : null,
                categoryPickerIndex : categoryPickerIndex !== -1 ? categoryPickerIndex : null,
                files : this.data.form.cover_image ? [this.data.form.cover_image] : [],
                formData: {
                    type: this.data.form.type,
                    title: this.data.form.title,
                    category_id: this.data.form.category_id,
                    cover_image_id:  this.data.form.cover_image ? this.data.form.cover_image.id : null,
                    designated_place: this.data.form.designated_place,
                    description: this.data.form.description,
                    begin_date: this.data.form.begin_date,
                    end_date: this.data.form.end_date,
                    price: this.data.form.price
                }
            })
        },
        handleSubmit : function (){
            this.triggerEvent("submit",{formData : this.data.formData})
        },
        handlePickerChange: function (event) {
            const typePickerIndex = getEventParams(event, "value")
            this.setData({
                typePickerIndex: typePickerIndex,
                ['formData.type'] : this.data.typeList[typePickerIndex].id
            })
        },
        handleInput : function (event){
            const value = getEventParams(event,"value")
            const field = getDataSet(event,'field')
            this.setData({
                [`formData.${field}`] : value
            })
        },
        handleCategoryChange : function (event){
            const categoryPickerIndex = getEventParams(event,"value")
            this.setData({
                categoryPickerIndex,
                ['formData.category_id'] : this.data.categoryList[categoryPickerIndex].id
            })
        },
        handleSwitchChange : function (event){
            const res = getEventParams(event,"value")
            this.setData({
                ['formData.designated_place'] : res
            })
        },
        handleBeginDateChange : function (event){
            const beginDate = getEventParams(event,'value')
            this.setData({
                ['formData.begin_date'] : beginDate
            })
        },
        handleEndDateChange : function (event){
            const endDate = getEventParams(event,'value')
            this.setData({
                ['formData.end_date'] : endDate
            })
        },
        handleUploadSuccess : function (event){
            const id = event.detail.files[0].id
            this.setData({
                ['formData.cover_image_id'] : id
            })
        }
    }
});
