Component({
    options : {
        //开启多插槽
      multipleSlots : true
    },
    properties: {
        tabs : {
            type : Array,
            value : []
        }
    },
    data: {
        //控制选中的tabs
        currentTabIndex : 0
    },
    methods: {
        handleTabChange : function (event){
            //获取当前所点击的元素的下标
            let index = event.currentTarget.dataset.index

            //设置所选中项为当前所点击的元素下标
            this.setData({
                currentTabIndex : index
            })

            //将子组件所点击的元素下标传递给父组件
            this.triggerEvent("change",{index})
        },
        handleTouchMove : function(event){
            //获取滑动方法的枚举值
            let direction = event.direction

            //获取选中的tab下标
            let currentTabIndex = this.data.currentTabIndex

            //计算选中的下标值
            let targetTabIndex = currentTabIndex + direction

            //判断当前滑动的下标是否小于0 或者大于tabs的长度，如果大于的化就不再继续往下执行
            if(targetTabIndex < 0 || targetTabIndex > this.data.tabs.length - 1){
                return
            }

            //自定义数据结构
            const customEvent = {
                currentTarget : {
                    dataset : {
                        index : targetTabIndex
                    }
                }
            }

            //调用设置选中下标的方法
            this.handleTabChange(customEvent)

        }
    }
});
