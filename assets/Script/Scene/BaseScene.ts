
const {ccclass, property} = cc._decorator;

@ccclass
class BaseScene extends cc.Component {

    public loading_scene_time: number = new Date().getTime();;


    onLoad () {

    }

    start () {
        this.loading_scene_time = new Date().getTime() - this.loading_scene_time;
        console.log(`start 进入的场景名称${this.node.name}  加载时间 ${this.loading_scene_time}  毫秒`);
    }

    // update (dt) {}
}


export default BaseScene;