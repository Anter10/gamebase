import BaseUI from "./BaseUI";
import { ToastInterface, UIParamInterface } from "./CommonInterface";

 
const {ccclass, property} = cc._decorator;

@ccclass
class Toast extends BaseUI {
    public toast_interface: ToastInterface = null; 
 
    @property(cc.Label)
    text_label: cc.Label = null;

    @property(cc.Sprite)
    bottom_sprite: cc.Sprite = null;

    public show_timer: NodeJS.Timeout = null;

    start () {
    
    }

    show(ui_param_interface: UIParamInterface){
        super.show(ui_param_interface)
        this.set_toast_interface(<ToastInterface>ui_param_interface.param);
        this.flush_view();
        this.node.x = cc.winSize.width / 2;
        this.node.y = cc.winSize.height / 2;
 
        const hide_time = this.toast_interface.duration ? this.toast_interface.duration * 1000 : 2000;
        if(this.show_timer){
            clearTimeout(this.show_timer);
        }
        this.show_timer = setTimeout(()=>{
            clearTimeout(this.show_timer);
            this.on_close_call();
        },  hide_time);

    }

    set_toast_interface(toast_interface: ToastInterface){
        this.toast_interface = toast_interface;
    }

    flush_view(){
         this.flush_text_color();
         this.flush_bottom_sprite_frame();
         this.text_label.string = this.toast_interface.text ? this.toast_interface.text : "请填写提示信息";
    }

    flush_bottom_sprite_frame(){
        this.toast_interface.bottom_sprite_frame && (this.bottom_sprite.spriteFrame = this.toast_interface.bottom_sprite_frame);
    }

    flush_text_color(){
        this.toast_interface.text_color && (this.text_label.node.color = cc.Color.BLACK.fromHEX(this.toast_interface.text_color));
    }

   
}


export default Toast;