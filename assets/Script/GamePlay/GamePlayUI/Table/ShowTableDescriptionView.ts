import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import { TableConfig } from "../../../GameDataConfig/ConfigInterface";
import { Ad } from "../../../Sdk/Ad";
import { NativeSupportStatueCode } from "../../../Sdk/SdkEnum";
import { StaticImageAdInterface } from "../../../Sdk/SdkInterface";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShowTableDescriptionView extends BaseUI {

    @property(cc.Label)
    title_label: cc.Label = null;

    @property(cc.Label)
    level_number_title: cc.Label = null;

    @property(cc.Label)
    description_label: cc.Label = null;

    @property(cc.Label)
    growth_label: cc.Label = null;

    @property(cc.Sprite)
    table_sprite: cc.Sprite = null;

    @property(cc.Node)
    close_button: cc.Node = null;


    @property(cc.Node)
    bg: cc.Node = null;

    private table_config: TableConfig = null;

    show(ui_param_interface: UIParamInterface) {
        super.show(ui_param_interface)
        this.set_modal_interface(<TableConfig>ui_param_interface.param);
    }

    set_modal_interface(table_config: TableConfig) {
        this.table_config = table_config;
        this.set_table_description();
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


    onDisable() {
        super.onDisable();
        Ad.close_image_ad_view();
    }

    flush_view() {
        //关闭界面
        const close_button: TouchButton = this.close_button.addComponent(TouchButton);
        close_button.register_touch(this.on_close_call.bind(this));
    }

    set_table_description() {
        this.title_label.string = this.table_config.chinese_name;
        this.level_number_title.string = this.table_config.id + "级桌";
        this.description_label.string = this.table_config.description;
        this.growth_label.string = "金币总收益增加" + this.table_config.growth + "%";
        Loader.load_texture(`GamePlay/GamePlayUI/Main/texture/${this.table_config.name}`, (texture2d: cc.Texture2D) => {
            this.table_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
        })
    }

}
