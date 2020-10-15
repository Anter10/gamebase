import { RankRouterPath } from "../../Common/CommonEnum";
import { RouterInterface } from "../../Common/CommonInterface";
import Controller from "../../Common/Controller";
import Loader from "../../Common/Loader";
import UIManager from "../UIManager/UIManager";
import RankView from "./RankView";

/**@description 排行榜的控制器 */
class RankViewController implements Controller{
      public name: string = "RankViewController";
      public view: RankView = null;
      
      static open(rank_route_path: RankRouterPath){
            const rank_router: RouterInterface = {
                  controller: RankViewController,
                  ui_config_name:"RankView",
                  path:rank_route_path,
            }
    
            UIManager.nagivate_route(rank_router);
      }

      init_view(){
          console.log("rank normal view");
              // 现金类型的提现模块
          if(this.view.ui_param_interface.router.path == RankRouterPath.normal){
              Loader.load_prefab("UI/Rank/Normal/NormalRankView", (prefab: cc.Prefab) => {
                   const normal_click_on_view = cc.instantiate(prefab);
                   normal_click_on_view.parent = this.view.node;
              });
          }else{
              console.log("当前")
          }
      }
}

export default RankViewController;