import BaseRecord from "./BaseRecord";

// 游戏的整体数据
class GameRecord extends BaseRecord {
    static _name = "GameRecord";
    base_name = "GameRecord";
    public cur_guid_id: number = 0;
    
    constructor() {
        super();
        this.apply_auto_update();
    }
    // 进入游戏的次数
    game_count: number = 0;
    // 玩家的分享次数
    share_count: number = 0;
    // 玩家上一次登录游戏的日期 年-月-日 空代表首次进入游戏
    upper_login_date: string = ""
}

export default GameRecord;