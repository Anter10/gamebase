/**@description 游戏的逻辑 */

import Random from "../Common/Random";
import EventManager from "../EventManager/EventManager";
import { LordGameConfig } from "../GameDataConfig/ConfigInterface";
import GameDataConfig from "../GameDataConfig/GameDataConfig";
import GamePlay from "./GamePlay";
import { LordCardType, LordDealCardsType, LordGameState, PeopleIdentityType } from "./GamePlayEnum";
import { CallLordDataInterface, LordCardInterface, LordSendCardInterface, NoSendCardInterface } from "./GamePlayInterface";
import LinkGameBase from "./LinkGameBase";
import { LordUtils } from "./LordUtils";
import Player from "./prefab_script/Player";
class LordGameLogic{
    private _game_state: LordGameState = LordGameState.start_waiting;

    public game_play: GamePlay = null;
    /**@description 当前的游戏状态 */
    public cur_game_statue: LordGameState = null;
    /**@description 当前轮到某个位置的人出牌了 */
    public cur_send_card_pos: number = 0;
    /**@description 当前出牌的剩余时间 */
    public cur_game_pass_time: number = 0;
    
    public current_send_card_data: LordSendCardInterface = null;


    constructor(){
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.send_card, this, this.send_card_callback.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.no_send_card, this, this.no_send_card_callback.bind(this));
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

    /**@description 判断当前是谁先叫地主 */
    deal_call_lord_logic(){
        console.log("处理叫地主的逻辑 ");
        // 基本逻辑1 比较玩家手里面的牌点数大 谁的大 谁是地主
        const all_pos_card_point_info: {[pos: number]: number} = {};
        let call_lord_interface: CallLordDataInterface = null;

        for(const player of this.game_play._players){
            all_pos_card_point_info[player.player_interface.position] = player.card_total_point();
        }
        
        // 玩家的牌点数小与机器人的牌的点数 则让机器人叫地主
        if(all_pos_card_point_info[0] <  all_pos_card_point_info[1] || all_pos_card_point_info[0] < all_pos_card_point_info[2]){
            let pos = all_pos_card_point_info[1] < all_pos_card_point_info[2] ? 2 : 1;
            const random_number = Random.range(0, 1);
            const base_score: Array<number> = JSON.parse( GameDataConfig.get_config_by_id<LordGameConfig>("LordGameConfig", 7).value);
            // 位置2叫地主
            call_lord_interface = {
                pos: pos,
                score: random_number < 0.5 ? base_score[0] : base_score[1],
            }
            // 这里可以确定机器人为地主 玩家为农民
            for(const player of this.game_play._players){
                if(player.player_interface.position == pos){
                    player.set_identified(PeopleIdentityType.lord);
                }else{
                    player.set_identified(PeopleIdentityType.farmer);
                }
            }

            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.call_lord, call_lord_interface);
        }else{
            // 玩家叫地主
            this.game_play.show_call_lord();
        }

        console.log("当前玩家的牌点数和的信息 = ", all_pos_card_point_info);
    }

    /**@description 处理玩家没有选择叫地主的逻辑 */
    deal_no_call_lord(){
        const all_pos_card_point_info: {[pos: number]: number} = {};
        let call_lord_interface: CallLordDataInterface = null;

        for(const player of this.game_play._players){
            all_pos_card_point_info[player.player_interface.position] = player.card_total_point();
        }

        // 判断机器人谁更适合做地主
        let pos = all_pos_card_point_info[1] < all_pos_card_point_info[2] ? 2 : 1;
        const base_score: Array<number> = JSON.parse( GameDataConfig.get_config_by_id<LordGameConfig>("LordGameConfig", 7).value);
        const random_number = Random.range(0, 1);

        // 位置2叫地主
        call_lord_interface = {
            pos: pos,
            score: random_number < 0.5 ? base_score[0] : base_score[1],
        }

        
        // 这里可以确定机器人为地主 玩家为农民
        for(const player of this.game_play._players){
            if(player.player_interface.position == pos){
                player.set_identified(PeopleIdentityType.lord);
            }else{
                player.set_identified(PeopleIdentityType.farmer);
            }
        }

        EventManager.get_instance().emit(LinkGameBase.game_play_event_config.call_lord, call_lord_interface);
    }

    /**@description 设置当前出牌的位置 */
    set_cur_send_card_pos(pos: number){
        this.cur_send_card_pos = pos;
    }

    /**@description 出牌触发的事件 */
    send_card_callback(event: any,send_card_data: LordSendCardInterface){
        this.current_send_card_data = send_card_data;
        // 判断当前的出牌是否是AI出牌 如果是AI出牌的话 如果下一家是AI的话
        if(this.current_send_card_data.lord_people_interface.position == 2){
           EventManager.get_instance().emit(LinkGameBase.game_play_event_config.show_player_play_buttons);
        }else{
           const player = this.game_play.player_by_position(send_card_data.lord_people_interface.position);
           player.follow_card();
        }
    }

    /**@description 要不起 / 不出 的事件 */
    no_send_card_callback(event: any, no_send_card_interface: NoSendCardInterface){
        this.game_play.show_no_send_card_message(no_send_card_interface.position);
        const player: Player = this.game_play.player_by_position(no_send_card_interface.position);
        if(no_send_card_interface.position == 2){
           EventManager.get_instance().emit(LinkGameBase.game_play_event_config.show_player_play_buttons);
        }else{
           // 得到当前位置的下一个位置的player 出牌
           const player = this.game_play.player_by_position(no_send_card_interface.position);
           if(player.next_player.player_interface.position == this.current_send_card_data.lord_people_interface.position){
              player.next_player.play_card(0);
           }else{
              player.next_player.follow_card();
           }
        }
    }


    /**@description 游戏开始的时候调用 */
    gaming(){
       this.cur_game_statue = LordGameState.gameing;
       const cur_lord_player = this.game_play.current_lord_player();
       if(cur_lord_player.player_interface.position == 0){
          EventManager.get_instance().emit(LinkGameBase.game_play_event_config.show_player_play_buttons);
       }
    }

    /**@description 轮到机器人出牌规则 */
    machine_people_out_cards(){
        // 找到
    }

    update(dt: number){
        if(this.cur_game_statue == LordGameState.gameing){
           this.cur_game_pass_time = this.cur_game_pass_time + dt;
        }
    }   

}


export default LordGameLogic;