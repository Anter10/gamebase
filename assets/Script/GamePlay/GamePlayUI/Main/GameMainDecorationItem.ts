import BaseNode from "../../../Common/BaseNode";
import Loader from "../../../Common/Loader";
import EventManager from "../../../EventManager/EventManager";
import { DecorationConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import DecorationData from "../../../GameLocalData/DecorationData";
import LinkGameBase from "../../LinkGameBase";
import TouchButton from "../../../Common/TouchButton";
import { UIParamInterface } from "../../../Common/CommonInterface";
import UIConfig from "../../../UI/UIManager/UIConfig";
import UIManager from "../../../UI/UIManager/UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMainDecorationItem extends BaseNode {

    @property(cc.Sprite)
    decoration_sprite: cc.Sprite = null;

    private decoration_number: number = 0;
    private decoration_data: DecorationData = null;
    private decoration_level: number = 0;
    private decoration_config: DecorationConfig = null;

    set_decoration_number(decoration_number: number) {
        this.decoration_number = decoration_number;
    }

    onLoad() {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.upgrade_decoration, this, this.refresh_decoration_sprite);
    }

    onDisable() {
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.upgrade_decoration, this, this.refresh_decoration_sprite);
    }

    refresh_decoration_sprite() {
        this.decoration_data = GameLocalData.get_instance().get_data<DecorationData>(DecorationData);
        this.decoration_level = this.decoration_data.get_decoration_data(this.decoration_number).decorationLevel;
        this.decoration_config = GameDataConfig.get_config_by_id("DecorationConfig", this.decoration_number + 1);
        if (this.decoration_level != 0) {
            Loader.load_texture(`GamePlay/GamePlayUI/ExtensionTable/decoration_texture/${this.decoration_config.name}${this.decoration_level}`, (texture2d: cc.Texture2D) => {
                this.decoration_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
            })
        } else {
            this.decoration_sprite.spriteFrame = null;
        }

        //点击装饰显示装饰详情页
        if (!this.node.getComponent(TouchButton) && this.decoration_level > 0) {
            const click_show: TouchButton = this.node.addComponent(TouchButton);
            click_show.register_touch(this.click_show.bind(this));
        }
    }

    start() {
        this.refresh_decoration_sprite();
    }

    click_show() {
        if (this.decoration_level > 0) {
            const ui_decoration_description_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.ShowDecorationDescriptionView,
                ui_config_name: "ShowDecorationDescriptionView",
                param: {
                    decoration_config: this.decoration_config,
                    level_number: this.decoration_level,
                },
            }
            UIManager.show_ui(ui_decoration_description_param_interface);
        }
    }

}
