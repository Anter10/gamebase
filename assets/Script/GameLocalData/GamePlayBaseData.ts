import BaseRecord from "./BaseRecord";

// 游戏的玩家的基础数据
class GamePlayBaseData extends BaseRecord {
    static _name = "GamePlayBaseData";
    base_name = "GamePlayBaseData";

    public test = "";
    change_test () {
        this.test = `test`;
    }
    constructor() {
        super();
        this.apply_auto_update();
    }

}

export default GamePlayBaseData;