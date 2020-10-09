import UIConfig from "./UI/UIManager/UIConfig";
import UIManager from "./UI/UIManager/UIManager";
var gamebase:any = <any>window;

gamebase.UIManager = UIManager;
gamebase.UIConfig = UIConfig;

class Boot{
    static init(){
        console.log("游戏初始化");
    }
}



export  {gamebase, Boot};


