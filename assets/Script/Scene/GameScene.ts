import { gamebase } from "../Boot";
import { UIParamInterface } from "../Common/CommonInterface";
import Loader from "../Common/Loader";
import GameConfig from "../GameConfig";
import GameLocalData from "../GameLocalData/GameLocalData";
import CommonServerData from "../GameServerData/CommonServerData";
import BI from "../Sdk/BI";
import { NativeSDKTool } from "../Sdk/NativeSDKTool";
import { BiInterface } from "../Sdk/SdkInterface";
import UIConfig from "../UI/UIManager/UIConfig";
import UIManager from "../UI/UIManager/UIManager";
import BaseScene from "./BaseScene";


const { ccclass, property } = cc._decorator;

@ccclass
class GameScene extends BaseScene {
    @property(cc.Prefab)
    toast_prefab: cc.Prefab;

    onLoad() {
        super.onLoad();
        NativeSDKTool.hideLoadBg();
        gamebase.game_scene = this;
        this.game_play_init();
        this.bi();
        this.check_api_version();
    }

    bi() {
        const bi_data: BiInterface = {
            eventId: `${GameConfig.timeId}`,
            eventName: "into_game_scene",
            eventParam: "into gamescene start",
            ts: `${(new Date()).getTime()}`,
        }
        BI.bi(bi_data);
    }

    start() {
        super.start();
    }

    game_play_init() {
        Loader.load_prefab(`GamePlay/GamePlay`, (prefab: cc.Prefab) => {
            const game_play_node = cc.instantiate(prefab);
            game_play_node.parent = this.node;
        })
    }

    show_debug_view(){
        const ui_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.DebugView,
            ui_config_name: "DebugView",
            param: {}
        }

        UIManager.show_ui(ui_param_interface);
    }

    check_api_version() {
        CommonServerData.check_api_version((res: any) => {
            console.log("检查更新的数据", JSON.stringify(res));
            if (res) {
                if (res.update) {
                    // const ui_param_interface: UIParamInterface = {
                    //     ui_config_path: UIConfig.ApiVersionView,
                    //     ui_config_name: "ApiVersionView",
                    //     param: res
                    // }

                    // UIManager.show_ui(ui_param_interface);
                }
            }
        }, (res) => {
            console.log("检查更新的返回的错误数据", JSON.stringify(res));
        })
    }


    update(dt: number) {
        GameLocalData.get_instance().tick_store_data(dt);
    }
}


export default GameScene;