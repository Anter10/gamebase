import BaseNode from "../../Common/BaseNode";
import Loader from "../../Common/Loader";
import { RankItemInterface } from "./RankInterface";
import { RankCurrentShowUIType } from "./RankTypeEnum";
import RankTypeNode from "./RankTypeNode";
const {ccclass, property} = cc._decorator;

@ccclass
class RankViewItem extends BaseNode {
    @property(cc.Sprite)
    rank_item_sprite: cc.Sprite = null;

    @property(cc.Sprite)
    rank_item_sprite_specil: cc.Sprite = null;

    @property(cc.Node)
    rank_item_bottom: cc.Node = null;

    @property(cc.Sprite)
    rank_icon_sprite: cc.Sprite = null;
    @property(cc.Sprite)
    rank_player_avator_sprite: cc.Sprite = null;

    @property(cc.Sprite)
    rank_player_head_frame: cc.Sprite = null;

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

    update_data(rank_item_interface: RankItemInterface ,current_show_ui_type: RankCurrentShowUIType ,isSelf?: boolean){
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

        this.rank_player_name_label.string = `${rank_item_interface.key.name}`;

        if (isSelf) { // 如果是自己，特殊处理
            this.rank_player_name_label.node.color = cc.color(255 ,255 ,255 ,255);
            this.rank_item_bottom.y -= 20;
            reward_node.getChildByName(`sprite_bg`).getComponent(cc.Sprite).spriteFrame = null;
            value_node.getChildByName(`sprite_bg`).getComponent(cc.Sprite).spriteFrame = null;
            Loader.load_texture(`./UI/Rank/Normal/rankUI/${current_show_ui_type}/sprite_self_item_bg` ,(texture: cc.Texture2D) => {
                this.rank_item_sprite.spriteFrame = new cc.SpriteFrame(texture);
            });
            if(rank_item_interface.rank == 0){
                Loader.load_texture(`./UI/Rank/Normal/rankUI/${current_show_ui_type}/sprite_item_norank` ,(texture: cc.Texture2D) => {
                    this.rank_icon_sprite.spriteFrame = new cc.SpriteFrame(texture);
                });
            }
            else {
                this.rank_label.node.color = cc.color(255 ,255 ,255 ,255);
                this.rank_label.node.active = true;
                this.rank_label.string = `${rank_item_interface.rank}`;
                this.rank_icon_sprite.node.active = false;
            }
            return;
        }
        if(rank_item_interface.rank >= 1 && rank_item_interface.rank <= 3){
           this.rank_icon_sprite.node.active = true;
           this.rank_label.node.active = false;
           const icon_name_List = [`sprite_rank_gold` ,`sprite_rank_sliver` ,`sprite_rank_copper`];
           const need_change_ui_path = [
            `./UI/Rank/Normal/rankUI/${icon_name_List[rank_item_interface.rank - 1]}` ,
            `./UI/Rank/Normal/rankUI/sprite_item_bg1` ,
            `./UI/Rank/Normal/rankUI/sprite_head_frame1` ,
            `./UI/Rank/Normal/rankUI/sprite_money_bg1` ,
            `./UI/Rank/Normal/rankUI/sprite_money_bg1` ,
           ];
           const need_change_ui = [
               this.rank_icon_sprite ,
               this.rank_item_sprite ,
               this.rank_player_head_frame ,
               reward_node.getChildByName(`sprite_bg`).getComponent(cc.Sprite) ,
               value_node.getChildByName(`sprite_bg`).getComponent(cc.Sprite) 
           ];
           Loader.recursion_load_sprite_frame(need_change_ui_path ,(spriteFrame: cc.SpriteFrame ,index: number) => {
               need_change_ui[index] && (need_change_ui[index].spriteFrame = spriteFrame);
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
        }
        // else{
        //     this.rank_player_avator_sprite.node.active = false;
        // }
    }

    update_data_specil (rank_item_interface: RankItemInterface ,current_show_ui_type: RankCurrentShowUIType ,isSelf?: boolean) {
        const reward_node: cc.Node = cc.instantiate(this.rank_type_node);
        const reward_node_script: RankTypeNode = reward_node.getComponent(RankTypeNode);
        reward_node_script.set_value(`${rank_item_interface.reward}`);
        reward_node_script.set_color(cc.color(70 ,73 ,77 ,255));
        reward_node_script.set_width(160);
        reward_node.parent = this.rank_type_item_container;

        const value_node: cc.Node = cc.instantiate(this.rank_type_node);
        const value_node_script: RankTypeNode = value_node.getComponent(RankTypeNode);
        value_node_script.set_value(`${rank_item_interface.value}`);
        value_node_script.set_color(cc.color(70 ,73 ,77 ,255));
        value_node.parent = this.rank_type_item_container;
        value_node_script.set_width(80);

        this.rank_player_name_label.string = `${rank_item_interface.key.name}`;
        this.rank_player_name_label.node.color = cc.color(70 ,73 ,77 ,255);
        this.rank_label.node.color = cc.color(67 ,155 ,255 ,255);

        if (isSelf) { // 如果是自己，特殊处理
            reward_node_script.set_color(cc.color(67 ,155 ,255 ,255));
            value_node_script.set_color(cc.color(67 ,155 ,255 ,255));
            this.rank_item_sprite.node.active = false;
            this.rank_item_sprite_specil.node.active = true;
            this.rank_player_name_label.node.color = cc.color(70 ,73 ,77 ,255);
            reward_node.getChildByName(`sprite_bg`).getComponent(cc.Sprite).spriteFrame = null;
            value_node.getChildByName(`sprite_bg`).getComponent(cc.Sprite).spriteFrame = null;
            
            this.rank_label.fontSize = 30;
            this.rank_label.node.active = true;
            this.rank_label.string = `${rank_item_interface.rank == 0 ? "未上榜" : rank_item_interface.rank}`;
            this.rank_icon_sprite.node.active = false;
            Loader.load_texture(`./UI/Rank/Normal/rankUI/white/sprite_head_frame2` ,(texture: cc.Texture2D) => {
                this.rank_player_head_frame.spriteFrame = new cc.SpriteFrame(texture);
            });
            return;
        }
        reward_node.getChildByName(`sprite_bg`).getComponent(cc.Sprite).spriteFrame = null;
        value_node.getChildByName(`sprite_bg`).getComponent(cc.Sprite).spriteFrame = null; 
        this.rank_item_sprite.spriteFrame = null;
        if(rank_item_interface.rank >= 1 && rank_item_interface.rank <= 3){
           this.rank_icon_sprite.node.active = true;
           this.rank_label.node.active = false;
           const icon_name_List = [`sprite_rank_gold` ,`sprite_rank_sliver` ,`sprite_rank_copper`];
           const need_change_ui_path = [
            `./UI/Rank/Normal/rankUI/white/${icon_name_List[rank_item_interface.rank - 1]}` ,
            `./UI/Rank/Normal/rankUI/white/sprite_head_frame1` ,
           ];
           const need_change_ui = [
               this.rank_icon_sprite ,
               this.rank_player_head_frame ,
           ];
           Loader.recursion_load_sprite_frame(need_change_ui_path ,(spriteFrame: cc.SpriteFrame ,index: number) => {
               need_change_ui[index] && (need_change_ui[index].spriteFrame = spriteFrame);
           });
        }else{
            Loader.load_texture(`./UI/Rank/Normal/rankUI/white/sprite_head_frame2` ,(texture: cc.Texture2D) => {
                this.rank_player_head_frame.spriteFrame = new cc.SpriteFrame(texture);
            });
            this.rank_icon_sprite.node.active = false;
            this.rank_label.node.active = true;
            this.rank_label.string = `${rank_item_interface.rank == 0 ? "未上榜" : rank_item_interface.rank}`;
        }

        if(rank_item_interface.key.photoUrl){
            Loader.request_remote_image(rank_item_interface.key.photoUrl, (sprite_frame: cc.SpriteFrame) =>{
                this.rank_player_avator_sprite.spriteFrame = sprite_frame;
            });
        }
    }

    // update (dt) {}
}


export default RankViewItem;