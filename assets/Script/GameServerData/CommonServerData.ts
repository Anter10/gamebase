import GameConfig from "../GameConfig";
import ServerData from "./ServerData";

/**@description 通用服务器数据 */
class CommonServerData {
    /**
     * @description 请求排行榜数据 get 
     * @param callback Function 请求排行榜数据
     */
    static get_rank(callback: Function,error_callback?: Function) {
        ServerData.get_instance().get_data(`/g3-chengyu/api/rank`, callback, error_callback);
    }

    /**
     * @description 排行榜公示
     * @param callback Function 请求回调参数
     */
    static post_rank(callback: Function,error_callback?: Function) {
        ServerData.get_instance().post_data(`/g3-chengyu/api/rank`,"", callback, error_callback);
    }

     /**
      * @description 游戏数据配置
      * @param callback Function 请求回调函数
      */
    static request_game_config_data(callback:Function,error_callback?: Function) {
        ServerData.get_instance().get_data(`/${GameConfig.api_root_path}/api/game` ,callback,error_callback);
    }


    /**
     * @description 请求提现界面数据
     * @param callback Function 回调函数
     */
    static get_withdraw(callback: Function,error_callback?: Function) {
        ServerData.get_instance().get_data(`/${GameConfig.api_root_path}/api/withdraw`, callback, error_callback);
    }

    /**
     * @description 发送提现数据
     * @param post_withdraw_data {id: number, op: number} op: 0:微信 1: 支付宝
     * @param callback 
     */
    static post_withdraw(post_withdraw_data:{id: number, op: number}, callback: Function, error_callback?: Function) {
        //向服务端发送数据=提现
        ServerData.get_instance().post_data("/g3-odyssey/api/withdraw", post_withdraw_data, callback, error_callback);
    }

    /**
     * @description 得到提现记录
     * @param callback 
     */
    static get_order(callback: Function,error_callback?: Function) {
        ServerData.get_instance().get_data(`/${GameConfig.api_root_path}/api/withdraw/order`, callback, error_callback);
    }

    /**
     * @description 得到邀请好友的数据信息
     * @param callback 
     */
    static get_invite_friends(callback:Function,error_callback?: Function){
        ServerData.get_instance().get_data(`/${GameConfig.api_root_path}/api/share`, callback,error_callback);
    }

    /**
     * @description 得到打卡数据信息
     * @param callback 
     */
    static get_clock_in(callback: Function ,showAll: boolean,error_callback?: Function) {
        ServerData.get_instance().get_data(`/${GameConfig.api_root_path}/api/v2/checkIn?showAll=${showAll}`, callback, error_callback, {showAll: showAll});
    }
    /**@description 用户注册 获取accessKey */
    static request_accesskey(callback: Function){
        let url = "/bp/user/register?appId="+GameConfig.android_init_param.appId+"&pkgId="+GameConfig.android_init_param.pkgId+"&oaid=";
        ServerData.get_instance().get_data(url, callback);
    }

    /**@description 检查热更新 */
    static check_update(call_back: Function, error_callback: Function) {
        let url =  `/${GameConfig.api_root_path}/api/version/frontend`;
        ServerData.get_instance().get_data(url, call_back, error_callback);
    }

    /**@description 提交商人的订单信息 */
    static post_api_order(post_data: {level: number, money?: number}, callback: Function, error_callback: Function){
        ServerData.get_instance().post_data(`/${GameConfig.api_root_path}/api/order`,post_data,callback,  error_callback);
    }


    /**@description 用户的信息 */
    static get_api_user(callback: Function, error_callback: Function){
        let url =  `/${GameConfig.api_root_path}/api/user`;
        ServerData.get_instance().get_data(url, callback, error_callback);
    }

    /**@description 检查用户是否需要强制更新版本信息 */
    static check_api_version(callback: Function, error_callback: Function){
        let url =  `/${GameConfig.api_root_path}/api/version`;
        ServerData.get_instance().get_data(url, callback, error_callback);
    }

 

}




export default CommonServerData;