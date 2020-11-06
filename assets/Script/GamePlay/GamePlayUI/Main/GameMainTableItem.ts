import BaseNode from "../../../Common/BaseNode";
import Loader from "../../../Common/Loader";
import EventConfig from "../../../EventManager/EventConfig";
import EventManager from "../../../EventManager/EventManager";
import { TableConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import { CustomerPayInterface } from "../../../GameLocalData/PeopleData";
import TableData from "../../../GameLocalData/TableData";
import LinkGameBase from "../../LinkGameBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMainTableItem extends BaseNode {

    @property(cc.Sprite)
    table_sprite: cc.Sprite = null;

    @property(cc.Node)
    left_seat_gift: cc.Node = null;

    @property(cc.Node)
    right_seat_gift: cc.Node = null;

    private table_number: number = 0;

    set_table_number(table_number: number) {
        this.table_number = table_number;
    }

    onLoad() {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.upgrade_table, this, this.refresh_table_sprite);
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.customer_pay, this, this.show_gift);
    }

    onDisable() {
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.upgrade_table, this, this.refresh_table_sprite);
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.customer_pay, this, this.show_gift);
    }

    refresh_table_sprite() {
        const table_data = GameLocalData.get_instance().get_data<TableData>(TableData);
        const table_level = table_data.get_table_data(this.table_number).tableLevel;
        const table_config: TableConfig = GameDataConfig.get_config_by_id("TableConfig", table_level);
        if (table_config) {
            Loader.load_texture(`GamePlay/GamePlayUI/Main/texture/${table_config.name}`, (texture2d: cc.Texture2D) => {
                this.table_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
            })
        } else {
            this.table_sprite.spriteFrame = null;
        }

    }

    show_gift(event, pay: CustomerPayInterface) {
        let seat_number = pay.seatNumber;
        if (Math.floor((seat_number - 1) / 2) == this.table_number) {
            if (seat_number % 2 == 0) {
                this.right_seat_gift.active = true;
            } else {
                this.left_seat_gift.active = true;
            }
        }
        this.scheduleOnce(() => {
            this.left_seat_gift.active = false;
            this.right_seat_gift.active = false;
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.fly_coin, this.table_number);
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.fly_heart, this.table_number);
        }, 1)
    }

    start() {
        this.refresh_table_sprite();
    }

}
