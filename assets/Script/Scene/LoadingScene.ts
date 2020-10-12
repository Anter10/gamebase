 
import { Boot, gamebase } from "../Boot";
import Loader from "../Common/Loader";
import BaseScene from "./BaseScene";
import { LoadingSceneInterface } from "./SceneInterface";




const {ccclass, property} = cc._decorator;
@ccclass
class LoadingScene extends BaseScene {
    @property(cc.Sprite)
    game_logo_iamge: cc.Sprite = null;

    @property(cc.Sprite)
    game_background_image:cc.Sprite = null;

    @property(cc.Sprite)
    game_share_image: cc.Sprite = null;

    @property(cc.Sprite)
    loading_progress_bottom_image: cc.Sprite = null;    

    @property(cc.Sprite)
    loading_progress_upper_image: cc.Sprite = null;

    @property(cc.Sprite)
    start_game_button_image: cc.Sprite = null;
    
    @property(cc.Label)
    start_game_button_label: cc.Label = null;

    @property(cc.ProgressBar)
    loading_progress:cc.ProgressBar = null;
    
    public loading_scene_interface: LoadingSceneInterface = {
        game_logo_iamge : "",
        game_background_image:"game_background_image",
        game_share_image:"",
        loading_progress_bottom_image:"loading_progress_bottom_image",
        loading_progress_upper_image:"loading_progress_upper_image",
        start_game_button_image:"start_game_button_image",
        start_game_button_text:"开始游戏",
    };
    
    onLoad () {
        super.onLoad();
        Boot.init();
        this.flush_view();
    }

    flush_view(){
        const all_need_load_sprite_frame_path: Array<string> = [];
        const all_sprite_name = Object.keys(this.loading_scene_interface);
        const all_need_update_sprite_name: Array<string> = [];
        for(const image_sprite_name of all_sprite_name){
            const image_name: string = this.loading_scene_interface[image_sprite_name];
            if(this.loading_scene_interface[image_name]){
                const path = `./Scene/LoadingScene/${image_name}`;
                all_need_load_sprite_frame_path.push(path);
                all_need_update_sprite_name.push(image_sprite_name);
            }
        }

        Loader.recursion_load_sprite_frame(all_need_load_sprite_frame_path, (sprite_frame: cc.SpriteFrame, loaded_index: number)=>{
            const sprite: cc.Sprite = this[all_need_update_sprite_name[loaded_index]];
            try{
                if(sprite){
                   sprite.spriteFrame = sprite_frame;
                }
            }catch(error){

            }
        });

        if(this.loading_scene_interface.start_game_button_text){
            this.start_game_button_label.string = this.loading_scene_interface.start_game_button_text;
        }

        console.log("所有加载的",all_need_load_sprite_frame_path);
    }

    start () {
        super.start();
    }

    // update (dt) {}
}


export default LoadingScene;