import BaseRecord from "./BaseRecord";

// 转盘的数据
class TurnTableData extends BaseRecord{
    static _name = "TurnTableData";
    base_name = "TurnTableData";

    constructor(){
        super();
        this.apply_auto_update();
    }




}

export default TurnTableData;