import { gamebase } from "../Boot";
import EventManager from "../EventManager/EventManager";
import { CellUi } from "./CellUi";
import { DealCardInterface } from "./GamePlayInterface";
import { GamePalyServer } from "./GamePlayServer";
import LinkGameBase from "./LinkGameBase";
import LordGameLogic from "./LordGameLogic";
import Player from "./prefab_script/Player";

const {ccclass, property} = cc._decorator;

@ccclass
class GamePlay extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    public game_logic: LordGameLogic = null;

    @property(cc.Node)
    player_play_card_container: cc.Node = null;

    @property(cc.Node)
    SecondPeople: cc.Node = null;
    @property(cc.Node)
    ThirdPeople: cc.Node = null;
    @property(cc.Node)
    PlayerPeople: cc.Node = null;
    @property(cc.Prefab)
    card_prefab: cc.Prefab = null;
    
    public _players: Array<Player> = [];
    public deal_cards: DealCardInterface = null;
    public card_pool:cc.NodePool = new cc.NodePool();

  
    
    
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
        this.game_logic.game_play = this;
        CellUi.cell_parent_node = this.node;
        EventManager.get_instance().emit(LinkGameBase.game_play_event_config.start_waiting);
        this.init_players();
    }

    remove(card: cc.Node){
        this.card_pool.put(card);
    }

    create_card(){
        if(this.card_pool.size() > 0){
           return this.card_pool.get();
        }else{
           return cc.instantiate(this.card_prefab);
        }
    }

    /**@destroy 初始化玩家 */
    init_players(){
        const player = this.PlayerPeople.getComponent(Player);
        const second_player = this.SecondPeople.getComponent(Player);
        const third_player = this.ThirdPeople.getComponent(Player);

        this._players[0] = player;
        this._players[1] = second_player;
        this._players[2] = third_player;

        this.SecondPeople.active = false;
        this.ThirdPeople.active = false;
    }

    /**@description 刷新玩家的信息 */
    flush_players(){
        this.SecondPeople.active = true;
        this.ThirdPeople.active = true;
        const peoples_base_message = GamePalyServer.get_peoples_base_message();
        for(let player_index = 0; player_index < this._players.length; player_index ++){
            this._players[player_index].set_player_interface(peoples_base_message[player_index]);
        }
    }

    start_waiting(){
        CellUi.show_start_button();
    }

    waiting(){

    }

    mating(){
        CellUi.show_match_effect();
    }

    carding(){
        this.flush_players();
        console.log("发牌");
        const deal_cards = this.game_logic.deal_cards();
        this.deal_cards = deal_cards;
        for(let pos = 0; pos < this._players.length; pos ++){
            const cards_data = this.deal_cards.every_pos_cards[pos];
            this._players[pos].deal_cards(cards_data);
        }
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