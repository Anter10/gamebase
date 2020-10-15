import GuideData from "../GameLocalData/GuideData";
import UIConfig from "../UI/UIManager/UIConfig";

class LinkGameBase{
      /**@description gameplay的本地存档疏忽 */
      static game_play_record:Array<any> = [

      ];

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