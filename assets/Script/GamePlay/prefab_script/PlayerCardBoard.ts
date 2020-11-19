import { gamebase } from "../../Boot";
import EventManager from "../../EventManager/EventManager";
import GamePlay from "../GamePlay";
import { CardStatue, LordCardStatue } from "../GamePlayEnum";
import { LordCardInterface } from "../GamePlayInterface";
import LinkGameBase from "../LinkGameBase";
import { card_list, LordUtils } from "../LordUtils";
import LordCard from "./LordCard";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerCardBoard extends cc.Component {

    _touch_start: cc.Vec2 = null;
    _touch_moved: cc.Vec2 = null;

    card_nodes: Array<LordCard> = [];

    public game_play: GamePlay = null;

    // LIFE-CYCLE CALLBACKS:
    public cards: Array<LordCardInterface> = null;
    onLoad() {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.flush_player_show_cards, this, this.flush_cards.bind(this));
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.delete_card, this, this.delete_cards.bind(this));
        this.node.on("touchstart", this.touch_start.bind(this), this);
        this.node.on("touchmove", this.touch_move.bind(this));
        this.node.on("touchend", this.touch_end.bind(this), this);
        this.node.on("touchcancel", this.touch_cancel.bind(this), this);
    }

    /**@description 对卡牌进行重新排序 */
    resort_cards() {
        // 对卡牌进行排序
        let  sort_cards = (card1: LordCard, card2: LordCard) =>{
            // 对牌进行排序ID从大到小
            if (card1 && card2) {
                if (card2.card.id > card1.card.id) {
                    return 1;
                } else if (card2.card.id < card1.card.id) {
                    return -1;
                } else {
                    return 0;
                }
            } else {
                return -1;
            }
        }

        this.card_nodes.sort(sort_cards);

        const cards = this.card_nodes;
        const game_play = (<GamePlay>gamebase.game_play)
        let show_card_index = 0;
        let upper_base_index = 0;
        const second_row_count = cards.length > 10 ? 10 : cards.length;
        const first_row_count = cards.length - second_row_count;
        let show_index = 0;
        const every_day_card_time = 0.02;
        if (first_row_count > 0) {
            const total_width = first_row_count * 63;
            const show_cards = () => {
                const card = cards[show_index].node;
                card.x = (show_index) * (card.width / 2) + (card.width / 4) - total_width / 2;
                card.zIndex = 10 + show_card_index;
                const lord_card: LordCard = card.getComponent(LordCard);
                lord_card.lord_card_statue = LordCardStatue.in_hand;
                card.y = card.height / 2;
                lord_card.row = 1;
                show_index++;
                if (show_index >= first_row_count) {
                    this.unschedule(show_cards);
                    this.resort_second_cards();
                    lord_card.special = true;
                } else {
                    lord_card.special = false;
                }
                show_card_index++;
            }
            for(let i = 0; i < first_row_count; i ++){
                show_cards();
            }
        } else {
            this.resort_second_cards();
        }
    }

    resort_second_cards(){
        const cards = this.card_nodes;
        const game_play = (<GamePlay>gamebase.game_play)
        const second_row_count = cards.length > 10 ? 10 : cards.length;
        const first_row_count = cards.length - second_row_count;
        let show_card_index = first_row_count;
        const every_day_card_time = 0.02;
        let second_show_index = 0;
        const show_second_cards = () => {
            const card = cards[show_card_index].node;
            card.x = (second_show_index) * card.width / 2 + card.width / 4 - (this.node.width - 120) / 2;
            card.y = -30;
            card.zIndex = 100 + second_show_index;
            const lord_card: LordCard = card.getComponent(LordCard);
            lord_card.lord_card_statue = LordCardStatue.in_hand;
            show_card_index++;
            second_show_index++;
            lord_card.row = 2;
            if (show_card_index == cards.length) {
                this.unschedule(show_second_cards);
                lord_card.special = true;
            } else {
                lord_card.special = false;
            }
        };
        for(let i = 0; i < second_row_count; i ++){
            show_second_cards();
        }
    }

    delete_cards(event: any, cards: Array<LordCardInterface>) {
        console.log("当前玩家自己需要删除的牌的信息 = ", cards)
        for (const card of cards) {
            let node_index = 0;
            for (const card_node of this.card_nodes) {
                console.log("删除1")
                if (card_node.card.card_type == card.card_type && card_node.card.id == card.id) {
                    this.game_play.remove_card(card_node.node);
                    console.log("删除2")
                    this.card_nodes.splice(node_index, 1);
                }
                node_index++;
            }
        }
        this.resort_cards();
        console.log("删除后还剩多少张牌 = ", this.card_nodes.length);
    }


    init_cards(cards: Array<LordCardInterface>) {
        console.log("玩家当前的牌信息 = ", cards);
        this.cards = cards;
        const game_play = (<GamePlay>gamebase.game_play)
        let show_card_index = 0;
        let upper_base_index = 0;
        const second_row_count = this.cards.length > 10 ? 10 : this.cards.length;
        const first_row_count = this.cards.length - second_row_count;
        let show_index = 0;
        const every_day_card_time = 0.02;

        if (first_row_count > 0) {
            const total_width = first_row_count * 63;
            const show_cards = () => {
                const card = game_play.create_card();
                card.x = (show_index) * (card.width / 2) + (card.width / 4) - total_width / 2;
                card.zIndex = 10 + show_card_index;
                const lord_card: LordCard = card.getComponent(LordCard);
                lord_card.lord_card_statue = LordCardStatue.in_hand;
                card.parent = this.node;
                card.y = card.height / 2;
                lord_card.row = 1;
                const data = this.cards[show_card_index];
                lord_card.flush_data(data);
                this.card_nodes.push(lord_card);
                show_index++;
                if (show_index >= first_row_count) {
                    this.unschedule(show_cards);
                    this.show_second_cards();
                    lord_card.special = true;
                } else {
                    lord_card.special = false;
                }
                show_card_index++;
            }

            this.schedule(show_cards, every_day_card_time, first_row_count - 1, every_day_card_time);
        } else {
            this.show_second_cards();
        }
    }

    reset_cards_position() {
        for (const card_node of this.card_nodes) {
            card_node.site_down();
        }
    }

    player_send_card_callback() {
        const cur_cards = this.get_player_cur_selected_cards();
        console.log("当前玩家选中的牌的数据 = ", cur_cards);
    }

    get_card_for_touch(touch_point, card_nodes: Array<LordCard>) {
        for (const card of card_nodes) {
            var box = card.node.getBoundingBox();
            let add_other_height = 0;
            if (card.row == 1) {
                add_other_height = box.height / 4;
            }
            let width = box.width / 2;
            if (card.special) {
                width = box.width;
            }
            const box_ = new cc.Rect(box.x, box.y + add_other_height, width, box.height);
            if (box_.contains(touch_point)) {
                card.isChoose = true;
                card.node.opacity = 255;
                return card;
            }
        }
    }

    _checkSelectCardReserve(touchBegan, touchMoved) {
        var p1 = touchBegan.x < touchMoved.x ? touchBegan : touchMoved;
        var width = Math.abs(touchBegan.x - touchMoved.x);
        var height = Math.abs(touchBegan.y - touchMoved.y) > 5 ? Math.abs(touchBegan.y - touchMoved.y) : 5;
        var rect = cc.rect(p1.x, p1.y, width, height);
        for (let i = 0; i < this.card_nodes.length; i++) {
            if (!this.card_nodes[i].node.getBoundingBox().intersects(rect)) {
                this.card_nodes[i].isChoose = false;
                this.card_nodes[i].node.opacity = 255;
            }
        }
        if (p1 == touchMoved) {
            for (let i = this.card_nodes.length - 1; i >= 0; i--) {
                if (this.card_nodes[i].node.x - p1.x < 10) {  //
                    this.card_nodes[i].node.opacity = 255;
                    this.card_nodes[i].isChoose = false;
                }
            }
        }

    }


    touch_start(event) {
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        this._touch_start = this.node.convertToNodeSpaceAR(touchLoc);
        this.get_card_for_touch(this._touch_start, this.card_nodes);
    }

    touch_move(event) {
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        this._touch_moved = this.node.convertToNodeSpaceAR(touchLoc);
        this.get_card_for_touch(this._touch_moved, this.card_nodes);
        this._checkSelectCardReserve(this._touch_start, this._touch_moved);
    }


    touch_end(event) {
        this.touch_end_or_cancel(event);
    }

    touch_cancel(event) {
        this.touch_end_or_cancel(event);
    }

    touch_end_or_cancel(event) {
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        for (const card of this.card_nodes) {
            card.node.opacity = 255;
            if (card.isChoose === true) {
                card.isChoose = false;
                if (card.status === CardStatue.SITDOWN) {
                    card.stand_up();
                } else {
                    card.site_down();
                }
            }
        }
    }


    select_cards(cards: card_list) {
        for (const card_script of this.card_nodes) {
            let had_find_it = false;
            for (const card of cards) {
                if (card_script.card.card_type == card.card_type && card_script.card.id == card.id) {
                    had_find_it = true;
                    break;
                }
            }

            if (had_find_it) {
                card_script.stand_up();
            } else {
                card_script.site_down();
            }
        }
    }


    /**@description 得到玩家当前自己选中的牌 */
    get_player_cur_selected_cards(): Array<LordCardInterface> {
        const cards: Array<LordCardInterface> = [];
        for (const card of this.card_nodes) {
            if (card.status == CardStatue.STANDUP) {
                cards.push(card.card);
            }
        }

        return cards;
    }

    flush_cards(event: any, cards: Array<LordCardInterface>) {
        this.card_nodes
    }


    show_second_cards() {
        const game_play = (<GamePlay>gamebase.game_play)
        const second_row_count = this.cards.length > 10 ? 10 : this.cards.length;
        const first_row_count = this.cards.length - second_row_count;
        let show_card_index = first_row_count;
        const every_day_card_time = 0.02;
        let second_show_index = 0;
        const show_second_cards = () => {
            const data = this.cards[show_card_index];
            const card = game_play.create_card();
            card.parent = this.node;
            card.x = (second_show_index) * card.width / 2 + card.width / 4 - (this.node.width - 120) / 2;
            card.y = -30;
            card.zIndex = 100 + second_show_index;
            const lord_card: LordCard = card.getComponent(LordCard);
            lord_card.flush_data(data);
            this.card_nodes.push(lord_card);
            lord_card.lord_card_statue = LordCardStatue.in_hand;
            show_card_index++;
            second_show_index++;
            lord_card.row = 2;
            if (show_card_index == this.cards.length) {
                this.unschedule(show_second_cards);
                lord_card.special = true;
            } else {
                lord_card.special = false;
            }
        };

        this.schedule(show_second_cards, every_day_card_time, second_row_count, every_day_card_time * first_row_count);

    }

    start() {

    }

    // update (dt) {}
}
