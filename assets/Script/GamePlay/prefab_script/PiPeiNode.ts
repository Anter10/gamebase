import EventManager from "../../EventManager/EventManager";
import LinkGameBase from "../LinkGameBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PiPeiNode extends cc.Component {
    public playing_animation: boolean = false;

    show(){
        this.playing_animation = true;
        this.node.active = true;
        const animation = this.node.getComponent(cc.Animation)
        animation.stop();
        animation.play("pipei");
        animation.on("finished", () =>{
            if(this.playing_animation){
               EventManager.get_instance().emit(LinkGameBase.game_play_event_config.carding);
            }
            this.playing_animation = false;
        })
    }
}
