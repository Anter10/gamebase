 
import { Boot, gamebase } from "../Boot";
import Loader from "../Common/Loader";
import TouchButton from "../Common/TouchButton";
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

    @property(cc.Node)
    start_game_button_node: cc.Node = null;

    @property(cc.Node)
    protocol_node: cc.Node = null;

    @property(cc.Node)
    privacy_node: cc.Node = null;

    @property(cc.Node)
    protocol_and_privacy_node: cc.Node = null;

    
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

    special_set_sprite(){

    }

    /**@description 刷新视图界面 */
    flush_view(){
        // 加载loading界面上的图片
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
            }catch(error: any){
                console.log("打卡信息报错", error);
            }
        });

        // 刷新开始游戏按钮上面的文本显示
        if(this.loading_scene_interface.start_game_button_text){
           this.start_game_button_label.string = this.loading_scene_interface.start_game_button_text;
        }

        // 给开始游戏按钮添加点击事件
        const touch_button: TouchButton = this.start_game_button_node.addComponent(TouchButton);
        
        touch_button.register_touch(this.start_game_callback.bind(this));

    }

    /**@description 点击开始游戏的按钮的调用逻辑 */
    start_game_callback(){
        console.log("点击开始游戏的按钮");

        this.start_game_success_callback();
    }

    /**@description 开始游戏成功后的回调 */
    start_game_success_callback(){
        this.start_game_button_image.node.active = false;
        this.loading_progress.node.active = true;

        // 加载主场景
        cc.director.preloadScene("GameScene",(completedCount: number,totalCount: number,item: any) => {
            const progress = completedCount / totalCount;
            this.loading_progress.progress = progress;
        }, (error: Error)=>{
            if(!error){
               setTimeout(()=>{
                 cc.director.loadScene("GameScene");
               }, 300);
            }else{
                console.log("进入游戏主场景失败了");
            }
        });
    }


    start () {
        super.start();
    }
    

    /**@description 用户协议的调用 */
    user_protocol_callback(){

    }

    /**@description 用户隐私政策的调用 */
    user_privacy_callback(){

    }

    update(){
        this.loading_progress.totalLength = this.loading_progress_bottom_image.node.width;
    }
}


export default LoadingScene;