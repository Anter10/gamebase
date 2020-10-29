import EventManager from "../../EventManager/EventManager";
import { LordCardInterface } from "../GamePlayInterface";
import LinkGameBase from "../LinkGameBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerCardBoard extends cc.Component {

    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.flush_player_show_cards, this, this.flush_cards.bind(this));
    }

    flush_cards(event: any, cards: Array<LordCardInterface>){
        console.log("玩家当前的牌信息 = ",cards);

    }

    start () {

    }

    // update (dt) {}
}
