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
    //玩家每日领取记牌器次数
    public get_card_record_by_ad_time: number = 0;
    //每日领取记牌器刷新时间
    public get_card_record_refresh_time: number = 0;
    //是否实名
    public is_real_name: boolean = false;
    //昵称
    public nick_name: string = "游客";
    //游戏id
    public player_id: number = 15545125;

    constructor() {
        super();
        this.apply_auto_update();
    }

}
