
interface NewPlayerGuideInterface{
      /**@description 引导ID */
      guide_id: number;
      /**@description 引导到的节点 */
      guide_to_node?: cc.Node;
      /**@description 0:没有mask 1: 方形 2: 圆形  */
      guide_mask_type: number;
      /**@description 引导的回调方法 */
      call_backback: Function;
      /**@description 引导的区域大小 */
      react?: cc.Rect;
      /**@description 引导文本 */
      help_message?: string;
      /**@description 引导圆的半径 */
      radius?:number;
      /**@description 引导现实的NPC ID  */
      npc_id: number;
      /**@decription 显示手指 */
      show_hand: boolean;
      /**@description 手指的指向 */
      hand_finger_dir: number;
}


export {NewPlayerGuideInterface}