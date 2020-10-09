import { gamebase } from "../../Boot";
import BaseUI from "../Common/BaseUI";
import UIParamInterface from "./UIParamInterface";

class UIManager{
      static all_ui: {[key: string]: BaseUI} = {};
      static ui_is_loading:  {[key: string]: boolean} = {};

      static show_ui(ui_param_interface:UIParamInterface){
         if(!this.ui_is_loading[ui_param_interface.ui_config_name]){
            this.ui_is_loading[ui_param_interface.ui_config_name] = true;
            if(!this.all_ui[ui_param_interface.ui_config_name]){
                cc.resources.load(ui_param_interface.ui_config_path,cc.Prefab, (error: Error, prefab: cc.Prefab) => {
                    if(!error){
                        const ui = cc.instantiate(prefab);
                        cc.director.getScene().addChild(ui, cc.macro.MAX_ZINDEX);
                        const ui_script: BaseUI = ui.getComponent(ui_param_interface.ui_config_name);
                        ui_script.show(ui_param_interface);
                        this.all_ui[ui_param_interface.ui_config_name] = ui_script;
                        this.ui_is_loading[ui_param_interface.ui_config_name] = false;
                    }else{
                        this.ui_is_loading[ui_param_interface.ui_config_name] = false;
                        console.error(`当前显示的UI: ${ui_param_interface.ui_config_path} 没有加载成功`);
                    }
              });
            }else{
                this.all_ui[ui_param_interface.ui_config_name].show(ui_param_interface);
                this.ui_is_loading[ui_param_interface.ui_config_name] = false;
            }
        }
      }

      static close_ui(ui_config_name: string){
             if(this.all_ui[ui_config_name]){
                this.all_ui[ui_config_name].hide();
             }
      }

}


export default UIManager;