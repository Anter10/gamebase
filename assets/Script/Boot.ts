import GameData from "./GameData/GameData";
import UIConfig from "./UI/UIManager/UIConfig";
import UIManager from "./UI/UIManager/UIManager";
var gamebase:any = <any>window;

gamebase.UIManager = UIManager;
gamebase.UIConfig = UIConfig;
gamebase.GameData = GameData;

class Boot{
    static init(){
        GameData.get_instance().init();
    }
}



export  {gamebase, Boot};


