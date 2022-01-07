import serviceStatus from "../../../../enum/service-status";
import serviceAction from "../../../../enum/service-action";
import {getDataSet} from "../../../../utils/utils";
import behavior  from "../behavior";

Component({
    behaviors : [behavior],
    properties: {

    },
    data: {
        serviceStatusEnum : serviceStatus,
        serviceActionEnum : serviceAction
    },
    methods: {
        handleUpdateService : function (event){
            const action = getDataSet(event,'action')
            this.triggerEvent('update',{action})
        },
        handleEdit : function (event){
           this.triggerEvent("edit")
        }
    }
});
