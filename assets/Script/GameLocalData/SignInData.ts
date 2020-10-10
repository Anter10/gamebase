import BaseRecord from "./BaseRecord";

// 游戏的签到数据
class SignInData extends BaseRecord{
    static _name = "SignInData";
    base_name = "SignInData";

    constructor(){
        super();
        this.apply_auto_update();
    }




}

export default SignInData;