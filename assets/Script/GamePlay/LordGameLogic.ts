/**@description 游戏的逻辑 */

import { UIParamInterface } from "../Common/CommonInterface";
import Random from "../Common/Random";
import EventManager from "../EventManager/EventManager";
import { LordGameConfig } from "../GameDataConfig/ConfigInterface";
import GameDataConfig from "../GameDataConfig/GameDataConfig";
import UIConfig from "../UI/UIManager/UIConfig";
import UIManager from "../UI/UIManager/UIManager";
import GamePlay from "./GamePlay";
import { LordCardType, LordDealCardsType, LordGameState, PeopleIdentityType, ShowCardType } from "./GamePlayEnum";
import { CallLordDataInterface, LordCardInterface, LordSendCardInterface, NoSendCardInterface, SendCardInterface } from "./GamePlayInterface";
import LinkGameBase from "./LinkGameBase";
import { CardsValue, CardValueType, LordUtils } from "./LordUtils";
import Player from "./prefab_script/Player";
class LordGameLogic {
    private _game_state: LordGameState = LordGameState.start_waiting;

    public game_play: GamePlay = null;
    /**@description 当前的游戏状态 */
    public cur_game_statue: LordGameState = null;
    /**@description 当前轮到某个位置的人出牌了 */
    public cur_send_card_pos: number = 0;
    /**@description 当前出牌的剩余时间 */
    public cur_game_pass_time: number = 0;
    /**@description 提示的下标 */
    public prompt_index: number = 0;
    /**@description 当前提示牌型的数据 */
    public prompt_card_array: Array<Array<LordCardInterface>> = [];
    /**@description 1: 最近一次出国的牌的信息 2: 没有(null)的话说明牌当前是自主出牌(1: 玩家自选出牌 2: AI自动出牌) */
    public current_send_card_data: LordSendCardInterface = null;
    /**@description 当前出牌的人 */
    private _cur_player: Player = null;


