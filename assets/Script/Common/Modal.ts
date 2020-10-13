
import UIParamInterface from "../UI/UIManager/UIParamInterface";
import BaseUI from "./BaseUI";
import { ModalInterface, ModalUiInterface } from "./CommonInterface";
import TouchButton from "./TouchButton";
import Utils from "./Utils";

const {ccclass, property} = cc._decorator;

@ccclass
class Modal extends BaseUI {
    @property(cc.Sprite)
    modal_bottom_image: cc.Sprite = null;
    @property(cc.Sprite)
    modal_top_tip_image: cc.Sprite = null;
    @property(cc.Sprite)
    modal_title_bottom_image: cc.Sprite = null;
    @property(cc.Sprite)
    close_button_image: cc.Sprite = null;
    @property(cc.Sprite)
    modal_cancel_button_image: cc.Sprite = null;
    @property(cc.Sprite)
    modal_ok_button_image: cc.Sprite = null;

    @property(cc.Label)
    title_label: cc.Label = null;
    @property(cc.Label)
    cancel_label: cc.Label = null;
    @property(cc.Label)
    ok_label: cc.Label = null;
    @property(cc.Label)
    message_label: cc.Label = null;

    @property(cc.Node)
    cancel_button_node: cc.Node = null;
    @property(cc.Node)
    ok_button_node: cc.Node = null;
    @property(cc.Node)
    close_button_node: cc.Node = null;

    public modal_interface: ModalInterface = null;

    public modal_ui_interface: ModalUiInterface = {
        modal_bottom_image: "",
        modal_top_tip_image: "",
        modal_title_bottom_image: "",
        close_button_image: "",
        modal_cancel_button_image: "",
        modal_ok_button_image: "",
    }

    onLoad(){
        super.onLoad();
    }

    start () {
        super.start();
        this.flush_ui_image(this.modal_ui_interface, "./UI/Common/texture/")
    }

    show(ui_param_interface: UIParamInterface){
        super.show(ui_param_interface)
        this.set_modal_interface(<ModalInterface>ui_param_interface.param);
    }

    set_modal_interface(modal_interface : ModalInterface){
        this.modal_interface = modal_interface;
        this.flush_view();
    }

    flush_view(){
        /**@description 刷新界面 */
        if(this.modal_interface.confirm_text){
           this.ok_label.string = this.modal_interface.confirm_text;
        }

        if(this.modal_interface.cancel_text){
           this.cancel_label.string = this.modal_interface.cancel_text;
        }

        const ok_button: TouchButton = this.ok_button_node.addComponent(TouchButton);
        ok_button.register_touch(this.ok_callback.bind(this));

        const cancel_button: TouchButton = this.cancel_button_node.addComponent(TouchButton);
        cancel_button.register_touch(this.cancel_callback.bind(this));

        const close_button: TouchButton = this.close_button_node.addComponent(TouchButton);
        close_button.register_touch(this.on_close_call.bind(this));

        if(this.modal_interface.message){
           this.message_label.string = this.modal_interface.message;
        }
    }

    ok_callback(){
        if(this.modal_interface.ok_callback){
           this.modal_interface.ok_callback();
        }

        this.on_close_call();
    }

    cancel_callback(){
        if(this.modal_interface.cancel_callback){
            this.modal_interface.cancel_callback();
        }
        this.on_close_call();
    }
}


export default  Modal;