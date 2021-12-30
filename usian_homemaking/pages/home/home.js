Page({
    data: {
        tabs : ['全部服务','在提供','正在找'],
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
