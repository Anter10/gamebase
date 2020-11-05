import Loader from "../Common/Loader";
import GameConfig from "../GameConfig";
import GameLocalData from "../GameLocalData/GameLocalData";
import BI from "../Sdk/BI";
import { BiInterface } from "../Sdk/SdkInterface";
import BaseScene from "./BaseScene";

 
const {ccclass, property} = cc._decorator;

@ccclass
class GameScene extends BaseScene {

    onLoad () {
        super.onLoad();
        this.game_play_init();
        this.bi();
    }

    bi(){
        const bi_data : BiInterface = {
            eventId: `${GameConfig.timeId}`,
            eventName: "into_game_scene",
            eventParam: "into gamescene start",
            ts:`${(new Date()).getTime()}`,
        } 
        BI.bi(bi_data);
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

    update (dt: number) {
        GameLocalData.get_instance().tick_store_data(dt);
    }
}


export default GameScene;