import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import TouchButton from "../../../Common/TouchButton";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import GamePlayBaseData from "../../../GameLocalData/GamePlayBaseData";
import { NativeSDKTool } from "../../../Sdk/NativeSDKTool";
import UIConfig from "../../../UI/UIManager/UIConfig";
import UIManager from "../../../UI/UIManager/UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerMessageView extends BaseUI {

    @property(cc.Label)
    player_id_label: cc.Label = null;

    @property(cc.Node)
    write_button: cc.Node = null;

    @property(cc.Node)
    copy_id_button: cc.Node = null;

    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Node)
    confirm_button: cc.Node = null;

    @property(cc.Node)
    real_name: cc.Node = null;

    @property(cc.Node)
    no_real_name: cc.Node = null;

    @property(cc.Label)
    nick_name: cc.Label = null;

    @property(cc.Label)
    hold_label: cc.Label = null;

    @property(cc.Sprite)
    player_sprite: cc.Sprite = null;
    
    private game_play_base_data: GamePlayBaseData = null;

    onLoad() {
        super.onLoad();
        this.close_button.addComponent(TouchButton).register_touch(() => {
            this.on_close_call();
        })

        //点击开始输入按钮
        const write_button: TouchButton = this.write_button.addComponent(TouchButton);
        write_button.register_touch(this.click_write_button.bind(this));
        //复制id
        const copy_id_button: TouchButton = this.copy_id_button.addComponent(TouchButton);
        copy_id_button.register_touch(this.click_copy_player_id.bind(this));

        //点击实名认证
        const confirm_button: TouchButton = this.confirm_button.addComponent(TouchButton);
        confirm_button.register_touch(this.click_confirm_button.bind(this));

    }

    onEnable() {
        this.game_play_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
        this.set_player_information();
    }

    set_player_information() {
        if (this.game_play_base_data.is_real_name) {
            this.real_name.active = true;
            this.no_real_name.active = false;
        } else {
            this.real_name.active = false;
            this.no_real_name.active = true;
        }
        this.hold_label.string = this.game_play_base_data.nick_name;
        this.player_id_label.string = this.game_play_base_data.player_id + "";
    }

    click_write_button() {
        this.nick_name.string = "";
    }

    click_copy_player_id() {
        NativeSDKTool.copyTxt(this.player_id_label.string);
    }

    click_confirm_button() {
        const ui_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.RealNameView,
            ui_config_name: "RealNameView",
            param: {}
        }
        UIManager.show_ui(ui_param_interface);
    }

    set_nick_name() {
        this.game_play_base_data.nick_name = this.nick_name.string;
    }
}
