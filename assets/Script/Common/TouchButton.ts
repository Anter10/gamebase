import { AudioConfig } from "../GameDataConfig/ConfigInterface";
import GameDataConfig from "../GameDataConfig/GameDataConfig";
import CocosAudio from "./Audio";
import { TouchButtonEffectType } from "./CommonEnum";
import { TouchButtonInterface } from "./CommonInterface";

 
const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchButton extends cc.Component {
    private touch_button_interface: TouchButtonInterface = null;
    private touch_effect_type: TouchButtonEffectType = TouchButtonEffectType.scale;

    
    onLoad () {
        this.node.on("touchstart",()=>{
            if(this.touch_effect_type == TouchButtonEffectType.scale){
                const action: cc.Action = cc.scaleTo(0.1, 1.1);
                action.setTag(100002);
                this.node.runAction(action);
            }
        });

        this.node.on("touchend", ()=> {
            if(this.touch_button_interface.touch_end_call_back){
                this.touch_button_interface.touch_end_call_back();
                const audio_config: AudioConfig = GameDataConfig.get_config_by_id("AudioConfig", this.touch_button_interface.music_id || 2);
                const audio: CocosAudio = new CocosAudio();
                audio.play(audio_config);
            }
            if(this.touch_effect_type == TouchButtonEffectType.scale){
               const action: cc.Action = cc.scaleTo(0.1, 1);
               action.setTag(100002);
               this.node.runAction(action);
            }
        }, this);

        this.node.on("touchcancel", ()=>{
            if(this.touch_effect_type == TouchButtonEffectType.scale){
               const action: cc.Action = cc.scaleTo(0.1, 1);
               action.setTag(100002);
               this.node.runAction(action);
            }
        }, this);
    }

    onDisable(){
        this.node.stopActionByTag(100002);
    }

    add_touch_event(touch_button_interface: TouchButtonInterface){
        this.touch_button_interface = touch_button_interface;
    }

    register_touch(touch_end_call_back: Function,music_id?: number, type?: number, touch_effect_type?: TouchButtonEffectType){
        const touch_button_interface: TouchButtonInterface = {
            touch_end_call_back: touch_end_call_back,
            music_id:music_id,
            type: type,
        }

        this.add_touch_event(touch_button_interface);

        if(touch_effect_type){
            this.touch_effect_type = touch_effect_type;
        }
    }

    start () {

    }

    // update (dt) {}
}
