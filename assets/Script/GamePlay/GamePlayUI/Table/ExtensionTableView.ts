import BaseUI from "../../../Common/BaseUI";
import { NagivatorInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import Nagivator from "../../../Common/Nagivator";
import TouchButton from "../../../Common/TouchButton";
import EventManager from "../../../EventManager/EventManager";
import { TableConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import GamePlayBaseData from "../../../GameLocalData/GamePlayBaseData";
import GuideData from "../../../GameLocalData/GuideData";
import TableData from "../../../GameLocalData/TableData";
import { GuideFingerDirection, GuideMaskType, GuideMsgAlignHorizontalMode, GuideMsgAlignVerticleMode, GuideType } from "../../../UI/NewPlayerGuide/NewPlayerGuideEnum";
import NewPlayerGuideView from "../../../UI/NewPlayerGuide/NewPlayerGuideView";
import GamePlayConfig from "../../GamePlayConfig/GamePlayConfig";
import { ExtensionTypeButton } from "../../GamePlayEnum/GamePlayEnum";
import LinkGameBase from "../../LinkGameBase";
import ExtensionDecorationFrameItem from "./ExtensionDecorationFrameItem ";
import ExtensionTableFrameItem from "./ExtensionTableFrameItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ExtensionTableView extends BaseUI {

    @property(cc.Node)
    table_button: cc.Node = null;

    @property(cc.Node)
    decoration_button: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    table_content: cc.Node = null;

    @property(cc.Node)
    decoration_content: cc.Node = null;

    @property(cc.Node)
    gold_coin_frame_node: cc.Node = null;

    @property(cc.Label)
    growth_description: cc.Label = null;

    @property(cc.Node)
    table_label: cc.Node = null;

    @property(cc.Node)
    new_guide_table_button: cc.Node = null;

    @property(cc.Node)
    decoration_label: cc.Node = null;
    private cur_button_type = ExtensionTypeButton.table;

    private close_button: cc.Node;

    readonly table_content_height = 1700;
    readonly decoration_content_height = 1850;

    onLoad() {
        this.flush_view();
    }

    start() {
        this.load_gold_item();
        this.flush_table_content();
        this.scheduleOnce(() => {
            this.guide_click_extension();
        }, 0.2)
    }

    onDisable() {
        EventManager.get_instance().emit(LinkGameBase.game_play_event_config.open_next_player_guide);
    }

    guide_click_extension() {
        const guide_data: GuideData = GameLocalData.get_instance().get_data<GuideData>(GuideData);
        if (guide_data.cur_guid_id == 5) {
            NewPlayerGuideView.show_guide(
                6,
                GuideType.normal,
                this.new_guide_table_button,
                () => {
                    guide_data.cur_guid_id = 6;
                    const table_data = GameLocalData.get_instance().get_data<TableData>(TableData);
                    const game_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
                    const table_config: TableConfig = GameDataConfig.get_config_by_id("TableConfig", 1);
                    table_data.change_table_level_data(1, 1);
                    game_base_data.change_gold_coin_number(-table_config.upgrade);
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.upgrade_table, 1);
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
                    guide_to_node: this.new_guide_table_button,
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
        if (guide_data.cur_guid_id == 6) {
            NewPlayerGuideView.show_guide(
                7,
                GuideType.normal,
                this.close_button,
                () => {
                    guide_data.cur_guid_id = 7;
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

    flush_view() {
        const nagivator_interface: NagivatorInterface = {
            title: "扩建",
            /**@description 返回按钮的回调*/
            back_callback: () => {
                this.on_close_call();
            }
        };
        this.add_nagivator([], nagivator_interface, (close_button_node: Nagivator) => {
            this.close_button = close_button_node.nagivator_back_button.node;
            this.guide_click_close();
        });

        //选择桌子按钮
        const table_button: TouchButton = this.table_button.addComponent(TouchButton);
        table_button.register_touch(this.click_table_button_type.bind(this));

        //选择装饰按钮
        const decoration_button: TouchButton = this.decoration_button.addComponent(TouchButton);
        decoration_button.register_touch(this.click_decoration_button_type.bind(this));
    }

    click_table_button_type() {
        if (this.cur_button_type != ExtensionTypeButton.table) {
            this.cur_button_type = ExtensionTypeButton.table;
            this.table_label.color = cc.color(131, 39, 45, 255);
            this.decoration_label.color = cc.color(229, 203, 169, 255);
            let c_sprite_frame = this.decoration_button.getComponent(cc.Sprite).spriteFrame;
            this.decoration_button.getComponent(cc.Sprite).spriteFrame = this.table_button.getComponent(cc.Sprite).spriteFrame;
            this.table_button.getComponent(cc.Sprite).spriteFrame = c_sprite_frame;
            this.flush_table_content();
        }
    }

    click_decoration_button_type() {
        if (this.cur_button_type != ExtensionTypeButton.decoration) {
            this.cur_button_type = ExtensionTypeButton.decoration;
            this.decoration_label.color = cc.color(131, 39, 45, 255);
            this.table_label.color = cc.color(229, 203, 169, 255);
            let c_sprite_frame = this.decoration_button.getComponent(cc.Sprite).spriteFrame;
            this.decoration_button.getComponent(cc.Sprite).spriteFrame = this.table_button.getComponent(cc.Sprite).spriteFrame;
            this.table_button.getComponent(cc.Sprite).spriteFrame = c_sprite_frame;
            this.flush_decoration_content();
        }
    }

    close_view() {
        this.on_close_call();
    }

    flush_table_content() {
        this.decoration_content.active = false;
        this.table_content.active = true;
        this.growth_description.string = "高等级桌椅可以获得更高金币加成哦!";
        this.content.height = this.table_content_height;
        if (this.decoration_content.childrenCount == 0) {
            Loader.load_prefab("/GamePlay/GamePlayUI/ExtensionTable/ExtensionTableFrameItem", (prefab: cc.Prefab) => {
                let i = 0;
                this.delay_add_nodes(GamePlayConfig.total_table_number - 1, prefab, (node: cc.Node) => {
                    const extension_table_frame_item = node;
                    extension_table_frame_item.getComponent(ExtensionTableFrameItem).set_mark_number(i);
                    extension_table_frame_item.y = -130 - i * (extension_table_frame_item.height + 20);
                    extension_table_frame_item.parent = this.table_content;
                    i++;
                });
            });
        }
    }

    flush_decoration_content() {
        this.table_content.active = false;
        this.decoration_content.active = true;
        this.growth_description.string = "高等级装饰可以获得更高金币加成哦!";
        this.content.height = this.decoration_content_height;
        if (this.decoration_content.childrenCount == 0) {
            Loader.load_prefab("/GamePlay/GamePlayUI/ExtensionTable/ExtensionDecorationFrameItem", (prefab: cc.Prefab) => {
                let i = 0;
                this.delay_add_nodes(GamePlayConfig.total_decoration_number - 1, prefab, (node: cc.Node) => {
                    const extension_table_frame_item = node;
                    extension_table_frame_item.getComponent(ExtensionDecorationFrameItem).set_mark_number(i);
                    extension_table_frame_item.y = -130 - i * (extension_table_frame_item.height + 20);
                    extension_table_frame_item.parent = this.decoration_content;
                    i++;
                }, 0.2);
            });
        }
    }

    load_gold_item() {
        Loader.load_prefab("/GamePlay/GamePlayUI/Common/GoldCoinFrame/GoldCoinFrameItem", (prefab: cc.Prefab) => {
            const gold_coin_frame_item = cc.instantiate(prefab);
            gold_coin_frame_item.parent = this.gold_coin_frame_node;
        });
    }


}
