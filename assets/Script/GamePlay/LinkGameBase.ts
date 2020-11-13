import DecorationData from "../GameLocalData/DecorationData";
import GamePlayBaseData from "../GameLocalData/GamePlayBaseData";
import GuideData from "../GameLocalData/GuideData";
import MenuData from "../GameLocalData/MenuData";
import OfflineData from "../GameLocalData/OfflineData";
import OrderMenuData from "../GameLocalData/OrderMenuData";
import PeopleData from "../GameLocalData/PeopleData";
import SeatData from "../GameLocalData/SeatData";
import StoreUpgradeData from "../GameLocalData/StoreUpgradeData";
import TableData from "../GameLocalData/TableData";
import UnlockMenuRewardData from "../GameLocalData/UnlockMenuRewardData";
import UIConfig from "../UI/UIManager/UIConfig";

class LinkGameBase {
   /**@description gameplay的本地存档疏忽 */
   static game_play_record: Array<any> = [
      GamePlayBaseData,
      TableData,
      DecorationData,
      PeopleData,
      MenuData,
      UnlockMenuRewardData,
      StoreUpgradeData,
      SeatData,
      OrderMenuData,
      OfflineData,
      GuideData,
   ];

   /**@description game_play 相关的事件 */
   static game_play_event_config: { [key: string]: string } = {
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
      "new_seat": "new_seat",
      "change_cook_woman_state": "change_cook_woman_state",
      "add_cook_woman": "add_cook_woman",
      //点菜
      "order_menu": "order_menu",
      //接单
      "receiving_menu": "receiving_menu",
      //炒菜完成
      "complete_cook_menu": "complete_cook_menu",
      //顾客付钱
      "customer_pay": "customer_pay",
      //新手引导消失
      "close_new_player_guide_view": "close_new_player_guide_view",
      //下一个新手引导
      "open_next_player_guide": "open_next_player_guide",
      //关闭提现界面
      "close_cash_out": "close_cash_out",
      //关闭打卡界面
      "close_click_on": "close_click_on",
      //飞金币
      "fly_coin": "fly_coin",
      //飞红心
      "fly_heart": "fly_heart",
      //桌子上显示奖励
      "show_table_gift": "show_table_gift",
      //成功观看广告
      "success_ad_video": "success_ad_video",
      //关闭扩建界面
      "close_store_view": "close_store_view",
   }

   /**
    * @description 忘GameBase里面注册ui界面的配置信息
    * @param ui_config_name 对应UI的prefab名称 (注意: prefab 名称 和 对应的脚本名称必须一致)
    * @param ui_path  对应prefab 相对于resources的相对地址
    */
   static register_ui_path(ui_config_name: string, ui_path: string) {
      if (!UIConfig[ui_config_name]) {
         UIConfig[ui_config_name] = ui_path;
      } else {
         console.error(`prefab${ui_config_name} 的路径已经存在 ${UIConfig[ui_config_name]}`);
      }
   }


}


export default LinkGameBase;