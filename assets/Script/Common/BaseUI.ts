import EventConfig from "../EventManager/EventConfig";
import EventManager from "../EventManager/EventManager";
import UIConfig from "../UI/UIManager/UIConfig";
import UIManager from "../UI/UIManager/UIManager";
import { NagivatorActionInterface, NagivatorInterface, UIParamInterface } from "./CommonInterface";
 
import Controller from "./Controller";
import Loader from "./Loader";
import Nagivator from "./Nagivator";
import Utils from "./Utils";

 
const {ccclass, property} = cc._decorator;

@ccclass
abstract class BaseUI extends cc.Component {
    public block_input_events: cc.BlockInputEvents = null;
    public ui_param_interface: UIParamInterface = null;
    public controller: Controller = null;
    public widget: cc.Widget = null;
    public c_time: number = new Date().getTime();
    public nagivator: Nagivator = null;

    onLoad () {
        this.widget = this.node.getComponent(cc.Widget);
        this.block_input_events = this.addComponent(cc.BlockInputEvents);
    }

    /**@description 注册Android 返回键监听关闭当前界面的方法 */
    register_back_call_event(){
        EventManager.get_instance().listen(EventConfig.webBackPage,this, this.android_back_callback.bind(this));
    }

    android_back_callback(){
        this.on_close_call();
    }

    onDisable(){
        EventManager.get_instance().cancel_listen(EventConfig.webBackPage,this, this.android_back_callback.bind(this));
    }

    show(ui_param_interface: UIParamInterface){
        this.ui_param_interface = ui_param_interface;
        this.node.active = true;
    }

    hide(){
        this.node.active = false;
    }

    on_close_call(close_view_name?: string){
        console.log("关闭界面",this.node.name);
        UIManager.close_ui(close_view_name || this.node.name);
    }

    start () {
        console.log(`界面 ${this.node.name} 花费的时间 ${new Date().getTime() - this.c_time} 毫秒`);
    }

    flush_ui_image(user_privacy_interface, ui_root_path: string){
        const [all_need_update_sprite_name, all_need_load_sprite_frame_path] = Utils.get_ui_interface_sprite_path_and_sprite_name(user_privacy_interface, ui_root_path);
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

    onAddFinished(){
        console.log("界面添加完成");
    }


    /**@description 添加导航 */
    add_nagivator(actions: Array<NagivatorActionInterface>, nagivator_interface: NagivatorInterface ){
        Loader.load_prefab(UIConfig.Nagivator, (prefab: cc.Prefab) => {
            const nagivator = cc.instantiate(prefab);
            nagivator.parent = this.node;
            nagivator.zIndex = cc.macro.MAX_ZINDEX;
            const nagivator_script: Nagivator = nagivator.getComponent(Nagivator);
            nagivator_script.init_actions(actions);
            nagivator_script.set_nagivator_interface(nagivator_interface);
        })
    }
}


export default BaseUI;