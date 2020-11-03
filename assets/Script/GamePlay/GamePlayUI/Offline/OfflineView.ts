import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Time from "../../../Common/Time";
import { OfflineConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
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

    offline_config: OfflineConfig = null;
    config_id: number = 0;

    set_offline_view(differ_time: number) {
        const offline_configs: Array<OfflineConfig> = GameDataConfig.get_config_array("OfflineConfig");
        this.config_id = 0;
        for (let i = 0; i < offline_configs.length; i++) {
            if (differ_time < (offline_configs[i].id + 1) * 3600) {
                this.config_id = i;
            }
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
        this.offline_time_label.string = `离线时间：${this.config_id}小时`;
    }

}
