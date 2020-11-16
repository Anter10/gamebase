import Test from "./Common/Test";
import GameDataConfig from "./GameDataConfig/GameDataConfig";
import GameLocalData from "./GameLocalData/GameLocalData";
import CommonServerData from "./GameServerData/CommonServerData";
import ServerData from "./GameServerData/ServerData";
import { NativeSDKTool } from "./Sdk/NativeSDKTool";
import { SdkModule } from "./Sdk/SdkModule";
import UIConfig from "./UI/UIManager/UIConfig";
import UIManager from "./UI/UIManager/UIManager";

/**@description 接受全局变量 */
var gamebase:any = <any>window;

gamebase.UIManager = UIManager;
gamebase.UIConfig  = UIConfig;
gamebase.GameLocalData  = GameLocalData;
gamebase.BusinessSDK = gamebase.BusinessSDK;
gamebase.GameDataConfig = GameDataConfig;
gamebase.Test = Test;
gamebase.ServerData = ServerData;
gamebase.CommonServerData = CommonServerData;

/** */
class Boot{
    /**@description true: 广告模式 false: 非广告模式 */
    static ad_mode:boolean = true;
    
    static os: {[key: string]: any} = {};
    static init(){
        cc.macro.ENABLE_MULTI_TOUCH = false;
        GameLocalData.get_instance().init();
        GameDataConfig.init();
        NativeSDKTool.init();
    }

    static os_init(){
        
    }
}


export  {gamebase, Boot};


