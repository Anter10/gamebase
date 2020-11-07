import GuideData from "../GameLocalData/GuideData";
import UIConfig from "../UI/UIManager/UIConfig";

class LinkGameBase{
      /**@description gameplay的本地存档疏忽 */
      static game_play_record:Array<any> = [

      ];

      /**@description game_play 相关的事件 */
      static game_play_event_config = {
             /**@description 杀进程进游戏的时候 开始进来的时候的等待状态 */
             start_waiting:"start_waiting",
             /**@description 玩完一局游戏的时候 等待开始游戏的状态 */
             waiting: "waiting",
             /**@description 匹配的状态 */
             mating :"mating",
             /**@description 发牌的状态 */
             carding : "carding",
             /**@description 叫地主的状态 */
             lording :"lording",
             /**@description 亮底牌状态 */
             reveal_the_ins_and_outs : "reveal_the_ins_and_outs",
             /**@description 游戏中的状态 */
             gameing:"gameing",
             /**@description 游戏结束的状态 */
             end : "end",
             /**@description 刷新玩家排的显示逻辑 */
             flush_player_show_cards: "flush_player_show_cards",
             // 游戏中的事件
             /**@description 叫地主的事件 */
             call_lord: "call_lord",
             /**@description 不叫地主的事件 */
             no_call_lord: "no_call_lord",
             /**@description 翻牌 */
             convert_card: "convert_card",
             /**@description 玩家出牌的事件 */
             send_card: "send_card",
             /**@description 不要的事件 */
             no_send_card:"no_send_card",
             /**@description 显示玩家的操作按钮的信息 */
             show_player_play_buttons: "show_player_play_buttons",
      }

      /**
       * @description 忘GameBase里面注册ui界面的配置信息
       * @param ui_config_name 对应UI的prefab名称 (注意: prefab 名称 和 对应的脚本名称必须一致)
       * @param ui_path  对应prefab 相对于resources的相对地址
       */
      static register_ui_path(ui_config_name: string,ui_path: string){
          if(!UIConfig[ui_config_name]){
             UIConfig[ui_config_name] = ui_path;
          }else{
             console.error(`prefab${ui_config_name} 的路径已经存在 ${UIConfig[ui_config_name]}`);
          }
      }


}


export default LinkGameBase;