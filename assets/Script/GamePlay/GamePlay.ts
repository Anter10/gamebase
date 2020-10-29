import { gamebase } from "../Boot";
import EventManager from "../EventManager/EventManager";
import LinkGameBase from "./LinkGameBase";
import LordGameLogic from "./LordGameLogic";

const {ccclass, property} = cc._decorator;

@ccclass
class GamePlay extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    public game_logic: LordGameLogic = null;
    
    onLoad () {
        console.log(`进入游戏的game_play了`)
        gamebase.game_play = this;
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.start_waiting, this, this.start_waiting.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.waiting, this, this.waiting.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.mating, this, this.mating.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.carding, this, this.carding.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.lording, this, this.lording.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.reveal_the_ins_and_outs, this, this.reveal_the_ins_and_outs.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.gameing, this, this.gameing.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.end, this, this.end.bind(this));
        this.game_logic = new LordGameLogic();

        
    }

    start_waiting(){

    }
    waiting(){

    }
    mating(){

    }
    carding(){

    }
    lording(){

    }
    reveal_the_ins_and_outs(){

    }
    gameing(){

    }
    end(){

    }

    start () {

    }

    // update (dt) {}
}


export default GamePlay;