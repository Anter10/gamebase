import BaseNode from "../../Common/BaseNode";
import { UIParamInterface } from "../../Common/CommonInterface";
import Loader from "../../Common/Loader";
import { CardTypeNumber, LordCardType } from "../GamePlayEnum";
import { LordCardInterface } from "../GamePlayInterface";
import CardRegisterItem from "./CardRegisterItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CardRegisterNode extends BaseNode {

    @property(cc.Node)
    content: cc.Node = null;

    set_card_register(card_register_config: Array<LordCardInterface>) {
        Loader.load_prefab(`./GamePlay/prefab/cells/CardRegisterItem`, (prefab: cc.Prefab) => {
            for (let i = 17; i >= 3; i--) {
                const card_item = cc.instantiate(prefab);
                const card_item_script = card_item.getComponent(CardRegisterItem);
                card_item_script.set_item({ id: i, card_type: LordCardType.none });
                card_item_script.set_card(null, card_register_config);
                card_item.parent = this.content;
            }
        });
    }

}
