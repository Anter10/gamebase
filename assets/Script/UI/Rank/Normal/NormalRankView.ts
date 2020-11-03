import BaseUI from "../../../Common/BaseUI";
import { NagivatorInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import ServerData from "../../../GameServerData/ServerData";
import RankHeaderView from "../RankHeaderView";
import { HeaderItemInterface, RankInterface, RankItemInterface, RankUiNameInterface } from "../RankInterface";
import { RankCurrentShowUIType } from "../RankTypeEnum";
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

    @property(cc.Sprite)
    rank_view_background1:cc.Sprite = null;

    @property(cc.Prefab)
    rank_item_prefab:cc.Prefab = null;
    @property(cc.Prefab)
    rank_header_prefab: cc.Prefab = null;

    public self_rank_item: RankViewItem = null;

    public rank_ui_name: RankUiNameInterface = {
        backGround: `sprite_bg` ,
    };

    onLoad () {
        super.onLoad();
        // this.flush_view(RankCurrentShowUIType.blue ,`每天0点自动发放`);
    }

    flush_view(current_show_ui_type: RankCurrentShowUIType ,title: string){
       const nagivator_interface: NagivatorInterface = {
          title: `上榜即得红包奖励，${title}`,
          show_nagivator_bottom: current_show_ui_type != RankCurrentShowUIType.white ,
          back_callback: ()=>{
             this.on_close_call("RankView");
          }
       }

       this.add_nagivator([],nagivator_interface ,current_show_ui_type)
    }

    init_rank_list(rank_interface: RankInterface ,current_show_ui_type: RankCurrentShowUIType){
        this.container.removeAllChildren(true);
        for(let i = 0; i < rank_interface.itemList.length; i ++){
            const rank_item = cc.instantiate(this.rank_item_prefab);
            const rank_item_script:  RankViewItem = rank_item.getComponent(RankViewItem);
            rank_item.parent = this.container;
            if (current_show_ui_type == RankCurrentShowUIType.white) {
                rank_item_script.update_data_specil(rank_interface.itemList[i] ,current_show_ui_type);
            }
            else {
                rank_item_script.update_data(rank_interface.itemList[i] ,current_show_ui_type);
            }
        }
    }

    init_header_view(header_item_interfaces: Array<HeaderItemInterface> ,current_show_ui_type: RankCurrentShowUIType){
        const header_view = cc.instantiate(this.rank_header_prefab);
        const header_view_script = header_view.getComponent(RankHeaderView);
        header_view_script.init_header_view(header_item_interfaces ,current_show_ui_type);
        header_view.parent = this.node;
    }

    add_player_rank_view(rank_view_item_interface: RankItemInterface ,current_show_ui_type: RankCurrentShowUIType){
        if(!this.self_rank_item){
            const rank_item = cc.instantiate(this.rank_item_prefab);
            const widget = rank_item.addComponent(cc.Widget);
            widget.enabled = true;
            widget.bottom = -((this.node.height / 2) - rank_item.height);
            widget.alignMode = cc.Widget.AlignMode.ALWAYS;
            widget.updateAlignment();
            this.self_rank_item = rank_item.getComponent(RankViewItem);
            rank_item.parent = this.self_rank_node;
            rank_item.y += 15;
        }
        if (current_show_ui_type == RankCurrentShowUIType.white) {
            this.self_rank_item.update_data_specil(rank_view_item_interface ,current_show_ui_type ,true);
        }
        else {
            this.self_rank_item.update_data(rank_view_item_interface ,current_show_ui_type ,true);
        }
    }

    update_background (uiType: RankCurrentShowUIType) {
        if (!uiType) return;
        let path = `./UI/Rank/Normal/rankUI/${uiType}/sprite_bg`;
        Loader.load_texture(path, (texture2d: cc.Texture2D) =>{
            this.rank_view_background.spriteFrame = new cc.SpriteFrame(texture2d);
        });
        this.rank_view_background1.node.active = uiType == RankCurrentShowUIType.white;
    }

    start () {
        super.start();

    }

    // update (dt) {}
}
