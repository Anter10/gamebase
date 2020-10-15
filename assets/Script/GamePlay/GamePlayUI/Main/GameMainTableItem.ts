import BaseNode from "../../../Common/BaseNode";
import Loader from "../../../Common/Loader";
import EventConfig from "../../../EventManager/EventConfig";
import EventManager from "../../../EventManager/EventManager";
import { TableConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import TableData from "../../../GameLocalData/TableData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMainTableItem extends BaseNode {

    @property(cc.Sprite)
    table_sprite: cc.Sprite = null;

    private table_number: number = 0;

    set_table_number(table_number: number) {
        this.table_number = table_number;
    }

    onLoad() {
        EventManager.get_instance().listen(EventConfig.upgrade_table, this, this.refresh_table_sprite);
    }

    onDisable() {
        EventManager.get_instance().cancel_listen(EventConfig.upgrade_table, this, this.refresh_table_sprite);
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

    start() {
        this.refresh_table_sprite();
    }
    
}
