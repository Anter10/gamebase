import UIParamInterface from "../UI/UIManager/UIParamInterface";
import BaseUI from "./BaseUI";
import { ToastInterface } from "./CommonInterface";

 
const {ccclass, property} = cc._decorator;

@ccclass
class Toast extends BaseUI {
    public toast_interface: ToastInterface = null; 
 
    @property(cc.Label)
    text_label: cc.Label = null;

    @property(cc.Sprite)
    bottom_sprite: cc.Sprite = null;

    start () {
       
    }

    show(ui_param_interface: UIParamInterface){
        super.show(ui_param_interface)
        this.set_toast_interface(<ToastInterface>ui_param_interface.param);
        this.flush_view();
    }

    set_toast_interface(toast_interface: ToastInterface){
        this.toast_interface = toast_interface;
    }

    flush_view(){
         this.flush_text_color();
         this.flush_bottom_sprite_frame();
    }

    flush_bottom_sprite_frame(){
        this.toast_interface.bottom_sprite_frame && (this.bottom_sprite.spriteFrame = this.toast_interface.bottom_sprite_frame);
    }

    flush_text_color(){
        this.toast_interface.text_color && (this.text_label.node.color = cc.Color.BLACK.fromHEX(this.toast_interface.text_color));
    }

   
}


export default Toast;