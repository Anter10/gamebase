import Loader from "../Common/Loader";
import BaseScene from "./BaseScene";

 
const {ccclass, property} = cc._decorator;

@ccclass
class GameScene extends BaseScene {

    onLoad () {
        super.onLoad();
        this.game_play_init();
    }

    start () {
        super.start();

    }

    game_play_init(){
        Loader.load_prefab(`GamePlay/GamePlay`, (prefab: cc.Prefab) => {
            const game_play_node = cc.instantiate(prefab);
            game_play_node.parent = this.node;
        })
    }

    // update (dt) {}
}


export default GameScene;