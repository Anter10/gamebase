import BaseUI from "../../../Common/BaseUI";
import Loader from "../../../Common/Loader";

const {ccclass, property} = cc._decorator;

@ccclass
class CashOutOrderView extends BaseUI {

    @property(cc.Node)
    container: cc.Node = null;

    onLoad () {
        super.onLoad();

        for(let i = 0; i < 10; i ++ ){
            Loader.load_prefab("./UI/CashOut/CashOutOrder/CashOutOrderItem", (prefab: cc.Prefab) => {
                const cash_out_item = cc.instantiate(prefab);
                cash_out_item.parent = this.container;
            });
        }

        this.add_nagivator([],this.on_close_call.bind(this));
    }

    start () {
        super.start();
    }

    update (dt) {
    }
}


export default CashOutOrderView;