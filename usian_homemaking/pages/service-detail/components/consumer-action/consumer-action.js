Component({
    properties: {
        service : {
            type : Object
        }
    },
    data: {

    },
    methods: {
        handleChat: function (){
            this.triggerEvent("chat")
        },
        handleOrder : function (){
            this.triggerEvent("order")
        }
    }
});
