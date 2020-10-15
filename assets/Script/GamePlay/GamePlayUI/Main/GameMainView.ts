import BaseUI from "../../../Common/BaseUI";
import Loader from "../../../Common/Loader";
import UIConfig from "../../../UI/UIManager/UIConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMainView extends BaseUI {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    gold_coin_frame_node: cc.Node = null;

    @property(cc.Node)
    red_heart_frame_node: cc.Node = null;

    onLoad() {

    }

    start() {
        this.load_gold_and_heart_item();
        console.log("我进来了");
    }

    load_gold_and_heart_item() {
        Loader.load_prefab("./GamePlay/GamePlayUI/GoldCoinFrame/GoldCoinFrameItem", (prefab: cc.Prefab) => {
            const gold_coin_frame_item = cc.instantiate(prefab);
            gold_coin_frame_item.parent = this.gold_coin_frame_node;
        });
        Loader.load_prefab("./GamePlay/GamePlayUI/RedHeartFrame/RedHeartFrameItem", (prefab: cc.Prefab) => {
            const red_heart_frame_item = cc.instantiate(prefab);
            red_heart_frame_item.parent = this.red_heart_frame_node;
        });
    }

}
