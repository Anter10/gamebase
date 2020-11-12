import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import { DecorationConfig } from "../../../GameDataConfig/ConfigInterface";
import { Ad } from "../../../Sdk/Ad";
import { NativeSupportStatueCode } from "../../../Sdk/SdkEnum";
import { StaticImageAdInterface } from "../../../Sdk/SdkInterface";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShowDecorationDescriptionView extends BaseUI {

    @property(cc.Label)
    title_label: cc.Label = null;

    @property(cc.Label)
    level_number_title: cc.Label = null;

    @property(cc.Label)
    description_label: cc.Label = null;

    @property(cc.Label)
    growth_label: cc.Label = null;

    @property(cc.Sprite)
    decoration_sprite: cc.Sprite = null;

    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Node)
    bg: cc.Node = null;

    private decoration_config: DecorationConfig = null;
    private level_number: number = 0;

    show(ui_param_interface: UIParamInterface) {
        super.show(ui_param_interface)
        this.set_modal_interface(ui_param_interface.param);
    }

    set_modal_interface(decoration_param: any) {
        this.decoration_config = decoration_param.decoration_config;
        this.level_number = decoration_param.level_number;
        this.set_decoration_description();
    }

    onLoad() {
        this.flush_view();
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
    
    flush_view() {
        //关闭界面
        const close_button: TouchButton = this.close_button.addComponent(TouchButton);
        close_button.register_touch(this.on_close_call.bind(this));
    }

    set_decoration_description() {
        this.title_label.string = this.decoration_config.chinese_name;
        this.level_number_title.string = this.level_number + "级装饰";
        this.description_label.string = this.decoration_config.description;
        this.growth_label.string = "此提供" + this.decoration_config.growth[this.level_number - 1] + "%的金币收益";
        Loader.load_texture(`GamePlay/GamePlayUI/ExtensionTable/decoration_texture/${this.decoration_config.name}${this.level_number}`, (texture2d: cc.Texture2D) => {
            this.decoration_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
        })
    }

}
