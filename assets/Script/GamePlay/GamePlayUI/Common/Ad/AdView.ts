import BaseUI from "../../../../Common/BaseUI";
import { UIParamInterface } from "../../../../Common/CommonInterface";
import TouchButton from "../../../../Common/TouchButton";
import { Ad } from "../../../../Sdk/Ad";
import { NativeSupportStatueCode } from "../../../../Sdk/SdkEnum";
import { StaticImageAdInterface } from "../../../../Sdk/SdkInterface";

const { ccclass, property } = cc._decorator;

/**@description 广告的显示接口 */
export interface AdInterface {
    text: string,
    success_call?: Function,
    fail_call?: Function,
}

@ccclass
export default class AdView extends BaseUI {

    @property(cc.Label)
    ad_label: cc.Label = null;

    @property(cc.Node)
    get_button: cc.Node = null;

    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Node)
    bg: cc.Node = null;
    
    ad_interface: AdInterface = null;

    onEnable() {
        this.close_button.active = false;
        this.scheduleOnce(() => {
            this.close_button.active = true;
        }, 3);
    }

    onLoad() {
        //领取按钮
        const get_button: TouchButton = this.get_button.addComponent(TouchButton);
        get_button.register_touch(this.click_get_button.bind(this));

        //关闭按钮
        const close_button: TouchButton = this.close_button.addComponent(TouchButton);
        close_button.register_touch(this.click_close_button.bind(this));
    }

    show(ui_param_interface: UIParamInterface) {
        super.show(ui_param_interface);
        this.set_ad_interface(<AdInterface>ui_param_interface.param);
        this.set_ad_view();
    }

    set_ad_interface(toast_interface: AdInterface) {
        this.ad_interface = toast_interface;
    }

    set_ad_view() {
        this.ad_label.string = this.ad_interface.text;
    }

    click_get_button() {
        this.on_close_call();
        this.ad_interface.success_call && this.ad_interface.success_call();
    }

    click_close_button() {
        this.on_close_call();
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
}
