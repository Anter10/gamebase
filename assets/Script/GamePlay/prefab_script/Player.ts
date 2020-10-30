import Loader from "../../Common/Loader";
import EventManager from "../../EventManager/EventManager";
import { PeopleIdentityType, PeopleType } from "../GamePlayEnum";
import { LordCardInterface, LordPeopleInterface } from "../GamePlayInterface";
import LinkGameBase from "../LinkGameBase";

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

    public player_interface: LordPeopleInterface = null;
    
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
        })
    }

    // 给玩家发牌
    deal_cards(cards: Array<LordCardInterface>){
        this.player_interface.cards = cards;
        if(this.car_number_label){
           this.car_number_label.string = `${this.player_interface.cards.length}`;
        }
        if(this.player_interface.peopel_type == PeopleType.real){
           EventManager.get_instance().emit(LinkGameBase.game_play_event_config.flush_player_show_cards, cards);
        }
    }

    // onLoad () {}

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
    }


    // update (dt) {}
}
