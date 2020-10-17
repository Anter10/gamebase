import BaseUI from "../../../Common/BaseUI";
import Loader from "../../../Common/Loader";
import CommonServerData from "../../../GameServerData/CommonServerData";
import { CashOutOrderInterface, OrderInterface } from "../CashOutInterface";
import CashOutOrderItem from "./CashOutOrderItem";

const {ccclass, property} = cc._decorator;

@ccclass
class CashOutOrderView extends BaseUI {

    @property(cc.Node)
    container: cc.Node = null;

    @property(cc.Prefab)
    order_prefab: cc.Prefab = null;

    onLoad () {
        super.onLoad();
        this.add_nagivator([],{
            title: "提现记录",
            back_callback: this.on_close_call.bind(this)
        });
    }

    onAddFinished(){
        super.onAddFinished();
        this.request_orders();
    }

    request_orders(){
        CommonServerData.get_order((order_interface: OrderInterface) =>{
            if(order_interface.items){
                this.update_view(order_interface.items);
            }else{
                console.warn("请求到的提现记录为空");
            }
        });
    }

    update_view(cash_order: Array<CashOutOrderInterface>){
        this.container.removeAllChildren(true);
        for(const order of cash_order){
            const cash_out_item = cc.instantiate(this.order_prefab);
            cash_out_item.parent = this.container;
            const cash_out_item_script = cash_out_item.getComponent(CashOutOrderItem);
            cash_out_item_script.update_view(order);
        }
    }

    start () {
        super.start();
    }

    update (dt) {
    }
}


export default CashOutOrderView;