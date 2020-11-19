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
import LinkGameBase from "../LinkGameBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TopBottom extends cc.Component {

    @property(cc.Node)
    main_button_fenxiang: cc.Node = null;
    @property(cc.Node)
    main_button_shezhi: cc.Node = null;
    @property(cc.Node)
    main_in_bottom_card: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.main_button_fenxiang.addComponent(TouchButton).register_touch(()=>{

        })

        this.main_button_shezhi.addComponent(TouchButton).register_touch(()=>{
            const ui_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.TurnTableView,
                ui_config_name: "TurnTableView",
                param:{}
            }
        
            UIManager.show_ui(ui_param_interface);
        })
    }

    start () {

    }

    // update (dt) {}
}
