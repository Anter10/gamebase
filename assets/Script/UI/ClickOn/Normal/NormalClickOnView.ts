import BaseUI from "../../../Common/BaseUI";
import ClickOnController from "../ClickOnController";

const {ccclass, property} = cc._decorator;

@ccclass
class ClickOnView extends BaseUI {
    @property(cc.Sprite)
    click_background_bottom: cc.Sprite = null;
    @property(cc.Sprite)
    click_on_item_scroll_view_bottom:cc.Sprite = null;

    @property(cc.Prefab)
    click_on_item_prefab: cc.Prefab = null;

    @property(cc.Prefab)
    normal_click_on_free_tip: cc.Prefab = null;

    @property(cc.Node)
    container: cc.Node = null;

    onLoad () {
        super.onLoad();
        console.log(this.controller)
        this.init_view();
    }

    init_view(){
        for(let i = 0; i < 10;  i++ ){
            const item = cc.instantiate(this.click_on_item_prefab);
            item.parent = this.container;
        }
    }

    start () {
        super.start();
    }

    // update (dt) {}
}


export default ClickOnView;