    constructor() {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.send_card, this, this.send_card_callback.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.no_send_card, this, this.no_send_card_callback.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.player_send_card, this, this.deal_cards_callback.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.prompt_card, this, this.prompt_callback.bind(this));
    }

    /**@description 处理玩家选择的牌的信息 */
    deal_cards_callback() {
        console.log("玩家选择的牌");
        if (this.game_play.player().player_interface.position == 0) {
            const cards = this.game_play.player_card_board.get_player_cur_selected_cards();
            const card_value: CardValueType = this._cur_player.ai.card_rule.card_value(cards);
            if (card_value.name == CardsValue.none.name) {
                console.log("当前选择的牌没有找到对应的牌型");
                const ui_param_interface: UIParamInterface = {
                    ui_config_path: UIConfig.Toast,
                    ui_config_name: "Toast",
                    param: {
                        text: "当前选中的牌型错误"
                    }
                }
                UIManager.show_ui(ui_param_interface);
            } else {
                if (this.current_send_card_data) {
                    console.log("上一个玩家出的牌", this.current_send_card_data);
                    console.log("当前选中的牌型是 ", cards);
                    const can_send_card = this._cur_player.ai.card_rule.compare_card(this.current_send_card_data.send_card.cards, cards);
                    console.log("当前玩家是否可以出牌 = ", can_send_card);
                    if (can_send_card) {
                        const play_card = this._cur_player.ai.card_rule.type_judge(cards);
                        console.log("当前玩家出牌的数据 = ", play_card);
                        this.play_card(play_card, ShowCardType.SendCard);
                        EventManager.get_instance().emit(LinkGameBase.game_play_event_config.hide_play_logic_button);
                        EventManager.get_instance().emit(LinkGameBase.game_play_event_config.delete_card, cards);
                    } else {
                        const ui_param_interface: UIParamInterface = {
                            ui_config_path: UIConfig.Toast,
                            ui_config_name: "Toast",
                            param: {
                                text: "打不过"
                            }
                        }
                        UIManager.show_ui(ui_param_interface);
                    }
                } else {
                    // 主动出牌逻辑
                    const play_card: SendCardInterface = this._cur_player.ai.card_rule.type_judge(cards);
                    this.play_card(play_card, ShowCardType.SendCard);
                    console.log("当前选择的牌型", play_card);
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.hide_play_logic_button);
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.delete_card, cards);
                }
            }
        }
    }


    public set game_state(game_state: LordGameState) {
        this._game_state = game_state;
    }

    public get game_state(): LordGameState {
        return this._game_state;
    }

    /**@description 发牌逻辑 */
    deal_cards() {
        let deal_cards_type: LordDealCardsType = LordDealCardsType.none;
        const deal_cards = LordUtils.deal_cards(deal_cards_type);

        return deal_cards;
    }

    /**@description 判断当前是谁先叫地主 */
    deal_call_lord_logic() {
        console.log("处理叫地主的逻辑 ");
        // 基本逻辑1 比较玩家手里面的牌点数大 谁的大 谁是地主
        const all_pos_card_point_info: { [pos: number]: number } = {};
        let call_lord_interface: CallLordDataInterface = null;

        for (const player of this.game_play._players) {
            all_pos_card_point_info[player.player_interface.position] = player.card_total_point();
        }

        // 玩家的牌点数小与机器人的牌的点数 则让机器人叫地主
        if (all_pos_card_point_info[0] < all_pos_card_point_info[1] || all_pos_card_point_info[0] < all_pos_card_point_info[2]) {
            let pos = all_pos_card_point_info[1] < all_pos_card_point_info[2] ? 2 : 1;
            const random_number = Random.range(0, 1);
            const base_score: Array<number> = JSON.parse(GameDataConfig.get_config_by_id<LordGameConfig>("LordGameConfig", 7).value);
            // 位置2叫地主
            call_lord_interface = {
                pos: pos,
                score: random_number < 0.5 ? base_score[0] : base_score[1],
            }
            // 这里可以确定机器人为地主 玩家为农民
            for (const player of this.game_play._players) {
                if (player.player_interface.position == pos) {
                    player.set_identified(PeopleIdentityType.lord);
                } else {
                    player.set_identified(PeopleIdentityType.farmer);
                }
            }

            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.call_lord, call_lord_interface);
        } else {
            // 玩家叫地主
            this.game_play.show_call_lord();
        }

        console.log("当前玩家的牌点数和的信息 = ", all_pos_card_point_info);
    }

    /**@description 处理玩家没有选择叫地主的逻辑 */
    deal_no_call_lord() {
        const all_pos_card_point_info: { [pos: number]: number } = {};
        let call_lord_interface: CallLordDataInterface = null;

        for (const player of this.game_play._players) {
            all_pos_card_point_info[player.player_interface.position] = player.card_total_point();
        }

        // 判断机器人谁更适合做地主
        let pos = all_pos_card_point_info[1] < all_pos_card_point_info[2] ? 2 : 1;
        const base_score: Array<number> = JSON.parse(GameDataConfig.get_config_by_id<LordGameConfig>("LordGameConfig", 7).value);
        const random_number = Random.range(0, 1);

        // 位置2叫地主
        call_lord_interface = {
            pos: pos,
            score: random_number < 0.5 ? base_score[0] : base_score[1],
        }


        // 这里可以确定机器人为地主 玩家为农民
        for (const player of this.game_play._players) {
            if (player.player_interface.position == pos) {
                player.set_identified(PeopleIdentityType.lord);
            } else {
                player.set_identified(PeopleIdentityType.farmer);
            }
        }

        EventManager.get_instance().emit(LinkGameBase.game_play_event_config.call_lord, call_lord_interface);
    }

    /**@description 设置当前出牌的位置 */
    set_cur_send_card_pos(pos: number) {
        this.cur_send_card_pos = pos;
    }

    /**@description 重置提示下标 */
    reset_prompt_index() {
        this.prompt_index = 0;
        this.prompt_card_array = this.game_play.player().ai.prompt();
    }

    /**@description 提示回调 */
    prompt_callback() {
        if (this.prompt_index > this.prompt_card_array.length - 1) {
            this.prompt_index = 0;
        }

        const prompt_cards = this.prompt_card_array[this.prompt_index];
        console.log("当前提示的", prompt_cards);
        this.game_play.player_card_board.select_cards(prompt_cards);

        this.prompt_index++;
    }


    /**@description 出牌触发的事件 */
    send_card_callback(event: any, send_card_data: LordSendCardInterface) {
        this.current_send_card_data = send_card_data;
        console.log('当前出牌的事件信息  = ', event);
        console.log('当前出牌的信息  = ', send_card_data);
        // 判断当前的出牌是否是AI出牌 如果是AI出牌的话 如果下一家是AI的话
        this._cur_player = this.game_play.player_by_position(send_card_data.lord_people_interface.position).next_player;
        if (this.current_send_card_data.lord_people_interface.position == 2) {
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.show_player_play_buttons);
        } else {
            this.delay_follow_card();
        }
    }

    delay_follow_card() {
        const timer = setTimeout(() => {
            this.follow_card();
            clearTimeout(timer);
        }, 1500);
    }

    /**@description 要不起 / 不出 的事件 */
    no_send_card_callback(event: any, no_send_card_interface: NoSendCardInterface) {
        this.game_play.show_no_send_card_message(no_send_card_interface.position);
        this.game_play.player_card_board.reset_cards_position();
        const player: Player = this.game_play.player_by_position(no_send_card_interface.position);
        if (no_send_card_interface.position == 2) {
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.show_player_play_buttons);
        } else {
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.hide_play_logic_button);
            const player = this.game_play.player_by_position(no_send_card_interface.position);
            this._cur_player = player.next_player;
            // 轮到下一家出牌
            if (player.next_player.player_interface.position == this.current_send_card_data.lord_people_interface.position) {
                console.log("所有的人都要不起 轮到自己出牌了");
                if (this._cur_player.player_interface.position == 0) {
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.show_player_play_buttons);
                } else {
                    const cur_lord_player = this.game_play.current_lord_player();
                    const lord_card_number = cur_lord_player.cards_number;
                    const play_card: SendCardInterface = this._cur_player.ai.play(lord_card_number);
                    this.play_card(play_card, ShowCardType.SendCard);
                }
            } else {
                this.delay_follow_card();
            }
        }
    }


    /**
     * 
     * 只有以下这几个情况会调用到该函数
     * 1: 游戏开始的时候 非玩家自己的AI为地主的时候 会调用到该逻辑
     * 2: 当两个玩家要不起的时候 轮到AI自己出牌的时候会掉用该逻辑
     * @description 出牌的逻辑 
     * */
    play_card(play_card: SendCardInterface, card_type: ShowCardType) {
        this._cur_player.show_cards(play_card.cards);
        this._cur_player.delete_cards(play_card.cards);
        const send_data: LordSendCardInterface = {
            send_card: play_card,
            lord_people_interface: this._cur_player.player_interface
        }
        this.send_card_callback({ msg: "主动出牌", type: card_type }, send_data);
    }

    /**@description 当前玩家的下一家跟牌的逻辑 */
    follow_card() {
        const follow_card = this._cur_player.ai.follow(this.current_send_card_data.send_card, 0, 10);
        console.log("当前跟牌的数据 = ", follow_card);
        if (this._cur_player.player_interface.position != 0) {
            if (follow_card && follow_card.card_kind != CardsValue.none.name) {
                this.play_card(follow_card, ShowCardType.FollowCard);
            } else {
                // 当前玩家[AI]要不起牌
                this._cur_player.show_call_or_no_call_lord_message("main_buyao");
                // 说明机器人过牌 或者 打不起
                if (this._cur_player.player_interface.position == 2) {
                    // 提示玩家自己出牌
                    console.log("玩家出牌")
                    this._cur_player = this._cur_player.next_player;
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.show_player_play_buttons);
                } else {
                    // 继续跟牌
                    console.log("机器人跟牌")
                    this._cur_player = this._cur_player.next_player;
                    if (this._cur_player.player_interface.position == this.current_send_card_data.lord_people_interface.position) {
                        console.log("所有的人都要不起 轮到自己出牌了");
                        if (this._cur_player.player_interface.position == 0) {
                            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.show_player_play_buttons);
                        } else {
                            const cur_lord_player = this.game_play.current_lord_player();
                            const lord_card_number = cur_lord_player.cards_number;
                            const play_card: SendCardInterface = this._cur_player.ai.play(lord_card_number);
                            this.play_card(play_card, ShowCardType.SendCard);
                        }
                    } else {
                        this.delay_follow_card();
                    }
                }
            }
        } else {
            console.log("自己不走跟牌逻辑");
            this._cur_player = this._cur_player.next_player;
            // 玩家的下一个机器人提示下一家走
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.show_player_play_buttons);
        }
    }


    /**@description 游戏开始的时候调用 */
    gaming() {
        console.log("抢完地主后开始游戏");
        this.cur_game_statue = LordGameState.gameing;
        const cur_lord_player = this.game_play.current_lord_player();
        this._cur_player = cur_lord_player;

        if (cur_lord_player.player_interface.position == 0) {
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.show_player_play_buttons);
        } else {
            // 如果是机器人的话 机器人开始出牌
            const cur_lord_player = this.game_play.current_lord_player();
            const lord_card_number = cur_lord_player.cards_number;
            const play_card: SendCardInterface = this._cur_player.ai.play(lord_card_number);
            this.play_card(play_card, ShowCardType.SendCard);
        }
    }



    /**@description 轮到机器人出牌规则 */
    machine_people_out_cards() {
        // 找到
    }

    update(dt: number) {
        if (this.cur_game_statue == LordGameState.gameing) {
            this.cur_game_pass_time = this.cur_game_pass_time + dt;
        }
    }

}


export default LordGameLogic;