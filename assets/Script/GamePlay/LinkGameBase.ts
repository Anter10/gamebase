import DecorationData from "../GameLocalData/DecorationData";
import GamePlayBaseData from "../GameLocalData/GamePlayBaseData";
import MenuData from "../GameLocalData/MenuData";
import PeopleData from "../GameLocalData/PeopleData";
import SeatData from "../GameLocalData/SeatData";
import StoreUpgradeData from "../GameLocalData/StoreUpgradeData";
import TableData from "../GameLocalData/TableData";
import UnlockMenuRewardData from "../GameLocalData/UnlockMenuRewardData";
import UIConfig from "../UI/UIManager/UIConfig";

class LinkGameBase{
      /**@description gameplay的本地存档疏忽 */
      static game_play_record:Array<any> = [
         GamePlayBaseData,
         TableData,
         DecorationData,
         PeopleData,
         MenuData,
         UnlockMenuRewardData,
         StoreUpgradeData,
         SeatData,
      ];

      /**@description game_play 相关的事件 */
      static game_play_event_config:{[key: string]:string} = {
         "change_gold_coin_number": "change_gold_coin_number",
         "change_red_heart_number": "change_red_heart_number",
         "upgrade_table": "upgrade_table",
         "upgrade_decoration": "upgrade_decoration",
         "upgrade_cook_woman_level": "upgrade_cook_woman_level",
         "unlock_menu_reward": "unlock_menu_reward",
         "upgrade_store_level": "upgrade_store_level",
         "click_store_button": "click_store_button",
         "select_store_level": "select_store_level",
         "add_customer": "add_customer",
         "finish_menu": "finish_menu",
         //桌子扩建了。人走了。
         "new_seat": "new_seat",
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