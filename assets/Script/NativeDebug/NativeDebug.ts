import BaseUI from "../Common/BaseUI";
import TouchButton from "../Common/TouchButton";
import EventManager from "../EventManager/EventManager";
import SystemEvent from "../EventManager/SystemEvent";
import GameConfig from "../GameConfig";
import { GameInitInterface, ShareInterface, WechatLoginInterface } from "../Sdk/SdkInterface";
import { SdkModule } from "../Sdk/SdkModule";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NativeDebug extends BaseUI {

    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Node)
    game_init_button: cc.Node = null;

    @property(cc.Node)
    wechat_login_button: cc.Node = null;

    @property(cc.Node)
    copy_button: cc.Node = null;

    @property(cc.Node)
    share_button: cc.Node = null;

    @property(cc.Node)
    open_os_ad_button: cc.Node = null;

    @property(cc.Node)
    show_awarded_button: cc.Node = null;

    @property(cc.Node)
    show_zhike_button: cc.Node = null;

    onLoad () {
        this.close_button.addComponent(TouchButton).register_touch(this.on_close_call.bind(this));
        this.game_init_button.addComponent(TouchButton).register_touch(this.game_init_call.bind(this));
        this.wechat_login_button.addComponent(TouchButton).register_touch(this.wechat_login.bind(this));
        this.copy_button.addComponent(TouchButton).register_touch(this.copy_message.bind(this));
        this.share_button.addComponent(TouchButton).register_touch(this.wechat_share.bind(this));
        this.open_os_ad_button.addComponent(TouchButton).register_touch(this.show_os_ad.bind(this));
        this.show_awarded_button.addComponent(TouchButton).register_touch(this.rewarded_ad.bind(this));
        this.show_zhike_button.addComponent(TouchButton).register_touch(this.zhike.bind(this));

        EventManager.get_instance().listen(SystemEvent.on_show, this, ()=> {
            console.log(" 回到游戏 onShow");
        })

        EventManager.get_instance().listen(SystemEvent.on_hide, this, ()=> {
            console.log(" 游戏切到后台 onHide");
        })

        EventManager.get_instance().listen(SystemEvent.on_back, this, ()=> {
            console.log(" 点击了返回按钮 ");
        })
    }


    /**@description 游戏初始化的时候 */
    game_init_call() {
        console.log("游戏初始化的时候调用");
        const game_init_interface: GameInitInterface = {
            param: {
                appId: GameConfig.appId,
                pkgId: GameConfig.pkgId,
                version: GameConfig.version,
                apiType: GameConfig.apiType,
                productName: GameConfig.productName,
                packageName: GameConfig.packageName,

                // 广告信息
                release_awarded_video_ids: [
                    "xxxx1",
                    "xxxx2",
                ],

                debug_awarded_video_ids: [
                    "xxxx1",
                    "xxxx2",
                ],
                // 静态图的ID
                release_static_image_ad_id: `xxxxx1`,
                debug_static_image_ad_id: `xxxxx2`,
                // 三个APPID
                release_tt_appid: `xxxxxx1`, // 头条的广告ID
                debug_tt_appid: `xxxxxx2`, // 头条的广告ID
                ks_appid: `xxxxxx1`, // 快手的APPID
                gdt_appid: "xxxxxx1", // 广点通的APPID
                // 百度地图定位的key
                baidu_map_key: "xxxxxx1",
                // bugly key
                bugly_key: "xxxxxx1",
                // wx_id
                wx_id: "xxxxxx2",
            },
            success:(res: any)=>{
                console.log("游戏初始化 成功后的参数 = ", res);
            }
        }

        SdkModule.game_init(game_init_interface);
    }

    /**@description 微信登陆 */
    wechat_login(){
        console.log("微信登陆");
        let login_interface: WechatLoginInterface = {
            success: (res: any) => {
                console.log("微信登陆成功",res);
            },
            fail:(res: any) => {
                console.log("微信登陆失败",res);
            }
        }
        SdkModule.wechat_login(login_interface);
    }

    /**@description 分享接口测试 */
    wechat_share(){
        console.log("微信分享");
        const share_interface: ShareInterface = {
             image_url: "玩家头像地址",
             nick_name: "Uioracle",
             success:(res: any) =>{
                 console.log("分享成功 = ",res);
             },
             fail:(res: any)=>{
                console.log("分享失败 = ",res);
             }
        }
        SdkModule.share(share_interface);
    }

    /**@description 复制文本信息的接口测试 */
    copy_message(){
        console.log("复制文本信息");
        SdkModule.copy_message({
            success: ()=> {
                console.log("复制成功");
            },
            fail:() => {
                console.log("分享失败");
            },
            message: "复制的文本信息是: 11111111"
        })
    }

    /**@description 展示开屏广告的接口测试 */
    show_os_ad(){
        console.log("显示插屏广告");
        SdkModule.show_os_ad({
            ad_id: "xxxxxx",
            success:(res: any) => {
                console.log("展示插屏的时候成功了",res);
            },
            fail: (res: any) => {
                console.log("展示插屏的时候失败了",res);
            }
        })
    }

    /**@description 显示激励视频广告的接口 */
    rewarded_ad(){
        console.log("显示激励视频广告");
        SdkModule.rewarded_ad({
            ad_id: "xxxxx",
            success: (res: any) => {
                console.log("观看激励视屏广告成功");
            },
            fail:  (res: any) => {
                console.log("观看激励视屏广告失败");
            },
        });
    }

    /**@description 显示直客广告的接口 */
    zhike(){
        console.log("显示直客视频广告");
        SdkModule.zhike_video({
            ad_id: "string",
            ad_duration: 20,
            success:(res: any) => {
                console.log("直客广告成功");
            },
            fail:(res: any) => {
                console.log("直客广告失败功");
            },
        })
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}
}
