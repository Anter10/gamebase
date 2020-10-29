/**@description 游戏的逻辑 */

import Random from "../Common/Random";
import EventManager from "../EventManager/EventManager";
import GamePlay from "./GamePlay";
import { LordCardType, LordDealCardsType, LordGameState } from "./GamePlayEnum";
import { LordCardInterface } from "./GamePlayInterface";
import LinkGameBase from "./LinkGameBase";
import { LordUtils } from "./LordUtils";
class LordGameLogic{
    private _game_state: LordGameState = LordGameState.start_waiting;

    public game_play: GamePlay = null;

    constructor(){
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.start_waiting, this, this.start_waiting.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.waiting, this, this.waiting.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.mating, this, this.mating.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.carding, this, this.carding.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.lording, this, this.lording.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.reveal_the_ins_and_outs, this, this.reveal_the_ins_and_outs.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.gameing, this, this.gameing.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.end, this, this.end.bind(this));
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
     

    public set game_state(game_state: LordGameState){
        this._game_state = game_state;
    }

    public get game_state(): LordGameState{
        return this._game_state;
    }

    /**@description 发牌逻辑 */
    deal_cards(){
        let deal_cards_type:LordDealCardsType = LordDealCardsType.none;
        const deal_cards = LordUtils.deal_cards(deal_cards_type);
        
        return deal_cards;
    }

}


export default LordGameLogic;