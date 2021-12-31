import Service from "../../model/service"
const service = new Service()
import Category from "../../model/category";
Page({
    data: {
        tabs : ['全部服务','在提供','正在找'],
        categoryList : [],
        serviceList : []
    },
    onLoad: function (options) {
        this._getServiceList()
        this._getCategoryList()
    },
    async _getServiceList(){
        const serviceList = await service.getServiceList()
        this.setData({
            serviceList : serviceList
        })
    },
    async _getCategoryList(){
        const categoryList = await Category.getCategoryListWithAll()
        this.setData({
            categoryList : categoryList
        })
    },
    /**
     * 获取到子组件传递给父组件的数据
     * @param event
     */
    handleTabChange : function (event) {
        let index = event.detail.index
    },
    handleCategoryChange : function(event){
        let id = event.currentTarget.dataset.id
        console.log(id)
    },
    /**
     * 下拉刷新方法
     */
    async onPullDownRefresh(){
        const serviceList = await service.reset().getServiceList()
        this.setData({
            serviceList
        })
        wx.stopPullDownRefresh()
    },
    /**
     * 上拉加载方法
     */
    async onReachBottom(){
        if(!service.hasMoreData){
            return
        }
        const serviceList = await service.getServiceList()
        this.setData({
            serviceList
        })
    }
});
