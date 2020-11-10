import BaseUI from "../../Common/BaseUI";
import TouchButton from "../../Common/TouchButton";
import GameConfig from "../../GameConfig";


const { ccclass, property } = cc._decorator;

@ccclass
class NormalClickOnStatementView extends BaseUI {

    @property(cc.WebView)
    web_view: cc.WebView = null;

    @property(cc.Sprite)
    close_button_image: cc.Sprite;

    @property(cc.Sprite)
    modal_bottom_image: cc.Sprite;

    @property(cc.Node)
    close_button_node: cc.Node;

    onLoad() {
        super.onLoad();
        const touch_button: TouchButton = this.close_button_node.addComponent(TouchButton);
        touch_button.register_touch(this.on_close_call.bind(this));

    }

    start() {
        super.start();
        this.web_view.url = GameConfig.click_on_statement_url;
    }

}


export default NormalClickOnStatementView;