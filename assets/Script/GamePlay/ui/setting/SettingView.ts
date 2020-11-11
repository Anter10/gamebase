import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import TouchButton from "../../../Common/TouchButton";
import GameConfig from "../../../GameConfig";
import SettingData from "../../../GameLocalData/SettingData";
import UIConfig from "../../../UI/UIManager/UIConfig";
import UIManager from "../../../UI/UIManager/UIManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SettingView extends BaseUI {

    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Node)
    user_privacy_button: cc.Node = null;

    @property(cc.Node)
    user_protocol_button: cc.Node = null;

    @property(cc.Node)
    audio_effect_button: cc.Node = null;

    @property(cc.Node)
    audio_music_button: cc.Node = null;

    private setting_data: SettingData = null;
    onLoad() {
        super.onLoad();
        this.close_button.addComponent(TouchButton).register_touch(() => {
            this.on_close_call();
        })

        // 注册游戏用户协议
        const user_protocol_button: TouchButton = this.user_protocol_button.addComponent(TouchButton);
        user_protocol_button.register_touch(this.click_user_protocol_url.bind(this));

        // 注册隐私协议
        const user_privacy_button: TouchButton = this.user_privacy_button.addComponent(TouchButton);
        user_privacy_button.register_touch(this.click_user_privacy_url.bind(this));

        // 点击音效
        const audio_effect_button: TouchButton = this.audio_effect_button.addComponent(TouchButton);
        audio_effect_button.register_touch(this.click_audio_effect_button.bind(this));


        // 点击音乐
        const audio_music_button: TouchButton = this.audio_music_button.addComponent(TouchButton);
        audio_music_button.register_touch(this.click_audio_music_button.bind(this));
    }

    set_effect_button() {

    }

    set_music_button() {

    }

    click_audio_effect_button() {

    }

    click_audio_music_button() {

    }

    click_user_protocol_url() {
        const ui_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.UserPrivacyView,
            ui_config_name: "UserPrivacyView",
            param: GameConfig.user_protocol_url,
        }
        UIManager.show_ui(ui_param_interface);
    }

    click_user_privacy_url() {
        const ui_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.UserPrivacyView,
            ui_config_name: "UserPrivacyView",
            param: GameConfig.user_protocol_url,
        }
        UIManager.show_ui(ui_param_interface);
    }
}
