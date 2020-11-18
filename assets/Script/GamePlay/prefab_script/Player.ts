import { gamebase } from "../../Boot";
import { UIParamInterface } from "../../Common/CommonInterface";
import Loader from "../../Common/Loader";
import EventManager from "../../EventManager/EventManager";
import UIConfig from "../../UI/UIManager/UIConfig";
import UIManager from "../../UI/UIManager/UIManager";
import GamePlay from "../GamePlay";
import { LordCardType, PeopleIdentityType, PeopleType, ShowCardType } from "../GamePlayEnum";
import { LordCardInterface, LordPeopleInterface, LordSendCardInterface, SendCardInterface } from "../GamePlayInterface";
import LinkGameBase from "../LinkGameBase";
import { CardsValue, CardValueType, card_list, LordUtils } from "../LordUtils";
import { Ai } from "./Ai";
import LordCard from "./LordCard";

const { ccclass, property } = cc._decorator;

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


    public game_play: GamePlay = null;

    public player_interface: LordPeopleInterface = null;
    private _next_player: Player = null;
    private _upper_player: Player = null;

    private _ai: Ai = null;
    public send_card: SendCardInterface = null;


    onLoad() {
        this._ai = new Ai();
        this._ai._ai_player = this;
    }

    get ai() {
        return this._ai;
    }

    set ai(_ai: Ai) {
        this._ai = _ai;
    }


    set_player_interface(player_interface: LordPeopleInterface) {
        this.player_interface = player_interface;

        if (this.where_name_label) {
            this.where_name_label.string = player_interface.where_name;
        }

        if (this.money_label) {
            this.money_label.string = `${player_interface.money}`;
        }

        if (this.player_name_label) {
            this.player_name_label.string = `${player_interface.nick_name}`;
        }

        Loader.load_texture(`./GamePlay/prefab/main/player/${player_interface.avatar_url}`, (texture2d: cc.Texture2D) => {
            this.icon_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
        });
    }


    // 给玩家发牌
    deal_cards(cards: Array<LordCardInterface>) {
        // cards = this.test_cards();
        this.player_interface.cards = cards;

        if (this.car_number_label) {
            this.car_number_label.string = `${this.player_interface.cards.length}`;
        }

        this.ai.analyse();
    }

    start() {

    }

    card_total_point() {
        let all_point = 0;

        for (let card of this.player_interface.cards) {
            all_point = all_point + card.id;
        }

        return all_point;
    }

    set_identified(identified: PeopleIdentityType) {
        this.player_interface.people_identity_type = identified;
        let show_msg_image_path = "main_bujiao";
        if (this.player_interface.people_identity_type == PeopleIdentityType.lord) {
            show_msg_image_path = "main_jiaodizhu";
        }

        this.show_call_or_no_call_lord_message(show_msg_image_path);
    }

    delete_cards(cards: Array<LordCardInterface>) {
        const player_cards: Array<LordCardInterface> = [];
        let find_it = false;
        for (const card of this.player_interface.cards) {
            for (const send_card of cards) {
                if (card.id == send_card.id && send_card.card_type == card.card_type) {
                    find_it = true;
                    break;
                }
            }
            if (!find_it) {
                player_cards.push(card);
            }
        }

        console.log("删除后剩余的牌的数据  = ", player_cards);
        this.player_interface.cards = player_cards;
        this.deal_cards(player_cards);
        if (this.car_number_label) {
            this.car_number_label.string = `${this.player_interface.cards.length}`;
        }
    }

    /**@description AI 出牌 */
    play_card(cards: Array<LordCardInterface>) {
        this.show_cards(cards);
    }


    show_cards(cards: Array<LordCardInterface>) {
        const container = this.player_interface.position == 0 ? gamebase.game_play.player_play_card_container : this.card_container;
        const chidren = container.children;
        for (const card of chidren) {
            gamebase.game_play.remove_card(card);
        }

        let card_index = 0;
        for (const card_data of cards) {
            const card2 = gamebase.game_play.create_card();
            card2.scale = 0.6;
            const card_width = card2.scale * card2.width;
            const card_height = card2.scale * card2.height;

            card2.width = card_width;
            card2.height = card_height;
            console.log("刷新牌的数据  = ",card_data);
            card2.getComponent(LordCard).flush_data(card_data);
            card2.parent = container;
            if (this.player_interface.position == 0) {
                card2.x = (card_index * (card_width / 2)) + card_width / 4 - container.width / 2;
            } else {
                const tx = (card_index * (card_width / 2)) + card_width / 2;
                card2.x = (this.player_interface.position == 1 ? -Math.abs(tx) : Math.abs(tx));
                card2.zIndex = this.player_interface.position == 1 ? (cards.length - card_index) : card_index;
            }
            card_index++;
        }
    }

    show_call_or_no_call_lord_message(show_msg_image_path: string) {
        this.call_or_no_call_lord_mesage_sprite.node.active = false;
        Loader.load_texture(`./GamePlay/prefab/main/texture/ui/${show_msg_image_path}`, (texture: cc.Texture2D) => {
            this.call_or_no_call_lord_mesage_sprite.spriteFrame = new cc.SpriteFrame(texture);
            this.call_or_no_call_lord_mesage_sprite.node.active = true;
            this.scheduleOnce(() => {
                this.call_or_no_call_lord_mesage_sprite.node.active = false;
            }, 3);
        });
    }

    add_cards(cards: Array<LordCardInterface>) {
        for (const card of cards) {
            this.player_interface.cards.push(card);
        }

        this.player_interface.cards.sort(LordUtils.sort_cards);
        if (this.car_number_label) {
            this.car_number_label.string = `${this.player_interface.cards.length}`;
        }
    }

    get is_lord(): boolean {
        return this.player_interface.people_identity_type == PeopleIdentityType.lord;
    }

    get next_player() {
        return this._next_player;
    }

    set next_player(_next_player: Player) {
        this._next_player = _next_player;
    }

    get upper_player() {
        return this._upper_player;
    }

    set upper_player(_upper_player: Player) {
        this._upper_player = _upper_player;
    }

    get cards_number(): number {
        return this.player_interface.cards.length;
    }


    test_cards() {
        const cards: Array<LordCardInterface> = [];
        cards.push({ id: 3, card_type: LordCardType.clubs });
        cards.push({ id: 4, card_type: LordCardType.clubs });
        cards.push({ id: 5, card_type: LordCardType.clubs });
        cards.push({ id: 6, card_type: LordCardType.clubs });
        cards.push({ id: 7, card_type: LordCardType.clubs });
        cards.push({ id: 8, card_type: LordCardType.clubs });
        cards.push({ id: 9, card_type: LordCardType.clubs });
        cards.push({ id: 10, card_type: LordCardType.clubs });
        cards.push({ id: 10, card_type: LordCardType.clubs });
        cards.push({ id: 17, card_type: LordCardType.small_king });
        cards.push({ id: 17, card_type: LordCardType.big_king });
        cards.push({ id: 11, card_type: LordCardType.clubs });
        cards.push({ id: 11, card_type: LordCardType.clubs });
        cards.push({ id: 11, card_type: LordCardType.clubs });
        cards.push({ id: 11, card_type: LordCardType.clubs });
        cards.push({ id: 12, card_type: LordCardType.clubs });
        cards.push({ id: 12, card_type: LordCardType.clubs });
        cards.push({ id: 12, card_type: LordCardType.clubs });
        cards.push({ id: 12, card_type: LordCardType.clubs });

        cards.sort(LordUtils.sort_cards);
        return cards;






    }

    // update (dt) {}

}
