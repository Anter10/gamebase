import BaseUI from "../../../Common/BaseUI";
import { NagivatorInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import EventManager from "../../../EventManager/EventManager";
import { PeopleConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import { PeopleType } from "../../GamePlayEnum/GamePlayEnum";
import LinkGameBase from "../../LinkGameBase";
import CookWomanItem from "./CookWomanItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CookWomanView extends BaseUI {

    @property(cc.Node)
    gold_coin_frame_node: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    onLoad() {
        this.flush_view();
        this.load_gold_item();
    }

    start() {
        this.load_cook_woman_item();
    }

    flush_view() {
        const nagivator_interface: NagivatorInterface = {
            title: "厨娘",
            /**@description 返回按钮的回调*/
            back_callback: () => {
                this.on_close_call();
            }
        };
        this.add_nagivator([], nagivator_interface);
    }

    load_gold_item() {
        Loader.load_prefab("/GamePlay/GamePlayUI/Common/GoldCoinFrame/GoldCoinFrameItem", (prefab: cc.Prefab) => {
            const gold_coin_frame_item = cc.instantiate(prefab);
            gold_coin_frame_item.parent = this.gold_coin_frame_node;
        });
    }

    load_cook_woman_item() {
        const people_configs: Array<PeopleConfig> = GameDataConfig.get_config_array("PeopleConfig");
        let cook_woman_configs: Array<PeopleConfig> = [];
        for (let i = 0; i < people_configs.length; i++) {
            if (people_configs[i].type == PeopleType.cook_woman) {
                cook_woman_configs.push(people_configs[i]);
            }
        }
        for (let i = 0; i < cook_woman_configs.length; i++) {
            Loader.load_prefab("GamePlay/GamePlayUI/CookWoman/CookWomanItem", (prefab: cc.Prefab) => {
                const cook_woman_item = cc.instantiate(prefab);
                cook_woman_item.getComponent(CookWomanItem).set_cook_woman_config(cook_woman_configs[i]);
                cook_woman_item.parent = this.content;
            })
        }
    }
    
    onDisable() {
        EventManager.get_instance().emit(LinkGameBase.game_play_event_config.open_next_player_guide);
    }
}
