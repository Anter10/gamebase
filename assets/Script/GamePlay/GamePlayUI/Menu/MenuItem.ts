import BaseNode from "../../../Common/BaseNode";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import GameConfig from "../../../GameConfig";
import { MenuConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import MenuData from "../../../GameLocalData/MenuData";
import OSRuntime from "../../../OSRuntime";
import { Ad } from "../../../Sdk/Ad";
import BI from "../../../Sdk/BI";
import { RewardedAdInterface } from "../../../Sdk/SdkInterface";
import UIConfig from "../../../UI/UIManager/UIConfig";
import UIManager from "../../../UI/UIManager/UIManager";
import GamePlayConfig from "../../GamePlayConfig/GamePlayConfig";
import { MenuType } from "../../GamePlayEnum/GamePlayEnum";
import { AdInterface } from "../Common/Ad/AdView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuItem extends BaseNode {

    @property(cc.Sprite)
    menu_sprite: cc.Sprite = null;

    @property(cc.Label)
    menu_name_label: cc.Label = null;

    @property(cc.Label)
    profit_label: cc.Label = null;

    @property(cc.Node)
    price: cc.Node = null;

    @property(cc.Node)
    get_mark: cc.Node = null;

    @property(cc.Label)
    price_label: cc.Label = null;

    private menu_config: MenuConfig = null;
    private menu_data: MenuData = null;

    start() {
        this.un_refresh_node();
    }

    onEnable() {
        this.need_refresh_node();
    }

    set_config(menu_config: MenuConfig) {
        this.menu_config = menu_config;
    }

    need_refresh_node() {
        this.menu_data = GameLocalData.get_instance().get_data<MenuData>(MenuData);
        if (this.menu_data.get_menu_data_by_id(this.menu_config.id).menuType == MenuType.lock) {
            this.menu_sprite.node.color = cc.color(100, 100, 100, 255);
            this.price.active = true;
            this.get_mark.active = false;

            this.refresh_price_label();

            if (!this.price.getComponent(TouchButton)) {
                const price_button: TouchButton = this.price.addComponent(TouchButton);
                price_button.register_touch(this.click_price_button.bind(this));
            }
        } else {
            this.menu_sprite.node.color = cc.color(255, 255, 255, 255);
            this.price.active = false;
            this.get_mark.active = true;
        }
    }

    refresh_price_label() {
        if (this.menu_config.ad_number == 1) {
            this.price_label.string = `解锁`;
        } else {
            this.price_label.string = `${this.menu_data.get_menu_data_by_id(this.menu_config.id).menuAdTime} / ${this.menu_config.ad_number}解锁`;
        }
    }

    click_price_button() {
        if (OSRuntime.api_user_interface.friendly) {
            let ad_param: AdInterface = {
                text: "看完广告就可以解锁菜谱了",
                success_call: () => { this.click_price_button_call(); },
            }
            const ui_ad_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.AdView,
                ui_config_name: "AdView",
                param: ad_param,
            }
            UIManager.show_ui(ui_ad_param_interface);
        } else {
            this.click_price_button_call();
        }
    }

    click_price_button_call() {
        if (this.menu_config.id == 1) {
            this.unlock_new_menu();
        } else {
            if (this.menu_data.get_menu_unlock_number() >= GamePlayConfig.daily_unlock_menu_limit) {
                const ui_param_interface: UIParamInterface = {
                    ui_config_path: UIConfig.Toast,
                    ui_config_name: "Toast",
                    param: {
                        text: `每天最多解锁${GamePlayConfig.daily_unlock_menu_limit}个菜品，请明日再来`
                    }
                }
                UIManager.show_ui(ui_param_interface);
            } else {
                if (this.menu_data.get_menu_data_by_id(this.menu_config.id - 1).menuType == MenuType.unlock) {
                    let rewarded_ad_interface: RewardedAdInterface = {
                        /**@description 观看激励视频广告的ID */
                        ad_id: GameConfig.video_ad_id,
                        /**@description 观看激励视频成功的回调 */
                        success: (res: any) => {
                            //播放广告。如果看完。
                            this.unlock_new_menu();
                        },
                        /**@description 观看激励视频失败的成功回调*/
                        fail: (res: any) => {
                            const ui_param_interface: UIParamInterface = {
                                ui_config_path: UIConfig.Toast,
                                ui_config_name: "Toast",
                                param: {
                                    text: "解锁失败"
                                }
                            }
                            UIManager.show_ui(ui_param_interface);
                        },
                    }
                    Ad.play_video_ad(rewarded_ad_interface);
                } else {
                    const ui_param_interface: UIParamInterface = {
                        ui_config_path: UIConfig.Toast,
                        ui_config_name: "Toast",
                        param: {
                            text: "请先解锁上一个菜品"
                        }
                    }
                    UIManager.show_ui(ui_param_interface);
                }
            }

        }
    }

    unlock_new_menu() {
        let menu_ad_data = this.menu_data.get_menu_data_by_id(this.menu_config.id);
        BI.video_bi({name: "解锁菜品"})
        if (menu_ad_data.menuAdTime + 1 == this.menu_config.ad_number) {
            this.menu_data.change_menu_data(this.menu_config.id, MenuType.unlock, menu_ad_data.menuAdTime + 1);
            const ui_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.Toast,
                ui_config_name: "Toast",
                param: {
                    text: "解锁成功"
                }
            }
            UIManager.show_ui(ui_param_interface);
            // console.log("解锁成功);
            this.need_refresh_node();
        } else {
            this.menu_data.change_menu_data(this.menu_config.id, menu_ad_data.menuType, menu_ad_data.menuAdTime + 1);
            this.refresh_price_label();
        }
    }

    un_refresh_node() {
        if (this.menu_config && this.menu_config.id) {
            Loader.load_texture(`GamePlay/GamePlayUI/Menu/texture/UI_DishIcon_${this.menu_config.id}`, (texture2d: cc.Texture2D) => {
                this.menu_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
            })
        }
        this.menu_name_label.string = this.menu_config.chinese_name;
        this.profit_label.string = `利润:${this.menu_config.sell_price}金币`;
    }

}
