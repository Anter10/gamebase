
import { Boot, gamebase } from "../Boot";
import { UIParamInterface } from "../Common/CommonInterface";
import Loader from "../Common/Loader";
import TouchButton from "../Common/TouchButton";
import { UpdateManagerComponent } from "../Common/UpdateManagerComponent";
import Utils from "../Common/Utils";
import EventConfig from "../EventManager/EventConfig";
import EventManager from "../EventManager/EventManager";
import GameConfig from "../GameConfig";
import GameDataConfig from "../GameDataConfig/GameDataConfig";
import ServerData from "../GameServerData/ServerData";
import BI from "../Sdk/BI";
import { NativeSDKTool } from "../Sdk/NativeSDKTool";
import { BiInterface, WechatLoginInterface } from "../Sdk/SdkInterface";
import { SdkModule } from "../Sdk/SdkModule";
import UIConfig from "../UI/UIManager/UIConfig";
import UIManager from "../UI/UIManager/UIManager";
import BaseScene from "./BaseScene";
import { LoadingSceneInterface } from "./SceneInterface";


const { ccclass, property } = cc._decorator;
@ccclass
class LoadingScene extends BaseScene {
    @property(cc.Sprite)
    game_logo_iamge: cc.Sprite = null;

    @property(cc.Sprite)
    game_background_image: cc.Sprite = null;

    @property(cc.Sprite)
    game_share_image: cc.Sprite = null;

    @property(cc.Sprite)
    loading_progress_bottom_image: cc.Sprite = null;

    @property(cc.Sprite)
    loading_progress_upper_image: cc.Sprite = null;

    @property(cc.Sprite)
    start_game_button_image: cc.Sprite = null;

    @property(cc.Label)
    start_game_button_label: cc.Label = null;

    @property(cc.ProgressBar)
    loading_progress: cc.ProgressBar = null;

    @property(cc.Node)
    start_game_button_node: cc.Node = null;

    @property(cc.Node)
    protocol_node: cc.Node = null;

    @property(cc.Node)
    privacy_node: cc.Node = null;
 

    @property(cc.Node)
    debug_node: cc.Node = null;


    @property(cc.Node)
    protocol_and_privacy_node: cc.Node = null;

    @property(cc.Toggle)
    user_toggle: cc.Toggle = null;

    @property(cc.Asset)
    asset: cc.Asset = null;

    public assets_manager: UpdateManagerComponent = null;

    public loading_scene_interface: LoadingSceneInterface = {
        game_logo_iamge: "",
        game_background_image: "game_background_image",
        game_share_image: "",
        loading_progress_bottom_image: "loading_progress_bottom_image",
        loading_progress_upper_image: "loading_progress_upper_image",
        start_game_button_image: "start_game_button_image",
        start_game_button_text: "微信登陆",
    };

    onLoad() {
        super.onLoad();

        EventManager.get_instance().listen(EventConfig.splash_ad_on, this, ()=>{
            NativeSDKTool.hideLoadBg();
        })
        Boot.init();
        this.init_update_manager();
        this.flush_view();
        this.bi();
    }

    init_update_manager() {
        this.assets_manager = this.node.addComponent(UpdateManagerComponent);
        this.assets_manager.update_complete_callback = () => {
            this.into_game_scene();
        }

        this.assets_manager.asset = this.asset;
        this.assets_manager.update_callback = (progress: number) => {
            console.log("当前热更新的进度信息 = ", JSON.stringify(progress));
        }
    }

    bi() {
        const bi_data: BiInterface = {
            eventId: `${GameConfig.timeId}`,
            eventName: "into_loading_scene",
            eventParam: "into gamescene start",
            ts: `${(new Date()).getTime()}`,
        }
        BI.bi(bi_data);
    }

    special_set_sprite() {

    }

