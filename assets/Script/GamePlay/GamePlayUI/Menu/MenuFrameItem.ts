import BaseNode from "../../../Common/BaseNode";
import Loader from "../../../Common/Loader";
import { MenuConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import MenuItem from "./MenuItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuFrameItem extends BaseNode {

    @property(cc.Node)
    menu_array: cc.Node = null;

    //菜品属于第几行,0
    private line_number: number = 0;

    set_line_number(line_number: number) {
        this.line_number = line_number;
    }

    start() {
        this.add_menu();
    }

    add_menu() {
        const menu_configs: Array<MenuConfig> = GameDataConfig.get_config_array("MenuConfig");
        for (let i = 0; i < this.menu_array.childrenCount; i++) {
            Loader.load_prefab("GamePlay/GamePlayUI/Menu/MenuItem", (prefab: cc.Prefab) => {
                const unlock_reward_item = cc.instantiate(prefab);
                unlock_reward_item.getComponent(MenuItem).set_config(menu_configs[this.line_number * 3 + i]);
                unlock_reward_item.parent = this.menu_array.children[i];
            });
        }
    }
}
