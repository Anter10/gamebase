import BaseNode from "../../../Common/BaseNode";
import Loader from "../../../Common/Loader";
import EventManager from "../../../EventManager/EventManager";
import { DecorationConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import DecorationData from "../../../GameLocalData/DecorationData";
import LinkGameBase from "../../LinkGameBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMainDecorationItem extends BaseNode {

    @property(cc.Sprite)
    decoration_sprite: cc.Sprite = null;

    private decoration_number: number = 0;

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
        const decoration_data = GameLocalData.get_instance().get_data<DecorationData>(DecorationData);
        const decoration_level = decoration_data.get_decoration_data(this.decoration_number).decorationLevel;
        const decoration_config: DecorationConfig = GameDataConfig.get_config_by_id("DecorationConfig", this.decoration_number + 1);
        if (decoration_level != 0) {
            Loader.load_texture(`GamePlay/GamePlayUI/ExtensionTable/decoration_texture/${decoration_config.name}${decoration_level}`, (texture2d: cc.Texture2D) => {
                this.decoration_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
            })
        } else {
            this.decoration_sprite.spriteFrame = null;
        }

    }

    start() {
        this.refresh_decoration_sprite();
    }

}
