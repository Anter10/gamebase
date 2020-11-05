import BaseUI from "../../../Common/BaseUI";
import { NagivatorInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import EventManager from "../../../EventManager/EventManager";
import { MenuConfig, UnlockMenuRewardConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import LinkGameBase from "../../LinkGameBase";
import MenuFrameItem from "./MenuFrameItem";
import UnlockRewardItem from "./UnlockRewardItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuView extends BaseUI {

    @property(cc.Node)
    gold_coin_frame_node: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    onLoad() {
        this.flush_view();
        this.load_gold_item();
    }

    flush_view() {
        const nagivator_interface: NagivatorInterface = {
            title: "菜谱",
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

    start() {
        this.add_content_item();
    }

    add_content_item() {
        const menu_configs: Array<MenuConfig> = GameDataConfig.get_config_array("MenuConfig");
        const unlock_menu_reward_configs: Array<UnlockMenuRewardConfig> = GameDataConfig.get_config_array("UnlockMenuRewardConfig");
        Loader.load_prefab("GamePlay/GamePlayUI/Menu/UnlockRewardItem", (prefab: cc.Prefab) => {
            let j = 0;
            this.delay_add_nodes(unlock_menu_reward_configs.length - 1, prefab, (node: cc.Node) => {
                const unlock_reward_item = node;
                unlock_reward_item.getComponent(UnlockRewardItem).set_config(unlock_menu_reward_configs[j]);
                if (j == unlock_menu_reward_configs.length - 1) {
                    unlock_reward_item.y = -1000 * (j + 1) + 400;
                } else {
                    unlock_reward_item.y = -1000 * (j + 1) + 100;
                }
                this.content.insertChild(unlock_reward_item, 0);
                j ++;
            },0.3);

            Loader.load_prefab("GamePlay/GamePlayUI/Menu/MenuFrameItem", (prefab: cc.Prefab) => {
                let i = 0;
                this.delay_add_nodes(menu_configs.length / 3 - 1,prefab, (node:cc.Node)=>{
                    const menu_frame = node;
                    menu_frame.getComponent(MenuFrameItem).set_line_number(i);
                    menu_frame.y = -Math.floor(i / 3) * 1000 - (i % 3) * 280 - 100;
                    menu_frame.parent = this.content;
                    i = i + 1;
                },0.3);
            });
        })

       

    }

    onDisable() {
        EventManager.get_instance().emit(LinkGameBase.game_play_event_config.open_next_player_guide);
    }
    
}
