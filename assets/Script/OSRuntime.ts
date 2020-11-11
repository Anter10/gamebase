import { ApiUserInterface } from "./Common/CommonInterface";
import { WechatLoginSuccessInterface } from "./Sdk/SdkInterface";

/**@description 游戏运行环境 */
class OSRuntime {
    public static _api_user_interface: ApiUserInterface;
    public static _wechat_login_success_interface: WechatLoginSuccessInterface = null;

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