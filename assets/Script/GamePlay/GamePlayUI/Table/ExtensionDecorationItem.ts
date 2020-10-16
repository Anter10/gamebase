import BaseNode from "../../../Common/BaseNode";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import EventManager from "../../../EventManager/EventManager";
import { DecorationConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import DecorationData from "../../../GameLocalData/DecorationData";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import GamePlayBaseData from "../../../GameLocalData/GamePlayBaseData";
import UIConfig from "../../../UI/UIManager/UIConfig";
import UIManager from "../../../UI/UIManager/UIManager";
import LinkGameBase from "../../LinkGameBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ExtensionDecorationItem extends BaseNode {

    @property(cc.Sprite)
    decoration_sprite: cc.Sprite = null;

    @property(cc.Node)
    price: cc.Node = null;

    @property(cc.Node)
    get_mark: cc.Node = null;

    @property(cc.Label)
    price_label: cc.Label = null;

    @property(cc.Node)
    description_button: cc.Node = null;

    //装饰的等级
    private level_number = 0;
    //装饰的id
    private mark_number = 0;

    private decoration_config: DecorationConfig = null;
    private decoration_data: DecorationData = null;

    onLoad() {
        this.flush_node();
    }

    start() {
        this.decoration_config = GameDataConfig.get_config_by_id("DecorationConfig", (this.mark_number + 1));
        this.decoration_data = GameLocalData.get_instance().get_data<DecorationData>(DecorationData);
        this.set_decoration_sprite();
    }

    set_decoration_sprite() {
        //初始为0级，没有装饰。
        Loader.load_texture(`GamePlay/GamePlayUI/ExtensionTable/decoration_texture/${this.decoration_config.name}${this.level_number}`, (texture2d: cc.Texture2D) => {
            this.decoration_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
        });

        if (this.decoration_data.get_decoration_data(this.mark_number).decorationLevel >= this.level_number) {
            this.get_mark.active = true;
            this.price.active = false;
            this.decoration_sprite.node.color = cc.color(255, 255, 255, 255);
        } else {
            this.get_mark.active = false;
            this.price.active = true;
            this.decoration_sprite.node.color = cc.color(100, 100, 100, 255);
            this.price_label.string = this.decoration_config.upgrade[this.level_number - 1] + "金币";
        }
    }

    set_level_number(level_number: number, mark_number: number) {
        this.level_number = level_number;
        this.mark_number = mark_number;
    }

    flush_node() {
        //显示装饰的详细描述
        const show_decoration_button: TouchButton = this.description_button.addComponent(TouchButton);
        show_decoration_button.register_touch(this.click_show_decoration_button.bind(this));

        //购买新的装饰
        const buy_new_decoration_button: TouchButton = this.price.addComponent(TouchButton);
        buy_new_decoration_button.register_touch(this.click_buy_new_decoration_button.bind(this));
    }

    click_show_decoration_button() {
        const ui_decoration_description_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.ShowDecorationDescriptionView,
            ui_config_name: "ShowDecorationDescriptionView",
            param: {
                decoration_config: this.decoration_config,
                level_number: this.level_number,
            },
        }
        UIManager.show_ui(ui_decoration_description_param_interface);
    }

    click_buy_new_decoration_button() {
        if (this.decoration_data.get_decoration_data(this.mark_number).decorationLevel == this.level_number - 1) {
            const game_play_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
            if (game_play_base_data.change_gold_coin_number(-this.decoration_config.upgrade[this.level_number - 1])) {
                this.decoration_data.change_decoration_level_data(this.mark_number, this.level_number);
                this.set_decoration_sprite();
                EventManager.get_instance().emit(LinkGameBase.game_play_event_config.upgrade_decoration);
                console.log("解锁成功");
            } else {
                console.log("金币不足，快去营业赚金币吧");
            }
        } else {
            console.log("请先解锁前面的装饰");
        }
    }

}
