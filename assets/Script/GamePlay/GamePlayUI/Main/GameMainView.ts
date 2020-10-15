import BaseUI from "../../../Common/BaseUI";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import UIConfig from "../../../UI/UIManager/UIConfig";

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

    onLoad() {
        this.flush_view();
    }

    start() {
        this.load_gold_and_heart_item();
        console.log("我进来了");
    }

    flush_view() {
        //提现
        const cash_out_button: TouchButton = this.cash_out_button.addComponent(TouchButton);
        cash_out_button.register_touch(this.click_cash_out_button.bind(this));

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
        punch_clock_button.register_touch(this.click_punch_clock_button.bind(this));

        //招揽顾客
        const attract_customer_button: TouchButton = this.attract_customer_button.addComponent(TouchButton);
        attract_customer_button.register_touch(this.click_attract_customer_button.bind(this));

        //批量招揽顾客
        const batch_attract_customer_button: TouchButton = this.batch_attract_customer_button.addComponent(TouchButton);
        batch_attract_customer_button.register_touch(this.click_batch_attract_customer_button.bind(this));
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

    click_cash_out_button() {

    }

    click_cook_woman_button() {

    }

    click_menu_button() {

    }

    click_extension_button() {

    }

    click_punch_clock_button() {

    }

    click_attract_customer_button() {
        
    }

    click_batch_attract_customer_button() {

    }

}
