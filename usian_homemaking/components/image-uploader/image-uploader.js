import {getDataSet} from "../../utils/utils";
import FileUploader from "../../utils/http-uploader";

Component({
    properties: {
        //默认要展示图片
        files : {
            type : Array,
            value : []
        },
        //设置上传图片的个数
        maxCount : {
            type : Number,
            value : 1
        },
        //可选图片的大小，original原图 compressed压缩图， 默认两者都可以
        sizeType : {
            type : Array,
            value : ['original', 'compressed']
        },
        //可选图片来源，album, 从相册选图，camera,使用相机， 默认都可以
        sourceType : {
            type : Array,
            value :  ['album', 'camera'],
        },
        //单个图片上传的大小，如果不传的话，默认不能超过2m
        size : {
            type : Number,
            value : 2
        }
    },
    data: {
        _files : [],
        uploadStatusEnum : {
            UPLOADING : 1,
            SUCCESS : 2,
            ERROR : 0
        }
    },
    observers : {
        files : function (value){
            // if(!value.length){
            //     return
            // }
            console.log("value",value)
            const _files = []
            value.forEach((item, index) => {
                const file = {
                    id: item.id,
                    key: index + '',
                    path: item.path,
                    status: this.data.uploadStatusEnum.SUCCESS,
                    error: ''
                }
                _files.push(file)
            })
            this.setData({
                _files
            })
        }
    },
    methods: {
        //图片预览
        handlePreview : function (event){
            const index = getDataSet(event,'index')
            const urls = this.data._files.map(item=>item.url)
            wx.previewImage({
                urls : urls,
                current : this.data._files[index].url
            })
        },
        //删除图片
        handleDelete : function (event){
            const index = getDataSet(event, 'index')
            const deleted = this.data._files.splice(index, 1)
            this.setData({
                _files : this.data._files
            })
            this.triggerEvent('delete',{index,item : deleted})
        },
        //选择图片
        handleChooseImage :async  function (event){
            //获取选择的图片
            const res= await wx.chooseImage({
                count : this.data.maxCount,
                sizeType : this.data.sizeType,
                sourceType : this.data.sourceType
            })

            //将选择的图片返回给父组件
            this.triggerEvent("choose",{files : res.tempFiles})


            //判断上传图片的大小是否超过指定的单张图片大小，如果超过的，则不在继续往下执行
            const _files = this._filesFilter(res.tempFiles)

            this.setData({_files})

            //筛选出正在上传中的图片
            const uploadTask = _files.filter(item=> item.status === this.data.uploadStatusEnum.UPLOADING)

            //将正在上传中的图片上传到服务器（后台）
            this._executeUpload(uploadTask)
        },
        //处理上传的图片的业务： 1. 判断上传图片的大小
        _filesFilter : function (tempFile){
            const res = []
            let error = ''
            tempFile.forEach((item,index)=>{
                if(item.size > 1024 * 1024 * this.data.size){
                    error += `图片大小不能超过${this.data.size}M`
                    this.triggerEvent("validatefail",{item,error})
                }

                const length = this.data._files.length

                res.push({
                    path : item.path,
                    key : index + length + '',
                    status : error ?  this.data.uploadStatusEnum.ERROR :  this.data.uploadStatusEnum.UPLOADING,
                    error : ''
                })
            })
            return this.data._files.concat(res)
        },
        //上传图片到服务器
        _executeUpload :async function (uploadTask){
            const success = []
            // file  {file : '地址', key , status ,error}    uploadTask
            for(let file of uploadTask){
                try {
                    const res = await FileUploader.upload(file.path,file.key)
                    file.id = res[0].id
                    file.status = this.data.uploadStatusEnum.SUCCESS
                    this.data._files[file.key] = file
                    success.push(file)
                }catch (e) {
                    file.status= this.data.uploadStatusEnum.ERROR
                    file.error = e
                    this.triggerEvent("uploadfail",{file,error : e})
                }

                this.setData({
                    _files : this.data._files
                })

                if(success.length > 0){
                    this.triggerEvent("uploadsuccess",{files : success})
                }
            }
        }
    }
});
