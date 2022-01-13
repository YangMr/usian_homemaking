Component({
    //定义组件间的关系
    relations : {
        "../grid-item/grid-item" : {
            type : "child"
        }
    },
    properties: {
        title : String,
        extend : String,
        rowNum : {
            type : Number,
            value : 3
        }
    },
    options : {
      //开启多插槽
      multipleSlots : true
    },
    data: {
        gridItems : []
    },
    lifetimes : {
        ready() {
            this.getGridItems()
        }
    },
    methods: {
        handleExtend : function (){

        },
        getGridItems : function (){
            const items = this.getRelationNodes("../grid-item/grid-item")
            const gridItems = items.map((item,index)=>{
                return {
                    index
                }
            })

            this.setData({
                gridItems
            })
        }
    }
});
