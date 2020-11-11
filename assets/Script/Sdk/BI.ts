import GameConfig from "../GameConfig";
import ServerData from "../GameServerData/ServerData";
import { BiInterface, VideoBiInterface } from "./SdkInterface";

/**@description 游戏的打点系统 */
class BI {
    /** @description 游戏场景事件打点 */
    static bi(bi_data: BiInterface, callback?: Function) {
        ServerData.get_instance().bi_data(`/${GameConfig.bi_root_path}/api/event?eventId=${bi_data.eventId}&eventName=${bi_data.eventName}&ts=${bi_data.ts}`, callback);
    }

    /**@description 视频广告打点 */
    static video_bi(video_bi_interface: VideoBiInterface){
        ServerData.get_instance().video_bi_data(`/${GameConfig.bi_root_path}/api/user_recover/ad?name=${video_bi_interface.name}`);
    }
}

export default BI;