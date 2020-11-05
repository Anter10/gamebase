import { ClickOnRouterPath } from "../../Common/CommonEnum";
import { RouterInterface } from "../../Common/CommonInterface";
import Controller from "../../Common/Controller";
import Loader from "../../Common/Loader";
import CommonServerData from "../../GameServerData/CommonServerData";
import UIManager from "../UIManager/UIManager";
import { ClockInTitleType } from "./ClickOnEnum";
import ClickOnView from "./ClickOnView";
import NormalClickOnView from "./Normal/NormalClickOnView";

/**@description 打卡的控制器 */
class ClickOnController implements Controller {
    public name: string = "ClickOnController";
    public view: ClickOnView = null;
    public normal_click_on_view: NormalClickOnView = null;

    static open(click_on_router_path: ClickOnRouterPath) {
        const click_router: RouterInterface = {
            controller: ClickOnController,
            ui_config_name: "ClickOnView",
            path: click_on_router_path,
        }

        UIManager.nagivate_route(click_router);
    }

    init_view() {
        // 现金类型的提现模块
        if (this.view.ui_param_interface.router.path == ClickOnRouterPath.normal) {
            console.log("click on view 1");
            Loader.load_prefab("./UI/ClickOn/Normal/NormalClickOnView", (prefab: cc.Prefab) => {
                const normal_click_on_view = cc.instantiate(prefab);
                normal_click_on_view.parent = this.view.node;
                this.normal_click_on_view = normal_click_on_view.getComponent(NormalClickOnView);
                this.get_clock_in_data();
                console.log("click on view 2");
            });
        } else {
            console.log("当前")
        }
    }

    get_clock_in_data() {
        CommonServerData.get_clock_in((data: any) => {
            cc.log(`当前打卡数据:${JSON.stringify(data)}`)
            this.normal_click_on_view.init_view(data);
        } ,true);
    }
}


export default ClickOnController;