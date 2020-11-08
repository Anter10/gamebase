import BaseUI from "../../../Common/BaseUI";
import TouchButton from "../../../Common/TouchButton";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewPlayerAwardView extends BaseUI {

    @property(cc.Node)
    close_button: cc.Node = null;


    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        super.onLoad();
        this.close_button.addComponent(TouchButton).register_touch(()=>{
           this.on_close_call();
       })
    }

    start () {

    }

    // update (dt) {}
}
