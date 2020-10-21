import BaseNode from "../../../Common/BaseNode";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import EventManager from "../../../EventManager/EventManager";
import { PeopleConfig } from "../../../GameDataConfig/ConfigInterface";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import GamePlayBaseData from "../../../GameLocalData/GamePlayBaseData";
import PeopleData from "../../../GameLocalData/PeopleData";
import UIConfig from "../../../UI/UIManager/UIConfig";
import UIManager from "../../../UI/UIManager/UIManager";
import LinkGameBase from "../../LinkGameBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CookWomanItem extends BaseNode {

    @property(cc.Label)
    cook_woman_description_label: cc.Label = null;

    @property(cc.Sprite)
    cook_woman_sprite: cc.Sprite = null;

    @property(cc.Node)
    price: cc.Node = null;

    @property(cc.Node)
    get_mark: cc.Node = null;

    @property(cc.Label)
    price_label: cc.Label = null;

    private cook_woman_config: PeopleConfig = null;
    private people_data: PeopleData = null;

    onEnable() {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.upgrade_cook_woman_level, this, this.fresh_node_label);
    }

    onDisable() {
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.upgrade_cook_woman_level, this, this.fresh_node_label);
    }

    onLoad() {
        //查看人物详情
        const shoe_woman_description: TouchButton = this.cook_woman_sprite.node.addComponent(TouchButton);
        shoe_woman_description.register_touch(this.show_woman_description.bind(this));
    }

    show_woman_description() {
        const ui_cook_woman_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.CookWomanDescriptionView,
            ui_config_name: "CookWomanDescriptionView",
            param: this.cook_woman_config,
        }
        UIManager.show_ui(ui_cook_woman_param_interface);
    }

    start() {
        this.people_data = GameLocalData.get_instance().get_data<PeopleData>(PeopleData);
        this.fresh_node_label();
        this.set_cook_woman_sprite();
    }

    set_cook_woman_config(cook_woman_config: PeopleConfig) {
        this.cook_woman_config = cook_woman_config;
    }

    fresh_node_label() {
        const cur_cook_woman_level = this.people_data.get_people_data_by_people_config_id(this.cook_woman_config.id).peopleLevel;
        if (cur_cook_woman_level > 0) {
            this.cook_woman_description_label.string = this.cook_woman_config.chinese_name + `  LV.${cur_cook_woman_level}`;
            this.cook_woman_sprite.node.color = cc.color(255, 255, 255, 255);
            this.price.active = false;
            this.get_mark.active = true;
        } else {
            this.cook_woman_description_label.string = this.cook_woman_config.chinese_name;
            this.cook_woman_sprite.node.color = cc.color(100, 100, 100, 255);
            this.price.active = true;
            this.get_mark.active = false;
            this.price_label.string = this.cook_woman_config.upgrade_need_coin[0] + "金币";

            //解锁人物
            //TouchButton出问题。！！！！！
            const buy_new_table_button: TouchButton = this.price.addComponent(TouchButton);
            buy_new_table_button.register_touch(this.click_buy_new_table_button.bind(this));
        }
    }

    set_cook_woman_sprite() {
        Loader.load_texture(`GamePlay/GamePlayUI/CookWoman/texture/${this.cook_woman_config.picture_name}`, (texture2d: cc.Texture2D) => {
            this.cook_woman_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
        })
    }

    click_buy_new_table_button() {
        const game_play_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
        if (game_play_base_data.change_gold_coin_number(-this.cook_woman_config.upgrade_need_coin[0])) {
            this.people_data.change_cook_woman_level(this.cook_woman_config.id, 1);
            this.fresh_node_label();
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.upgrade_cook_woman_level);
            console.log("解锁成功");
        } else {
            console.log("金币不足，快去营业赚金币吧");
        }
    }

}
