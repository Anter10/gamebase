import { RankRouterPath } from "../../Common/CommonEnum";
import { RouterInterface } from "../../Common/CommonInterface";
import Controller from "../../Common/Controller";
import Loader from "../../Common/Loader";
import CommonServerData from "../../GameServerData/CommonServerData";
import UIManager from "../UIManager/UIManager";
import NormalRankView from "./Normal/NormalRankView";
import { RankInterface } from "./RankInterface";
import RankView from "./RankView";

/**@description 排行榜的控制器 */
class RankViewController implements Controller{
      public name: string = "RankViewController";
      public view: RankView = null;
      public normal_rank_view: NormalRankView = null;
      
      static open(rank_route_path: RankRouterPath){
            const rank_router: RouterInterface = {
                  controller: RankViewController,
                  ui_config_name:"RankView",
                  path:rank_route_path,
            }
    
            UIManager.nagivate_route(rank_router);
      }

      init_view(){
          // 现金类型的提现模块
          if(this.view.ui_param_interface.router.path == RankRouterPath.normal){
              Loader.load_prefab("UI/Rank/Normal/NormalRankView", (prefab: cc.Prefab) => {
                   const normal_click_on_view = cc.instantiate(prefab);
                   normal_click_on_view.parent = this.view.node;
                   this.normal_rank_view = normal_click_on_view.getComponent(NormalRankView);
                   this.update_normal_rank_view();
                });
          }else{
              console.log("当前")
          }
      }

      update_normal_rank_view(){
          CommonServerData.get_rank((rank_data_interface: RankInterface) =>{
              console.log("排行榜数据 =       ",rank_data_interface);
              if(this.normal_rank_view){
                this.normal_rank_view.add_player_rank_view(rank_data_interface.myItem);
                this.normal_rank_view.init_rank_list(rank_data_interface);
                const rank_headers = [];
                const headers = rank_data_interface.headers.split(" ");
                for(const item_key of headers){
                    if(item_key){
                       rank_headers.push({title: item_key});
                    }
                }
                this.normal_rank_view.init_header_view(rank_headers);
              }
          });
      }
}

export default RankViewController;