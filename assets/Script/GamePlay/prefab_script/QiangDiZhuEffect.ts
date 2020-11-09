
/**@description 抢地主的特效效果 */

import EventManager from "../../EventManager/EventManager";
import LinkGameBase from "../LinkGameBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class QiangDiZhuEffect extends cc.Component {

    public target_pos: cc.Vec3 = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    kaishi(){
        console.log("开始飞行",this.target_pos);
        const add_time = (this.target_pos.len()) / (300 / 0.2);
        cc.tween(this.node).to(add_time, {
          position: this.target_pos,
        })
        .call(()=>{
           EventManager.get_instance().emit(LinkGameBase.game_play_event_config.convert_card);
        })
        .start();
    }

    show(target_pos: cc.Vec3){
        this.target_pos = target_pos;
        this.node.position.x = 0;
        this.node.position.y = 0;

        const animation = this.node.getComponent(cc.Animation);
        const statue = animation.getAnimationState("qiangdizhu");
        // const speed = (200 / statue.duration) * (this.target_pos.len() * 200);
        // statue.speed = speed;
        animation.stop("qiangdizhu");
        animation.play("qiangdizhu");
    }

    // update (dt) {}
}
