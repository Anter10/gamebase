import BaseNode from "../../Common/BaseNode";
import Loader from "../../Common/Loader";
import { RankItemInterface } from "./RankInterface";
import RankTypeNode from "./RankTypeNode";
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

    update_data(rank_item_interface: RankItemInterface){
        if(rank_item_interface.rank > 1 && rank_item_interface.rank <= 3){
           this.rank_icon_sprite.node.active = true;
           this.rank_label.node.active = false;
           Loader.load_texture(`./UI/Rank/texture/Normal/rank_${rank_item_interface.rank}`, (texture2d: cc.Texture2D) =>{
               this.rank_icon_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
           });
        }else{
            this.rank_icon_sprite.node.active = false;
            this.rank_label.node.active = true;
            this.rank_label.string = `${rank_item_interface.rank == 0 ? "未上榜" : rank_item_interface.rank}`;
        }

        if(rank_item_interface.key.photoUrl){
            Loader.request_remote_image(rank_item_interface.key.photoUrl, (sprite_frame: cc.SpriteFrame) =>{
                this.rank_player_avator_sprite.spriteFrame = sprite_frame;
            });
        }else{
            this.rank_player_avator_sprite.node.active = false;
        }
       

        this.rank_player_name_label.string = `${rank_item_interface.key.name}`;
        
        const reward_node: cc.Node = cc.instantiate(this.rank_type_node);
        const reward_node_script: RankTypeNode = reward_node.getComponent(RankTypeNode);
        reward_node_script.set_value(`${rank_item_interface.reward}`);
        reward_node_script.set_width(160);
        reward_node.parent = this.rank_type_item_container;

        const value_node: cc.Node = cc.instantiate(this.rank_type_node);
        const value_node_script: RankTypeNode = value_node.getComponent(RankTypeNode);
        value_node_script.set_value(`${rank_item_interface.value}`);
        value_node.parent = this.rank_type_item_container;
        value_node_script.set_width(80);
       
    }

    // update (dt) {}
}


export default RankViewItem;