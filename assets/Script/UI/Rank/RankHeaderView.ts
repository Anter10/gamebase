import BaseNode from "../../Common/BaseNode";
import HeaderItem from "./HeaderItem";
import { HeaderItemInterface } from "./RankInterface";


const {ccclass, property} = cc._decorator;

@ccclass
export default class RankHeaderView extends BaseNode {

    @property(cc.Node)
    container: cc.Node = null;
    @property(cc.Prefab)
    header_item_prefab: cc.Prefab = null;
    
    public header_item_interfaces:Array<HeaderItemInterface> = [];

    onLoad () {
        super.onLoad();
    }

    init_header_view(header_item_interfaces: Array<HeaderItemInterface>){
        this.header_item_interfaces = header_item_interfaces;
        for(const header_item_interface of this.header_item_interfaces){
            const header_item = cc.instantiate(this.header_item_prefab);
            const header_item_script:HeaderItem = header_item.getComponent(HeaderItem);
            header_item_script.flush(header_item_interface);
            header_item.parent = this.container;
        }
    }

    start () {

    }

    // update (dt) {}
}
