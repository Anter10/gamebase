import BaseNode from "../../Common/BaseNode";
import Loader from "../../Common/Loader";
import { CardTypeNumber, LordCardType } from "../GamePlayEnum";
import { LordCardInterface } from "../GamePlayInterface";
import CardRegisterItem from "./CardRegisterItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CardRegisterNode extends BaseNode {

    @property(cc.Node)
    content: cc.Node = null;

    start() {
        this.set_card_register();
    }

    set_card_register() {
        Loader.load_prefab(`./GamePlay/prefab/cells/CardRegisterItem`, (prefab: cc.Prefab) => {
            for (let i = 3; i <= 17; i++) {
                const card_item = cc.instantiate(prefab);
                card_item.getComponent(CardRegisterItem).set_data({ id: i, card_type: LordCardType.none });
                card_item.parent = this.content;
            }
        });
    }

}
