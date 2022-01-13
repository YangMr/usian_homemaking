import serviceType from "../../enum/service-type";
import {getDataSet, getEventParams} from "../../utils/utils";
import Category from "../../model/category";
const moment = require("../../lib/moment")
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
        categoryPickerIndex: null,
        rules : [
            {
                name : 'type',
                rules : {required : true, message : '请选择服务类型'}
            },
            {
                name : 'title',
                rules : [
                    {required : true, message : '服务标题内容不能为空'},
                    {minlength : 5, message: '服务描述内容不能少于 5 个字'}
                ]
            },
            {
                name: 'category_id',
                rules: { required: true, message: '未指定服务所属分类' },
            },
            {
                name: 'cover_image_id',
                rules: { required: true, message: '请上传封面图' },
            },
            {
                name: 'description',
                rules: [
                    { required: true, message: '服务描述不能为空' },
                    { minlength: 20, message: '服务描述内容不能少于 20 个字' },
                ],
            },
            {
                name: 'begin_date',
                rules: [
                    { required: true, message: '请指定服务有效日期开始时间' },
                ],
            },
            {
                name: 'end_date',
                rules: [
                    { required: true, message: '请指定服务有效日期结束时间' },
                    {
                        validator: function (rule, value, param, models) {
                            if (moment(value).isSame(models.begin_date) || moment(value).isAfter(models.begin_date)) {
                                return null
                            }
                            return '结束时间必须大于开始时间'
                        }
                    }
                ],
            },
            {
                name: 'price',
                rules: [
                    { required: true, message: '请指定服务价格' },
                    {
                        validator: function (rule, value) {
                            // 正则表达式
                            const pattern = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/
                            const isNum = pattern.test(value);

                            if (isNum) {
                                return null
                            }
                            return '价格必须是数字'
                        }
                    },
                    { min: 1, message: '天下没有免费的午餐' },
                ],
            },
        ],
        error : null
    },
    observers: {
        form: function (newValue) {
            if (!newValue) {
                return
            }

            this._init()
        }
    },
    lifetimes: {
        // attached: function () {
        //     // 在组件实例进入页面节点树时执行
        //     this._init()
        // },
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
            this.selectComponent("#form").validate((valid,errors)=>{
                if(!valid){

                    const errMsg = errors.map(item=>item.message)
                    this.setData({
                        error :  errMsg.join(';')
                    })
                    return
                }
                this.triggerEvent("submit",{formData : this.data.formData})
            })

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
        },
        reset(){
            const formData = {
                type: null,
                    title: "",
                    category_id: null,
                    cover_image_id: null,
                    description: "",
                    designated_place: false,
                    begin_date: "",
                    end_date: "",
                    price: ""
            }
            this.setData({formData})
        }
    }
});
