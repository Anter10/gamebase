
/**@description 新手引导的蒙版层 */

import BaseUI from "../../Common/BaseUI";
import { TouchButtonEffectType } from "../../Common/CommonEnum";
import { UIParamInterface } from "../../Common/CommonInterface";
import TouchButton from "../../Common/TouchButton";
import GameLocalData from "../../GameLocalData/GameLocalData";
import GuideData from "../../GameLocalData/GuideData";
import UIConfig from "../UIManager/UIConfig";
import UIManager from "../UIManager/UIManager";
import { GuideFingerDirection, GuideMaskType, GuideMsgAlignHorizontalMode, GuideMsgAlignVerticleMode, GuideNpcAlignHorizontalMode, GuideNpcAlignVerticleMode, GuideNpcDirection, GuideType } from "./NewPlayerGuideEnum";
import { GuideHandeInterface, GuideHelpMsgInterface, GuideMaskInterface, GuideNpcInterface, NewPlayerGuideInterface } from "./NewPlayerGuideInterface";

const { ccclass, property } = cc._decorator;

@ccclass
class NewPlayerGuideView extends BaseUI {

    @property(cc.Mask)
    help_guide_mask: cc.Mask = null;

    @property(cc.Label)
    help_message_label:cc.Label = null;

    @property(cc.Node)
    help_message_bottom:cc.Node = null;
    @property(cc.Node)
    click_button: cc.Node = null;

    @property(cc.Sprite)
    hand_icon: cc.Sprite = null;
    @property(cc.Sprite)
    help_mask_background:cc.Node = null;
    @property(cc.Sprite)
    npc_icon: cc.Sprite = null;

    new_player_guide_interface: NewPlayerGuideInterface = null;

    /**
     * 
     * @param guide_id 引导的ID
     * @param guide_mask_type 引导的mask 类型
     * @param guide_type 引导类型
     * @param callback 引导回调函数
     * @param help_msg 引导提示信息
     * @param help_mask 引导mask信息
     * @param help_hand 引导手指的信息
     * @param help_npc  引导NPC的信息 npc的图片默认是朝向右边的
     */
    static show_guide(
        guide_id: number, 
        guide_type: GuideType,
        guide_to_node: cc.Node,
        callback: Function,
        help_msg?:GuideHelpMsgInterface,
        help_mask?:GuideMaskInterface,
        help_hand?:GuideHandeInterface,
        help_npc?:GuideNpcInterface
    ){
        const new_player_guide_interface:NewPlayerGuideInterface = {
            guide_id : guide_id,
            guide_type: guide_type,
            callback: callback,
            guide_to_node: guide_to_node,

            guide_hande_interface: help_hand,
            guide_npc_interface: help_npc,
            guide_mask_interface: help_mask,
            guide_help_msg_interface: help_msg,
        }

        const ui_parameter: UIParamInterface = {
            ui_config_path: UIConfig.NewPlayerGuideView ,
            ui_config_name: "NewPlayerGuideView",
            param:  new_player_guide_interface,
            complete_callback:(guide:NewPlayerGuideView)=>{
                guide.show_new_player_guide_msg(guide.ui_param_interface.param);
            }
        }

        UIManager.show_ui(ui_parameter);
    }

    onLoad(){
        super.onLoad();
        const touch_button: TouchButton = this.click_button.addComponent(TouchButton);
        touch_button.register_touch(this.help_guide_callback.bind(this));
    }
    
    register_touch(touch_callback: Function){
        const touch_button: TouchButton = this.click_button.addComponent(TouchButton);
        touch_button.register_touch(()=>{
            touch_callback && touch_callback();
        },null,null,TouchButtonEffectType.none);
    }

    show(ui_param_interface: UIParamInterface){
        super.show(ui_param_interface);
        console.log("新手引导数据 ",ui_param_interface);
    }

