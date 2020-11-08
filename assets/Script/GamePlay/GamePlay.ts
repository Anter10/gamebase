import { gamebase } from "../Boot";
import EventManager from "../EventManager/EventManager";
import { CardRule } from "./CardRule";
import { CellUi } from "./CellUi";
import { LordGameState, PeopleIdentityType } from "./GamePlayEnum";
import { CallLordDataInterface, DealCardInterface } from "./GamePlayInterface";
import { GamePalyServer } from "./GamePlayServer";
import LinkGameBase from "./LinkGameBase";
import LordGameLogic from "./LordGameLogic";
import { LordUtils } from "./LordUtils";
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
    @property(cc.Node)
    TopBottom: cc.Node = null;

    @property(cc.Prefab)
    card_prefab: cc.Prefab = null;

    @property(cc.Node)
    main_difenbangzi: cc.Node = null;
    
    public _players: Array<Player> = [];
    public deal_cards: DealCardInterface = null;
    public card_pool:cc.NodePool = new cc.NodePool();
    public call_lord_interface: CallLordDataInterface = null;
    
    
    onLoad () {
        this.register_ui();
        gamebase.game_play = this;
        gamebase.lord_util = LordUtils;
        gamebase.card_rule = new CardRule();
        
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.start_waiting, this, this.start_waiting.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.waiting, this, this.waiting.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.mating, this, this.mating.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.carding, this, this.carding.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.lording, this, this.lording.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.reveal_the_ins_and_outs, this, this.reveal_the_ins_and_outs.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.gameing, this, this.gameing.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.end, this, this.end.bind(this));
        
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.call_lord, this, this.call_lord.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.no_call_lord, this, this.no_call_lord.bind(this));
        
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.show_player_play_buttons, this, this.show_player_play_buttons_callback.bind(this));

        
        this.game_logic = new LordGameLogic();
        this.game_logic.game_play = this;
        CellUi.cell_parent_node = this.node;
        EventManager.get_instance().emit(LinkGameBase.game_play_event_config.start_waiting);
        this.init_players();
    }

    register_ui(){
        LinkGameBase.register_ui_path("SettingView", "GamePlay/prefab/ui/setting/SettingView");
        LinkGameBase.register_ui_path("EveryDayGift", "GamePlay/prefab/ui/EveryDayGift/EveryDayGift");
        LinkGameBase.register_ui_path("FragementView", "GamePlay/prefab/ui/Fragement/FragementView");
        LinkGameBase.register_ui_path("NewPlayerAwardView", "GamePlay/prefab/ui/NewPlayerAwardView/NewPlayerAwardView");
    }
    

    remove_card(card: cc.Node){
        card.scale = 1;
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
        player.next_player = second_player;
        second_player.next_player = third_player;
        third_player.next_player = player;

        player.upper_player = third_player;
        second_player.upper_player = player;
        third_player.upper_player = second_player;

        this.SecondPeople.active = false;
        this.ThirdPeople.active = false;
    }

    /**@description 获得指定位置的人的信息 */
    player_by_position(position: number): Player{   
        return this._players[position];
    }

    player(){
        return this._players[0];
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

        this.scheduleOnce(() => {
            this.unscheduleAllCallbacks();
            CellUi.show_lord_bottom_card_node(this.deal_cards.in_bottom_cards);
            this.game_logic.deal_call_lord_logic();
        }, 1.5);
    }


    lording(){

    }

    reveal_the_ins_and_outs(){

    }

    show_player_play_buttons_callback(){
        CellUi.show_game_logic_node();
    }

    gameing(){
       console.log("可以开始游戏了");
       this._players[this.call_lord_interface.pos].add_cards(this.deal_cards.in_bottom_cards);
       this.game_logic.gaming();
     
       console.log("当前出牌的位置 = ",this.game_logic.cur_send_card_pos);
    }

    end(){

    }

    start () {

    }

    // 叫地主的调用
    show_call_lord(){
        CellUi.show_call_lord_button_node();
    }

    // 叫地主 玩家和机器人都会触发叫地主的逻辑
    call_lord(event: any, call_lord_interface: CallLordDataInterface){
        
        this.call_lord_interface = call_lord_interface;
        this.game_logic.set_cur_send_card_pos(call_lord_interface.pos);
        const cur_node = this._players[call_lord_interface.pos].node;
        const target_pos = cur_node.position;
        let target_node_pos = cur_node.parent.convertToNodeSpaceAR(target_pos);
        const world_pos = this.node.convertToWorldSpaceAR(target_node_pos);
        let offset = cc.v3(0,0,0);
         // 这里可以确定机器人为地主 玩家为农民
         for(const player of this._players){
            if(player.player_interface.position == call_lord_interface.pos){
                player.set_identified(PeopleIdentityType.lord);
            }else{
                player.set_identified(PeopleIdentityType.farmer);
            }
        }
        if(call_lord_interface.pos == 0){
            offset = cc.v3(-80, 110, 0);
        }else if(call_lord_interface.pos == 1){
            offset = cc.v3(50, 170, 0);
        }else if(call_lord_interface.pos == 2){
            offset = cc.v3(-30, 170, 0);
        }

        CellUi.show_call_lord_effect_node(world_pos.add(offset));      
        console.log("叫地主的数据 = ", call_lord_interface);
    }

    // 不叫地主 只有玩家自己会触发
    no_call_lord(event: any){
        this.game_logic.deal_no_call_lord();
    }

    update (dt: number) {

    }

    /**@description 显示要不起的提示信息 */
    show_no_send_card_message(position: number){
        
    }

    current_lord_player(): Player{
        for(let player of this._players){
            if(player.player_interface.people_identity_type == PeopleIdentityType.lord){
                return player;
            }
        }
    }
}


export default GamePlay;