import BaseNode from "../../Common/BaseNode";
import Loader from "../../Common/Loader";
import EventManager from "../../EventManager/EventManager";
import { LordCardType } from "../GamePlayEnum";
import { LordCardInterface } from "../GamePlayInterface";
import LinkGameBase from "../LinkGameBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CardRegisterItem extends BaseNode {

    @property(cc.Label)
    cell_name: cc.Label = null;

    @property(cc.Label)
    count_label: cc.Label = null;

    private card: LordCardInterface = null;
    private card_register_config: Array<LordCardInterface> = [];
    private card_count: Array<number> = [];

    private readonly red_color = cc.color(248, 43, 26, 255);
    private readonly zero_color = cc.color(209, 194, 174, 255);
    private readonly no_zero_color = cc.color(181, 136, 96, 255);

    onLoad() {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.card_register_show_card, this, this.set_card.bind(this));
    }

    onDestroy() {
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.card_register_show_card, this, this.set_card.bind(this));
    }

    set_card(event, card_register_config: Array<LordCardInterface>) {
        this.card_register_config = card_register_config;
        for (let i = 0; i < this.card_register_config.length; i++) {
            if (this.card_count[this.card_register_config[i].id]) {
                this.card_count[this.card_register_config[i].id]++;
            } else {
                this.card_count[this.card_register_config[i].id] = 1;
            }
        }
        this.card_count.forEach((value, id) => {
            if (id == this.card.id) {
                this.count_label.string = value + "";
                if (value == 0) {
                    this.count_label.node.color = this.zero_color;
                }
            }
        });
    }

    set_item(card: LordCardInterface) {
        this.card = card;
        if (card.id < 16) {
            this.cell_name.string = card.id + "";
            this.count_label.node.color = this.no_zero_color;
        } else {
            this.count_label.node.color = this.red_color;
            if (card.id == 16) {
                this.cell_name.string = "小王"
            }
            if (card.id == 17) {
                this.cell_name.string = "大王"
            }
        }
    }

}
