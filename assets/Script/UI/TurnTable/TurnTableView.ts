import BaseUI from "../../Common/BaseUI";
import TurnTableController from "./TurnTableController";
import { TurnTableViewInterface } from "./TurnTableInterface";

 
const {ccclass, property} = cc._decorator;

@ccclass
export default class TurnTableView extends BaseUI implements TurnTableViewInterface {
    public turn_table_controller: TurnTableController = null;
 
    /**@description 刷新抽奖数据 */
    flush_items(){
        
    }

    /**@description 开始抽奖的时候的调用 */
    turn_table_callback(){
        this.turn_table_controller.turn_table();
    }

    /**@description 开始转动的调用 */
    start_rotate(){

    }
    

    onLoad () {
        super.onLoad();
    }

    start () {

    }

    // update (dt) {}
}
