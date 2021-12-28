Page({
    data: {
        tabs : ['全部服务','在提供','正在找'],
        currentTabIndex : 0,
        categoryList : [
            {
                "id": 1,
                "name": "保洁"
            },
            {
                "id": 2,
                "name": "汽修"
            },
            {
                "id": 3,
                "name": "疏通"
            }
        ]
    },
    onLoad: function (options) {

    },
    handleTabChange : function (event){
        let index = event.currentTarget.dataset.index
        this.setData({
            currentTabIndex : index
        })
    },
    handleCategoryChange : function(event){
        let id = event.currentTarget.dataset.id
        console.log(id)
    }
});
