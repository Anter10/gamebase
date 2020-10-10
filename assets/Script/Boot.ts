import GameDataConfig from "./GameDataConfig/GameDataConfig";
import GameLocalData from "./GameLocalData/GameLocalData";
import Native from "./Native/Native";
import UIConfig from "./UI/UIManager/UIConfig";
import UIManager from "./UI/UIManager/UIManager";

/**@description 接受全局变量 */
var gamebase:any = <any>window;

gamebase.UIManager = UIManager;
gamebase.UIConfig  = UIConfig;
gamebase.GameLocalData  = GameLocalData;
gamebase.BusinessSDK = gamebase.BusinessSDK;
gamebase.Native = Native;

class Boot{
    static init(){
        cc.macro.ENABLE_MULTI_TOUCH = false;
        GameLocalData.get_instance().init();
        gamebase.Native.init();
        GameDataConfig.init();
    }
}


export  {gamebase, Boot};


