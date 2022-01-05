Component({
    properties: {
        //展示的文本，理解为用户名称
        text : String,
        //头像地址
        src : String,
        //展示的文本字体大小
        fontSize : {
            type : String,
            value : "28"
        },
        //头像大小
        size : {
            type : String,
            value : "120"
        },
        //头像形状 , 可选: 1. square 方形  2. circle 圆形
        shape : {
            type : String,
            value : 'circle'
        },
        //头像边框半径，当shape为circle 时这个值无效
        radius : {
            type : String,
            value : '0'
        }
    },
    data: {},
    methods: {}
});
