import { gamebase } from "../../Boot";
import EventManager from "../../EventManager/EventManager";
import GamePlay from "../GamePlay";
import { LordCardStatue } from "../GamePlayEnum";
import { LordCardInterface } from "../GamePlayInterface";
import LinkGameBase from "../LinkGameBase";
import LordCard from "./LordCard";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerCardBoard extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    public cards: Array<LordCardInterface> = null;
    onLoad () {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.flush_player_show_cards, this, this.flush_cards.bind(this));
    }

    flush_cards(event: any, cards: Array<LordCardInterface>){
        console.log("玩家当前的牌信息 = ",cards);
        this.cards = cards;
        const game_play = (<GamePlay>gamebase.game_play)
        let show_card_index = 0;
        let upper_base_index = 0;
        const second_row_count = this.cards.length > 10 ? 10 : this.cards.length;
        const first_row_count = this.cards.length - second_row_count;
        let show_index = 0;
        const every_day_card_time = 0.02;
        if(first_row_count > 0){
            const total_width = first_row_count * 63;
            const show_cards = () => {
                const card = game_play.create_card();
                card.x = (show_index) * (card.width / 2) +  (card.width / 4) - total_width / 2;
                card.zIndex = 10 + show_card_index;
                const lord_card: LordCard = card.getComponent(LordCard);
                lord_card.lord_card_statue = LordCardStatue.in_hand;
                card.parent = this.node;
                card.y = card.height / 1.5;
                const data = this.cards[show_card_index];
                lord_card.flush_data(data);
                show_index ++;
                if(show_index >= first_row_count){
                    this.unschedule(show_cards);
                }
                show_card_index ++;
            }

            this.schedule(show_cards, every_day_card_time, first_row_count - 1, every_day_card_time);
        }

        let second_show_index = 0;
        const show_cards = () => {
              const data = this.cards[show_card_index];
              if(data){
                const card = game_play.create_card();
                card.parent = this.node;
                card.x = (second_show_index) * card.width / 2  +  card.width / 4 - this.node.width / 2;
                card.zIndex = 100 + second_show_index;
                const lord_card: LordCard = card.getComponent(LordCard);
                lord_card.flush_data(data);
                lord_card.lord_card_statue = LordCardStatue.in_hand;
                show_card_index ++;
                second_show_index ++;
              }else{
                this.unschedule(show_cards);
              }
        };

        this.schedule(show_cards, every_day_card_time, second_row_count - 1, every_day_card_time * first_row_count);

       
    }

    start () {

    }

    // update (dt) {}
}
