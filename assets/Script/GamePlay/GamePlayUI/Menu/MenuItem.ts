import BaseNode from "../../../Common/BaseNode";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import { MenuConfig } from "../../../GameDataConfig/ConfigInterface";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import MenuData from "../../../GameLocalData/MenuData";
import { MenuType } from "../../GamePlayEnum/GamePlayEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuItem extends BaseNode {

    @property(cc.Sprite)
    menu_sprite: cc.Sprite = null;

    @property(cc.Label)
    menu_name_label: cc.Label = null;

    @property(cc.Label)
    profit_label: cc.Label = null;

    @property(cc.Node)
    price: cc.Node = null;

    @property(cc.Node)
    get_mark: cc.Node = null;

    @property(cc.Label)
    price_label: cc.Label = null;

    private menu_config: MenuConfig = null;
    private menu_data: MenuData = null;

    start() {
        this.need_refresh_node();
        this.un_refresh_node();
    }

    set_config(menu_config: MenuConfig) {
        this.menu_config = menu_config;
    }

    need_refresh_node() {
        this.menu_data = GameLocalData.get_instance().get_data<MenuData>(MenuData);
        if (this.menu_data.get_menu_data_by_id(this.menu_config.id).menuType == MenuType.lock) {
            this.menu_sprite.node.color = cc.color(100, 100, 100, 255);
            this.price.active = true;
            this.get_mark.active = false;

            this.refresh_price_label();
            //看广告解锁菜品
            const price_button: TouchButton = this.price.addComponent(TouchButton);
            price_button.register_touch(this.click_price_button.bind(this));
        } else {
            this.menu_sprite.node.color = cc.color(255, 255, 255, 255);
            this.price.active = false;
            this.get_mark.active = true;
        }
    }

    refresh_price_label() {
        if (this.menu_config.ad_number == 1) {
            this.price_label.string = `解锁`;
        } else {
            this.price_label.string = `${this.menu_data.get_menu_data_by_id(this.menu_config.id).menuAdTime} / ${this.menu_config.ad_number}解锁`;
        }
    }

    click_price_button() {
        if (this.menu_config.id == 1) {
            this.unlock_new_menu();
        } else {
            if (this.menu_data.get_menu_data_by_id(this.menu_config.id - 1).menuType == MenuType.unlock) {
                //播放广告。如果看完。
                this.unlock_new_menu();
            } else {
                console.log("请先解锁上一个菜品",this.menu_config.id);
            }
        }
    }

    unlock_new_menu() {
        let menu_ad_data = this.menu_data.get_menu_data_by_id(this.menu_config.id);
        if (menu_ad_data.menuAdTime + 1 == this.menu_config.ad_number) {
            this.menu_data.change_menu_data(this.menu_config.id, MenuType.unlock, menu_ad_data.menuAdTime + 1);
            this.need_refresh_node();
        } else {
            this.menu_data.change_menu_data(this.menu_config.id, menu_ad_data.menuType, menu_ad_data.menuAdTime + 1);
            this.refresh_price_label();
        }
    }

    un_refresh_node() {
        Loader.load_texture(`GamePlay/GamePlayUI/Menu/texture/UI_DishIcon_1`, (texture2d: cc.Texture2D) => {
            this.menu_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
        })
        this.menu_name_label.string = this.menu_config.chinese_name;
        this.profit_label.string = `利润:${this.menu_config.sell_price}金币`;
    }

}
