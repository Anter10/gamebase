import GameConfig from "../GameConfig";
import ServerData from "./ServerData";

/**@description 通用服务器数据 */
class CommonServerData {
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
        ServerData.get_instance().post_data(`/g3-chengyu/api/rank`, "", callback);
    }

    /**
     * @description 游戏数据配置
     * @param callback Function 请求回调函数
     */
    static request_game_config_data(callback: Function) {
        ServerData.get_instance().get_data(`/${GameConfig.api_root_path}/api/game`, callback);
    }


    /**
     * @description 请求提现界面数据
     * @param callback Function 回调函数
     */
    static get_withdraw(callback: Function) {
        ServerData.get_instance().get_data(`/${GameConfig.api_root_path}/api/withdraw`, callback);
    }

    /**
     * @description 发送提现数据
     * @param post_withdraw_data {id: number, op: number} op: 0:微信 1: 支付宝
     * @param callback 
     */
    static post_withdraw(post_withdraw_data: { id: number, op: number }, callback: Function) {
        //向服务端发送数据=提现
        ServerData.get_instance().post_data("/g3-odyssey/api/withdraw", post_withdraw_data, callback);
    }

    /**
     * @description 得到提现记录
     * @param callback 
     */
    static get_order(callback: Function) {
        ServerData.get_instance().get_data(`/${GameConfig.api_root_path}/api/withdraw/order`, callback);
    }

    /**
     * @description 得到邀请好友的数据信息
     * @param callback 
     */
    static get_invite_friends(callback: Function) {
        ServerData.get_instance().get_data(`/${GameConfig.api_root_path}/api/share`, callback);
    }

    /**
     * @description 得到打卡数据信息
     * @param callback 
     */
    static get_clock_in(callback: Function ,showAll: boolean) {
        ServerData.get_instance().get_data(`/${GameConfig.api_root_path}/api/v2/checkIn`, {showAll: showAll}, callback);
    }
}




export default CommonServerData;