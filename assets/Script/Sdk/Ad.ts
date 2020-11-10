import { gamebase } from "../Boot";
import { NativeSDKTool } from "./NativeSDKTool";
import { AdFuncEnum } from "./SdkEnum";
import { ImageAdInterface, RewardedAdInterface, ZhikeAdInterface } from "./SdkInterface";
import { SdkModule } from "./SdkModule";

/**@description 播放激励视频广告的数据 */
interface VideoAdInterface {
    /**@description 接口的方法识别 */
    func: AdFuncEnum;
    /**@description 参数 */
    param: { playSource: any };
    /**@description 成功回调的方法 */
    success?: Function;
    /**@description 失败回调的方法 */
    fail?: Function;
}

/**@description 直客广告的广告参数接口 */
interface ZhiKeAdInterface {
    /**@description 方法名称 */
    func: AdFuncEnum;
    /**@description 传递的参数 */
    param: any;
    /**@description 成功回调 */
    callback?: Function;
}

/**@description 二级弹窗的静态广告接口 */
interface SubWindowStaticAdInterface {
    /**@description 方法名称 */
    func: AdFuncEnum;
    /**@description 是否是显示类型 */
    is_show: boolean;
    /**@description 回调函数 */
    callback?: Function;
}

/**@description 主界面是否现实广告的接口 */
interface MainWindowStaticAdInterface {
    /**@description 方法名称 */
    func: AdFuncEnum;
    /**@description 是否显示广告 */
    is_show: boolean;
    /**@description 回调函数 */
    callback?: Function;
}


class Ad {
    /**@description 播放激励视频广告 */
    static play_video_ad(rewarded_ad_interface: RewardedAdInterface) {
        if (gamebase.jsb) {
            NativeSDKTool.showVideoAd(rewarded_ad_interface);
        } else {
            // 非原生端 直接成功回调
            rewarded_ad_interface.success && (rewarded_ad_interface.success({}))
        }
    }

    /**@description 播放直客广告  */
    static play_zhi_ke_video(zhike_interface: ZhikeAdInterface) {
        if (gamebase.jsb) {
            SdkModule.zhike_video(zhike_interface);
        } else {
            zhike_interface.success && (zhike_interface.success(Number.MAX_VALUE));
        }
    }

    /**@description 播放二级弹窗的静态广告 */
    static show_static_image_ad(image_ad_interface: ImageAdInterface) {
        if (gamebase.jsb) {
            SdkModule.render_image_ad(image_ad_interface);
        } else {
            if (image_ad_interface.success) {
                image_ad_interface.success();
            }
        }
    }

    /**@description 显示弹窗广告 */
    static show_window_static_ad(){
        if (gamebase.jsb) {
            SdkModule.render_image_ad(image_ad_interface);
        } else {
            if (image_ad_interface.success) {
                image_ad_interface.success();
            }
        }
    }

    /**@description 关闭静态图的广告 */
    static close_image_ad(){
        SdkModule.close_image_ad();
    }

}


export { Ad, VideoAdInterface, ZhiKeAdInterface, SubWindowStaticAdInterface, MainWindowStaticAdInterface };