import Loader from "../../Common/Loader";
import TouchButton from "../../Common/TouchButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BottomNode extends cc.Component {

    @property(cc.Node)
    main_button_jipaiqi: cc.Node = null;

    @property(cc.Node)
    main_button_cash_out_button: cc.Node = null;

    private card_register: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.main_button_jipaiqi.addComponent(TouchButton).register_touch(() => {
            if (this.card_register) {
                if (this.card_register.active) {
                    this.card_register.active = false;
                } else {
                    this.card_register.active = true;
                }
            } else {
                Loader.load_prefab(`./GamePlay/prefab/cells/CardRegisterNode`, (prefab: cc.Prefab) => {
                    const card_item = cc.instantiate(prefab);
                    this.card_register = card_item;
                    card_item.parent = this.node;
                });
            }
        });

        this.main_button_cash_out_button.addComponent(TouchButton).register_touch(() => {

        })
    }



    // update (dt) {}
}
