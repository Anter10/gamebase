import BaseUI from "../../Common/BaseUI";
import { BaseUIInterface } from "../../Common/CommonInterface";
import { CashOutViewInterface } from "./CashOutInterface";
import { CashOutType } from "./CashOutEnum";
import CashOutController from "./CashOutController";
import EventManager from "../../EventManager/EventManager";
import LinkGameBase from "../../GamePlay/LinkGameBase";


const { ccclass, property } = cc._decorator;

@ccclass
/**@description 用户的提现界面 */
class CashOutView extends BaseUI implements CashOutViewInterface, BaseUIInterface {
    public cash_out_type: CashOutType = CashOutType.no_balance;
    public controller: CashOutController = null;

    @property(cc.Label)
    moeny_label: cc.Label = null;

    /**@description 刷新余额显示 */
    flush_money(money: number) {
        this.moeny_label.string = `${money}`;
    }

    /**@description 提现调用 */
    cash_out_callback() {

    }

    onLoad() {
        super.onLoad();
        this.controller.init_view();
    }

    onAddFinished() {
        super.onAddFinished();
        this.controller.view = this;
        this.controller.update_cash_out_view();
    }

    onEnable() {
        super.onDisable();
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.close_cash_out, this, this.close_this_node.bind(this));
    }
    start() {
        super.start();
    }

    close_this_node() {
        this.on_close_call();
    }
    onDisable() {
        EventManager.get_instance().emit(LinkGameBase.game_play_event_config.open_next_player_guide);
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.close_cash_out, this, this.close_this_node.bind(this));
    }

    // update (dt) {}
}


export default CashOutView;