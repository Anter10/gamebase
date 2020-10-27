import { ShareType } from "./SdkInterface";

export module SdkModule {
    const android_class_name = "com/android_sdk_module";
    const ios_class_name = "ios_sdk_module";
    /** 当前平台 */
    export function platform(): string
    {
        return isAndroid() ? "android" : "ios";
    }
    
    /** 是否为Android */
    export function isAndroid(): boolean
    {
        return cc.sys.os === cc.sys.OS_ANDROID;
    }
    
    /** 是否为Ios */
    export function isIos(): boolean
    {
        return cc.sys.os === cc.sys.OS_IOS;
    }
    /** 是否为电脑 */
    export function isPC(): boolean
    {
        return cc.sys.os === cc.sys.OS_OSX || cc.sys.os === cc.sys.OS_WINDOWS;
    }
    /**@description 调用游戏的初始化 */
    export function game_init(){
        if(SdkModule.isAndroid()){
            jsb.reflection.callStaticMethod(android_class_name, "game_init", "");
        }
    }
    /**@description 卫星登录调用 */
    export function wechat_login(){

    }

    /**@description 用户微信登录成功的回调 */
    export function login_success(login_success_data: any){
         console.log("微信登陆成功的数据  =  ",login_success_data);
    }

    /**@description 复制为本内容 */
    export function copy_message(message: string){
          
    }
    export function share(shareType: ShareType, imgUrl: string, callback: (code: string) => void){
        
    }
    /**@description 邀请好友的分享 */
    export function invite_friend_share(title: string, desc: string, linkUrl: string, imgUrl: string, callback: (code: string) => void) {
    
    }
    /**@description 显示插屏广告 */
    export function show_interstitial_ad(){
           
    }
    /**@description 关闭信息流广告 */
    export function close_interstitial_ad(){

    }
    /**@description 观看激励视频广告 */
    export function show_rewarded_ad(ad_data: any, call_back:(ad_result_data: any) => void){
       
    }
}

window["SdkModule"] = SdkModule;