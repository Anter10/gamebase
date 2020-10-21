import Test from "./Common/Test";
import GameDataConfig from "./GameDataConfig/GameDataConfig";
import GameLocalData from "./GameLocalData/GameLocalData";
import CommonServerData from "./GameServerData/CommonServerData";
import ServerData from "./GameServerData/ServerData";
import Native from "./Sdk/Native";
import UIConfig from "./UI/UIManager/UIConfig";
import UIManager from "./UI/UIManager/UIManager";

/**@description 接受全局变量 */
var gamebase:any = <any>window;

gamebase.UIManager = UIManager;
gamebase.UIConfig  = UIConfig;
gamebase.GameLocalData  = GameLocalData;
gamebase.BusinessSDK = gamebase.BusinessSDK;
gamebase.Native = Native;
gamebase.GameDataConfig = GameDataConfig;
gamebase.Test = Test;
gamebase.ServerData = ServerData;
gamebase.CommonServerData = CommonServerData;
Native.init();
class Boot{
    static init(){
        cc.macro.ENABLE_MULTI_TOUCH = false;
        GameLocalData.get_instance().init();
        ServerData.get_instance().init();
        GameDataConfig.init();
    }
}


export  {gamebase, Boot};


