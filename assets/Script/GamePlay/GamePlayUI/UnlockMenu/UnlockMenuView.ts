import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import GameConfig from "../../../GameConfig";
import { MenuConfig } from "../../../GameDataConfig/ConfigInterface";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import MenuData from "../../../GameLocalData/MenuData";
import { Ad } from "../../../Sdk/Ad";
import BI from "../../../Sdk/BI";
import { NativeSupportStatueCode } from "../../../Sdk/SdkEnum";
import { RewardedAdInterface, StaticImageAdInterface } from "../../../Sdk/SdkInterface";
import UIConfig from "../../../UI/UIManager/UIConfig";
import UIManager from "../../../UI/UIManager/UIManager";
import { MenuType } from "../../GamePlayEnum/GamePlayEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UnlockMenuView extends BaseUI {

    @property(cc.Label)
    title_label: cc.Label = null;

    @property(cc.Sprite)
    menu_sprite: cc.Sprite = null;

    @property(cc.Label)
    menu_label: cc.Label = null;

    @property(cc.Label)
    sell_label: cc.Label = null;

    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Node)
    give_up_button: cc.Node = null;

    @property(cc.Node)
    get_button: cc.Node = null;

    @property(cc.Node)
    bg: cc.Node = null;

    menu_config: MenuConfig = null;
    menu_data: MenuData = null;
    show_lock_toast: boolean = false;
    onLoad() {
        //关闭
        const close_button: TouchButton = this.close_button.addComponent(TouchButton);
        close_button.register_touch(this.on_close_call.bind(this));

        //点击领取
        const get_button: TouchButton = this.get_button.addComponent(TouchButton);
        get_button.register_touch(this.click_get_button.bind(this));

        //点击放弃
        const give_up_button: TouchButton = this.give_up_button.addComponent(TouchButton);
        give_up_button.register_touch(this.on_close_call.bind(this));
    }

    show(ui_param_interface: UIParamInterface) {
        super.show(ui_param_interface)
        this.set_unlock_menu_view(ui_param_interface.param);
    }

    start() {
        this.close_button.active = false;
        this.scheduleOnce(() => {
            this.close_button.active = true;
        }, 3);
    }

    set_unlock_menu_view(param: { title_label: string, menu_config: MenuConfig }) {
        if (param && param.menu_config && param.menu_config.id) {
            this.menu_config = param.menu_config;
            this.title_label.string = param.title_label;
            if (param.title_label == "财神送福利") {
                this.show_lock_toast = true;
            } else {
                this.show_lock_toast = false;
            }
            this.menu_label.string = param.menu_config.chinese_name;
            this.sell_label.string = `售价：${param.menu_config.sell_price}金币`;
            Loader.load_texture(`GamePlay/GamePlayUI/Menu/texture/UI_DishIcon_${param.menu_config.id}`, (texture2d: cc.Texture2D) => {
                this.menu_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
            })
        }
    }

    click_get_button() {
        let rewarded_ad_interface: RewardedAdInterface = {
            /**@description 观看激励视频广告的ID */
            ad_id: GameConfig.video_ad_id,
            /**@description 观看激励视频成功的回调 */
            success: (res: any) => {
                this.get_gift();
            },
            /**@description 观看激励视频失败的成功回调*/
            fail: (res: any) => { },
        }
        Ad.play_video_ad(rewarded_ad_interface);
    }

    update_view_widget(code: NativeSupportStatueCode){
        const widget = this.bg.getComponent(cc.Widget);
        if(code == NativeSupportStatueCode.LOAD_FAIL){
            widget.isAlignTop = false;
            widget.isAlignVerticalCenter = true;
            widget.updateAlignment();
        }else{
            widget.isAlignTop = true;
            widget.top = 100;
            widget.isAlignVerticalCenter = false;
            widget.updateAlignment();
        }
    }

    onAddFinished() {
        const ad_data: StaticImageAdInterface = {
            width:340,
            height:250,
            bottom: 0,
            type:1,
            success:(code: NativeSupportStatueCode) => {
                console.log("静态图加载成功",code);
                this.update_view_widget(code);
            },
            fail:(code: NativeSupportStatueCode) => {
                console.log("静态图加载失败",code);
                this.update_view_widget(code);
            }
        }
        Ad.show_bottom_static_ad(ad_data);
    }

    onDisable() {
        super.onDisable();
        Ad.close_image_ad_view();
    }

    get_gift() {
        this.menu_data = GameLocalData.get_instance().get_data<MenuData>(MenuData);
        let menu_ad_data = this.menu_data.get_menu_data_by_id(this.menu_config.id);
        if (menu_ad_data) {
            BI.video_bi({ name: "解锁菜品" })
            if (menu_ad_data.menuAdTime + 1 == this.menu_config.ad_number) {
                this.menu_data.change_menu_data(this.menu_config.id, MenuType.unlock, menu_ad_data.menuAdTime + 1);
                const ui_param_interface: UIParamInterface = {
                    ui_config_path: UIConfig.Toast,
                    ui_config_name: "Toast",
                    param: {
                        text: `恭喜解锁${this.menu_config.chinese_name}`
                    }
                }
                UIManager.show_ui(ui_param_interface);
            } else {
                this.menu_data.change_menu_data(this.menu_config.id, menu_ad_data.menuType, menu_ad_data.menuAdTime + 1);
                if (this.show_lock_toast) {
                    const ui_param_interface: UIParamInterface = {
                        ui_config_path: UIConfig.Toast,
                        ui_config_name: "Toast",
                        param: {
                            text: `去菜谱里彻底解锁${this.menu_config.chinese_name}吧`
                        }
                    }
                    UIManager.show_ui(ui_param_interface);
                }
            }
            this.on_close_call();
        }
    }

}
