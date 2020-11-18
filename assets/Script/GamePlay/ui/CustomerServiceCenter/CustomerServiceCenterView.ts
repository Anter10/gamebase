import BaseUI from "../../../Common/BaseUI";
import TouchButton from "../../../Common/TouchButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CustomerServiceCenterView extends BaseUI {

    @property(cc.Node)
    liuyanfankui: cc.Node = null;

    @property(cc.Node)
    bangzhuzhongxin: cc.Node = null;

    @property(cc.Node)
    zaxianzixun: cc.Node = null;

    @property(cc.Node)
    close_button: cc.Node = null;

    onLoad() {
        super.onLoad();
        this.close_button.addComponent(TouchButton).register_touch(() => {
            this.on_close_call();
        })

        //点击在线咨询
        const zaxianzixun: TouchButton = this.zaxianzixun.addComponent(TouchButton);
        zaxianzixun.register_touch(this.click_zaxianzixun.bind(this));

        //点击帮助中心
        const bangzhuzhongxin: TouchButton = this.bangzhuzhongxin.addComponent(TouchButton);
        bangzhuzhongxin.register_touch(this.click_bangzhuzhongxin.bind(this));
        //点击留言反馈
        const liuyanfankui: TouchButton = this.liuyanfankui.addComponent(TouchButton);
        liuyanfankui.register_touch(this.click_liuyanfankui.bind(this));
    }

    click_zaxianzixun() {

    }

    click_liuyanfankui() {

    }

    click_bangzhuzhongxin() {

    }

}
