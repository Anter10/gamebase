import BaseNode from "../../../Common/BaseNode";
import Loader from "../../../Common/Loader";
import EventManager from "../../../EventManager/EventManager";
import { MenuConfig } from "../../../GameDataConfig/ConfigInterface";
import LinkGameBase from "../../LinkGameBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OrderMenuItem extends BaseNode {

    @property(cc.Label)
    coin_label: cc.Label = null;

    @property(cc.Sprite)
    menu_sprite: cc.Sprite = null;

    private menu_config: MenuConfig = null;
    private menu_data_number: number = 0;

    set_order_menu_item_config(menu_data_number: number, menu_config: MenuConfig) {
        this.menu_config = menu_config;
        this.menu_data_number = menu_data_number;
        console.log("menu_data_number", menu_data_number);
    }

    start() {
        this.set_order_menu_item();
    }

    onEnable() {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.receiving_menu, this, this.destroy_this_node);
    }

    onDisable() {
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.receiving_menu, this, this.destroy_this_node);
    }

    destroy_this_node(event, menu_data_number: number) {
        if (this.menu_data_number == menu_data_number) {
            this.node.destroy();
        }
    }

    set_order_menu_item() {
        this.coin_label.string = this.menu_config.sell_price + "金币";
        Loader.load_texture(`GamePlay/GamePlayUI/Menu/texture/UI_DishIcon_${this.menu_config.id}`, (texture2d: cc.Texture2D) => {
            this.menu_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
        })
    }

}
