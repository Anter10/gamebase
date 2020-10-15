import { UIParamInterface } from "../Common/CommonInterface";
import UIConfig from "../UI/UIManager/UIConfig";
import UIManager from "../UI/UIManager/UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
class GamePlay extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    //初始化添加uiconfig里的内容
    init_game_play_ui_config() {
        UIConfig.GameMainView = "GamePlay/GamePlayUI/Main/GameMainView";
    }

    onLoad() {
        this.init_game_play_ui_config();
        const ui_main_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.GameMainView,
            ui_config_name: "GameMainView",
        }
        UIManager.show_ui(ui_main_param_interface);
        console.log(`进入游戏的game_play了`);
    }

    start() {

    }

    // update (dt) {}
}


export default GamePlay;