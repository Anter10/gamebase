import { AudioConfig } from "../GameDataConfig/ConfigInterface";
import GameDataConfig from "../GameDataConfig/GameDataConfig";
import CocosAudio from "./Audio";
import { TouchButtonInterface } from "./CommonInterface";

 
const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchButton extends cc.Component {
    private touch_button_interface: TouchButtonInterface = null;

    onLoad () {
        this.node.on("touchstart",()=>{
            const action: cc.Action = cc.scaleTo(0.1, 1.1);
            action.setTag(100002);
            this.node.runAction(action);
        });

        this.node.on("touchend", ()=> {
            if(this.touch_button_interface.touch_end_call_back){
                this.touch_button_interface.touch_end_call_back();
                const audio_config: AudioConfig = GameDataConfig.get_config_by_id("AudioConfig", this.touch_button_interface.music_id || 2);
                const audio: CocosAudio = new CocosAudio();
                audio.play(audio_config);
            }
            const action: cc.Action = cc.scaleTo(0.1, 1);
            action.setTag(100002);
            this.node.runAction(action);
        }, this);

        this.node.on("touchcancel", ()=>{
            const action: cc.Action = cc.scaleTo(0.1, 1);
            action.setTag(100002);
            this.node.runAction(action);
        }, this);
    }

    onDisable(){
        this.node.stopActionByTag(100002);
    }

    add_touch_event(touch_button_interface: TouchButtonInterface){
        this.touch_button_interface = touch_button_interface;
    }

    register_touch(touch_end_call_back: Function,music_id?: number, type?: number){
        const touch_button_interface: TouchButtonInterface = {
            touch_end_call_back: touch_end_call_back,
            music_id:music_id,
            type: type,
        }

        this.add_touch_event(touch_button_interface);
    }

    start () {

    }

    // update (dt) {}
}
