import { GuideFingerDirection, GuideMaskType, GuideNpcDirection, GuideType } from "./NewPlayerGuideEnum";

/**@description 新手引导的接口 */
interface NewPlayerGuideInterface{
      /**@description 引导ID */
      guide_id: number;
      /**@description 1: 方形 2: 圆形 */
      guide_mask_type: GuideMaskType;
      /**@description 引导类型 normal: 常规 picture: 整张图片 */ 
      guide_type: GuideType;
      /**@description 引导的回调方法 */
      callback: Function;

      /**@decription  显示手指 true 显示手指 false 不显示手指 */
      show_hand?: boolean;
      /**@description 手指的指向 */
      hand_finger_dir?: GuideFingerDirection;

      /**@description 显示NPC */
      show_npc?:boolean;
      /**@description 引导现实的NPC ID  */
      npc_id?: number;
      /**@description npc scaleX 设置NPC的方向 1: 向左 -1 向右 */
      npc_direction?: GuideNpcDirection;
      /**@description NPC 距离左边的位置 */
      npc_align_left?: number;
      /**@description NPC 距离右边的位置 和左边只能又一个 */
      npc_align_right?: number;

      /**@description 是否显示mask */
      show_mask?:boolean;
      /**@description 引导到的节点 */
      guide_to_node?: cc.Node;
      /**@description 引导的区域大小 如果为圆类型的话 直接取宽作为半径 */
      mask_size?: cc.Size;
      
      /**@description 是否显示帮助 */
      show_help_msg: boolean;
      /**@description 引导提示文本 需要 */
      help_message?: string;
      /**@description 全图引导的 帮助图片的纹理 */
      picture_type_spriteframe?: cc.SpriteFrame;
};


interface NewPlayerGuideUiInterface{

}


export {NewPlayerGuideUiInterface, NewPlayerGuideInterface}