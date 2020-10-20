import { UIParamInterface } from "../Common/CommonInterface";
import UIConfig from "../UI/UIManager/UIConfig";
import UIManager from "../UI/UIManager/UIManager";
import LinkGameBase from "./LinkGameBase";

const { ccclass, property } = cc._decorator;

@ccclass
class GamePlay extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    //初始化添加uiconfig里的内容
    init_game_play_ui_config() {
        LinkGameBase.register_ui_path("GameMainView", `GamePlay/GamePlayUI/Main/GameMainView`);
        LinkGameBase.register_ui_path("ExtensionTableView", `GamePlay/GamePlayUI/ExtensionTable/ExtensionTableView`);
        LinkGameBase.register_ui_path("ShowTableDescriptionView", `GamePlay/GamePlayUI/ExtensionTable/ShowTableDescriptionView`);
        LinkGameBase.register_ui_path("ShowDecorationDescriptionView", `GamePlay/GamePlayUI/ExtensionTable/ShowDecorationDescriptionView`);
        LinkGameBase.register_ui_path("CookWomanView", `GamePlay/GamePlayUI/CookWoman/CookWomanView`);
        LinkGameBase.register_ui_path("CookWomanDescriptionView", `GamePlay/GamePlayUI/CookWoman/CookWomanDescriptionView`);
        LinkGameBase.register_ui_path("MenuView", `GamePlay/GamePlayUI/Menu/MenuView`);
        LinkGameBase.register_ui_path("StoreUpgradeView", `GamePlay/GamePlayUI/StoreUpgrade/StoreUpgradeView`);
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