    /**@description 刷新视图界面 */
    flush_view() {
        // 加载loading界面上的图片
        const [all_need_update_sprite_name, all_need_load_sprite_frame_path] = Utils.get_ui_interface_sprite_path_and_sprite_name(this.loading_scene_interface, "./Scene/LoadingScene/");

        this.flush_ui_image(all_need_update_sprite_name, all_need_load_sprite_frame_path);

        // 刷新开始游戏按钮上面的文本显示
        if (this.loading_scene_interface.start_game_button_text) {
            this.start_game_button_label.string = this.loading_scene_interface.start_game_button_text;
        }

        // 给开始游戏按钮添加点击事件
        const touch_button: TouchButton = this.start_game_button_node.addComponent(TouchButton);
        touch_button.register_touch(this.start_game_callback.bind(this));

        // 给用户协议注册事件
        const protocol_button: TouchButton = this.protocol_node.addComponent(TouchButton);
        protocol_button.register_touch(this.user_protocol_callback.bind(this));

        // 给用户声明注册事件 
        const privacy_button: TouchButton = this.privacy_node.addComponent(TouchButton);
        privacy_button.register_touch(this.user_privacy_callback.bind(this));
        gamebase.start_game_button_node = this.start_game_button_node;
    }

    /**@description 点击开始游戏的按钮的调用逻辑 */
    start_game_callback() {
        console.log("点击开始游戏的按钮");
        SdkModule.test();

        if (this.user_toggle.isChecked) {
            this.start_game_success_callback();
        } else {
            const ui_param_interface: UIParamInterface = {
                ui_config_path: UIConfig.Toast,
                ui_config_name: "Toast",
                param: {
                    text: "请勾选同意用户协议"
                }
            }
            UIManager.show_ui(ui_param_interface);
        }
    }

    into_game_scene() {
        cc.director.loadScene("GameScene");
    }

    wechat_login() {
        if (gamebase.jsb) {
            const login_interface: WechatLoginInterface = {
                success: (res: any) => {
                    console.log("微信登陆成功 登陆成功的数据1 ", JSON.stringify(res));
                    ServerData.get_instance().init();
                    console.log("微信登陆成功 登陆成功的数据2 ", JSON.stringify(res));
                    GameDataConfig.server_request_server_config();
                    console.log("微信登陆成功 登陆成功的数据3 ", JSON.stringify(res));
                    this.checking_update();
                    console.log("微信登陆成功 登陆成功的数据4 ", JSON.stringify(res));
                },
                fail: (res: any) => {
                    console.log("微信登陆失败", res);
                }
            }

            NativeSDKTool.wechat_login(login_interface);
        } else {
            // 非原生的话直接初始化服务器配置数据 和 初始化header参数
            ServerData.get_instance().init();
            GameDataConfig.server_request_server_config();
            this.checking_update();
        }
        
        BI.video_bi({name: "test video ad point"});
    }

    checking_update() {
        this.start_game_button_image.node.active = false;
        this.loading_progress.node.active = true;
        this.protocol_and_privacy_node.active = false;
        console.log("checking_update error1");
        // 加载主场景
        cc.director.preloadScene("GameScene", (completedCount: number, totalCount: number, item: any) => {
            const progress = completedCount / totalCount;
            this.loading_progress.progress = progress;
        }, (error: Error) => {
            if (!error) {
                console.log("checking_update error1");
                this.assets_manager.check_server_update();
                console.log("checking_update error2");
            } else {
                console.log("进入游戏主场景失败了");
            }
        });
    }

    /**@description 开始游戏成功后的回调 */
    start_game_success_callback() {
        this.wechat_login();
    }


    start() {
        super.start();
    }

    /**@description 用户协议的调用 */
    native_debug_callback() {
        const ui_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.NativeDebug,
            ui_config_name: "NativeDebug",
        }
        UIManager.show_ui(ui_param_interface);
    }


    /**@description 用户协议的调用 */
    user_protocol_callback() {
        const ui_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.UserProtocolView,
            ui_config_name: "UserProtocolView",
        }
        UIManager.show_ui(ui_param_interface);
    }

    /**@description 用户隐私政策的调用 */
    user_privacy_callback() {
        const ui_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.UserPrivacyView,
            ui_config_name: "UserPrivacyView",
        }
        UIManager.show_ui(ui_param_interface);
    }

    update() {
        this.loading_progress.totalLength = this.loading_progress_upper_image.node.width;
    }
}


export default LoadingScene;