    show_new_player_guide_msg(new_player_guide_interface: NewPlayerGuideInterface) {
        this.new_player_guide_interface = new_player_guide_interface;

        let target_node_pos = cc.v3(0,0,0);


        if(this.new_player_guide_interface.guide_to_node){
            let click_node_word_space = this.new_player_guide_interface.guide_to_node.parent.convertToWorldSpaceAR(this.new_player_guide_interface.guide_to_node.position);
            target_node_pos = this.node.parent.convertToNodeSpaceAR(click_node_word_space);
            this.click_button.position = target_node_pos;
        }

        console.log("引导到的目标位置 = ", target_node_pos);


        // 处理手指的逻辑
        this.hand_icon.node.active = this.new_player_guide_interface.guide_hande_interface.show_hand;
        if(this.new_player_guide_interface.guide_hande_interface.show_hand){
           this.hand_icon.node.active = this.new_player_guide_interface.guide_hande_interface.show_hand;
           
           const handle_direction: GuideFingerDirection = this.new_player_guide_interface.guide_hande_interface.hand_finger_dir;
           if(handle_direction == GuideFingerDirection.up){
             this.hand_icon.node.angle = 180;
           }else if(handle_direction == GuideFingerDirection.down){
             this.hand_icon.node.angle = 0;
           }else if(handle_direction == GuideFingerDirection.left){
             this.hand_icon.node.angle = 270;
           }else if(handle_direction == GuideFingerDirection.right){
             this.hand_icon.node.angle = 90;
           }

           if(this.new_player_guide_interface.guide_hande_interface.hand_angle){
               this.hand_icon.node.angle = this.new_player_guide_interface.guide_hande_interface.hand_angle;
           }

           if(this.new_player_guide_interface.guide_hande_interface.hand_position_offset){
              this.hand_icon.node.position = target_node_pos.addSelf(this.new_player_guide_interface.guide_hande_interface.hand_position_offset);
           }else{
              this.hand_icon.node.position = target_node_pos;
           }
        }

        // 处理mask的逻辑
        
        if(this.new_player_guide_interface.guide_mask_interface.show_mask){

            if(this.new_player_guide_interface.guide_mask_interface.guide_mask_type == GuideMaskType.circle){
               this.help_guide_mask.node.width = this.new_player_guide_interface.guide_mask_interface.mask_size.width;
               this.help_guide_mask.node.height = this.new_player_guide_interface.guide_mask_interface.mask_size.height;
               this.help_guide_mask.type = cc.Mask.Type.ELLIPSE;
            }else if(this.new_player_guide_interface.guide_mask_interface.guide_mask_type == GuideMaskType.rect){
                this.help_guide_mask.node.width = this.new_player_guide_interface.guide_mask_interface.mask_size.width;
                this.help_guide_mask.node.height = this.new_player_guide_interface.guide_mask_interface.mask_size.height;
                this.help_guide_mask.type = cc.Mask.Type.RECT;
            }

            this.help_guide_mask.node.position = target_node_pos;

            if(this.new_player_guide_interface.guide_mask_interface.mask_animation){
                this.play_mask_animation();
            }else{
                this.stop_mask_animation();
            }

            this.click_button.width = this.new_player_guide_interface.guide_mask_interface.mask_size.width;
            this.click_button.height = this.new_player_guide_interface.guide_mask_interface.mask_size.height;

        }else{
            this.help_guide_mask.node.width = 0;
            this.help_guide_mask.node.height = 0;
            this.click_button.width = 0;
            this.click_button.height = 0;

            this.stop_mask_animation();
        }
        
        

        // 处理帮助文本提示的逻辑
        this.help_message_bottom.active = this.new_player_guide_interface.guide_help_msg_interface.show_help_msg;
        if(this.new_player_guide_interface.guide_help_msg_interface.show_help_msg){
            this.help_message_label.string = this.new_player_guide_interface.guide_help_msg_interface.help_message;
            
            const widget: cc.Widget = this.help_message_bottom.getComponent(cc.Widget); 
           if(this.new_player_guide_interface.guide_help_msg_interface.size){
               this.help_message_bottom.width = this.new_player_guide_interface.guide_help_msg_interface.size.x;
               this.help_message_bottom.height = this.new_player_guide_interface.guide_help_msg_interface.size.y;
           }

            if(this.new_player_guide_interface.guide_help_msg_interface.horizonal_align_mode == GuideMsgAlignHorizontalMode.left){
               widget.isAlignLeft = true;
               widget.isAlignRight = false;
               widget.left = this.new_player_guide_interface.guide_help_msg_interface.horizonal_align;
            }else if(this.new_player_guide_interface.guide_help_msg_interface.horizonal_align_mode == GuideMsgAlignHorizontalMode.right){
               widget.isAlignLeft = false;
               widget.isAlignRight = true;
               widget.right = this.new_player_guide_interface.guide_help_msg_interface.horizonal_align;
            }
          
 
            if(this.new_player_guide_interface.guide_help_msg_interface.verticle_align_mode == GuideMsgAlignVerticleMode.top){
               widget.isAlignTop = true;
               widget.isAlignBottom = false;
               widget.top = this.new_player_guide_interface.guide_help_msg_interface.verticle_align;
            }else if(this.new_player_guide_interface.guide_help_msg_interface.verticle_align_mode == GuideMsgAlignVerticleMode.bottom){
               widget.isAlignTop = false;
               widget.isAlignBottom = true;
               widget.bottom = this.new_player_guide_interface.guide_help_msg_interface.verticle_align;
           }
 
           widget.isStretchWidth = false;
           widget.isStretchHeight = false;
           widget.updateAlignment();
        }

        // 处理NPC的逻辑
        this.npc_icon.node.active = this.new_player_guide_interface.guide_npc_interface.show_npc;
        if(this.new_player_guide_interface.guide_npc_interface.show_npc){
           
           if(this.new_player_guide_interface.guide_npc_interface.npc_direction == GuideNpcDirection.left){
              this.npc_icon.node.scaleX = -(Math.abs(this.npc_icon.node.scale)); 
           }else if(this.new_player_guide_interface.guide_npc_interface.npc_direction == GuideNpcDirection.right){
              this.npc_icon.node.scaleX = Math.abs(this.npc_icon.node.scale); 
           }else{
              this.npc_icon.node.scaleX = Math.abs(this.npc_icon.node.scale); 
           }

           if(this.new_player_guide_interface.guide_npc_interface.npc_sprite_frame){
              this.npc_icon.spriteFrame = this.new_player_guide_interface.guide_npc_interface.npc_sprite_frame;
           }

           if(this.new_player_guide_interface.guide_npc_interface.size){
               this.npc_icon.node.width = this.new_player_guide_interface.guide_npc_interface.size.x;
               this.npc_icon.node.height = this.new_player_guide_interface.guide_npc_interface.size.y;
           }
           const widget: cc.Widget = this.npc_icon.node.getComponent(cc.Widget); 
           
           if(this.new_player_guide_interface.guide_npc_interface.horizonal_align_mode == GuideNpcAlignHorizontalMode.left){
              widget.isAlignLeft = true;
              widget.isAlignRight = false;
              widget.left = this.new_player_guide_interface.guide_npc_interface.horizonal_align;
           }else if(this.new_player_guide_interface.guide_npc_interface.horizonal_align_mode == GuideNpcAlignHorizontalMode.right){
              widget.isAlignLeft = false;
              widget.isAlignRight = true;
              widget.right = this.new_player_guide_interface.guide_npc_interface.horizonal_align;
           }
         

           if(this.new_player_guide_interface.guide_npc_interface.verticle_align_mode == GuideNpcAlignVerticleMode.top){
              widget.isAlignTop = true;
              widget.isAlignBottom = false;
              widget.top = this.new_player_guide_interface.guide_npc_interface.verticle_align;
           }else if(this.new_player_guide_interface.guide_npc_interface.verticle_align_mode == GuideNpcAlignVerticleMode.bottom){
              widget.isAlignTop = false;
              widget.isAlignBottom = true;
              widget.bottom = this.new_player_guide_interface.guide_npc_interface.verticle_align;
          }

          widget.isStretchWidth = false;
          widget.isStretchHeight = false;
          widget.updateAlignment();
        }
    }

    play_mask_animation(){
        const animation = this.help_guide_mask.node.getComponent(cc.Animation);
        animation.play("new_help_guide_mask_animation");
    }

    stop_mask_animation(){
        const animation = this.help_guide_mask.node.getComponent(cc.Animation);
        animation.stop("new_help_guide_mask_animation");
    }

    help_guide_callback() {
        this.on_close_call();
        let new_player_guide_data:GuideData = GameLocalData.get_instance().get_data(GuideData);
        new_player_guide_data.pass_a_guide(this.new_player_guide_interface.guide_id);
        this.new_player_guide_interface.callback && this.new_player_guide_interface.callback();
    }
}



export default NewPlayerGuideView;