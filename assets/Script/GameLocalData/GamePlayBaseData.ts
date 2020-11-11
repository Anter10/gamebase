import BaseRecord from "./BaseRecord";

const { ccclass, property } = cc._decorator;

@ccclass
//玩家基础数据
export default class GamePlayBaseData extends BaseRecord {

    static _name = "GamePlayBaseData";
    base_name = "GamePlayBaseData";

    //玩家金币
    public gold: number = 0;
    //玩家等级
    public level: number = 0;
    
    constructor() {
        super();
        this.apply_auto_update();
    }

}
