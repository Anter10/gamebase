import Loader from "../Common/Loader";
import UIManager from "../UI/UIManager/UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
class BaseScene extends cc.Component {

    public loading_scene_time: number = new Date().getTime();;


    onLoad () {
        UIManager.clear_ui();
    }

    start () {
        this.loading_scene_time = new Date().getTime() - this.loading_scene_time;
        console.log(`start 进入的场景名称${this.node.name}  加载时间 ${this.loading_scene_time}  毫秒`);
    }

    flush_ui_image(all_need_update_sprite_name, all_need_load_sprite_frame_path){
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


export default BaseScene;