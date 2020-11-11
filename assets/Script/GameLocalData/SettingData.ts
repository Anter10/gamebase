import BaseRecord from "./BaseRecord";

const { ccclass, property } = cc._decorator;

@ccclass
class SettingData extends BaseRecord {
    static _name = "SettingData";
    base_name = "SettingData";

    public sound_effect: boolean = true;
    public music: boolean = true;

    constructor() {
        super();
        this.apply_auto_update();
    }


}
export default SettingData;