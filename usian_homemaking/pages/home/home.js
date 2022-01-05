import Service from "../../model/service"
const service = new Service()
import Category from "../../model/category";
import {throttle} from "../../utils/utils";
Page({
    data: {
        tabs : ['全部服务','在提供','正在找'],
        categoryList : [],
        serviceList : [],
        tabIndex : 0, //服务类型
        categoryId : 0, //分类id
        loading : true,  //用来显示或者隐藏骨架屏的状态
    },
    onLoad: async function (options) {
        await this._getServiceList()
        await this._getCategoryList()
        this.setData({loading: false})
    },
    async _getServiceList(){
        const serviceList = await service.reset().getServiceList(this.data.categoryId, this.data.tabIndex)
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
    handleCategoryChange :throttle(function(event){
        if(this.data.categoryId === event.currentTarget.dataset.id){
            return
        }
        this.data.categoryId = event.currentTarget.dataset.id
        this._getServiceList()
    }),
    /**
     * 获取到子组件传递给父组件的数据
     * @param event
     */
    handleTabChange : function (event) {
        console.log("123")
        this.data.tabIndex = event.detail.index
        this._getServiceList()
    },
    /**
     * 实现服务列表跳转到服务详情页面 - 路由传参 - 将服务id传递到服务详情
     */
    handleSelectService : function (event) {
        let service = event.currentTarget.dataset.service
        wx.navigateTo({
            url : "/pages/service-detail/service-detail?service_id=" + service.id
        })
    },
    /**
     * 下拉刷新方法
     */
    onPullDownRefresh(){
        this._getServiceList()
        wx.stopPullDownRefresh()
    },
    /**
     * 上拉加载方法
     */
    async onReachBottom(){
        if(!service.hasMoreData){
            return
        }
        const serviceList = await service.getServiceList(this.data.categoryId,this.data.tabIndex)
        this.setData({
            serviceList
        })
    }
});

// data: {
//     tabs : ['全部服务','在提供','正在找'],
//     categoryList : [],
//     serviceList : [],
//     tabIndex : 0, //服务类型
//     categoryId : 0, //分类id
//     loading : true,  //用来显示或者隐藏骨架屏的状态
// },
// onLoad: async function (options) {
//     await this._getServiceList()
//     await this._getCategoryList()
//     this.setData({loading: false})
// },
// async _getServiceList(){
//     const serviceList = await service.reset().getServiceList(this.data.categoryId, this.data.tabIndex)
//     console.log(serviceList)
//     this.setData({
//         serviceList : serviceList
//     })
// },
// async _getCategoryList(){
//     const categoryList = await Category.getCategoryListWithAll()
//     this.setData({
//         categoryList : categoryList
//     })
// },
// /**
//  * 获取到子组件传递给父组件的数据
//  * @param event
//  */
// handleTabChange : function (event) {
//     this.data.tabIndex = event.detail.index
//     this._getServiceList()
// },
// handleCategoryChange :throttle(function(event){
//     if(this.data.categoryId === event.currentTarget.dataset.id){
//         return
//     }
//     this.data.categoryId = event.currentTarget.dataset.id
//     this._getServiceList()
// }),
// /**
//  * 实现服务列表跳转到服务详情页面 - 路由传参 - 将服务id传递到服务详情
//  */
// handleSelectService : function (event) {
//     let service = event.currentTarget.dataset.service
//     wx.navigateTo({
//         url : "/pages/service-detail/service-detail?service_id=" + service.id
//     })
// },
/**
 * 下拉刷新方法
 */

// onPullDownRefresh(){
//     this.test()
//     // this._getServiceList()
//     wx.stopPullDownRefresh()
// },
// /**
//  * 上拉加载方法
//  */
// async onReachBottom(){
//     if(!service.hasMoreData){
//         return
//     }
//     const serviceList = await service.getServiceList(this.data.categoryId,this.data.tabIndex)
//     this.setData({
//         serviceList
//     })
// }
