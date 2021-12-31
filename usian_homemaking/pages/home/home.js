import Service from "../../model/service"
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
        const serviceList = await Service.getServiceList(1,10)
        console.log(serviceList)
        this.setData({
            serviceList : serviceList.data
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
    }
});
