import BaseUI from "../../Common/BaseUI";
import { NagivatorInterface } from "../../Common/CommonInterface";
import ClickOnController from "./ClickOnController";

const {ccclass, property} = cc._decorator;

@ccclass
class ClickOnView extends BaseUI {
    public controller: ClickOnController = null;

    onLoad () {
        super.onLoad();
        console.log(this.controller)
        this.controller.init_view();
        const nagivator_interface: NagivatorInterface = {
            title: "打卡赚取红星",
            /**@description 返回按钮的回调*/
            back_callback: ()=>{
                this.on_close_call();
            }
        };

        this.add_nagivator([],nagivator_interface);
    }

    start () {
        super.start();
        
    }

    // update (dt) {}
}


export default ClickOnView;