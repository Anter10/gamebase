import UIManager from "../UI/UIManager/UIManager";
import UIParamInterface from "../UI/UIManager/UIParamInterface";
 
import Controller from "./Controller";
import Loader from "./Loader";
import Utils from "./Utils";

 
const {ccclass, property} = cc._decorator;

@ccclass
abstract class BaseUI extends cc.Component {
    public block_input_events: cc.BlockInputEvents = null;
    public ui_param_interface: UIParamInterface = null;
    public controller: Controller = null;
    public widget: cc.Widget = null;

    onLoad () {
        this.widget = this.node.getComponent(cc.Widget);
        this.block_input_events = this.addComponent(cc.BlockInputEvents);
    }

    show(ui_param_interface: UIParamInterface){
        this.ui_param_interface = ui_param_interface;
        this.node.active = true;
    }

    hide(){
        this.node.active = false;
    }

    on_close_call(){
        console.log("关闭界面",this.node.name);
        UIManager.close_ui(this.node.name);
    }

    start () {
       
    }

    flush_ui_image(user_privacy_interface){
        const [all_need_update_sprite_name, all_need_load_sprite_frame_path] = Utils.get_ui_interface_sprite_path_and_sprite_name(user_privacy_interface, "./UI/Common/texture/");
        Loader.recursion_load_sprite_frame(all_need_load_sprite_frame_path, (sprite_frame: cc.SpriteFrame, loaded_index: number)=>{
            const sprite: cc.Sprite = this[all_need_update_sprite_name[loaded_index]];
            try{
                if(sprite){
                   sprite.spriteFrame = sprite_frame;
                }
            }catch(error: any){
                console.log("打卡信息报错", error);
            }
        });
    }

    // update (dt) {}
}


export default BaseUI;