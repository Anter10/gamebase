import { InviteFriendPath } from "../../Common/CommonEnum";
import { RouterInterface } from "../../Common/CommonInterface";
import Controller from "../../Common/Controller";
import Loader from "../../Common/Loader";
import UIManager from "../UIManager/UIManager";
import InviteFriendView from "./InviteFriendView";


/**@description 邀请好友界面的控制器 */
class InviteFriendViewController extends Controller{
    public name: string = "InviteFriendViewController";
    public view: InviteFriendView = null;

    static open(invite_friend_route_path: InviteFriendPath){
        const invite_friend_router: RouterInterface = {
              controller: InviteFriendViewController,
              ui_config_name:"InviteFriendView",
              path:invite_friend_route_path,
        }

        UIManager.nagivate_route(invite_friend_router);
    }

    init_view(){
        console.log("this.view.ui_param_interface ",this.view.ui_param_interface);
        if(this.view.ui_param_interface.router.path == InviteFriendPath.normal){
            Loader.load_prefab("UI/InviteFriend/Normal/NormalInviteFriendView", (prefab: cc.Prefab) => {
                 const normal_click_on_view = cc.instantiate(prefab);
                 normal_click_on_view.parent = this.view.node;
            });
        }else{
            console.log("当前")
        }
    }

}


export default InviteFriendViewController;