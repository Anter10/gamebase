import { ApiUserInterface } from "./Common/CommonInterface";
import { WechatLoginSuccessInterface } from "./Sdk/SdkInterface";

/**@description 游戏运行环境 */
class OSRuntime {
    /**@description 玩家的微信信息 */
    private static _api_user_interface: ApiUserInterface;
    /**@description 玩家的微信登陆成功返回的数据 */
    private static _wechat_login_success_interface: WechatLoginSuccessInterface = null;
    /**@description 当前播放激励视频的下标 */
    private static _play_rewarded_ad_index: number = 0;
    /**@description 当前的静态图广告的状态 1: 显示 0: 不显示 */
    public static static_image_ad_statue = 0;


    /**@description 激励视频广告的播放下标 */
    static get play_rewarded_ad_index(){
        return this._play_rewarded_ad_index;
    }

    /**@description 设置激励视频播放的下标 */
    static set play_rewarded_ad_index(_play_rewarded_ad_index: number){
        this._play_rewarded_ad_index = _play_rewarded_ad_index;
    }

    /**@description 设置用户信息的数据接口 */
    public static set api_user_interface(_api_user_interface: ApiUserInterface) {
        this._api_user_interface = _api_user_interface;
    }
    /**@description 得到用户信息的数据接口 */
    public static get api_user_interface(): ApiUserInterface {
        return this._api_user_interface;
    }

    /**@description 设置用户信息的数据接口 */
    public static set wechat_login_success_interface(_wechat_login_success_interface: WechatLoginSuccessInterface) {
        this._wechat_login_success_interface = _wechat_login_success_interface;
    }
    /**@description 得到用户信息的数据接口 */
    public static get wechat_login_success_interface(): WechatLoginSuccessInterface {
        return this._wechat_login_success_interface;
    }

}

export default OSRuntime;