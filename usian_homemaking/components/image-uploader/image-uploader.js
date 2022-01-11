import {getDataSet} from "../../utils/utils";

Component({
    properties: {
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
        _files : [
            {
                url : 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
                status : 2
            },
            {
                url : 'https://img2.baidu.com/it/u=888246215,1140292536&fm=253&fmt=auto&app=138&f=JPEG?w=580&h=326',
                status : 2
            },
            {
                url : 'https://img2.baidu.com/it/u=1839151878,1753507430&fm=253&fmt=auto&app=138&f=JPEG?w=480&h=446',
                status : 2
            }
        ],
        uploadStatusEnum : {
            UPLOADING : 1,
            SUCCESS : 2,
            ERROR : 0
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

            wx.uploadFile()
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
                    url : item.path,
                    key : index + length + '',
                    status : error ?  this.data.uploadStatusEnum.ERROR :  this.data.uploadStatusEnum.UPLOADING,
                    error : ''
                })
            })

            return this.data._files.concat(res)

        }
    }
});
