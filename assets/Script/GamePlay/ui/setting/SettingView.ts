import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import TouchButton from "../../../Common/TouchButton";
import GameConfig from "../../../GameConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
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

    @property(cc.Node)
    audio_effect_true: cc.Node = null;

    @property(cc.Node)
    audio_effect_false: cc.Node = null;

    @property(cc.Node)
    audio_music_false: cc.Node = null;

    @property(cc.Node)
    audio_music_true: cc.Node = null;

    @property(cc.Node)
    exit_button: cc.Node = null;

    @property(cc.Label)
    id_label: cc.Label = null;

    @property(cc.Label)
    version_label: cc.Label = null;

    private setting_data: SettingData = null;

    onLoad() {
        super.onLoad();
        this.close_button.addComponent(TouchButton).register_touch(() => {
            this.on_close_call();
        })
        this.setting_data = GameLocalData.get_instance().get_data<SettingData>(SettingData);
        
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

        // 注销账号
        const exit_button: TouchButton = this.exit_button.addComponent(TouchButton);
        exit_button.register_touch(this.click_exit_button.bind(this));
    }

    start() {
        //设置玩家游戏id???
        this.id_label.string = "ID:25933";
        this.version_label.string = GameConfig.appVersion;
        this.set_effect_button();
        this.set_music_button();
    }

    click_exit_button() {
        //注销账号???
    }

    set_effect_button() {
        if (this.setting_data.get_sound_effect()) {
            this.audio_effect_false.active = false;
            this.audio_effect_true.active = true;
        } else {
            this.audio_effect_false.active = true;
            this.audio_effect_true.active = false;
        }
    }

    set_music_button() {
        if (this.setting_data.get_music()) {
            this.audio_music_true.active = true;
            this.audio_music_false.active = false;
        } else {
            this.audio_music_true.active = false;
            this.audio_music_false.active = true;
        }
    }

    click_audio_effect_button() {
        this.setting_data.change_sound_effect(!this.setting_data.get_sound_effect());
        this.set_effect_button();
    }

    click_audio_music_button() {
        this.setting_data.change_music(!this.setting_data.get_music());
        this.set_music_button();
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
