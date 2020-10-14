import BaseUI from "../../Common/BaseUI";
import { RouterInterface, UIParamInterface } from "../../Common/CommonInterface";
import CashOutController from "../CashOut/CashOutController";
import UIConfig from "./UIConfig";

class UIManager{
      static all_ui: {[key: string]: BaseUI} = {};
      static ui_is_loading:  {[key: string]: boolean} = {};

      /**@description 直接显示UI */
      static show_ui(ui_param_interface:UIParamInterface){
          console.log("显示界面的参数 = ",ui_param_interface);
         if(!this.ui_is_loading[ui_param_interface.ui_config_name]){
            this.ui_is_loading[ui_param_interface.ui_config_name] = true;
            if(!this.all_ui[ui_param_interface.ui_config_name]){
                cc.resources.load(ui_param_interface.ui_config_path,cc.Prefab, (error: Error, prefab: cc.Prefab) => {
                    if(!error){
                        const ui = cc.instantiate(prefab);
                        const ui_script: BaseUI = ui.getComponent(ui_param_interface.ui_config_name);
                        ui_script.show(ui_param_interface);
                        ui_script.controller = ui_param_interface.controller;
                        if( ui_script.controller){
                            ui_script.controller.view = ui_script;
                        }
                        this.all_ui[ui_param_interface.ui_config_name] = ui_script;
                        this.ui_is_loading[ui_param_interface.ui_config_name] = false;
                        const keys = Object.keys(this.all_ui);
                        cc.director.getScene().addChild(ui, cc.macro.MAX_ZINDEX - 1000 + keys.length);
                    }else{
                        this.ui_is_loading[ui_param_interface.ui_config_name] = false;
                        console.error(`当前显示的UI: ${ui_param_interface.ui_config_path} 没有加载成功`);
                    }
              });
            }else{
                this.all_ui[ui_param_interface.ui_config_name].controller = ui_param_interface.controller;
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

      /**@description 如果需要controller 控制的话 使用路由这个来显示界面 */
      static nagivate_route(router: RouterInterface){
             const controller = new router.controller();
             const ui_param: UIParamInterface = {
                   ui_config_path: UIConfig[router.ui_config_name],
                   ui_config_name: router.ui_config_name,
                   controller: controller,
                   param: router.param,
                   router: router,
             }

            UIManager.show_ui(ui_param);
      }

      static test(){
           const roter: RouterInterface = {
                 controller: CashOutController,
                 ui_config_name: "CashOutView",
                 param:{},
           }

           this.nagivate_route(roter);
      }

      /**@description 清空所有界面 */
      static clear_ui(){
          const ui_config_names = Object.keys(this.all_ui);
          for(const ui_config_name of ui_config_names){
              const node = this.all_ui[ui_config_name].node;
              if(cc.isValid(node)){
                  node.destroy();
              }
          }

          this.all_ui = {};
          this.ui_is_loading = {};
      }

      

}


export default UIManager;