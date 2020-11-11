import { ApiUserInterface } from "./Common/CommonInterface";

/**@description 游戏运行环境 */
class OSRuntime{
    public static _api_user_interface: ApiUserInterface;
    
    /**@description 设置用户信息的数据接口 */
    public static set api_user_interface(_api_user_interface: ApiUserInterface){
        this._api_user_interface = _api_user_interface;
    }
    /**@description 得到用户信息的数据接口 */
    public static get api_user_interface(): ApiUserInterface{
        return this._api_user_interface;
    }
    
}

export default OSRuntime;