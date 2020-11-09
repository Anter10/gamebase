import Test from "./Common/Test";
import GameDataConfig from "./GameDataConfig/GameDataConfig";
import GameLocalData from "./GameLocalData/GameLocalData";
import CommonServerData from "./GameServerData/CommonServerData";
import ServerData from "./GameServerData/ServerData";
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
    static os: {[key: string]: any} = {};
    static init(){
        cc.macro.ENABLE_MULTI_TOUCH = false;
        GameLocalData.get_instance().init();
        ServerData.get_instance().init();
        GameDataConfig.init();
        cc.debug.setDisplayStats(false);
        // SdkModule.test();
    }
}


export  {gamebase, Boot};


