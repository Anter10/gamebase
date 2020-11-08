// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import TouchButton from "../../Common/TouchButton";

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
            
        })
    }

    start () {

    }

    // update (dt) {}
}
