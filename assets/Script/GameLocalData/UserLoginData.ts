import { ApiUserInterface } from "../Common/CommonInterface";
import { WechatLoginSuccessInterface } from "../Sdk/SdkInterface";
import BaseRecord from "./BaseRecord";

// 转盘的数据
class UserData extends BaseRecord{
    static _name = "UserData";
    base_name = "UserData";

    public user_init_data: ApiUserInterface = null;
    public user_login_data: WechatLoginSuccessInterface = null;
    
    constructor(){
        super();
        this.apply_auto_update();
    }

    

}

export default UserData;