import { InviteFriendPath, OpenRedEnvelopePath } from "../../Common/CommonEnum";
import { RouterInterface } from "../../Common/CommonInterface";
import Controller from "../../Common/Controller";
import Loader from "../../Common/Loader";
import UIManager from "../UIManager/UIManager";
import NormalOpenRedEnvelopeView from "./Normal/NormalOpenRedEnvelopeView";
import OpenRedEnvelopeView from "./OpenRedEnvelopeView";

class OpenRedEnvelopeViewController extends Controller{
    public name: string = "OpenRedEnvelopeViewController"
    public view: OpenRedEnvelopeView = null;

    static open(open_red_envelope_route_path: OpenRedEnvelopePath, target_node?: cc.Node, x_offset ?: number, y_offset?: number){
        const open_red_envelope_router: RouterInterface = {
              controller: OpenRedEnvelopeViewController,
              ui_config_name:"OpenRedEnvelopeView",
              path:open_red_envelope_route_path,
              param:{
                  target_node: target_node,
                  x_offset:x_offset,
                  y_offset:y_offset,
              }
        }
        UIManager.nagivate_route(open_red_envelope_router);
    }


    init_view(){
        if(this.view.ui_param_interface.router.path == OpenRedEnvelopePath.normal){
            Loader.load_prefab("UI/OpenRedEnvelope/Normal/NormalOpenRedEnvelopeView", (prefab: cc.Prefab) => {
                console.log("成功加载 OpenRedEnvelopePath") 
                const normal_open_red_envelope_view: cc.Node = cc.instantiate(prefab);
                 normal_open_red_envelope_view.parent = this.view.node;
                const normal_open_red_envelope_view_script: NormalOpenRedEnvelopeView = normal_open_red_envelope_view.getComponent(NormalOpenRedEnvelopeView);
                const param = this.view.ui_param_interface.router.param;
                if(param && param.target_node){
                   normal_open_red_envelope_view_script.set_position_by_node(param.target_node, param.x_offset, param.y_offset);
                }
            });
        }else{
            console.log("当前")
        }
    }
}

export default OpenRedEnvelopeViewController;