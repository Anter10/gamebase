import { InviteFriendPath } from "../../Common/CommonEnum";
import { RouterInterface } from "../../Common/CommonInterface";
import Controller from "../../Common/Controller";
import Loader from "../../Common/Loader";
import CommonServerData from "../../GameServerData/CommonServerData";
import UIManager from "../UIManager/UIManager";
import { ShareInterface } from "./InviteFriendInterface";
import InviteFriendView from "./InviteFriendView";
import NormalInviteFriendView from "./Normal/NormalInviteFriendView";


/**@description 邀请好友界面的控制器 */
class InviteFriendViewController extends Controller{
    public name: string = "InviteFriendViewController";
    public view: InviteFriendView = null;

    public normal_invite_friend_view: NormalInviteFriendView = null;
    public share_interface: ShareInterface = null;

    static open(invite_friend_route_path: InviteFriendPath){
        const invite_friend_router: RouterInterface = {
              controller: InviteFriendViewController,
              ui_config_name:"InviteFriendView",
              path:invite_friend_route_path,
        }

        UIManager.nagivate_route(invite_friend_router);
    }

    init_view(){
        if(this.view.ui_param_interface.router.path == InviteFriendPath.normal){
            Loader.load_prefab("UI/InviteFriend/Normal/NormalInviteFriendView", (prefab: cc.Prefab) => {
                 const normal_invite_friend_view = cc.instantiate(prefab);
                 normal_invite_friend_view.parent = this.view.node;
                 this.normal_invite_friend_view = normal_invite_friend_view.getComponent(NormalInviteFriendView);
            });
        }else{
            console.log("当前")
        }
    }

    update_view(){
        CommonServerData.get_invite_friends((share_interface: ShareInterface)=>{
            if(share_interface){
                this.share_interface = share_interface;
                if(share_interface.stages){
                    if(this.view.ui_param_interface.router.path == InviteFriendPath.normal){
                        this.normal_invite_friend_view.update_view(share_interface.stages);
                    }else{
                        console.log("当前页面显示失败")
                    }
                }else{
                    console.log("没有获得分享数据");
                }
            }else{
                console.log("功能没有开启");
            }
        })
    }

}


export default InviteFriendViewController;