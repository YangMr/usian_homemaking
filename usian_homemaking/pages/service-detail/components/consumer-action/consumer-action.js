import behavior from "../behavior";
import serviceType from "../../../../enum/service-type";

Component({
    behaviors : [behavior],
    properties: {

    },
    data: {
        serviceTypeEnum : serviceType
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
