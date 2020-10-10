import BaseRecord from "./BaseRecord";

// 游戏的引导数据
class GuideData extends BaseRecord{
    static _name = "GuideData";
    base_name = "GuideData";

    public cur_guid_id: number = 0;

    constructor(){
        super();
        this.apply_auto_update();
    }




}

export default GuideData;