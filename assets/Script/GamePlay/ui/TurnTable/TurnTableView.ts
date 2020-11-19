import BaseUI from "../../../Common/BaseUI";
import TouchButton from "../../../Common/TouchButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TurnTableView extends BaseUI {

    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Node)
    start_button: cc.Node = null;

    @property(cc.Node)
    table: cc.Node = null;

    private value: number = 0;
    private circle_all: number = 0;
    private get_gift_array: Array<number> = [0, 0.5, 1, 2, 3, 4, 50, 100];

    onLoad() {
        this.close_button.addComponent(TouchButton).register_touch(() => {
            this.on_close_call();
        })

        //点击开始按钮
        const start_button: TouchButton = this.start_button.addComponent(TouchButton);
        start_button.register_touch(this.click_start_button.bind(this));
    }

    click_start_button() {
        this.value = 250;
        
    }

    update(dt) {
        if (this.value != 0) {
            this.table.angle = this.table.angle - dt * this.value;
        }
    }

}
