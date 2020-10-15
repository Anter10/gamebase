import BaseNode from "../../Common/BaseNode";

const {ccclass, property} = cc._decorator;

@ccclass
class RankViewItem extends BaseNode {
    @property(cc.Sprite)
    rank_item_bottom: cc.Sprite = null;

    @property(cc.Sprite)
    rank_icon_sprite: cc.Sprite = null;
    @property(cc.Sprite)
    rank_player_avator_sprite: cc.Sprite = null;

    @property(cc.Label)
    rank_player_name_label:cc.Label = null;
    @property(cc.Label)
    rank_label: cc.Label = null;

    @property(cc.Node)
    rank_type_item_container: cc.Node = null;

    @property(cc.Prefab)
    rank_type_node: cc.Prefab = null;
    
    onLoad () {
        super.onLoad();
    }

    start () {
        super.start();

    }

    // update (dt) {}
}


export default RankViewItem;