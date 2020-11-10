import { gamebase } from "../Boot";
import Loader from "../Common/Loader";
import TouchButton from "../Common/TouchButton";
import LinkGameBase from "./LinkGameBase";

const { ccclass, property } = cc._decorator;

@ccclass
class GamePlay extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    public node_top: cc.Node = null;

    public node_mid: cc.Node = null;

    public node_bottom: cc.Node = null;

    @property(cc.Prefab)
    flower_prefab: cc.Prefab = null;

    onLoad() {
        console.log(`进入游戏的game_play了`)
        // LinkGameBase.game_play_record[0].ch
    }

    start() {
        this.node_mid = cc.instantiate(gamebase.gameScenePrefab[1]);
        this.node_mid.parent = this.node;
        this.node_top = cc.instantiate(gamebase.gameScenePrefab[0]);
        this.node_top.parent = this.node;
        this.node_bottom = cc.instantiate(gamebase.gameScenePrefab[2]);
        this.node_bottom.parent = this.node;
        this.regist_button_touch_event();
        this.init_flower_trellis();
    }

    /**@description 初始化花架 */
    init_flower_trellis () {
        const scrollview = this.node_mid.getChildByName(`scrollview`);
        const node_item = this.node_mid.getChildByName(`node_item`);
        const content = scrollview.getChildByName(`view`).getChildByName(`content`);
        const len = 8;
        const item_height = Math.floor(scrollview.height / 3);
        content.height = item_height * len;
        let posY = -item_height + 50;
        for (let i = 0;i < len;++ i) {
            const clone_item = cc.instantiate(node_item);
            clone_item.parent = content;
            clone_item.y = posY;
            posY -= item_height;
            clone_item.active = true;
            const clone_flower = cc.instantiate(this.flower_prefab);
            clone_flower.parent = clone_item;
            const flowerpot_height = clone_flower.getChildByName(`sprite_flowerpot`).height;
            const baffle_height = clone_item.getChildByName(`sprite_baffle`).height;
            clone_flower.y = flowerpot_height / 2 + baffle_height * 3 / 4;
        }
        this.scheduleOnce(() => {
            scrollview.getComponent(cc.ScrollView).scrollToBottom();
        } ,0);
    }

    /**@description 按钮同意注册点击事件 */
    regist_button_touch_event() {
        const regist = (node: cc.Node, callBack: Function) => {
            const touch_button: TouchButton = node.addComponent(TouchButton);
            touch_button.register_touch(callBack.bind(this)); // 提升玩家等级
        }
        regist(this.node_top.getChildByName(`player_level_bg`), this.player_level_up_callback); // 提升玩家等级
        regist(this.node_top.getChildByName(`btn_signin`), this.open_sign_in_callback); // 打开每日登陆界面
        regist(this.node_top.getChildByName(`btn_redbag`), this.red_bag_callback); // 领取倒计时红包
        regist(this.node_top.getChildByName(`btn_strategy`), this.open_strategy_callback); // 打开攻略界面
        regist(this.node_top.getChildByName(`btn_drawCash`), this.open_draw_cash_callback); // 打开提现商店界面
        regist(this.node_top.getChildByName(`btn_warehouse`), this.open_ware_house_callback); // 打开我的仓库界面

        regist(this.node_bottom.getChildByName(`btn_flower_culture`), this.open_flower_culture_callback); // 打开我要养花界面
        regist(this.node_bottom.getChildByName(`btn_task`), this.open_task_callback); // 打开现金任务界面
        regist(this.node_bottom.getChildByName(`btn_invite`), this.open_invite_callback); // 打开邀请好友界面
        regist(this.node_bottom.getChildByName(`btn_clock_in`), this.open_clock_in_callback); // 打开打卡界面
        regist(this.node_bottom.getChildByName(`btn_accelerate`), this.open_accelerate_callback); // 打卡一键加速功能
    }

    /**@description 提升玩家等级 */
    player_level_up_callback() {
        cc.log(`提升玩家等级`);
    }

    /**@description 打开每日登录界面 */
    open_sign_in_callback() {
        cc.log(`打开每日登陆界面`);
    }

    /**@description 领取倒计时红包 */
    red_bag_callback() {
        cc.log(`领取倒计时红包`);
    }

    /**@description 打开攻略界面 */
    open_strategy_callback() {
        cc.log(`打开攻略界面`);
    }

    /**@description 打开提现商店界面 */
    open_draw_cash_callback() {
        cc.log(`打开提现商店界面`);
    }

    /**@description 打开我的仓库界面 */
    open_ware_house_callback() {
        cc.log(`打开我的仓库界面`);
    }

    /**@description 打开我要养花界面 */
    open_flower_culture_callback() {
        cc.log(`打开我要养花界面`);
    }

    /**@description 打开现金任务界面 */
    open_task_callback() {
        cc.log(`打开现金任务界面`);
    }

    /**@description 打开邀请好友界面 */
    open_invite_callback() {
        cc.log(`打开邀请好友界面`);
    }

    /**@description 打开打卡界面 */
    open_clock_in_callback() {
        cc.log(`打开打卡界面`);
    }

    /**@description 打卡一键加速功能 */
    open_accelerate_callback() {
        cc.log(`打卡一键加速功能`);
    }

    // update (dt) {}
}


export default GamePlay;