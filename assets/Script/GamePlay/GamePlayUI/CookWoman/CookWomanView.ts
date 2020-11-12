import BaseUI from "../../../Common/BaseUI";
import { NagivatorInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import Nagivator from "../../../Common/Nagivator";
import EventManager from "../../../EventManager/EventManager";
import { PeopleConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import GuideData from "../../../GameLocalData/GuideData";
import PeopleData from "../../../GameLocalData/PeopleData";
import { GuideFingerDirection, GuideMaskType, GuideMsgAlignHorizontalMode, GuideMsgAlignVerticleMode, GuideType } from "../../../UI/NewPlayerGuide/NewPlayerGuideEnum";
import NewPlayerGuideView from "../../../UI/NewPlayerGuide/NewPlayerGuideView";
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

    @property(cc.Node)
    new_guide_button: cc.Node = null;

    private close_button: cc.Node;

    guide_click_extension() {
        const guide_data: GuideData = GameLocalData.get_instance().get_data<GuideData>(GuideData);
        if (guide_data.cur_guid_id == 8) {
            NewPlayerGuideView.show_guide(
                9,
                GuideType.normal,
                this.new_guide_button,
                () => {
                    guide_data.cur_guid_id = 9;
                    const people_data = GameLocalData.get_instance().get_data<PeopleData>(PeopleData);
                    people_data.change_cook_woman_level(3, 1);
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.upgrade_cook_woman_level);
                    this.guide_click_close();
                },
                false,
                () => {
                },
                {},
                {
                    /**@description 是否显示mask */
                    show_mask: true,
                    /**@description 引导到的节点 */
                    guide_to_node: this.new_guide_button,
                    /**@description 引导的区域大小 如果为圆类型的话 直接取宽作为半径 */
                    mask_size: cc.size(150, 150),
                    /**@description 新手引导是否有mask的缩放动画 */
                    mask_animation: false,
                    /**@description 1: 方形 2: 圆形 */
                    guide_mask_type: GuideMaskType.circle,
                },
                {
                    /**@decription  显示手指 true 显示手指 false 不显示手指 */
                    show_hand: true,
                    /**@description 手指的指向 */
                    hand_finger_dir: GuideFingerDirection.left,
                    /**@description 位置偏移 cc.Position */
                    hand_position_offset: cc.v3(200, 0),
                    /**@description 自定义手指的旋转 */
                    hand_angle: 0,
                },
                {}
            )
        }
    }

    guide_click_close() {
        const guide_data: GuideData = GameLocalData.get_instance().get_data<GuideData>(GuideData);
        if (guide_data.cur_guid_id == 9) {
            NewPlayerGuideView.show_guide(
                10,
                GuideType.normal,
                this.close_button,
                () => {
                    guide_data.cur_guid_id = 10;
                    this.on_close_call();
                },
                false,
                () => {
                },
                {},
                {
                    /**@description 是否显示mask */
                    show_mask: true,
                    /**@description 引导到的节点 */
                    guide_to_node: this.close_button,
                    /**@description 引导的区域大小 如果为圆类型的话 直接取宽作为半径 */
                    mask_size: cc.size(70, 70),
                    /**@description 新手引导是否有mask的缩放动画 */
                    mask_animation: false,
                    /**@description 1: 方形 2: 圆形 */
                    guide_mask_type: GuideMaskType.circle,
                },
                {
                    /**@decription  显示手指 true 显示手指 false 不显示手指 */
                    show_hand: true,
                    /**@description 手指的指向 */
                    hand_finger_dir: GuideFingerDirection.left,
                    /**@description 位置偏移 cc.Position */
                    hand_position_offset: cc.v3(200, 0),
                    /**@description 自定义手指的旋转 */
                    hand_angle: 0,
                },
                {}
            )
        }
    }

    onLoad() {
        this.flush_view();
        this.load_gold_item();
    }

    start() {
        this.load_cook_woman_item();
        this.scheduleOnce(() => {
            this.guide_click_extension();
        }, 0.2)
    }

    flush_view() {
        const nagivator_interface: NagivatorInterface = {
            title: "厨娘",
            /**@description 返回按钮的回调*/
            back_callback: () => {
                this.on_close_call();
            }
        };
        this.add_nagivator([], nagivator_interface, (close_button_node: Nagivator) => {
            this.close_button = close_button_node.nagivator_back_button.node;
            this.guide_click_close();
        });
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
