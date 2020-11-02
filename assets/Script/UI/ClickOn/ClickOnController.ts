import { ClickOnRouterPath } from "../../Common/CommonEnum";
import { RouterInterface } from "../../Common/CommonInterface";
import Controller from "../../Common/Controller";
import Loader from "../../Common/Loader";
import UIManager from "../UIManager/UIManager";
import ClickOnView from "./ClickOnView";

/**@description 打卡的控制器 */
class ClickOnController implements Controller{
    public name: string = "ClickOnController";
    public view: ClickOnView  = null;


    static open(click_on_router_path: ClickOnRouterPath){
        const click_router: RouterInterface = {
              controller: ClickOnController,
              ui_config_name:"ClickOnView",
              path:click_on_router_path,
        }

        UIManager.nagivate_route(click_router);
    }

    init_view(){
        // 现金类型的提现模块
        if(this.view.ui_param_interface.router.path == ClickOnRouterPath.normal){
            Loader.load_prefab("./UI/ClickOn/Normal/NormalClickOnView", (prefab: cc.Prefab) => {
                 const normal_click_on_view = cc.instantiate(prefab);
                 normal_click_on_view.parent = this.view.node;
            });
        }else{
            console.log("当前")
        }
    }
}


export default ClickOnController;