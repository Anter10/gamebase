import BaseUI from "../../../Common/BaseUI";
import { NagivatorInterface } from "../../../Common/CommonInterface";
import RankHeaderView from "../RankHeaderView";
import { HeaderItemInterface } from "../RankInterface";
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



    onLoad () {
        super.onLoad();
        this.flush_view();
    }

    flush_view(){
       this.init_header_view();
       this.init_rank_list();
       this.add_player_rank_view();
       const nagivator_interface: NagivatorInterface = {
          title: `排行榜`,
          back_callback: ()=>{
             this.on_close_call("RankView");
          }
       }

       this.add_nagivator([],nagivator_interface)
    }

    init_rank_list(){
        for(let i = 0; i < 20; i ++){
            const rank_item = cc.instantiate(this.rank_item_prefab);
            const rank_item_script:  RankViewItem = rank_item.getComponent(RankViewItem);
            rank_item.parent = this.container;
        }
    }

    init_header_view(){
        const header_item_interfaces: Array<HeaderItemInterface> = [
            {title: "排名"},
            {title: "玩家名字"},
            {title: "欢乐豆"},
            {title: "红包数"},

        ]
        const header_view = cc.instantiate(this.rank_header_prefab);
        const header_view_script = header_view.getComponent(RankHeaderView);
        header_view_script.init_header_view(header_item_interfaces);
        header_view.parent = this.node;
    }

    add_player_rank_view(){
        const rank_item = cc.instantiate(this.rank_item_prefab);
        const widget = rank_item.addComponent(cc.Widget);
        widget.enabled = true;
        widget.bottom = -((this.node.height / 2) - rank_item.height);
        widget.alignMode = cc.Widget.AlignMode.ALWAYS;
        widget.updateAlignment();
        const rank_item_script:  RankViewItem = rank_item.getComponent(RankViewItem);
        rank_item.parent = this.self_rank_node;
    }

    start () {
        super.start();

    }

    // update (dt) {}
}
