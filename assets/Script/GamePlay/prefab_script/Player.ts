import { gamebase } from "../../Boot";
import Loader from "../../Common/Loader";
import EventManager from "../../EventManager/EventManager";
import { LordCardType, PeopleIdentityType, PeopleType } from "../GamePlayEnum";
import { LordCardInterface, LordPeopleInterface, LordSendCardInterface, SendCardInterface } from "../GamePlayInterface";
import LinkGameBase from "../LinkGameBase";
import { card_list, LordUtils } from "../LordUtils";
import { Ai } from "./Ai";
import LordCard from "./LordCard";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Label)
    where_name_label: cc.Label = null;
    @property(cc.Label)
    money_label: cc.Label = null;
    @property(cc.Label)
    player_name_label: cc.Label = null;
    @property(cc.Sprite)
    icon_sprite: cc.Sprite = null;
    @property(cc.Node)
    card_container: cc.Node = null;

    @property(cc.Label)
    car_number_label: cc.Label = null;
    @property(cc.Sprite)
    call_or_no_call_lord_mesage_sprite: cc.Sprite = null;

    public player_interface: LordPeopleInterface = null;
    private _next_player: Player = null;
    private _upper_player: Player = null;

    private _ai: Ai = null;
    public send_card: SendCardInterface = null;


    onLoad() {
        this._ai = new Ai();
        this._ai._ai_player = this;
    }

    get ai(){
        return this._ai;
    }

    set ai(_ai: Ai){
        this._ai = _ai;
    }


    set_player_interface(player_interface: LordPeopleInterface){
        this.player_interface = player_interface;

        if(this.where_name_label){
            this.where_name_label.string = player_interface.where_name;
        }

        if(this.money_label){
           this.money_label.string = `${player_interface.money}`;
        }

        if(this.player_name_label){
           this.player_name_label.string = `${player_interface.nick_name}`;
        }

        Loader.load_texture(`./GamePlay/prefab/main/player/${player_interface.avatar_url}`,(texture2d: cc.Texture2D) => {
            this.icon_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
        });
    }

    // 给玩家发牌
    deal_cards(cards: Array<LordCardInterface>){
        cards = this.test_cards();
        this.player_interface.cards = cards;

        if(this.car_number_label){
           this.car_number_label.string = `${this.player_interface.cards.length}`;
        }
        if(this.player_interface.peopel_type == PeopleType.real){
           EventManager.get_instance().emit(LinkGameBase.game_play_event_config.flush_player_show_cards, cards);
        }
        
        this.ai.analyse();
    }

    start () {

    }

    card_total_point(){
        let all_point = 0;

        for(let card of this.player_interface.cards){
            all_point = all_point + card.id;
        }

        return all_point;
    }

    set_identified(identified: PeopleIdentityType){
        this.player_interface.people_identity_type = identified;
        this.show_call_or_no_call_lord_message();
    }

    /**@description 出牌 */
    play_card(lord_card_number: number): SendCardInterface{
       const play_card: SendCardInterface = this.ai.play(lord_card_number);
       this.show_cards(play_card.cards);
       this.send_card = play_card;
       const send_data: LordSendCardInterface = {
             send_card: play_card,
             lord_people_interface:this.player_interface
       }
       
       EventManager.get_instance().emit(LinkGameBase.game_play_event_config.send_card, send_data);
       return play_card;
    }

    follow_card(){
        console.log("请下一家跟牌");
    }

    show_cards(cards: Array<LordCardInterface>){
        const container = this.player_interface.position == 0 ? gamebase.game_play.player_play_card_container : this.card_container;
        const chidren = container.children;
        for(const card of chidren){
            gamebase.game_play.remove_card(card);
        }

        let card_index = 0;
        for(const card_data of cards){
            const card2 = gamebase.game_play.create_card();
            card2.scale = 0.6;
            card2.getComponent(LordCard).flush_data(card_data);
            card2.parent = container;
            if(this.player_interface.position == 0){
               card2.x = (card_index * card2.width) + card2.width / 2 - container.width / 2;
            }else{
               card2.x = (card_index * card2.width) + card2.width / 2;
            }
            card_index ++;
        }
    }

    show_call_or_no_call_lord_message(){
        this.call_or_no_call_lord_mesage_sprite.node.active = false;
        let show_msg_image_path = "main_bujiao";
        if(this.player_interface.people_identity_type == PeopleIdentityType.lord){
            show_msg_image_path = "main_jiaodizhu";
        }

        Loader.load_texture(`./GamePlay/prefab/main/texture/ui/${show_msg_image_path}`,(texture: cc.Texture2D) => {
            this.call_or_no_call_lord_mesage_sprite.spriteFrame = new cc.SpriteFrame(texture);
            this.call_or_no_call_lord_mesage_sprite.node.active = true;
            this.scheduleOnce(() => {
                this.call_or_no_call_lord_mesage_sprite.node.active = false;
            }, 3);
        });
    }

    add_cards(cards: Array<LordCardInterface>){
        for(const card of cards){
            this.player_interface.cards.push(card);
        }

        this.player_interface.cards.sort(LordUtils.sort_cards);
        if(this.car_number_label){
            this.car_number_label.string = `${this.player_interface.cards.length}`;
        }
    }

    get is_lord(): boolean {
        return this.player_interface.people_identity_type == PeopleIdentityType.lord;
    }

    get next_player(){
        return this._next_player;
    }

    set next_player(_next_player: Player){
        this._next_player = _next_player;
    }

    get upper_player(){
        return this._upper_player;
    }

    set upper_player(_upper_player: Player){
        this._upper_player = _upper_player;
    }


    test_cards(){
        const cards: Array<LordCardInterface> = [];
        cards.push({id: 3, card_type: LordCardType.clubs});
        cards.push({id: 4, card_type: LordCardType.clubs});
        cards.push({id: 5, card_type: LordCardType.clubs});
        cards.push({id: 6, card_type: LordCardType.clubs});
        cards.push({id: 7, card_type: LordCardType.clubs});
        cards.push({id: 8, card_type: LordCardType.clubs});
        cards.push({id: 9, card_type: LordCardType.clubs});
        cards.push({id: 10, card_type: LordCardType.clubs});
        cards.push({id: 10, card_type: LordCardType.clubs});
        cards.push({id: 17, card_type: LordCardType.small_king});
        cards.push({id: 17, card_type: LordCardType.big_king});
        cards.push({id: 11, card_type: LordCardType.clubs});
        cards.push({id: 11, card_type: LordCardType.clubs});
        cards.push({id: 11, card_type: LordCardType.clubs});
        cards.push({id: 11, card_type: LordCardType.clubs});
        cards.push({id: 12, card_type: LordCardType.clubs});
        cards.push({id: 12, card_type: LordCardType.clubs});
        cards.push({id: 12, card_type: LordCardType.clubs});
        cards.push({id: 12, card_type: LordCardType.clubs});

        cards.sort(LordUtils.sort_cards);
        return cards;






    }

    // update (dt) {}

}