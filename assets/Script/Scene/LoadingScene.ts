 
import { Boot, gamebase } from "../Boot";
import EventManager from "../EventManager/EventManager";
import BaseScene from "./BaseScene";




const {ccclass, property} = cc._decorator;
@ccclass
class LoadingScene extends BaseScene {
  
    onLoad () {
        super.onLoad();
        Boot.init();
    }

    start () {
        super.start();
    }

    // update (dt) {}
}


export default LoadingScene;