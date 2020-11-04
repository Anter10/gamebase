import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Time from "../../../Common/Time";
import TouchButton from "../../../Common/TouchButton";
import { OfflineConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import GamePlayBaseData from "../../../GameLocalData/GamePlayBaseData";
import OfflineData from "../../../GameLocalData/OfflineData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OfflineView extends BaseUI {

    @property(cc.Label)
    gold_label: cc.Label = null;

    @property(cc.Label)
    heart_label: cc.Label = null;

    @property(cc.Label)
    offline_time_label: cc.Label = null;

    @property(cc.Node)
    unlock_button: cc.Node = null;

    @property(cc.Node)
    give_up_button: cc.Node = null;

    @property(cc.Node)
    close_button: cc.Node = null;

    offline_config: OfflineConfig = null;
    config_id: number = 0;

    onLoad() {
        //点击领取
        const unlock_button_button: TouchButton = this.unlock_button.addComponent(TouchButton);
        unlock_button_button.register_touch(this.click_unlock_button_button.bind(this));

        //关闭
        const give_up_button: TouchButton = this.give_up_button.addComponent(TouchButton);
        give_up_button.register_touch(this.on_close_call.bind(this));

        //放弃
        const close_button: TouchButton = this.close_button.addComponent(TouchButton);
        close_button.register_touch(this.on_close_call.bind(this));
    }

    click_unlock_button_button() {
        const game_base_data: GamePlayBaseData = GameLocalData.get_instance().get_data(GamePlayBaseData);
        game_base_data.change_gold_coin_number(this.offline_config.gold);
        game_base_data.change_red_heart_number(this.offline_config.heart);
        this.on_close_call();
    }

    set_offline_view(differ_time: number) {
        const offline_configs: Array<OfflineConfig> = GameDataConfig.get_config_array("OfflineConfig");
        this.config_id = 0;
        if (differ_time < 3600 * 2) {
            this.config_id = 0;
        } else if (differ_time < 3600 * 3) {
            this.config_id = 1;
        } else if (differ_time < 3600 * 4) {
            this.config_id = 2;
        } else {
            this.config_id = 3;
        }
        this.offline_config = offline_configs[this.config_id];
        this.refresh_view();
    }

    show(ui_param_interface: UIParamInterface) {
        super.show(ui_param_interface)
        this.set_offline_view(ui_param_interface.param);
    }

    refresh_view() {
        const offline_data: OfflineData = GameLocalData.get_instance().get_data(OfflineData);
        offline_data.set_offline_data(Time.get_second_time());
        this.gold_label.string = this.offline_config.gold + "";
        this.heart_label.string = this.offline_config.heart + "";
        this.offline_time_label.string = `离线时间：${this.config_id + 1}小时`;
    }

}
