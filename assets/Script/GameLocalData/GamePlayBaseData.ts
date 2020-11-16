import GameDataBaseConfig from "../GameDataConfig/GameDataBaseConfig";
import BaseRecord from "./BaseRecord";

// 游戏的玩家的基础数据
class GamePlayBaseData extends BaseRecord {
    static _name = "GamePlayBaseData";
    base_name = "GamePlayBaseData";

    /**@description 玩家进入游戏的时间 */
    public player_enter_game_time: number = 0;
    public change_player_enter_game_time(player_enter_game_time: number) {
        this.player_enter_game_time = player_enter_game_time;
    }

    /**@description 玩家等级 */
    public player_level: number = 1;
    public change_player_level(player_level: number) {
        this.player_level = player_level;
    }

    /**@description 玩家当前经验值 */
    public player_experience: number = 10;
    public change_player_experience(player_experience: number) {
        this.player_experience = player_experience;
    }

    /**@description 玩家金币数量 */
    public player_coin_num: number = 0;
    public change_player_coin_num(player_coin_num: number) {
        this.player_coin_num = player_coin_num;
    }

    /**@description 玩家红包数量 */
    public player_red_bag: number = 0;
    public change_player_red_bag(player_red_bag: number) {
        this.player_red_bag = player_red_bag;
    }

    /**@description 倒计时红包的倒计时 */
    public red_bag_count_down: number = 0;
    public change_red_bag_count_down(red_bag_count_down: number) {
        this.red_bag_count_down = red_bag_count_down;
    }

    /**@description 一键加速剩下时间 */
    public acceleration_time: number = 0;
    public change_acceleration_time(acceleration_time: number) {
        this.acceleration_time = acceleration_time;
    }

    /**@description 一键加速次数 */
    public acceleration_num: number = 0;
    public change_acceleration_num(acceleration_num: number) {
        this.acceleration_num = acceleration_num;
    }

    /**@description 花架解锁状态 */
    public flower_trellis_status: object = { 1: true, 2: true, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false };
    public change_flower_trellis_status(flower_trellis_status: boolean, index: number) {
        this.flower_trellis_status[index] = flower_trellis_status;
    }

    /**@description 每种鲜花每日收获次数 */
    public flower_harvest_num: Array<number> = [];
    public reset_flower_harvest_num() {
        this.flower_harvest_num = [];
    }
    public change_flower_harvest_num(flower_harvest_num: number, index: number) {
        const new_flower_harvest_num = this.flower_harvest_num;
        new_flower_harvest_num[index] = flower_harvest_num;
        this.flower_harvest_num = new_flower_harvest_num;
    }

    /**@description 每种鲜花的状态 0 等级未达到 1 首次种植 2 二次种植 3 需要解锁 4 成长中 5 可成长 6 可收获 */
    public flower_status: Array<number> = [];
    private init_flower_status() {
        if (this.flower_status.length > 0) return;
        for (let i = 0; i < GameDataBaseConfig.flowerTypeNum; ++i) {
            this.flower_status.push(i == 0 ? 1 : 0);
        }
    }
    public change_flower_status(status: number, index: number) {
        const flower_status = this.flower_status;
        flower_status[index] = status;
        this.flower_status = flower_status;
    }
    public change_flower_status_by_level(level: number ,game_data_config: cc.JsonAsset) {
        const flowerData = game_data_config[`FlowerData`];
        const flower_status = this.flower_status;
        let isChange = false;
        for (let i = 0; i < GameDataBaseConfig.flowerTypeNum; ++i) {
            if (level >= flowerData[i + 1][`level`] && flower_status[i] == 0) {
                flower_status[i] = 1;
                isChange = true;
            }
        }
        this.flower_status = flower_status;
        return isChange;
    }

    // a = 1 * 10000 + 50;
    // b = Math.floor(a / 10000); // 种类
    // c = a % 10000; // 等级

    /**@description 花盆状态 0 所在花架尚未解锁 1 当前位置未种植 >10 && level == 0 已种植但处于待解锁状态 > 10 && level > 0 已种植切已解锁*/
    public flowerpot_status: Array<Array<number>> = [];
    private init_flowerpot_status() {
        if (this.flowerpot_status.length > 0) return;
        for (let i = 0; i < GameDataBaseConfig.flowerTrellisNum; ++i) {
            this.flowerpot_status[i] = [];
            for (let j = 0; j < GameDataBaseConfig.canBePlacedFlowerNum; ++j) {
                this.flowerpot_status[i].push(i < 2 ? 1 : 0);
            }
        }
    }
    public change_flowerpot_status(status: number, index1: number, index2: number) {
        const flowerpot_status = this.flowerpot_status;
        flowerpot_status[index1][index2] = status;
        this.flowerpot_status = flowerpot_status;
    }

    /**@description 鲜花解锁倒计时 */
    public flower_unlock_time: object = {};
    public change_flower_unlock_time(time: number ,index: number) {
        const flower_unlock_time = this.flower_unlock_time;
        flower_unlock_time[index] = time;
        this.flower_unlock_time = flower_unlock_time;
    }

    /**@description 鲜花当前经验值 */
    public flower_current_experience: object = {};
    public change_flower_current_experience(experience: number ,index: number) {
        const flower_current_experience = this.flower_current_experience;
        flower_current_experience[index] = experience;
        this.flower_current_experience = flower_current_experience;
    }

    constructor() {
        super();
        this.apply_auto_update();
        this.init_flower_status();
        this.init_flowerpot_status();
    }

}

export default GamePlayBaseData;