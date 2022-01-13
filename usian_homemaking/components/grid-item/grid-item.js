Component({
    //定义组件间的关系
    relations : {
        "../grid/grid" : {
            type : "parent"
        }
    },
    properties: {
        icon : String,
        iconSize : {
            type : String,
            value : "50"
        },
        text : String,
        showBadge : Boolean,
        badgeCount : Number
    },
    data: {},
    methods: {}
});
