import GameConfig from "../GameConfig";
import ServerData from "../GameServerData/ServerData";
import { BiInterface } from "./SdkInterface";

/**@description 游戏的打点系统 */
class BI{
    static bi(bi_data: BiInterface, callback?: Function){
        ServerData.get_instance().bi_data(`/${GameConfig.bi_root_path}/api/event?eventId=${bi_data.eventId}&eventName=${bi_data.eventName}&ts=${bi_data.ts}`, callback);
   } 
}

export default BI;