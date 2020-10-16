
/**@description 新手引导的蒙版层 */

import BaseUI from "../../Common/BaseUI";
import { UIParamInterface } from "../../Common/CommonInterface";
import TouchButton from "../../Common/TouchButton";
import GameLocalData from "../../GameLocalData/GameLocalData";
import GuideData from "../../GameLocalData/GuideData";
import UIConfig from "../UIManager/UIConfig";
import UIManager from "../UIManager/UIManager";
import { GuideFingerDirection, GuideMaskType, GuideNpcDirection, GuideType } from "./NewPlayerGuideEnum";
import { NewPlayerGuideInterface } from "./NewPlayerGuideInterface";

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
     * @param guide_id type: number 引导ID
     * @param guide_mask_type type: GuideMaskType 1: 方形 2: 圆形
     * @param guide_type type: GuideType 引导类型 normal: 常规 picture: 整张图片
     * @param callback type: Function 这次新手的回调函数
     * @param show_hand type:boolean 显示手指 true 显示手指 false 不显示手指
     * @param hand_finger_dir type:GuideNpcDirection  手指的指向 
     * @param show_npc type: boolean 显示NPC 
     * @param npc_id type: number 引导显示的NPC ID
     * @param npc_direction type:GuideFingerDirection npc NPC的方向 1: 向左 -1 向右
     * @param npc_align_left type: number  NPC 距离左边的位置 和右边正能有一个
     * @param npc_align_right type: number NPC 距离右边的位置 和左边只能又一个
     * @param show_mask type: boolean 是否显示mask
     * @param guide_to_node type: cc.Node mask 引导到的节点
     * @param mask_size type: cc.Size 引导的区域大小 如果为圆类型的话 直接取宽作为半径 
     * @param show_help_msg type: boolean 是否显示帮助
     * @param help_message type: string 引导提示文本 需要
     * @param picture_type_spriteframe type: cc.SpriteFrame  全图引导的 帮助图片的纹理
     */
    static show_guide(guide_id: number, guide_mask_type: GuideMaskType, guide_type: GuideType, callback: Function,
        show_hand?: boolean, hand_finger_dir?: GuideFingerDirection, 
        show_npc?:boolean,npc_id?: number,npc_direction?:GuideNpcDirection,npc_align_left?: number,npc_align_right?:number,
        show_mask?:boolean, guide_to_node?:cc.Node,mask_size?: cc.Size,
        show_help_msg?:boolean, help_message?: string, picture_type_spriteframe?: cc.SpriteFrame,
    ){
        const new_player_guide_interface:NewPlayerGuideInterface = {
            guide_id : guide_id,
            guide_mask_type: guide_mask_type,
            guide_type: guide_type,
            callback: callback,
            show_hand: show_hand,
            hand_finger_dir: hand_finger_dir,
            show_npc:show_npc,
            npc_id: npc_id,
            npc_direction: npc_direction,
            npc_align_left: npc_align_left,
            npc_align_right: npc_align_right,
            show_mask:show_mask,
            guide_to_node: guide_to_node,
            mask_size: mask_size,
            show_help_msg: show_help_msg,
            help_message: help_message,
            picture_type_spriteframe: picture_type_spriteframe,
        }

        const ui_parameter: UIParamInterface = {
            ui_config_path: UIConfig.NewPlayerGuideView ,
            ui_config_name: "NewPlayerGuideView",
            param:  new_player_guide_interface,
        }

        UIManager.show_ui(ui_parameter);
    }

    onLoad(){
        super.onLoad();
        const touch_button: TouchButton = this.click_button.addComponent(TouchButton);
        console.log(this.ui_param_interface);
    }

    show_new_player_guide_msg(new_player_guide_interface: NewPlayerGuideInterface) {
        this.new_player_guide_interface = new_player_guide_interface;

        // 处理手指的逻辑
        if(this.new_player_guide_interface.show_hand){
            // this.hand
        }
        // this.help_guide_area_node.width = this.new_player_guide_interface
        // this.help_guide_area_node.height = GuideConfig[new_player_guide.guide_id][1];
        // this.click_button.width = GuideConfig[new_player_guide.guide_id][0];
        // this.click_button.height = GuideConfig[new_player_guide.guide_id][1];
        // this.finger_effect.angle = GuideConfig[new_player_guide.guide_id][2];
        // this.finger_effect.active = GuideConfig[new_player_guide.guide_id][3];
        // this.mask_sprite.active = GuideConfig[new_player_guide.guide_id][6];
        // this.help_guide_tip_label.node.active = GuideConfig[new_player_guide.guide_id][4];
        // this.write_background.active = GuideConfig[new_player_guide.guide_id][4];
        // if (this.help_guide_tip_label.node.active) {
        //     this.help_guide_tip_label.string = GuideConfig[new_player_guide.guide_id][5];
        // }
        // let click_node = new_player_guide.guide_node;
        // let click_node_word_space = click_node.parent.convertToWorldSpaceAR(click_node.position);
        // let pos = this.node.parent.convertToNodeSpaceAR(click_node_word_space);
        // this.help_guide_area_node.setPosition(pos);
        // this.finger_effect.setPosition(pos);
        // this.click_button.setPosition(pos);

    }

    help_guide_callback() {
        this.on_close_call();
        let new_player_guide_data:GuideData = GameLocalData.get_instance().get_data(GuideData);
        new_player_guide_data.pass_a_guide(this.new_player_guide_interface.guide_id);
        this.new_player_guide_interface.callback && this.new_player_guide_interface.callback();
    }
}



export default NewPlayerGuideView;