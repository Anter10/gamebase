import Loader from "../../../Common/Loader";

const {ccclass, property} = cc._decorator;

@ccclass
class NoBanlanceCashOutView extends cc.Component {

    @property(cc.Node)
    container: cc.Node = null;

    onLoad () {
        for(let i = 0; i < 9; i ++ ){
            Loader.load_prefab("./UI/CashOut/NoBalance/NoBalanceCashOutViewItem",(prefab:cc.Prefab) => {
                const no_balance_node = cc.instantiate(prefab);
                no_balance_node.parent = this.container;
            })
        }
    }

    start () {
    }

    update (dt) {
    }
}


export default NoBanlanceCashOutView;