import BaseNode from "../../../../Common/BaseNode";
import Loader from "../../../../Common/Loader";
import TouchButton from "../../../../Common/TouchButton";
import EventManager from "../../../../EventManager/EventManager";
import GameLocalData from "../../../../GameLocalData/GameLocalData";
import StoreUpgradeData from "../../../../GameLocalData/StoreUpgradeData";
import LinkGameBase from "../../../LinkGameBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StoreIconItem extends BaseNode {

    @property(cc.Sprite)
    cur_store_sprite: cc.Sprite = null;

    @property(cc.Label)
    store_level_label: cc.Label = null;

    @property(cc.Node)
    star_array: cc.Node = null;

    @property(cc.Node)
    click_bg: cc.Node = null;

    private store_level: number = 0;

    set_store_level(store_level: number) {
        this.store_level = store_level;
    }

    open_refresh_icon() {
        this.store_level = GameLocalData.get_instance().get_data<StoreUpgradeData>(StoreUpgradeData).get_store_level_data();
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.upgrade_store_level, this, this.un_refresh_icon);
    }

    onDestroy() {
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.upgrade_store_level, this, this.un_refresh_icon);
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.click_store_button, this, this.close_click_bg);
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.select_store_level, this, this.select_store_level);
    }

    start() {
        this.un_refresh_icon();
    }

    select_store_item() {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.select_store_level, this, this.select_store_level);
    }

    select_store_level(event, store_level: number) {
        this.store_level = store_level;
        this.un_refresh_icon();
    }

    un_refresh_icon() {
        this.store_level_label.string = this.store_level + "";
        Loader.load_texture(`GamePlay/GamePlayUI/Common/StoreTexture/Restaurant_Badge_${this.store_level}`, (texture2d: cc.Texture2D) => {
            this.cur_store_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
        })
        for (let i = 0; i < this.star_array.childrenCount; i++) {
            if (this.store_level > i) {
                this.star_array.children[i].active = true;
            } else {
                this.star_array.children[i].active = false;
            }
        }
    }

    open_click_this_node() {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.click_store_button, this, this.close_click_bg);

        //点击商店图标
        //TouchButton出问题。！！！！！
        const cash_out_button: TouchButton = this.node.addComponent(TouchButton);
        cash_out_button.register_touch(this.click_this_node.bind(this));
    }

    click_this_node() {
        //其他店铺的黄色选择框需要关掉。
        EventManager.get_instance().emit(LinkGameBase.game_play_event_config.click_store_button, this.store_level);
        this.click_bg.active = true;
    }

    close_click_bg(event, click_level_number: number) {
        if (click_level_number == this.store_level) {
            this.click_bg.active = true;
        } else {
            this.click_bg.active = false;
        }
    }

}
