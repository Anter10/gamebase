import BaseNode from "../../../Common/BaseNode";
import TouchButton from "../../../Common/TouchButton";
import EventManager from "../../../EventManager/EventManager";
import { UnlockMenuRewardConfig } from "../../../GameDataConfig/ConfigInterface";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import GamePlayBaseData from "../../../GameLocalData/GamePlayBaseData";
import UnlockMenuRewardData from "../../../GameLocalData/UnlockMenuRewardData";
import { UnlockMenuRewardType } from "../../GamePlayEnum/GamePlayEnum";
import LinkGameBase from "../../LinkGameBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UnlockRewardItem extends BaseNode {

    @property(cc.Label)
    heart_label: cc.Label = null;

    @property(cc.Label)
    coin_label: cc.Label = null;

    @property(cc.Node)
    get_reward_button: cc.Node = null;

    @property(cc.Label)
    reward_type_label: cc.Label = null;

    private reward_config: UnlockMenuRewardConfig = null;
    private unlock_menu_reward_data: UnlockMenuRewardData = null;

    set_config(reward_config: UnlockMenuRewardConfig) {
        this.reward_config = reward_config;
    }

    onLoad() {
        //点击领取奖励按钮
        const get_reward_button: TouchButton = this.get_reward_button.addComponent(TouchButton);
        get_reward_button.register_touch(this.click_get_reward_button.bind(this));
    }

    onEnable() {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.unlock_menu_reward, this, this.refresh_node);
    }

    onDisable() {
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.unlock_menu_reward, this, this.refresh_node);
    }

    start() {
        this.refresh_node();
        this.un_refresh_node();
    }

    refresh_node() {
        this.unlock_menu_reward_data = GameLocalData.get_instance().get_data<UnlockMenuRewardData>(UnlockMenuRewardData);
        switch (this.unlock_menu_reward_data.get_unlock_menu_reward_data(this.reward_config.id).unlockMenuRewardType) {
            case UnlockMenuRewardType.get:
                this.reward_type_label.string = "已领取";
                break;
            case UnlockMenuRewardType.lock:
                this.reward_type_label.string = "未解锁";
                break;
            case UnlockMenuRewardType.unlock:
                this.reward_type_label.string = "领取奖励";
                break;
        }
    }

    un_refresh_node() {
        this.heart_label.string = this.reward_config.reward_heart + "";
        this.coin_label.string = this.reward_config.reward_coin + "";
    }

    click_get_reward_button() {
        switch (this.unlock_menu_reward_data.get_unlock_menu_reward_data(this.reward_config.id).unlockMenuRewardType) {
            case UnlockMenuRewardType.get:
                console.log("您已经领取过了");
                break;
            case UnlockMenuRewardType.lock:
                console.log("您还未解锁哦");
                break;
            case UnlockMenuRewardType.unlock:
                const game_play_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
                game_play_base_data.change_gold_coin_number(this.reward_config.reward_coin);
                game_play_base_data.change_red_heart_number(this.reward_config.reward_heart);
                this.unlock_menu_reward_data.change_unlock_menu_reward_data(this.reward_config.id, UnlockMenuRewardType.get);
                break;
        }
    }

}
