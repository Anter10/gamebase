import EventManager from "../EventManager/EventManager";
import SystemEvent from "../EventManager/SystemEvent";
import { ShareType } from "./SdkEnum";
import { CopyMessageInterface, OSAdinterface, RewardedAdInterface, SdkModuleInterface, ShareInterface, WechatLoginInterface, ZhikeAdInterface } from "./SdkInterface";

export module SdkModule {
    const android_class_name = "org/cocos2dx/javascript/InstantAppActivity";
    const ios_class_name = "ios_sdk_module";
    const sdk_module_interface: SdkModuleInterface = {};
    const S = `Ljava/lang/String;`;

    export function test(){
        console.log(cc.sys.os , cc.sys.OS_ANDROID,"Android 0", SdkModule.isAndroid());
        if(SdkModule.isAndroid()){
            console.log("Android 1");
            jsb.reflection.callStaticMethod(`${android_class_name}`, "test", "()V");
            console.log("Android 2");
        }
    }

    export function jtest(hello: string){
        console.log("android 层调用JS层",hello);
    }
    /** 当前平台 */
    export function platform(): string{
        return isAndroid() ? "android" : "ios";
    }
    
    /** 是否为Android */
    export function isAndroid(): boolean{
        return cc.sys.os === cc.sys.OS_ANDROID;
    }
    
    /** 是否为Ios */
    export function isIos(): boolean{
        return cc.sys.os === cc.sys.OS_IOS;
    }
    /** 是否为电脑 */
    export function isPC(): boolean{
        return cc.sys.os === cc.sys.OS_OSX || cc.sys.os === cc.sys.OS_WINDOWS;
    }

    /**@description IOS进入前台 */
    export function on_show(res?: any){
        EventManager.get_instance().emit(SystemEvent.on_show, res);
    }

    /**@description 进入后台 */
    export function on_hide(res?: any){
        EventManager.get_instance().emit(SystemEvent.on_hide, res);
    }

    /**@description 点击了返回按钮 */
    export function on_back(res?:any){
        EventManager.get_instance().emit(SystemEvent.on_back, res);
    }

    /**@description 游戏的初始化 */
    export function game_init(success:(res) => {}){
        sdk_module_interface.init_success_callback = success;
        if(SdkModule.isAndroid()){
            jsb.reflection.callStaticMethod(android_class_name, "init", "()V");
        }
    }

    /**@description 游戏的初始化 */
    export function init_success(res?: any){
        if(sdk_module_interface.init_success_callback){
           sdk_module_interface.init_success_callback(res);
        }
    }

    /**@description 微信登录调用 */
    export function wechat_login(login_interface: WechatLoginInterface){
        sdk_module_interface.wechat_login_success_callback = login_interface.success;
        sdk_module_interface.wechat_login_fail_callback = login_interface.fail;
        if(SdkModule.isAndroid()){
          jsb.reflection.callStaticMethod(`${android_class_name}`, "wechat_login", "()V");
        }
    }   

    /**@description 用户微信登录成功的回调 */
    export function login_success(res: any){
         if(sdk_module_interface.wechat_login_success_callback){
            sdk_module_interface.wechat_login_success_callback(res)
         }
    }

     /**@description 用户微信登录成功的回调 */
     export function login_fail(res: any){
         console.log("微信登陆成功的数据  =  ",res);
         if(sdk_module_interface.wechat_login_fail_callback){
            sdk_module_interface.wechat_login_fail_callback(res)
         }
    }

    /**@description 复制为本内容 */
    export function copy_message(copy_interface: CopyMessageInterface){
        sdk_module_interface.copy_fail_callback = copy_interface.fail;
        sdk_module_interface.copy_success_callback = copy_interface.success;
        if(SdkModule.isAndroid()){
           jsb.reflection.callStaticMethod(`${android_class_name}`, "copy_message", `(${S})V`, copy_interface.message);
        }
    }

