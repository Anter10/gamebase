import BaseUI from "../../Common/BaseUI";

const {ccclass, property} = cc._decorator;

@ccclass
class ClickOnView extends BaseUI {

    @property(cc.Sprite)
    click_background_bottom: cc.Sprite = null;

    @property(cc.Sprite)
    click_on_item_scroll_view_bottom:cc.Sprite = null;
    
    onLoad () {
        super.onLoad();
    }

    start () {
        super.start();

    }

    // update (dt) {}
}


export default ClickOnView;