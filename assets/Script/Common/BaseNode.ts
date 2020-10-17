import { TouchButtonEffectType } from "./CommonEnum";
import Loader from "./Loader";
import TouchButton from "./TouchButton";
import Utils from "./Utils";

const {ccclass, property} = cc._decorator;

@ccclass
class BaseNode extends cc.Component {
    onLoad () {

     }

    start () {

    }

    flush_ui_image(user_privacy_interface, ui_root_path: string){
        const [all_need_update_sprite_name, all_need_load_sprite_frame_path] = Utils.get_ui_interface_sprite_path_and_sprite_name(user_privacy_interface, ui_root_path);
        console.log(all_need_load_sprite_frame_path);
        if(all_need_load_sprite_frame_path.length > 0){
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
       
    }

   update (dt) {
       
   }

   register_touch_button(touch_call_back,music_id?: number,touch_effect_type?: TouchButtonEffectType){
       const touch_button: TouchButton = this.node.addComponent(TouchButton);
       touch_button.register_touch(touch_call_back,music_id, touch_effect_type);
   }

}


export default BaseNode;