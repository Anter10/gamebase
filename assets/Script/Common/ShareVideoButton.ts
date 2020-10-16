import Native from "../Sdk/Native";
import Share from "../Sdk/Share";
import BaseNode from "./BaseNode";
import TouchButton from "./TouchButton";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShareVideoButton extends BaseNode {

    onLoad () {
        super.onLoad();
        const button: TouchButton = this.node.addComponent(TouchButton);
        button.register_touch(this.share_callback.bind(this));
    }

    share_callback(){
        Share.share_game();
    }

    start () {
        super.start();
    }
    
}
