import { gamebase } from "../../../Boot";
import BaseUI from "../../../Common/BaseUI";
import { CashOutRouterPath, ClickOnRouterPath } from "../../../Common/CommonEnum";
import { ApiV2CheckinInterface, UIParamInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import Random from "../../../Common/Random";
import Time from "../../../Common/Time";
import TouchButton from "../../../Common/TouchButton";
import EventManager from "../../../EventManager/EventManager";
import GameConfig from "../../../GameConfig";
import { DecorationConfig, MenuConfig, PeopleConfig, TableConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import DecorationData from "../../../GameLocalData/DecorationData";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import GamePlayBaseData from "../../../GameLocalData/GamePlayBaseData";
import GuideData from "../../../GameLocalData/GuideData";
import MenuData from "../../../GameLocalData/MenuData";
import OfflineData from "../../../GameLocalData/OfflineData";
import OrderMenuData from "../../../GameLocalData/OrderMenuData";
import PeopleData, { CustomerPayInterface } from "../../../GameLocalData/PeopleData";
import SeatData from "../../../GameLocalData/SeatData";
import TableData from "../../../GameLocalData/TableData";
import CommonServerData from "../../../GameServerData/CommonServerData";
import OSRuntime from "../../../OSRuntime";
import { Ad } from "../../../Sdk/Ad";
import BI from "../../../Sdk/BI";
import { RewardedAdInterface } from "../../../Sdk/SdkInterface";
import GameData from "../../../Sdk/UserData";
import CashOutController from "../../../UI/CashOut/CashOutController";
import ClickOnController from "../../../UI/ClickOn/ClickOnController";
import { GuideFingerDirection, GuideMaskType, GuideMsgAlignHorizontalMode, GuideMsgAlignVerticleMode, GuideNpcAlignHorizontalMode, GuideNpcAlignVerticleMode, GuideNpcDirection, GuideType } from "../../../UI/NewPlayerGuide/NewPlayerGuideEnum";
import NewPlayerGuideView from "../../../UI/NewPlayerGuide/NewPlayerGuideView";
import UIConfig from "../../../UI/UIManager/UIConfig";
import UIManager from "../../../UI/UIManager/UIManager";
import { AStar } from "../../AStar/AStar";
import GamePlayConfig from "../../GamePlayConfig/GamePlayConfig";
import { PeopleType } from "../../GamePlayEnum/GamePlayEnum";
import LinkGameBase from "../../LinkGameBase";
import { AdInterface } from "../Common/Ad/AdView";
import StoreIconItem from "../Common/StoreIconItem/StoreIconItem";
import GameMainDecorationItem from "./GameMainDecorationItem";
import GameMainTableItem from "./GameMainTableItem";
import OrderMenuItem from "./OrderMenuItem";
import PlotItem from "./PlotItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMainView extends BaseUI {

    @property(cc.Node)
    gold_coin_frame_node: cc.Node = null;

    @property(cc.Node)
    red_heart_frame_node: cc.Node = null;

    @property(cc.Node)
    cash_out_button: cc.Node = null;

    @property(cc.Node)
    cook_woman_button: cc.Node = null;

    @property(cc.Node)
    menu_button: cc.Node = null;

    @property(cc.Node)
    extension_button: cc.Node = null;

    @property(cc.Node)
    punch_clock_button: cc.Node = null;

    @property(cc.Node)
    attract_customer_button: cc.Node = null;

    @property(cc.Node)
    batch_attract_customer_button: cc.Node = null;

    @property(cc.Label)
    attract_customer_progress_label: cc.Label = null;

    @property(cc.Label)
    video_number: cc.Label = null;

    @property(cc.Node)
    video_frame: cc.Node = null;

    @property(cc.Node)
    attract_customer_progress: cc.Node = null;

    @property(cc.Node)
    table_node_array: Array<cc.Node> = [];

    @property(cc.Node)
    decoration_array: Array<cc.Node> = [];

    @property(cc.Node)
    store_upgrade_button: cc.Node = null;

    @property(cc.Node)
    store_upgrade_node: cc.Node = null;

    @property(cc.Node)
    pot_array: cc.Node = null;

    @property(cc.Node)
    menu_content: cc.Node = null;

    @property(cc.Node)
    coin: cc.Node = null;

    @property(cc.Node)
    heart: cc.Node = null;

    @property(cc.Node)
    button_array: cc.Node = null;

    @property(cc.Node)
    debug_button: cc.Node = null;


    private _debug_click_number: number = 0;

    private _order_menu_number = 0;

    onLoad() {
        this.flush_view();
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.order_menu, this, this.add_order_menu);
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.receiving_menu, this, this.reduce_order_menu_number);
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.customer_pay, this, this.customer_pay);
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.open_next_player_guide, this, this.new_player_guide);
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.fly_coin, this, this.fly_coin);
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.fly_heart, this, this.fly_heart);
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.success_ad_video, this, this.request_checkin_data);
    }

    start() {
        this.new_player_guide();
        this.fix_people_data_by_time();
        this.fix_play_base_data();
        this.fix_menu_data();
        this.load_gold_and_heart_item();
        this.load_table_item();
        this.load_decoration_item();
        this.load_store();
        this.load_plot_item();
        this.load_order_menu();
        this.show_offline_view();
        this.add_customer();
        this.request_checkin_data();
    }

    request_checkin_data() {
        this.video_frame.active = false;
        CommonServerData.get_clock_in((res: ApiV2CheckinInterface) => {
            if (res.needProcess - res.process > 0) {
                this.video_frame.active = true;
                this.video_number.string = `${res.needProcess - res.process}个`;
            } else {
                this.video_frame.active = false;
            }
        }, true, (error: any) => {
            this.video_frame.active = false;
            console.log("打卡数据错误 = ", error);
        })
    }

    fix_menu_data() {
        //是否是新的一天
        const menu_data = GameLocalData.get_instance().get_data<MenuData>(MenuData);
        if (Time.is_new_day(new Date(menu_data.get_refresh_menu_unlock_number_time()), new Date(Time.get_time()))) {
            menu_data.set_refresh_menu_unlock_number_time(Time.get_time());
            menu_data.set_menu_unlock_number(0);
        }
    }

    debug_call() {
        this._debug_click_number = this._debug_click_number + 1;
        if (this._debug_click_number >= 5) {
            gamebase.game_scene.show_debug_view();
            this._debug_click_number = 0;
        }
    }

    //新手引导部分
    new_player_guide() {
        const guide_data: GuideData = GameLocalData.get_instance().get_data<GuideData>(GuideData);
        if (guide_data.cur_guid_id != 12) {
            //1
            this.guide_cook_gold_speak();
            //2
            this.guide_cook_gold_speak_two();
            //3
            this.guide_click_add_customer();
            //4
            this.guide_click_batch_add();
            //5
            this.guide_click_extension();
            //6 7
            this.guide_show_extension();
            //8
            this.guide_click_cook_woman();
            // 9 10
            this.guide_show_cook_woman();
            //11
            this.guide_click_cash_out();
            //12
            this.guide_click_menu();
        }
    }
    guide_cook_gold_speak() {
        const guide_data: GuideData = GameLocalData.get_instance().get_data<GuideData>(GuideData);
        if (guide_data.cur_guid_id == 0) {
            this.scheduleOnce(() => {
                if (!guide_data.guide_finished(1)) {
                    guide_data.cur_guid_id = 1;
                    guide_data.pass_a_guide(1);
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.close_new_player_guide_view);
                }
            }, 4);
            NewPlayerGuideView.show_guide(
                1,
                GuideType.pciture,
                null,
                () => {
                },
                true,
                () => {
                    guide_data.cur_guid_id = 1;
                },
                { show_help_msg: true, size: cc.v2(600, 187), set_layout: cc.v2(150, 10), help_message: "欢迎来到幸福餐厅，你的餐厅你做主！扩建餐厅，解锁厨娘和菜谱，招揽客人就可以赚钱！", horizonal_align_mode: GuideMsgAlignHorizontalMode.right, horizonal_align: 30, verticle_align_mode: GuideMsgAlignVerticleMode.bottom, verticle_align: 650, label_size: 28 },
                {},
                {},
                { npc_direction: GuideNpcDirection.right, size: cc.v2(271, 657), show_npc: true, horizonal_align_mode: GuideNpcAlignHorizontalMode.left, horizonal_align: 0, verticle_align_mode: GuideNpcAlignVerticleMode.bottom, verticle_align: 550 }
            )
        }
    }
    guide_cook_gold_speak_two() {
        const guide_data: GuideData = GameLocalData.get_instance().get_data<GuideData>(GuideData);
        if (guide_data.cur_guid_id == 1) {
            this.scheduleOnce(() => {
                if (!guide_data.guide_finished(2)) {
                    guide_data.cur_guid_id = 2;
                    guide_data.pass_a_guide(2);
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.close_new_player_guide_view);
                }
            }, 4);
            NewPlayerGuideView.show_guide(
                2,
                GuideType.pciture,
                null,
                () => {
                },
                true,
                () => {
                    guide_data.cur_guid_id = 2;
                },
                { show_help_msg: true, size: cc.v2(600, 187), set_layout: cc.v2(150, 10), help_message: "记住哦！扩建餐厅，解锁厨娘和菜谱，招揽客人，赚钱可以提现到微信！", horizonal_align_mode: GuideMsgAlignHorizontalMode.right, horizonal_align: 30, verticle_align_mode: GuideMsgAlignVerticleMode.bottom, verticle_align: 650, label_size: 28 },
                {},
                {},
                { npc_direction: GuideNpcDirection.right, size: cc.v2(271, 657), show_npc: true, horizonal_align_mode: GuideNpcAlignHorizontalMode.left, horizonal_align: 0, verticle_align_mode: GuideNpcAlignVerticleMode.bottom, verticle_align: 550 }
            )
        }
    }
    guide_click_add_customer() {
        const guide_data: GuideData = GameLocalData.get_instance().get_data<GuideData>(GuideData);
        if (guide_data.cur_guid_id == 2) {
            NewPlayerGuideView.show_guide(
                3,
                GuideType.normal,
                this.attract_customer_button,
                () => {
                    guide_data.cur_guid_id = 3;
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.add_customer);
                },
                true,
                () => {
                },
                { show_help_msg: true, size: cc.v2(500, 100), set_layout: cc.v2(45, 10), help_message: "点这里就招揽客人赚金币！", horizonal_align_mode: GuideMsgAlignHorizontalMode.right, horizonal_align: 125, verticle_align_mode: GuideMsgAlignVerticleMode.bottom, verticle_align: 300, label_size: 36 },
                {
                    /**@description 是否显示mask */
                    show_mask: true,
                    /**@description 引导到的节点 */
                    guide_to_node: this.attract_customer_button,
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
                    hand_finger_dir: GuideFingerDirection.down,
                    /**@description 位置偏移 cc.Position */
                    hand_position_offset: cc.v3(0, 200),
                    /**@description 自定义手指的旋转 */
                    hand_angle: 0,
                },
                {}
            )
        }
    }
    guide_click_batch_add() {
        const guide_data: GuideData = GameLocalData.get_instance().get_data<GuideData>(GuideData);
        if (guide_data.cur_guid_id == 3) {
            NewPlayerGuideView.show_guide(
                4,
                GuideType.normal,
                this.batch_attract_customer_button,
                () => {
                    guide_data.cur_guid_id = 4;
                    for (let i = 0; i < GamePlayConfig.batch_add_customer; i++) {
                        EventManager.get_instance().emit(LinkGameBase.game_play_event_config.add_customer);
                    }
                },
                true,
                () => {
                },
                { show_help_msg: true, size: cc.v2(500, 100), set_layout: cc.v2(45, 10), help_message: "点这里批量揽客,躺着赚钱", horizonal_align_mode: GuideMsgAlignHorizontalMode.right, horizonal_align: 125, verticle_align_mode: GuideMsgAlignVerticleMode.bottom, verticle_align: 300, label_size: 36, },
                {
                    /**@description 是否显示mask */
                    show_mask: true,
                    /**@description 引导到的节点 */
                    guide_to_node: this.batch_attract_customer_button,
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
                    hand_finger_dir: GuideFingerDirection.down,
                    /**@description 位置偏移 cc.Position */
                    hand_position_offset: cc.v3(0, 200),
                    /**@description 自定义手指的旋转 */
                    hand_angle: 0,
                },
                {}
            )
        }
    }
    guide_click_extension() {
        const guide_data: GuideData = GameLocalData.get_instance().get_data<GuideData>(GuideData);
        if (guide_data.cur_guid_id == 4) {
            NewPlayerGuideView.show_guide(
                5,
                GuideType.normal,
                this.extension_button,
                () => {
                    guide_data.cur_guid_id = 5;
                    this.click_extension_button();
                },
                false,
                () => {
                },
                { show_help_msg: true, size: cc.v2(500, 100), set_layout: cc.v2(45, 10), help_message: "客人太多，点这里扩建餐厅", horizonal_align_mode: GuideMsgAlignHorizontalMode.null, verticle_align_mode: GuideMsgAlignVerticleMode.null, label_size: 36, position: cc.v2(-400, 0) },
                {
                    /**@description 是否显示mask */
                    show_mask: true,
                    /**@description 引导到的节点 */
                    guide_to_node: this.extension_button,
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
                    hand_finger_dir: GuideFingerDirection.right,
                    /**@description 位置偏移 cc.Position */
                    hand_position_offset: cc.v3(-150, 0),
                    /**@description 自定义手指的旋转 */
                    hand_angle: 0,
                },
                {}
            )
        }
    }

    guide_show_extension() {
        const guide_data: GuideData = GameLocalData.get_instance().get_data<GuideData>(GuideData);
        if (guide_data.cur_guid_id == 5) {
            this.click_extension_button();
        }
        if (guide_data.cur_guid_id == 6) {
            guide_data.cur_guid_id = 7;
            this.guide_click_cook_woman();
        }
    }

    guide_click_cook_woman() {
        const guide_data: GuideData = GameLocalData.get_instance().get_data<GuideData>(GuideData);
        if (guide_data.cur_guid_id == 7) {
            NewPlayerGuideView.show_guide(
                8,
                GuideType.normal,
                this.cook_woman_button,
                () => {
                    guide_data.cur_guid_id = 8;
                    this.click_cook_woman_button();
                },
                false,
                () => {
                },
                { show_help_msg: true, size: cc.v2(500, 100), set_layout: cc.v2(30, 10), help_message: "忙不过来，解锁更多厨娘！", horizonal_align_mode: GuideMsgAlignHorizontalMode.null, verticle_align_mode: GuideMsgAlignVerticleMode.null, label_size: 36, position: cc.v2(-400, 0) },
                {
                    /**@description 是否显示mask */
                    show_mask: true,
                    /**@description 引导到的节点 */
                    guide_to_node: this.cook_woman_button,
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
                    hand_finger_dir: GuideFingerDirection.right,
                    /**@description 位置偏移 cc.Position */
                    hand_position_offset: cc.v3(-150, 0),
                    /**@description 自定义手指的旋转 */
                    hand_angle: 0,
                },
                {}
            )
        }
    }

    guide_show_cook_woman() {
        const guide_data: GuideData = GameLocalData.get_instance().get_data<GuideData>(GuideData);
        if (guide_data.cur_guid_id == 8) {
            this.click_cook_woman_button();
        }
        if (guide_data.cur_guid_id == 9) {
            guide_data.cur_guid_id = 10;
            this.guide_click_cash_out();
        }
    }

    guide_click_cash_out() {
        const guide_data: GuideData = GameLocalData.get_instance().get_data<GuideData>(GuideData);
        if (guide_data.cur_guid_id == 10) {
            NewPlayerGuideView.show_guide(
                11,
                GuideType.normal,
                this.cash_out_button,
                () => {
                    guide_data.cur_guid_id = 11;
                    this.click_cash_out_button();
                },
                false,
                () => {
                },
                { show_help_msg: true, size: cc.v2(500, 100), set_layout: cc.v2(45, 10), help_message: "点击这里可以立即提现啦", horizonal_align_mode: GuideMsgAlignHorizontalMode.null, verticle_align_mode: GuideMsgAlignVerticleMode.null, label_size: 36, position: cc.v2(400, 0) },
                {
                    /**@description 是否显示mask */
                    show_mask: true,
                    /**@description 引导到的节点 */
                    guide_to_node: this.attract_customer_button,
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
                    hand_position_offset: cc.v3(150, 0),
                    /**@description 自定义手指的旋转 */
                    hand_angle: 0,
                },
                {}
            )
        }
    }
    guide_click_menu() {
        const guide_data: GuideData = GameLocalData.get_instance().get_data<GuideData>(GuideData);
        if (guide_data.cur_guid_id == 11) {
            NewPlayerGuideView.show_guide(
                12,
                GuideType.normal,
                this.menu_button,
                () => {
                    guide_data.cur_guid_id = 12;
                    this.click_menu_button();
                },
                false,
                () => {
                },
                { show_help_msg: true, size: cc.v2(500, 100), set_layout: cc.v2(45, 10), help_message: "解锁菜品赚取更多金币啦", horizonal_align_mode: GuideMsgAlignHorizontalMode.null, verticle_align_mode: GuideMsgAlignVerticleMode.null, label_size: 36, position: cc.v2(-400, 0) },
                {
                    /**@description 是否显示mask */
                    show_mask: true,
                    /**@description 引导到的节点 */
                    guide_to_node: this.menu_button,
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
                    hand_finger_dir: GuideFingerDirection.right,
                    /**@description 位置偏移 cc.Position */
                    hand_position_offset: cc.v3(-150, 0),
                    /**@description 自定义手指的旋转 */
                    hand_angle: 0,
                },
                {}
            )
        }
    }
    //新手引导结束



    fix_play_base_data() {
        const game_play_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
        game_play_base_data.attract_customer_number = 0;
        this.set_attract_customer_progress(game_play_base_data.attract_customer_number);
    }

    show_offline_view() {
        const offline_data: OfflineData = GameLocalData.get_instance().get_data(OfflineData);
        let offline_data_time = offline_data.get_all_data();
        if (offline_data_time == 0) {
            offline_data.set_offline_data(Time.get_second_time());
        } else {
            let differ_time = Time.get_second_time() - offline_data.get_all_data();
            if (differ_time >= 3600) {
                const ui_offline_param_interface: UIParamInterface = {
                    ui_config_path: UIConfig.OfflineView,
                    ui_config_name: "OfflineView",
                    param: differ_time,
                }
                UIManager.show_ui(ui_offline_param_interface);
            } else {
                offline_data.set_offline_data(Time.get_second_time());
            }
        }
    }

    add_customer() {
        //如果新手引导都过了才能开始自动送人，离线收益计时;
        const guide_data: GuideData = GameLocalData.get_instance().get_data<GuideData>(GuideData);
        if (guide_data.guide_finished(12)) {
            setInterval(() => {
                EventManager.get_instance().emit(LinkGameBase.game_play_event_config.add_customer);
                this.scheduleOnce(() => {
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.add_customer);
                }, 0.8);

                //刷新离线收益。暂时放这儿
                const offline_data: OfflineData = GameLocalData.get_instance().get_data(OfflineData);
                offline_data.set_offline_data(Time.get_second_time());
            }, GamePlayConfig.add_customer_time * 1000);
        }
    }

    customer_pay(event, pay: CustomerPayInterface) {
        let cook_woman_level = 0;
        let customer_order_config = 0;
        let seat_number = 0;
        if (pay.cookWomanLevel == 0) {
            const people_configs: Array<PeopleConfig> = GameDataConfig.get_config_array("PeopleConfig");
            const people_data: PeopleData = GameLocalData.get_instance().get_data(PeopleData);
            let level_array = [];
            for (let i = 0; i < people_configs.length; i++) {
                if (people_configs[i].type == PeopleType.cook_woman) {
                    const level = people_data.get_people_data_by_people_config_id(people_configs[i].id).peopleLevel;
                    if (level > 0) {
                        level_array.push(level);
                    }
                }
            }
            cook_woman_level = Random.rangeFromArr(level_array);
        } else {
            cook_woman_level = pay.cookWomanLevel;
        }
        if (pay.customerOrderConfig == 0) {
            const menu_data: MenuData = GameLocalData.get_instance().get_data(MenuData);
            const menu_config: Array<MenuConfig> = GameDataConfig.get_config_array("MenuConfig");
            let min = 1;
            let max = 1;
            if (menu_data.get_unlock_number() < 5) {
                min = 1;
                max = menu_data.get_unlock_number();
            } else if (menu_data.get_unlock_number() >= 5 && menu_data.get_unlock_number() != menu_config.length) {
                min = menu_data.get_unlock_number() - 4;
                max = menu_data.get_unlock_number();
            } else {
                min = menu_data.get_unlock_number() - 4;
                max = menu_data.get_unlock_number();
            }
            customer_order_config = Random.rangeInt(min, max);
        } else {
            customer_order_config = pay.customerOrderConfig;
        }
        if (pay.seatNumber == 0) {
            const seat_data: SeatData = GameLocalData.get_instance().get_data(SeatData);
            let seat_array = [];
            for (let i = 0; i < seat_data.get_all_data().length; i++) {
                seat_array.push(seat_data.get_all_data()[i].seatNumber);
            }
            seat_number = Random.rangeFromArr(seat_array);
        } else {
            seat_number = pay.seatNumber;
        }
        let order_config: MenuConfig = GameDataConfig.get_config_by_id("MenuConfig", customer_order_config);
        if (!order_config) {
            order_config = GameDataConfig.get_config_by_id("MenuConfig", 1);
        }
        const cook_woman_config: PeopleConfig = GameDataConfig.get_config_by_id("PeopleConfig", 2);
        const table_level = GameLocalData.get_instance().get_data(TableData).get_table_data(Math.floor((seat_number + 1) / 2) - 1).tableLevel;
        const table_config: TableConfig = GameDataConfig.get_config_by_id("TableConfig", table_level);
        let cook_woman_up = cook_woman_config.cook_gold_accelerate[cook_woman_level - 1] + 100;
        let table_up = table_config.growth + 100;
        const decoration_data: DecorationData = GameLocalData.get_instance().get_data(DecorationData);
        let decoration_up = 100;
        for (let i = 0; i < decoration_data.get_all_data().length; i++) {
            if (decoration_data.get_all_data()[i].decorationLevel > 0) {
                const decoration_config: DecorationConfig = GameDataConfig.get_config_by_id("DecorationConfig", decoration_data.get_all_data()[i].decorationNumber + 1);
                decoration_up = decoration_up + decoration_config.growth[decoration_data.get_all_data()[i].decorationLevel - 1];
            }
        }
        let pay_gold = Math.floor(order_config.sell_price * cook_woman_up * table_up * decoration_up / 100 / 100 / 100);
        const game_play_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
        game_play_base_data.change_gold_coin_number(pay_gold);
        game_play_base_data.change_red_heart_number(GamePlayConfig.get_red_heart);
    }

    reduce_order_menu_number() {
        this._order_menu_number--;
        this.set_order_menu_layout();
    }

    add_order_menu(event, config: { order_menu_config_id: number, order_seat_id: number, customer_number: number }) {
        const order_menu_data = GameLocalData.get_instance().get_data<OrderMenuData>(OrderMenuData);
        let order_data_number = order_menu_data.add_new_order_data(config.order_menu_config_id, config.order_seat_id, config.customer_number);
        const menu_config: MenuConfig = GameDataConfig.get_config_by_id("MenuConfig", config.order_menu_config_id);
        this._order_menu_number = this._order_menu_number + 1;
        this.set_order_menu_layout();
        Loader.load_prefab("/GamePlay/GamePlayUI/Main/OrderMenuItem", (prefab: cc.Prefab) => {
            const order_menu_item = cc.instantiate(prefab);
            order_menu_item.getComponent(OrderMenuItem).set_order_menu_item_config(order_data_number, menu_config);
            order_menu_item.parent = this.menu_content;
        });
    }

    set_order_menu_layout() {
        const layout = this.menu_content.getComponent(cc.Layout);
        if (this._order_menu_number > 10) {
            layout.resizeMode = cc.Layout.ResizeMode.CHILDREN;
        } else {
            layout.resizeMode = cc.Layout.ResizeMode.NONE;
        }
    }

    load_order_menu() {
        const order_menu_data = GameLocalData.get_instance().get_data<OrderMenuData>(OrderMenuData);
        this._order_menu_number = order_menu_data.get_order_menu().length;
        this.set_order_menu_layout();
        Loader.load_prefab("/GamePlay/GamePlayUI/Main/OrderMenuItem", (prefab: cc.Prefab) => {
            for (let i = 0; i < order_menu_data.get_order_menu().length; i++) {
                const order_menu_item = cc.instantiate(prefab);
                const menu_config: MenuConfig = GameDataConfig.get_config_by_id("MenuConfig", order_menu_data.get_order_menu()[i].menuConfigId);
                order_menu_item.getComponent(OrderMenuItem).set_order_menu_item_config(order_menu_data.get_order_menu()[i].menuNumber, menu_config);
                order_menu_item.parent = this.menu_content;
            }
        });
    }

    load_plot_item() {
        for (let i = 0; i < this.pot_array.childrenCount; i++) {
            Loader.load_prefab("/GamePlay/GamePlayUI/Main/PlotItem", (prefab: cc.Prefab) => {
                const plot_item_node = cc.instantiate(prefab);
                plot_item_node.getComponent(PlotItem).set_plot_user(i);
                plot_item_node.parent = this.pot_array.children[i];
            });
        }
    }

    load_store() {
        Loader.load_prefab("/GamePlay/GamePlayUI/Common/StoreIconItem/StoreIconItem", (prefab: cc.Prefab) => {
            const game_store_icon_item = cc.instantiate(prefab);
            game_store_icon_item.getComponent(StoreIconItem).open_refresh_icon();
            game_store_icon_item.parent = this.store_upgrade_node;
        });
    }

    click_cash_out_button() {
        CashOutController.open(CashOutRouterPath.no_balance);
    }

    click_on_button() {
        ClickOnController.open(ClickOnRouterPath.normal);
    }

    flush_view() {
        //提现
        const cash_out_button: TouchButton = this.cash_out_button.addComponent(TouchButton);
        cash_out_button.register_touch(this.click_cash_out_button.bind(this));


        //店铺升级
        const store_upgrade_button: TouchButton = this.store_upgrade_button.addComponent(TouchButton);
        store_upgrade_button.register_touch(this.click_store_upgrade_button.bind(this));

        //厨娘
        const cook_woman_button: TouchButton = this.cook_woman_button.addComponent(TouchButton);
        cook_woman_button.register_touch(this.click_cook_woman_button.bind(this));

        //菜谱
        const menu_button: TouchButton = this.menu_button.addComponent(TouchButton);
        menu_button.register_touch(this.click_menu_button.bind(this));

        //扩建
        const extension_button: TouchButton = this.extension_button.addComponent(TouchButton);
        extension_button.register_touch(this.click_extension_button.bind(this));

        //打卡
        const punch_clock_button: TouchButton = this.punch_clock_button.addComponent(TouchButton);
        punch_clock_button.register_touch(this.click_on_button.bind(this));

        //招揽顾客
        const attract_customer_button: TouchButton = this.attract_customer_button.addComponent(TouchButton);
        attract_customer_button.register_touch(this.click_attract_customer_button.bind(this));

        //批量招揽顾客
        const batch_attract_customer_button: TouchButton = this.batch_attract_customer_button.addComponent(TouchButton);
        batch_attract_customer_button.register_touch(this.click_batch_attract_customer_button.bind(this));

        // debug
        this.debug_button.addComponent(TouchButton).register_touch(() => {
            this.debug_call();
        });

    }

    load_gold_and_heart_item() {
        Loader.load_prefab("/GamePlay/GamePlayUI/Common/GoldCoinFrame/GoldCoinFrameItem", (prefab: cc.Prefab) => {
            const gold_coin_frame_item = cc.instantiate(prefab);
            gold_coin_frame_item.parent = this.gold_coin_frame_node;
        });
        Loader.load_prefab("/GamePlay/GamePlayUI/Common/RedHeartFrame/RedHeartFrameItem", (prefab: cc.Prefab) => {
            const red_heart_frame_item = cc.instantiate(prefab);
            red_heart_frame_item.parent = this.red_heart_frame_node;
        });
    }

    load_table_item() {
        for (let i = 0; i < this.table_node_array.length; i++) {
            Loader.load_prefab("/GamePlay/GamePlayUI/Main/GameMainTableItem", (prefab: cc.Prefab) => {
                const game_main_table_item = cc.instantiate(prefab);
                game_main_table_item.getComponent(GameMainTableItem).set_table_number(i);
                game_main_table_item.parent = this.table_node_array[i];
            });
        }
    }

    load_decoration_item() {
        for (let i = 0; i < this.decoration_array.length; i++) {
            Loader.load_prefab("/GamePlay/GamePlayUI/Main/GameMainDecorationItem", (prefab: cc.Prefab) => {
                const game_main_table_item = cc.instantiate(prefab);
                game_main_table_item.getComponent(GameMainDecorationItem).set_decoration_number(i);
                game_main_table_item.parent = this.decoration_array[i];
            });
        }
    }

    click_cook_woman_button() {
        const ui_cook_woman_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.CookWomanView,
            ui_config_name: "CookWomanView",
        }
        UIManager.show_ui(ui_cook_woman_param_interface);
    }

    click_store_upgrade_button() {
        const ui_store_upgrade_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.StoreUpgradeView,
            ui_config_name: "StoreUpgradeView",
        }
        UIManager.show_ui(ui_store_upgrade_param_interface);
    }

    click_menu_button() {
        const ui_menu_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.MenuView,
            ui_config_name: "MenuView",
        }
        UIManager.show_ui(ui_menu_param_interface);
    }

    click_extension_button() {
        const ui_extension_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.ExtensionTableView,
            ui_config_name: "ExtensionTableView",
        }
        UIManager.show_ui(ui_extension_param_interface);
    }

    click_punch_clock_button() {

    }

    click_attract_customer_button() {
        const game_play_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
        let total = game_play_base_data.attract_customer_number + GamePlayConfig.click_attract_customer_button_add;
        if (total <= 100) {
            game_play_base_data.attract_customer_number = game_play_base_data.attract_customer_number + GamePlayConfig.click_attract_customer_button_add;
            this.set_attract_customer_progress(game_play_base_data.attract_customer_number);
            if (total == 100) {
                if (game_play_base_data.attract_customer_limit >= GamePlayConfig.add_customer_max) {
                    this.show_attract_customer_ad();
                } else {
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.add_customer);
                    this.scheduleOnce(() => {
                        game_play_base_data.attract_customer_number = 0;
                        this.set_attract_customer_progress(game_play_base_data.attract_customer_number);
                        game_play_base_data.attract_customer_limit = game_play_base_data.attract_customer_limit + 1;
                        //再招揽一位客人。
                    }, 0.5);
                }
            }
        } else {
            if (game_play_base_data.attract_customer_number == 100 && game_play_base_data.attract_customer_limit >= GamePlayConfig.add_customer_max) {
                this.show_attract_customer_ad();
            }
        }
    }

    show_attract_customer_ad() {
        const game_play_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
        let ad_param: AdInterface = {
            text: `看完广告就可以继续手动揽客啦！`,
            success_call: () => {
                EventManager.get_instance().emit(LinkGameBase.game_play_event_config.add_customer);
                game_play_base_data.attract_customer_limit = 0;
                game_play_base_data.attract_customer_number = 0;
                this.set_attract_customer_progress(game_play_base_data.attract_customer_number);
            },
        }
        const ui_ad_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.AdView,
            ui_config_name: "AdView",
            param: ad_param,
        }
        UIManager.show_ui(ui_ad_param_interface);
    }

    click_batch_attract_customer_button() {
        if (OSRuntime.api_user_interface.friendly) {
            let ad_param: AdInterface = {
                text: `看完广告就可以立即招揽\n${GamePlayConfig.batch_add_customer}个顾客了`,
                success_call: () => { this.batch_attract_customer() },
            }
            const ui_ad_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.AdView,
                ui_config_name: "AdView",
                param: ad_param,
            }
            UIManager.show_ui(ui_ad_param_interface);
        } else {
            this.batch_attract_customer();
        }
    }

    batch_attract_customer() {
        let rewarded_ad_interface: RewardedAdInterface = {
            /**@description 观看激励视频广告的ID */
            ad_id: GameConfig.video_ad_id,
            /**@description 观看激励视频成功的回调 */
            success: (res: any) => {
                BI.video_bi({ name: "批量招揽顾客" });
                EventManager.get_instance().emit(LinkGameBase.game_play_event_config.success_ad_video);
                let i = 0;
                const callback = () => {
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.add_customer);
                    i++;
                    if (i == GamePlayConfig.batch_add_customer) {
                        this.unschedule(callback);
                    }
                }
                this.schedule(callback, 0.5, GamePlayConfig.batch_add_customer, 0.5);
            },
            /**@description 观看激励视频失败的成功回调*/
            fail: (res: any) => {
                const ui_param_interface: UIParamInterface = {
                    ui_config_path: UIConfig.Toast,
                    ui_config_name: "Toast",
                    param: {
                        text: "批量招揽失败"
                    }
                }
                UIManager.show_ui(ui_param_interface);
            },
        }
        Ad.play_video_ad(rewarded_ad_interface);
    }

    set_attract_customer_progress(progress_number: number) {
        this.attract_customer_progress_label.string = progress_number + "%";
        this.attract_customer_progress.scaleX = progress_number / 100;
    }

    fix_people_data_by_time() {
        const people_data = GameLocalData.get_instance().get_data(PeopleData);
        people_data.fix_people_data_by_time();
    }

    /**
 * @description 金币飞向目标
 * @param startPos 起始点坐标
 * @param endPos 终点坐标
 */
    fly_coin(event, table_number: number) {
        let coin_node = cc.instantiate(this.coin);
        coin_node.active = true;
        coin_node.setPosition(this.table_node_array[table_number].getPosition());
        coin_node.parent = this.button_array;
        // 创建一个移动动作
        let finished = cc.callFunc(() => {
            coin_node.active = false;
            coin_node.destroy();
        });
        let action = cc.sequence(cc.moveTo(1, this.gold_coin_frame_node.getPosition()), finished);
        // 执行动作
        coin_node.runAction(action);
    }

    fly_heart(event, table_number: number) {
        let coin_node = cc.instantiate(this.heart);
        coin_node.active = true;
        coin_node.setPosition(this.table_node_array[table_number].getPosition());
        coin_node.parent = this.button_array;
        // 创建一个移动动作
        let finished = cc.callFunc(() => {
            coin_node.active = false;
            coin_node.destroy();
        });
        let action = cc.sequence(cc.moveTo(1, this.red_heart_frame_node.getPosition()), finished);
        // 执行动作
        coin_node.runAction(action);
    }

}
