import BaseNode from "../../../Common/BaseNode";
import { ClickOnRouterPath } from "../../../Common/CommonEnum";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import Utils from "../../../Common/Utils";
import EventManager from "../../../EventManager/EventManager";
import LinkGameBase from "../../../GamePlay/LinkGameBase";
import CommonServerData from "../../../GameServerData/CommonServerData";
import ClickOnController from "../../ClickOn/ClickOnController";
import UIConfig from "../../UIManager/UIConfig";
import UIManager from "../../UIManager/UIManager";
import { CashOutItemType } from "../CashOutEnum";
import { CashInterface, CashOutViewItemInterface } from "../CashOutInterface";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NoBalanceCashOutViewItem extends BaseNode {

    @property(cc.Sprite)
    no_balance_cash_out_view_bottom: cc.Sprite = null;
    @property(cc.Sprite)
    cash_out_button: cc.Sprite = null;
    @property(cc.Sprite)
    left_cornoer_sign: cc.Sprite = null;


    @property(cc.Label)
    cash_out_money_label: cc.Label = null;
    @property(cc.Label)
    cash_out_condition_tip_label: cc.Label = null;
    @property(cc.Label)
    cash_out_button_text_label: cc.Label = null;
    @property(cc.Label)
    cornor_tip_label: cc.Label = null;

    public cash_out_item_interface: CashOutViewItemInterface = null;

    onLoad() {
        super.onLoad();
        const touch_button: TouchButton = this.cash_out_button.node.addComponent(TouchButton);
        touch_button.register_touch(() => {
            // 提现操作
            if (this.cash_out_item_interface && !this.cash_out_item_interface.disable) {
                if (this.cash_out_item_interface.process >= this.cash_out_item_interface.needProcess) {
                    this.cash_out(this.cash_out_item_interface.id, 0, (res: CashInterface) => {
                        if (res.disable) {
                            this.disable_cash_out();
                        }
                    });
                } else {
                    let cash_out_tip_msg = "提现失败";
                    let finish_function: Function = null;
                    if (this.cash_out_item_interface.type == CashOutItemType.new_plyaer) {
                        cash_out_tip_msg = "你已经不是新手了";
                    } else if (this.cash_out_item_interface.type == CashOutItemType.click_on) {
                        cash_out_tip_msg = `还需打卡${this.cash_out_item_interface.needProcess - this.cash_out_item_interface.process}天`;
                        finish_function = () => {
                            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.close_cash_out);
                            ClickOnController.open(ClickOnRouterPath.normal);
                        }
                    } else if (this.cash_out_item_interface.type == CashOutItemType.pass_level) {
                        cash_out_tip_msg = `请升级店铺等级到${this.cash_out_item_interface.needProcess}`;
                        finish_function = () => {
                            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.close_cash_out);
                            const ui_store_upgrade_param_interface: UIParamInterface = {
                                ui_config_path: UIConfig.StoreUpgradeView,
                                ui_config_name: "StoreUpgradeView",
                            }
                            UIManager.show_ui(ui_store_upgrade_param_interface);
                        }
                    }
                    const ui_param_interface: UIParamInterface = {
                        ui_config_path: UIConfig.Toast,
                        ui_config_name: "Toast",
                        param: {
                            text: `${cash_out_tip_msg}`,
                            duration: 2,
                            finishe_call: finish_function,
                        }
                    }
                    UIManager.show_ui(ui_param_interface);
                }

            } else if (this.cash_out_item_interface.disable) {
                this.disable_cash_out();
                const ui_param_interface: UIParamInterface = {
                    ui_config_path: UIConfig.Toast,
                    ui_config_name: "Toast",
                    param: {
                        text: "已经提现过了"
                    }
                }
                UIManager.show_ui(ui_param_interface);
            }
        });
    }


    start() {
        super.start();
    }

    /**@description 将按钮设置成不可以点击 */
    disable_cash_out() {
        Loader.load_texture("/UI/CashOut/texture/NoBalance/common-button_grey", (texture2d: cc.Texture2D) => {
            this.cash_out_button.spriteFrame = new cc.SpriteFrame(texture2d);
        });
        this.cash_out_button_text_label.string = "已完成";
    }

    update_view(cash_out_item_interface: CashOutViewItemInterface) {
        this.cash_out_item_interface = cash_out_item_interface;
        this.cash_out_money_label.string = `${Utils.money(cash_out_item_interface.money, 2)}元`;
        if (this.cash_out_item_interface.disable) {
            this.disable_cash_out();
        }

        let cash_out_tip_msg = "新人专享";
        if (this.cash_out_item_interface.type == CashOutItemType.new_plyaer) {
            this.left_cornoer_sign.node.active = true;
            cash_out_tip_msg = "新人专享";
            this.cornor_tip_label.string = "新人专享";
        } else if (this.cash_out_item_interface.type == CashOutItemType.click_on) {
            cash_out_tip_msg = `${this.cash_out_item_interface.needProcess} 天打卡专享`;
            this.left_cornoer_sign.node.active = false;
            if (cash_out_item_interface.needProcess > cash_out_item_interface.process) {
                this.cash_out_button_text_label.string = "去打卡";
            }
        } else if (this.cash_out_item_interface.type == CashOutItemType.pass_level) {
            this.left_cornoer_sign.node.active = true;
            cash_out_tip_msg = `店铺${this.cash_out_item_interface.needProcess}级专享`;
            this.cornor_tip_label.string = "免打卡";
            if (cash_out_item_interface.needProcess > cash_out_item_interface.process) {
                this.cash_out_button_text_label.string = "去升级";
            }
        }

        this.cash_out_condition_tip_label.string = `${cash_out_tip_msg}`;
    }


    cash_out(id: number, op: number, success: Function) {
        // 提现的逻辑   
        const post_draw_data = {
            id: id,
            op: op,
        }

        CommonServerData.post_withdraw(post_draw_data, (res: CashInterface) => {
            success && success(res);
        }, (res) => {
            const ui_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.Toast,
                ui_config_name: "Toast",
                param: {
                    text: `${res.message}`
                }
            }
            UIManager.show_ui(ui_param_interface);
        })
    }




    // update (dt) {}
}
