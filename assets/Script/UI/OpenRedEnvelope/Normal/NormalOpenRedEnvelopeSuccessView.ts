import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import TouchButton from "../../../Common/TouchButton";
import { NormalOpenRedEnvelopeSuccessViewInterface } from "../OpenRedEnvelopeInterface";

const {ccclass, property} = cc._decorator;

@ccclass
class NormalOpenRedEnvelopeSuccessView extends BaseUI {

    @property(cc.Sprite)
    rank_view_background: cc.Sprite = null;
    @property(cc.Sprite)
    red_envelope_title_icon: cc.Sprite = null;
    @property(cc.Sprite)
    red_envelope_light_icon: cc.Sprite = null;
    @property(cc.Sprite)
    red_envelope_icon: cc.Sprite = null;
    @property(cc.Sprite)
    red_envelope_msg_bottom: cc.Sprite = null;
    @property(cc.Sprite)
    get_money_from_envelope_button: cc.Sprite = null;

    @property(cc.Label)
    red_envelope_monvey_label: cc.Label = null;
    @property(cc.Label)
    red_envelope_msg_label: cc.Label = null;
    @property(cc.Label)
    get_money_from_envelope_button_text_label: cc.Label = null;

    public normal_open_envelope_success_view_interface: NormalOpenRedEnvelopeSuccessViewInterface = null;

    onAddFinished(){
        super.onAddFinished();
        if(this.normal_open_envelope_success_view_interface && this.normal_open_envelope_success_view_interface.money){
            this.red_envelope_monvey_label.string = `${this.normal_open_envelope_success_view_interface.money} 元`;
        }
    }


    onLoad () {
        super.onLoad();
        const touch_button: TouchButton = this.get_money_from_envelope_button.node.addComponent(TouchButton);
        touch_button.register_touch(()=>{
            this.on_close_call();
        });
    }

    start () {
        super.start();
    }

    show(ui_param_interface: UIParamInterface){
        super.show(ui_param_interface);
    }

    // update (dt) {}
}


export default NormalOpenRedEnvelopeSuccessView;