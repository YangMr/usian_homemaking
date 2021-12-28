Page({
    data: {
        tabs : ['全部服务','在提供','正在找'],
        currentTabIndex : 0
    },
    onLoad: function (options) {

    },
    handleTabChange : function (event){
        let index = event.currentTarget.dataset.index
        this.setData({
            currentTabIndex : index
        })
    }
});