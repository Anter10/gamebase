import BaseUI from "../../../Common/BaseUI";
import { NagivatorInterface } from "../../../Common/CommonInterface";
import RankHeaderView from "../RankHeaderView";
import { HeaderItemInterface, RankInterface, RankItemInterface } from "../RankInterface";
import RankViewItem from "../RankViewItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NormalRankView extends BaseUI {
    @property(cc.ScrollView)
    scroll_view: cc.ScrollView = null;

    @property(cc.Node)
    container: cc.Node = null;
    @property(cc.Node)
    self_rank_node: cc.Node = null;

    @property(cc.Sprite)
    rank_view_background:cc.Sprite = null;

    @property(cc.Prefab)
    rank_item_prefab:cc.Prefab = null;
    @property(cc.Prefab)
    rank_header_prefab: cc.Prefab = null;
    

    public self_rank_item: RankViewItem = null;


    onLoad () {
        super.onLoad();
        this.flush_view();
    }

    flush_view(){
       const nagivator_interface: NagivatorInterface = {
          title: `排行榜`,
          back_callback: ()=>{
             this.on_close_call("RankView");
          }
       }

       this.add_nagivator([],nagivator_interface)
    }

    init_rank_list(rank_interface: RankInterface){
        this.container.removeAllChildren(true);
        for(let i = 0; i < rank_interface.itemList.length; i ++){
            const rank_item = cc.instantiate(this.rank_item_prefab);
            const rank_item_script:  RankViewItem = rank_item.getComponent(RankViewItem);
            rank_item.parent = this.container;
            rank_item_script.update_data(rank_interface.itemList[i]);
        }
    }

    init_header_view(header_item_interfaces: Array<HeaderItemInterface>){
        const header_view = cc.instantiate(this.rank_header_prefab);
        const header_view_script = header_view.getComponent(RankHeaderView);
        header_view_script.init_header_view(header_item_interfaces);
        header_view.parent = this.node;
    }

    add_player_rank_view(rank_view_item_interface: RankItemInterface){
        if(!this.self_rank_item){
            const rank_item = cc.instantiate(this.rank_item_prefab);
            const widget = rank_item.addComponent(cc.Widget);
            widget.enabled = true;
            widget.bottom = -((this.node.height / 2) - rank_item.height);
            widget.alignMode = cc.Widget.AlignMode.ALWAYS;
            widget.updateAlignment();
            this.self_rank_item = rank_item.getComponent(RankViewItem);
            rank_item.parent = this.self_rank_node;
        }
        this.self_rank_item.update_data(rank_view_item_interface);
    }

    start () {
        super.start();

    }

    // update (dt) {}
}
