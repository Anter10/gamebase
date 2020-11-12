import { Boot } from "../Boot";
import EventConfig from "../EventManager/EventConfig";
import EventManager from "../EventManager/EventManager";
import GameConfig from "../GameConfig";
import OSRuntime from "../OSRuntime";
import { NativeSupportStatueCode } from "./SdkEnum";
import { RewardedAdInterface, SdkModuleInterface, WechatLoginInterface, WechatLoginSuccessInterface } from "./SdkInterface";


//分享类型
export enum ShareType {
    Friend,
    Timeline
}

/**获取一个看文章任务回调信息 */
export interface LookDocTaskInfo {
    /**文章url */
    url: string,
    /**0内开，1外开 */
    inner: number,
    /**任务时长 */
    time: number,
    /**跳转次数 */
    jumpTimes: number,
    /**拼接打点用的-去完成 */
    h5ActionText: string,
    /**拼接打点用的任务名称 */
    title: string,
    /**任务id */
    taskId: string
}

/**发起订阅消息请求返回结果 */
export interface SubscribeMessageRespData {
    /**用户唯一标识，仅在用户确认授权时才有 */
    openId?: string,
    /**订阅消息模板 ID */
    templateID: string,
    /**用户点击动作，"confirm"代表用户确认授权，"cancel"代表用户取消授权 */
    action: string,
    /**订阅场景值 */
    scene: number,
    /**请求带入原样返回 */
    reserved: string
}

const sdk_module_interface: SdkModuleInterface = {};
const S = `Ljava/lang/String;`;


export class NativeSDKTool {
    public static isAndroid = cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID;
    public static isIOS = cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS;
    private static getTokenUrl: string = "https://api.weixin.qq.com/sns/oauth2/access_token";
    private static appId: string = "";
    private static appSecket: string = "";
    private static getUserInfo: string = "https://api.weixin.qq.com/sns/userinfo";
    public static mapNativeCallBack: { [key: string]: Function } = {}
    public static readonly view_ad: string = "view_ad";
    public static readonly image_ad: string = "image_ad";
    public static readonly share_wx: string = "share_wx";
    public static readonly share_WebImg: string = "share_WebImg";
    public static readonly env: string = "env";
    public static readonly wx_subscribe_message: string = "wx_subscribe_message";

    public static rewarded_videoing = false;

    /**@description 初始化和原生端通信的SDK  */
    public static init() {
        console.log("JS 和 Android 交流的工具初始化");
    }

