import BaseNode from "../../Common/BaseNode";
import Loader from "../../Common/Loader";
import EventManager from "../../EventManager/EventManager";
import { LordCardType } from "../GamePlayEnum";
import { LordCardInterface } from "../GamePlayInterface";
import LinkGameBase from "../LinkGameBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CardRegisterItem extends BaseNode {

    @property(cc.Node)
    normal_node: cc.Node = null;

    @property(cc.Node)
    king_icon: cc.Node = null;

    @property(cc.Sprite)
    id_sprite: cc.Sprite = null;

    @property(cc.Label)
    count_label: cc.Label = null;

    private card: LordCardInterface = null;
    private card_register_config: Array<LordCardInterface> = [];
    private card_count: Array<number> = [];

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
            }
        });
    }

    set_data(card: LordCardInterface) {
        this.card = card;
        if (card.id < 16) {
            this.normal_node.active = true;
            this.king_icon.active = false;
            Loader.load_texture(`./GamePlay/prefab/card/pkp_hong_${card.id}`, (texture2d: cc.Texture2D) => {
                this.id_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
            });
        } else {
            this.normal_node.active = false;
            this.king_icon.active = true;
            if (card.id == 16) {
                card.card_type = LordCardType.small_king;
            }
            if (card.id == 17) {
                card.card_type = LordCardType.big_king;
            }
            Loader.load_texture(`./GamePlay/prefab/card/${card.card_type}`, (texture2d: cc.Texture2D) => {
                this.king_icon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture2d);
            });
        }
    }

}
