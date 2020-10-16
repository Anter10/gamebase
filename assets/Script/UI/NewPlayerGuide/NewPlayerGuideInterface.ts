import { GuideMsgAlignHorizontalMode, GuideMsgAlignVerticleMode, GuideNpcAlignHorizontalMode, GuideNpcAlignVerticleMode } from "../../Common/CommonEnum";
import { GuideFingerDirection, GuideMaskType, GuideNpcDirection, GuideType } from "./NewPlayerGuideEnum";

/**@description 新手引导的手指引导的数据 */
interface GuideHandeInterface{
      /**@decription  显示手指 true 显示手指 false 不显示手指 */
      show_hand?: boolean;
      /**@description 手指的指向 */
      hand_finger_dir?: GuideFingerDirection;
      /**@description 位置偏移 cc.Position */
      hand_position_offset?: cc.Vec3;
      /**@description 自定义手指的旋转 */
      hand_angle?:number,
}

/**@description 新手引导中的NPC的控制接口 */
interface GuideNpcInterface{
      /**@description 显示NPC */
      show_npc?:boolean;
      /**@description 引导现实的NPC ID  */
      npc_sprite_frame?: cc.SpriteFrame;
      /**@description npc scaleX 设置NPC的方向 1: 向左 -1 向右 */
      npc_direction?: GuideNpcDirection;
      /**@description NPC 水平方向的适配位置 */
      horizonal_align_mode?: GuideNpcAlignHorizontalMode;
      /**@description NPC 水平方向的距离 */
      horizonal_align?: number;
      /**@description NPC 水平方向的适配位置 */
      verticle_align_mode?: GuideNpcAlignVerticleMode;
      /**@description NPC 水平方向的距离 */
      verticle_align?: number;
}

/**@description 新手引导中的MASK的控制接口 */
interface GuideMaskInterface{
      /**@description 是否显示mask */
      show_mask?:boolean;
      /**@description 引导到的节点 */
      guide_to_node?: cc.Node;
      /**@description 引导的区域大小 如果为圆类型的话 直接取宽作为半径 */
      mask_size?: cc.Size;
      /**@description 新手引导是否有mask的缩放动画 */
      mask_animation?: boolean;
      /**@description 1: 方形 2: 圆形 */
      guide_mask_type?: GuideMaskType;
}

interface GuideHelpMsgInterface{
      /**@description 是否显示帮助 */
      show_help_msg?: boolean;
      /**@description 引导提示文本 需要 */
      help_message?: string;
      /**@description 全图引导的 帮助图片的纹理 */
      picture_type_spriteframe?: cc.SpriteFrame;
      /**@description 对话框 水平方向上的对其模式 */
      horizonal_align_mode?: GuideMsgAlignHorizontalMode,
      /**@description 水平方向上的偏移 */
      horizonal_align?: number;
      /**@description 对话框 垂直方向上的对其模式 */
      verticle_align_mode?:GuideMsgAlignVerticleMode;
      /**@description 垂直方向上的偏移 */
      verticle_align?: number;
}



/**@description 新手引导的接口 */
interface NewPlayerGuideInterface{
      /**@description 引导ID */
      guide_id: number;
      /**@description 引导类型 normal: 常规 picture: 整张图片 */ 
      guide_type: GuideType;
      /**@description 引导的节点 */
      guide_to_node: cc.Node;
      /**@description 引导的回调方法 */
      callback: Function;
      /**@description 控制手指的接口 */
      guide_hande_interface:GuideHandeInterface;
      /**@description 控制NPC的接口 */
      guide_npc_interface: GuideNpcInterface;
      /**@description 控制mask的接口 */
      guide_mask_interface: GuideMaskInterface;
      /**@description 控制提示信息的接口 */
      guide_help_msg_interface:GuideHelpMsgInterface;
};


interface NewPlayerGuideUiInterface{

}


export {GuideHandeInterface,GuideNpcInterface,GuideMaskInterface,GuideHelpMsgInterface, NewPlayerGuideUiInterface, NewPlayerGuideInterface}