    /**
     * 调取native微信授权
    */
    public static wechat_login(login_interface: WechatLoginInterface) {
        sdk_module_interface.wechat_login_success_callback = login_interface.success;
        sdk_module_interface.wechat_login_fail_callback = login_interface.fail;
        if (this.isAndroid) {
            //调用Java代码进行微信登录
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "weixin_login", "(Ljava/lang/String;)V", "weixin_login");
        }
    }


    /**@description 微信登陆成功后的回调 */
    public static wx_login_success(login_success_interface: WechatLoginSuccessInterface) {
        console.log("微信登陆成功后的参数 = ", JSON.stringify(login_success_interface));
        GameConfig.android_init_success_param.accessKey = login_success_interface.access_key;
        GameConfig.android_init_success_param.user_id = login_success_interface.user_id;
        GameConfig.android_init_success_param.channel = login_success_interface.channel;
        GameConfig.android_init_success_param.deviceId = login_success_interface.deviceId;
        GameConfig.android_init_success_param.oaid = login_success_interface.oaid;
        GameConfig.android_init_success_param.brand = login_success_interface.brand;
        GameConfig.android_init_success_param.env = login_success_interface.env;
        GameConfig.android_init_success_param.gps = login_success_interface.gps;
        GameConfig.android_init_success_param.mac = login_success_interface.mac;
        GameConfig.android_init_success_param.appVersion = login_success_interface.appVersion;
        
        OSRuntime.wechat_login_success_interface = login_success_interface;
        if (sdk_module_interface.wechat_login_success_callback) {
            sdk_module_interface.wechat_login_success_callback(login_success_interface);
        }
    }

    /**@description 微信登陆失败后的回调 */
    public static wx_login_fail(res: any) {
        console.log("微信登陆失败的参数  = ", res);
        if (sdk_module_interface.wechat_login_fail_callback) {
            sdk_module_interface.wechat_login_fail_callback(res);
        }
    }

    /**
     * 接收native微信授权的code
     * @param errCode 
     */
    public static wxLoginResult(result: any) {
        console.log("微信登陆的成功后的回调数据 =  ", result);

        //Log.log("===cc js回调 wxLoginResult=accessKey" + accessKey + " name=" + nick + " headUrl=" + headUrl + " userId=" + userId);

        //Log.log("===cc js回调 wxLoginResult222=", JSON.stringify(result));
        //let responseJson: any = JSON.stringify(result);
        //Log.log("===cc js回调 wxLoginResult333=", result.accessKey);
        //LocalStorage.setString(Consts.HEAD_IMG, result.photoUrl);
        // Boot.head_img = result.photoUrl;
        // Boot.access_key = result.accessKey;
        // Boot.userId = result.userId;
        // Boot.inviteCode = result.inviteCode;

        // let header: GameApiHeader = {
        //     accessKey: result.accessKey,
        //     pkgId: Boot.pkgId,
        //     //createTime: "1603246200000",
        //     os: result.os,
        //     oaid: result.oaid,
        //     mac: result.mac,
        //     channel: result.channel,
        //     appVersion: result.appVersion,
        //     deviceId: result.deviceId,
        //     brand: result.brand,
        //     gps: result.gps,
        //     bs: "default",
        //     romVersion: "default",
        //     osVersion: result.osVersion
        // }
        // Log.log("head====",JSON.stringify(header));
        // LocalStorage.setString(Consts.CURRENTVERSION, result.appVersion);
        // LocalStorage.setString(Consts.ACCESS_KEY, result.accessKey);
        // LocalStorage.setString(Consts.USER_ID, result.userId);
        // LocalStorage.setObj(Consts.HEADER, header);
        // //Log.log("===cc js回调", UserMgr.getInstance().data);
        // UserMgr.getInstance().data.id = result.userId;
        // UserMgr.getInstance().data.name = result.nickName;
        // GameApi.getInstance().setHeader(header);
        // //GameLaunchEvent.ON_WX_HEAD_GET.emit(result.photoUrl);
        // Log.log("====cc js回调 wxLoginResult,发出ON_WX_LOGIN_CODE事件");
        // GameLaunchEvent.ON_WX_LOGIN_CODE.emit(result.accessKey, result.userId, header);
    }

    /**发起微信一次性订阅消息 */
    public static wxSubscribeMessage(callback: (resp: SubscribeMessageRespData) => void) {
        // if (cc.sys.isBrowser) {
        //     let resp: SubscribeMessageRespData = {
        //         /**用户唯一标识，仅在用户确认授权时才有 */
        //         openId: "oTAV25uAGfcRQHkFf36r-PI7pNFA",
        //         /**订阅消息模板 ID */
        //         templateID: "e0GsPxHYAxIIXqhl2M_L-vDKRCg5A_hlBLmKzChS51k",
        //         /**用户点击动作，"confirm"代表用户确认授权，"cancel"代表用户取消授权 */
        //         action: "confirm",
        //         /**订阅场景值 */
        //         scene: 8888,
        //         /**请求带入原样返回 */
        //         reserved: ""
        //     }
        //     callback(resp);
        //     return;
        // }
        // this.mapNativeCallBack[this.wx_subscribe_message] = callback;
        // if (this.isAndroid) {
        //     jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "wxSubscribeMessage", "()V");
        // }
        // if (this.isIOS) {
        //     jsb.reflection.callStaticMethod("RootViewController", "wxSubscribeMessage:", "wx");
        // }
    }

    /**
     * 订阅消息返回结果
     * @param action 用户点击动作，"confirm"代表用户确认授权，"cancel"代表用户取消授权
     */
    public static onWxSubscribeMessage(resp: SubscribeMessageRespData) {
        if (resp.action == "confirm") {
        } else {
        }
        if (this.mapNativeCallBack[this.wx_subscribe_message]) {
            this.mapNativeCallBack[this.wx_subscribe_message](resp);
            delete this.mapNativeCallBack[this.wx_subscribe_message];
        }
    }

    /**
     * 复制内容
     */

    public static copyTxt(strText: string) {
        if (this.isAndroid) {
            //调用Java代码进行微信登录
            //Log.log("get android copy ", strText);
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "copyText", "(Ljava/lang/String;)V", strText);
        }
        if (this.isIOS) {
            jsb.reflection.callStaticMethod("RootViewController", "copyText:", strText);
        }
    }

    /**
     * 微信分享邀请好友,网络图片
     */
    public static shareToWx(shareType: ShareType, imgUrl: string, callback: (code: string) => void) {
        // if (this.mapNativeCallBack[this.share_wx]) {
        //     Log.log(`${this.share_wx} 事件已经存在,等待上一个回调`)
        //     return;
        // }
        if (cc.sys.isBrowser) {
            callback("2");
            return;
        }
        this.mapNativeCallBack[this.share_wx] = callback;
        if (this.isAndroid) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "shareToWeChat", "(ILjava/lang/String;)V", shareType, imgUrl);
        }
        if (this.isIOS) {
            jsb.reflection.callStaticMethod("RootViewController", "shareToWeChat:", "wx");
        }
    }

    /**
     * 微信分享回调接口
     */
    public static wxShareResult(code: string, callback: (code: string) => void) {
        if (this.mapNativeCallBack[this.share_wx]) {
            this.mapNativeCallBack[this.share_wx](code);
            delete this.mapNativeCallBack[this.share_wx];
        }
    }

    /**
     * 微信分享链接邀请好友
     * 
     */
    public static shareWebImg(title: string, desc: string, linkUrl: string, imgUrl: string, callback: (code: string) => void) {
        // if (this.mapNativeCallBack[this.share_WebImg]) {
        //     Log.log(`${this.share_WebImg} 事件已经存在,等待上一个回调`)
        //     return;
        // }
        if (cc.sys.isBrowser) {
            callback("2");
            return;
        }
        this.mapNativeCallBack[this.share_WebImg] = callback;
        if (this.isAndroid) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "shareWebImg", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", title, desc, linkUrl, imgUrl);
        }
        if (this.isIOS) {
            jsb.reflection.callStaticMethod("RootViewController", "shareToWeChat:", "wx");
        }
    }


    /**
     * @description 显示顶部的时候的广告
     */
    public static showImageAd(adWidth: number, adHeight: number, top: number, callback: (code: string) => void) {
        this.mapNativeCallBack[this.image_ad] = callback;
        if (this.isAndroid) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "renderImageAd", "(IIF)V", adWidth, adHeight, top);
        }
        if (this.isIOS) {
            jsb.reflection.callStaticMethod("RootViewController", "showImageAd:height:bottom:", "", adWidth, adHeight, top);
        }
    }

    /**@description 显示底部的时候的广告 */
    public static showImageAdBottom(adWidth: number, adHeight: number, bottom: number, callback: (code: NativeSupportStatueCode) => void) {
        this.mapNativeCallBack[this.image_ad] = callback;
        OSRuntime.static_image_ad_statue = 1;
        if (this.isAndroid) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "renderImageAdToBottom", "(IIF)V", adWidth, adHeight, bottom);
        }
        if (this.isIOS) {
            jsb.reflection.callStaticMethod("RootViewController", "showImageAd:height:bottom:", "", adWidth, adHeight, bottom);
        }
    }
    
    /**@description 展示静态图广告后的回调 */
    public static imageAdResult(code: string) {
        if (this.mapNativeCallBack[this.image_ad]) {
            this.mapNativeCallBack[this.image_ad](code);
            delete this.mapNativeCallBack[this.image_ad];
            if(OSRuntime.static_image_ad_statue == 0 && code == NativeSupportStatueCode.LOAD_OK){
               NativeSDKTool.closeImageAd();
            }
        }
    }

    /**
     * 关闭信息流广告 
     */
    public static closeImageAd() {
        OSRuntime.static_image_ad_statue = 0;
        if (this.isAndroid) {
            //调用Java代码进行微信登录
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "closeImageAd", "()V");
        }
        if (this.isIOS) {
            jsb.reflection.callStaticMethod("RootViewController", "closeImageAd:", "ad");
        }
    }

    /**
     *  游戏端登陆成功后设置accessKey
     */
    public static setAccessKey(accessKey: string) {
        if (this.isAndroid) {
            //调用Java代码进行微信登录
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "setAccessKey", "(Ljava/lang/String;)V", accessKey);
        }
        if (this.isIOS) {
            jsb.reflection.callStaticMethod("RootViewController", "setAccessKey:", accessKey);
        }
    }


    /**
     * 显示视频广告
     */
    public static showVideoAd(rewarded_interface: RewardedAdInterface) {
        sdk_module_interface.rewarded_video_fail_callback = rewarded_interface.fail;
        sdk_module_interface.rewarded_video_success_callback = rewarded_interface.success;

        if (!Boot.ad_mode) {
            if (sdk_module_interface.rewarded_video_success_callback) {
                sdk_module_interface.rewarded_video_success_callback();
                return;
            }
        }
        if (NativeSDKTool.rewarded_videoing) {
            return;
        }
        NativeSDKTool.rewarded_videoing = true;
        console.log("播放广告的数据  =", JSON.stringify(rewarded_interface));
        if (this.isAndroid) {
            //调用Java代码进行微信登录
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "renderVideoAd", "(I)V", rewarded_interface.ad_id);
        }
    }

    /**
     * 播放完视频广告回调
     */
    public static videoAdResult(code: string) {
        console.log("播放完视频广告回调code=", code);
        //关闭弹窗广告
        NativeSDKTool.closeImageAd();
        if (code == "2") {
            if (sdk_module_interface.rewarded_video_success_callback) {
                sdk_module_interface.rewarded_video_success_callback();
            }
        } else if (code && code == "0") {
            if (sdk_module_interface.rewarded_video_fail_callback) {
                sdk_module_interface.rewarded_video_fail_callback(code);
            }
        }

        NativeSDKTool.rewarded_videoing = false;
    }

    /**显示看文章的广告 */
    public static showDocAd(docInfo: LookDocTaskInfo, callback: (code: string) => void) {
        //关闭弹窗广告
        NativeSDKTool.closeImageAd();
        /**直客任务打点 */
        NativeSDKTool.hitClick("首页直客任务", `直客:${docInfo.title}-${docInfo.h5ActionText}`);
        this.mapNativeCallBack[this.view_ad] = callback;
        if (this.isAndroid) {
            //调用Java代码进行微信登录
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "startZkRead", "(Ljava/lang/String;IIILjava/lang/String;)V",
                docInfo.url, docInfo.inner, docInfo.time, docInfo.jumpTimes, docInfo.taskId);
        }
        if (this.isIOS) {
            jsb.reflection.callStaticMethod("RootViewController", "showVideoAd:", "ad");
        }
    }

    /**看文章的回调通知， 看完点返回按钮返回1，没看完文章点返回按钮返回0*/
    public static zkTaskResult(code: string) {
        // Log.log("cc===js=zkTaskResult播放完视频广告回调code=", code);
        // GuideMgr.getInstance().passAll();
        //关闭弹窗广告
        NativeSDKTool.closeImageAd();
        if (this.mapNativeCallBack[this.view_ad]) {
            this.mapNativeCallBack[this.view_ad](code);
            if (code == "1" || code == "0") {
                delete this.mapNativeCallBack[this.view_ad];
            }

        }
    }

    /**
     * 获取是否是测试环境
     */
    public static getEnv(callback: (code: string) => void) {
        if (this.isAndroid) {
            //调用Java代码进行微信登录
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getEnv", "()V");
        }
    }

    /**
     * 
     * @param code 0: debug 1:release
     */
    public static appEnv(code: string) {
        if (this.mapNativeCallBack[this.env]) {
            this.mapNativeCallBack[this.env](code);
            delete this.mapNativeCallBack[this.env];
        }
    }

    /**
     * 通知原生去掉白色背景
     */
    public static hideLoadBg() {
        if (this.isAndroid) {
            //调用Java代码进行微信登录
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "hideLoadBg", "()V");
        }
    }

    /**
     * 点击埋点
     */
    public static hitClick(clickPage: string, clickName: string) {
        if (cc.sys.isBrowser) {
            return;
        }
        if (!clickName) {
            return;
        }
        if (this.isAndroid) {
            //调用Java代码进行微信登录
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "hitClick", "(Ljava/lang/String;Ljava/lang/String;)V", clickPage, clickName);
        }
        if (this.isIOS) {
            jsb.reflection.callStaticMethod("RootViewController", "hitClick:", "ad");
        }
    }

    /**
     * 曝光埋点
     * @param pageName
     */
    public static hitPageView(pageName: string) {
        if (this.isAndroid) {
            //调用Java代码进行微信登录
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "hitPageView", "(Ljava/lang/String;)V", pageName);
        }
        if (this.isIOS) {
            jsb.reflection.callStaticMethod("RootViewController", "hitPageView:", "ad");
        }
    }

    /**
     * 生成分享图去分享给朋友
     */
    public static inviteShareImg(callback: (code: string) => void) {
        // if (this.mapNativeCallBack[this.share_wx]) {
        //     Log.log(`${this.share_wx} ===事件已经存在,等待上一个回调`)
        //     return;
        // }
        if (cc.sys.isBrowser) {
            callback("2");
            return;
        }
        this.mapNativeCallBack[this.share_wx] = callback;
        let headPos: string = "40,40";
        let namePos: string = "210,100";
        let codeTipPos: string = "210,170";
        let codePos: string = "400,170";
        if (this.isAndroid) {
            //调用Java代码进行微信登录
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "shareWX", "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", ShareType.Friend, headPos, namePos, codeTipPos, codePos);
        }
        if (this.isIOS) {
            jsb.reflection.callStaticMethod("RootViewController", "sharewx:", "ad");
        }
    }

    /**
     * 分享朋友圈
     * @param callback 
     */
    public static shareImgTimeLine(callback: (code: string) => void) {
        if (cc.sys.isBrowser) {
            callback("2");
            return;
        }
        this.mapNativeCallBack[this.share_wx] = callback;
        let headPos: string = "40,40";
        let namePos: string = "210,100";
        let codeTipPos: string = "210,170";
        let codePos: string = "400,170";
        if (this.isAndroid) {
            //调用Java代码进行微信登录
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "shareWX", "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", ShareType.Timeline, headPos, namePos, codeTipPos, codePos);
        }
        if (this.isIOS) {
            jsb.reflection.callStaticMethod("RootViewController", "sharewx:", "ad");
        }
    }

    /**
     * 
     * @param shareType 
     * @param filePath 
     * @param callback 
     */
    public static shareFileToWx(shareType: ShareType, filePath: string, callback: (code: string) => void) {
        // if (this.mapNativeCallBack[this.share_wx]) {
        //     Log.log(`${this.share_wx} ===事件已经存在,等待上一个回调`)
        //     return;
        // }
        if (cc.sys.isBrowser) {
            callback("0");
            return;
        }
        this.mapNativeCallBack[this.share_wx] = callback;
        if (this.isAndroid) {
            //调用Java代码进行微信登录
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "shareIMGToWx", "(ILjava/lang/String;)V", shareType, filePath);
        }
        if (this.isIOS) {
            jsb.reflection.callStaticMethod("RootViewController", "shareIMGToWx:", "ad");
        }
    }

    public static getShareUrl(): string {
        let shareUrl: string = "";
        if (this.isAndroid) {
            // shareUrl += "http://xygy.hnyaosi.com/lucky/LuckyOrchard/qrcode.html?os=android&userId=" + UserMgr.getInstance().data.id;
        }
        if (this.isIOS) {
            // shareUrl += "http://xygy.hnyaosi.com/lucky/LuckyOrchard/qrcode.html?os=ios&userId=" + UserMgr.getInstance().data.id;
        }
        return shareUrl;
    }


    /**获取开屏广告状态 */
    public static getSplashAdState() {
        // if (cc.sys.isBrowser) {
        //     GameLaunchEvent.ON_SPLASH_AD_DONE.emit();
        //     return;
        // }

        console.log("=====检查开屏广告是否播放完闭");
        if (this.isAndroid) {
            //调用Java代码进行微信登录
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getSplashAdState", "()V");
        }
        if (this.isIOS) {
            console.log("call ios");
            jsb.reflection.callStaticMethod("RootViewController", "getSplashAdState:", "ad");
        }
    }

    /**
     * 开屏广告结束
     * @param res "1"
     */
    public static onSplashAdDone(res: string) {
        console.log("====开屏广告结束:", res, typeof res);
        EventManager.get_instance().emit(EventConfig.splash_ad_on);
    }

}

cc["NativeSDKTool"] = NativeSDKTool;