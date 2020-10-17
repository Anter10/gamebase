import GameConfig from "../GameConfig";
import ServerData from "./ServerData";

/**@description 通用服务器数据 */
class CommonServerData{
    /**
     * @description 请求排行榜数据 get 
     * @param callback Function 请求排行榜数据
     */
    static get_rank(callback: Function) {
        ServerData.get_instance().get_data(`/g3-chengyu/api/rank`, callback);
    }

    /**
     * @description 排行榜公示
     * @param callback Function 请求回调参数
     */
    static post_rank(callback: Function) {
        ServerData.get_instance().post_data(`/g3-chengyu/api/rank`,"", callback);
    }

     /**
      * @description 游戏数据配置
      * @param callback Function 请求回调参数
      */
    static request_game_config_data(callback:Function) {
        ServerData.get_instance().get_data(`/${GameConfig.api_root_path}/api/game` ,callback);
    }
}




export default CommonServerData;