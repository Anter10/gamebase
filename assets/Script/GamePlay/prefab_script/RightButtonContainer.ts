// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { UIParamInterface } from "../../Common/CommonInterface";
import TouchButton from "../../Common/TouchButton";
import UIConfig from "../../UI/UIManager/UIConfig";
import UIManager from "../../UI/UIManager/UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RightButtonContainer extends cc.Component {

    @property(cc.Node)
    main_button_jiasutixian: cc.Node = null;
    @property(cc.Node)
    main_button_meirilibao: cc.Node = null;
    @property(cc.Node)
    main_button_mianfeihongbao: cc.Node = null;
    @property(cc.Node)
    main_button_suipianduijiang: cc.Node = null;
    @property(cc.Node)
    main_button_zaiwanjiju: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.main_button_jiasutixian.addComponent(TouchButton).register_touch(() => {

        });

        this.main_button_meirilibao.addComponent(TouchButton).register_touch(() => {
            const ui_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.EveryDayGift,
                ui_config_name: "EveryDayGift",
                param:{}
            }
        
            UIManager.show_ui(ui_param_interface);
        });

        this.main_button_mianfeihongbao.addComponent(TouchButton).register_touch(() => {
            
        });

        this.main_button_suipianduijiang.addComponent(TouchButton).register_touch(() => {
            const ui_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.FragementView,
                ui_config_name: "FragementView",
                param:{}
            }
        
            UIManager.show_ui(ui_param_interface);
        });

        this.main_button_zaiwanjiju.addComponent(TouchButton).register_touch(() => {
            
        });
    }

    start () {

    }

    // update (dt) {}
}
