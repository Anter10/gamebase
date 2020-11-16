import BaseNode from "../../../Common/BaseNode";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import EventManager from "../../../EventManager/EventManager";
import GameConfig from "../../../GameConfig";
import { DecorationConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import DecorationData from "../../../GameLocalData/DecorationData";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import GamePlayBaseData from "../../../GameLocalData/GamePlayBaseData";
import IOSServer from "../../../GameServerData/IOSServer";
import OSRuntime from "../../../OSRuntime";
import { Ad } from "../../../Sdk/Ad";
import BI from "../../../Sdk/BI";
import { RewardedAdInterface } from "../../../Sdk/SdkInterface";
import UIConfig from "../../../UI/UIManager/UIConfig";
import UIManager from "../../../UI/UIManager/UIManager";
import LinkGameBase from "../../LinkGameBase";
import { AdInterface } from "../Common/Ad/AdView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ExtensionDecorationItem extends BaseNode {

    @property(cc.Sprite)
    decoration_sprite: cc.Sprite = null;

    @property(cc.Node)
    price: cc.Node = null;

    @property(cc.Node)
    get_mark: cc.Node = null;

    @property(cc.Label)
    ad_label: cc.Label = null;

    @property(cc.Node)
    description_button: cc.Node = null;

    //装饰的等级
    private level_number = 0;
    //装饰的id
    private mark_number = 0;

    private decoration_config: DecorationConfig = null;
    private decoration_data: DecorationData = null;

    onLoad() {
        this.flush_node();
    }

    onEnable() {
        if (IOSServer.auditing) {
            this.node.getChildByName("price").getChildByName("ad_sprite").active = false;
        } else {
            this.node.getChildByName("price").getChildByName("ad_sprite").active = true;
        }
    }

    start() {
        this.decoration_config = GameDataConfig.get_config_by_id("DecorationConfig", (this.mark_number + 1));
        this.decoration_data = GameLocalData.get_instance().get_data<DecorationData>(DecorationData);
        this.set_decoration_sprite();
    }

    set_decoration_sprite() {
        //初始为0级，没有装饰。
        Loader.load_texture(`GamePlay/GamePlayUI/ExtensionTable/decoration_texture/${this.decoration_config.name}${this.level_number}`, (texture2d: cc.Texture2D) => {
            this.decoration_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
        });

        if (this.decoration_data.get_decoration_data(this.mark_number).decorationLevel >= this.level_number) {
            this.get_mark.active = true;
            this.price.active = false;
            this.decoration_sprite.node.color = cc.color(255, 255, 255, 255);
        } else {
            this.get_mark.active = false;
            this.price.active = true;
            this.decoration_sprite.node.color = cc.color(100, 100, 100, 255);
            if (this.decoration_data.get_decoration_data(this.mark_number).decorationLevel + 1 == this.level_number) {
                this.ad_label.string = this.decoration_data.get_decoration_data(this.mark_number).decorationAd + "/" + this.decoration_config.upgrade_need_ad[this.level_number - 1];
            } else {
                this.ad_label.string = 0 + "/" + this.decoration_config.upgrade_need_ad[this.level_number - 1];
            }
        }
    }

    set_level_number(level_number: number, mark_number: number) {
        this.level_number = level_number;
        this.mark_number = mark_number;
    }

    flush_node() {
        //显示装饰的详细描述
        const show_decoration_button: TouchButton = this.description_button.addComponent(TouchButton);
        show_decoration_button.register_touch(this.click_show_decoration_button.bind(this));

        //购买新的装饰
        const buy_new_decoration_button: TouchButton = this.price.addComponent(TouchButton);
        buy_new_decoration_button.register_touch(this.click_buy_new_decoration_button.bind(this));
    }

    click_show_decoration_button() {
        const ui_decoration_description_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.ShowDecorationDescriptionView,
            ui_config_name: "ShowDecorationDescriptionView",
            param: {
                decoration_config: this.decoration_config,
                level_number: this.level_number,
            },
        }
        UIManager.show_ui(ui_decoration_description_param_interface);
    }

    click_buy_new_decoration_button() {
        if (this.decoration_data.get_decoration_data(this.mark_number).decorationLevel == this.level_number - 1) {
            if (OSRuntime.api_user_interface.friendly) {
                let ad_param: AdInterface = {
                    text: "看完广告就可以解锁装饰了",
                    success_call: () => { this.unlock_new_decoration(); },
                    fail_call: () => {
                        const ui_param_interface: UIParamInterface = {
                            ui_config_path: UIConfig.Toast,
                            ui_config_name: "Toast",
                            param: {
                                text: "解锁失败"
                            }
                        }
                        UIManager.show_ui(ui_param_interface);
                    }
                }
                const ui_ad_param_interface: UIParamInterface = {
                    ui_config_path: UIConfig.AdView,
                    ui_config_name: "AdView",
                    param: ad_param,
                }
                UIManager.show_ui(ui_ad_param_interface);
            } else {
                let rewarded_ad_interface: RewardedAdInterface = {
                    /**@description 观看激励视频广告的ID */
                    ad_id: GameConfig.video_ad_id,
                    /**@description 观看激励视频成功的回调 */
                    success: (res: any) => {
                        //播放广告。如果看完。
                        this.unlock_new_decoration();
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
            }
        } else {
            const ui_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.Toast,
                ui_config_name: "Toast",
                param: {
                    text: "请先解锁前面的装饰"
                }
            }
            UIManager.show_ui(ui_param_interface);
            // console.log("请先解锁前面的装饰");
        }
    }


    unlock_new_decoration() {
        let ad_data = this.decoration_data.get_decoration_data(this.mark_number);
        BI.video_bi({ name: "解锁装饰" })
        if (ad_data.decorationAd + 1 == this.decoration_config.upgrade_need_ad[this.level_number - 1]) {
            this.decoration_data.change_decoration_ad_time(this.mark_number, 0);
            this.decoration_data.change_decoration_level_data(this.mark_number, this.level_number);
            this.set_decoration_sprite();
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.upgrade_decoration);
            this.scheduleOnce(() => {
                EventManager.get_instance().emit(LinkGameBase.game_play_event_config.success_ad_video);
            }, 0.2);
            const ui_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.Toast,
                ui_config_name: "Toast",
                param: {
                    text: "解锁成功"
                }
            }
            UIManager.show_ui(ui_param_interface);
            // console.log("解锁成功);
        } else {
            this.decoration_data.change_decoration_ad_time(this.mark_number, ad_data.decorationAd + 1);
            this.set_decoration_sprite();
        }
    }
}