    /**@description 复制成功的回调方法 */
    export function copy_success(res?: any){
        if(sdk_module_interface.copy_success_callback){
            sdk_module_interface.copy_success_callback(res);
        }
    }

    /**@description 复制失败的回调方法 */
    export function copy_fail(res?: any){
        if(sdk_module_interface.copy_fail_callback){
            sdk_module_interface.copy_fail_callback(res);
        }
    }

    /**@description 邀请好友的分享 */
    export function share(share_interface: ShareInterface) {
        sdk_module_interface.share_fail_callback = share_interface.fail;
        /**@description 分享的title */
        sdk_module_interface.share_success_callback = share_interface.success;
        if(SdkModule.isAndroid()){
           jsb.reflection.callStaticMethod(`${android_class_name}`, "share", `(${S}${S}${S}${S})V`, share_interface.title, share_interface.message, share_interface.image_url, share_interface.query);
        }
    }

    /**@description 分享成功的回调 */
    export function share_success(res?: any){
        if(sdk_module_interface.share_success_callback){
           sdk_module_interface.share_success_callback(res);
        }
    }

    /**@description 分享失败的回调 */
    export function share_fail(res?: any){
        if(sdk_module_interface.share_fail_callback){
           sdk_module_interface.share_fail_callback(res);
        }
    }


    /**@description 显示开屏广告 */
    export function show_os_ad(os_ad_interface: OSAdinterface){
        sdk_module_interface.os_ad_fail_callback = os_ad_interface.fail;
        sdk_module_interface.os_ad_success_callback = os_ad_interface.success;
        if(SdkModule.isAndroid()){
           jsb.reflection.callStaticMethod(`${android_class_name}`, "show_os_ad", `(${S})V`, os_ad_interface.ad_id);
        }
    }

    /**@description 关闭信息流广告 */
    export function close_os_ad(){
        if(SdkModule.isAndroid()){
           jsb.reflection.callStaticMethod(`${android_class_name}`, "close_os_ad", `()V`);
        }
    }

    /**@description 观看激励视频广告 */
    export function rewarded_ad(rewarded_interface: RewardedAdInterface){
        sdk_module_interface.rewarded_video_fail_callback = rewarded_interface.fail;
        sdk_module_interface.rewarded_video_success_callback = rewarded_interface.success;
        if(SdkModule.isAndroid()){
           jsb.reflection.callStaticMethod(`${android_class_name}`, "rewarded_ad", `(${S})V`, rewarded_interface.ad_id);
        }
    }

    /**@description 观看激励视频成功的接口 参数随意 */
    export function rewarded_ad_success(res?: any){
        if(sdk_module_interface.rewarded_video_success_callback){
            sdk_module_interface.rewarded_video_success_callback(res);
        }
    }

    /**@description 观看激励视频失败的接口 参数随意 */
    export function rewarded_ad_fail(res?: any){
        if(sdk_module_interface.rewarded_video_fail_callback){
            sdk_module_interface.rewarded_video_fail_callback(res);
        }
    }

    /**@description 观看直客广告的方法 */
    export function zhike_video(zhike_interface: ZhikeAdInterface){
        sdk_module_interface.video_zhike_fail_callback = zhike_interface.fail;
        sdk_module_interface.video_zhike_success_callback = zhike_interface.success;
        if(SdkModule.isAndroid()){
           jsb.reflection.callStaticMethod(`${android_class_name}`, "rewarded_ad", `(I${S})V`,zhike_interface.ad_duration, zhike_interface.ad_id);
        }
    }

    /**@description 直客广告成功的回调 */
    export function zhike_ad_success(res?: any){
        if(sdk_module_interface.video_zhike_success_callback){
           sdk_module_interface.video_zhike_success_callback(res);
        }
    }

    /**@description 直客广告失败的回调 */
    export function zhike_ad_fail(res?: any){
        if(sdk_module_interface.video_zhike_fail_callback){
           sdk_module_interface.video_zhike_fail_callback(res);
        }
    }


    
}

window["SdkModule"] = SdkModule;