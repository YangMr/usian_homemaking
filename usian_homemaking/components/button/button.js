Component({
    externalClasses : ['i-button-class'],
    properties: {
        //是否展示特殊按钮
        special : {
            type : Boolean,
            value : false
        },
        //设置按钮是否镂空  没有边框，背景颜色透明
        plain : {
            type : Boolean,
            value : false
        },
        //图标名称
        name : String,
        //字体的颜色
        fontColor : {
          type : String,
          value : '#333333'
        },
        //图标的颜色
        iconColor : {
          type : String,
          value : '#333333'
        },
        //按钮的宽度
        width : String,
        //按钮的高度
        height : String,
        //按钮的背景颜色
        bgColor : {
            type : String,
            value : '#f3d066'
        },

        //控制按钮的大小，一共有3档  mini 小按钮 medium 中等按钮 long 长按钮
        size : {
           type : String,
            value : "medium"
        },
        //按钮的形状 1. square 默认的形状方形 2. 圆角的形状 circle 3.椭圆的形状semicircle
        shape : {
            type : String,
            value : 'square'
        },
        //是否显示边框
        border : {
            type : Boolean
        },
        // 按钮圆角半径
        radius: {
            type: String,
            value: 0
        },
    },
    data: {},
    methods: {}
});
