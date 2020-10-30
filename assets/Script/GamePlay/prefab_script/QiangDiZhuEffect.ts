
/**@description 抢地主的特效效果 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class QiangDiZhuEffect extends cc.Component {

    public target_pos: cc.Vec3 = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    start_fly(){
        console.log("开始飞行",this.target_pos);
        cc.tween(this.node).to(1.5, {
        position: this.target_pos,
        }).start();
    }

    show(target_pos: cc.Vec3){
        this.target_pos = target_pos;
        this.node.position.x = 0;
        this.node.position.y = 0;
        const animation = this.node.getComponent(cc.Animation);
        animation.stop("qiangdizhu");
        animation.play("qiangdizhu");
    }

    // update (dt) {}
}
