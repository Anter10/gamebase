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
import GameLocalData from "../GameLocalData/GameLocalData";
import GamePlayBaseData from "../GameLocalData/GamePlayBaseData";
import UserData from "../GameLocalData/UserLoginData";
import UserLoginData from "../GameLocalData/UserLoginData";
import ServerData from "../GameServerData/ServerData";
import OSRuntime from "../OSRuntime";
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

    public wait_time_number: number = 0;

    public had_hide_bg: boolean = false;

    public assets_manager: UpdateManagerComponent = null;

    public flowerAtlas: cc.SpriteAtlas = null;

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
        EventManager.get_instance().listen(EventConfig.splash_ad_on, this, () => {
            this.splash_call_finished();
        })
        Boot.init();
        this.init_update_manager();
        this.flush_view();
    }

    splash_call_finished() {
        this.try_into_game_scene();
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

    bi(event_name: string) {
        const bi_data: BiInterface = {
            eventId: `${GameConfig.timeId}`,
            eventName: `${event_name}`,
            eventParam: "bi event",
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

    /**@description 每日首次进入游戏，清除本地指定数据 */
    today_first_enter_game_remove_data() {
        const base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
        const date = new Date().getTime();
        const curTime = this.conversion_time(date);
        if (curTime != this.conversion_time(base_data.player_enter_game_time)) {
            base_data.reset_flower_harvest_num();
        }
    }

    /**@description 时间戳，转化为yyyy-mm-dd格式 */
    conversion_time(time: number) {
        const date = new Date(time);
        const years = date.getFullYear();
        const months = date.getMonth();
        const dates = date.getDate();
        return `${years}-${months}-${dates}`;
    }

    /**@description 加载鲜花图集资源 */
    load_flower_atlas() {
        Loader.load_sprite_atlas(`./GamePlay/texture/flower`, (atlas: cc.SpriteAtlas) => {
            gamebase.flowerAtlas = atlas;
        });
    }

    /**@description 加载GameScene界面Prefab */
    load_gamescene_prefab() {
        const prefabPath = [
            `./GamePlay/node_top`,
            `./GamePlay/node_mid`,
            `./GamePlay/node_bottom`,
        ];
        gamebase.gameScenePrefab = [];
        Loader.recursion_load_prefab(prefabPath, (prefab: cc.Prefab) => {
            gamebase.gameScenePrefab.push(prefab);
        });
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

    /**@description 尝试进入游戏 */
    try_into_game_scene() {
        const user_data = GameLocalData.get_instance().get_data<UserData>(UserData);
        if (user_data.user_login_data) {
            console.log("微信登陆成功 登陆成功的数据 ", JSON.stringify(user_data.user_login_data));
            ServerData.get_instance().init();
            GameDataConfig.server_request_server_config();
            NativeSDKTool.wx_login_success(user_data.user_login_data);
            this.checking_update();
        } else {
            console.log("本地没有玩家登陆的数据");
            NativeSDKTool.hideLoadBg();
        }
    }

    wechat_login() {
        if (gamebase.jsb) {
            this.bi("click_wechat_login");
            const login_interface: WechatLoginInterface = {
                success: (res: any) => {
                    ServerData.get_instance().init();
                    GameDataConfig.server_request_server_config();
                    const user_data = GameLocalData.get_instance().get_data<UserData>(UserData);
                    user_data.user_login_data = OSRuntime.wechat_login_success_interface;
                    this.checking_update();
                    this.bi("wechat_login_finish");
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
    }

    checking_update() {
        this.start_game_button_image.node.active = false;
        this.loading_progress.node.active = true;
        this.protocol_and_privacy_node.active = false;
        this.load_flower_atlas();
        this.load_gamescene_prefab();
        console.log("checking_update error1");
        // 加载主场景
        this.bi("into_loading_scene");
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
        this.bi("launch_finish");
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

    update(dt) {
        this.wait_time_number = this.wait_time_number + dt;
        if(this.wait_time_number >= 3 && !this.had_hide_bg){
            this.had_hide_bg = true;
            EventManager.get_instance().emit(EventConfig.splash_ad_on);
        }
        this.loading_progress.totalLength = this.loading_progress_upper_image.node.width;
    }


}


export default LoadingScene;