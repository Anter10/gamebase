import { gamebase } from "../Boot";
import Native from "./Native";
import { AdFuncEnum } from "./SdkEnum";

/**@description 播放激励视频广告的数据 */
interface VideoAdInterface{
    /**@description 接口的方法识别 */
    func: AdFuncEnum;
    /**@description 参数 */
    param:{playSource: any};
    /**@description 成功回调的方法 */
    success?:Function;
    /**@description 失败回调的方法 */
    fail?: Function; 
}

/**@description 直客广告的广告参数接口 */
interface ZhiKeAdInterface{
    /**@description 方法名称 */
    func: AdFuncEnum;
    /**@description 传递的参数 */
    param: any;
    /**@description 成功回调 */
    callback?:Function;
}

/**@description 二级弹窗的静态广告接口 */
interface SubWindowStaticAdInterface{
    /**@description 方法名称 */
    func: AdFuncEnum;
    /**@description 是否是显示类型 */
    is_show: boolean;
    /**@description 回调函数 */
    callback?:Function;
}

/**@description 主界面是否现实广告的接口 */
interface MainWindowStaticAdInterface{
    /**@description 方法名称 */
    func: AdFuncEnum;
    /**@description 是否显示广告 */
    is_show: boolean;
    /**@description 回调函数 */
    callback?: Function;
}


class Ad{
      /**@description 播放激励视频广告 */
      static play_video_ad(video_ad_data_interface: VideoAdInterface){
            if(gamebase.WebViewJavascriptBridge){
                const call_back = (video_ad_play_result: number) =>{
                    console.log(`看完激励视频广告后的回调参数${video_ad_play_result}`);
                    if(video_ad_play_result == 1){
                       video_ad_data_interface.success && (video_ad_data_interface.success());
                    }else{
                       video_ad_data_interface.fail && (video_ad_data_interface.fail());
                    }

                }
               let video_ad_data = {func: video_ad_data_interface.func, params: video_ad_data_interface.param}
                Native.call_native(video_ad_data, call_back);
            }else{
                // 非原生端 直接成功回调
                video_ad_data_interface.success && (video_ad_data_interface.success());
            }
      }

      /**@description 播放直客广告  */
      static play_zhi_ke_video(zhi_ke_data:ZhiKeAdInterface){
          if(gamebase.WebViewJavascriptBridge){
             const callback = (s: number) =>{
                zhi_ke_data.callback && (zhi_ke_data.callback(play_duration));
             }

            let zhi_ke_ad_data = {func: "playZhiKeAd", params:zhi_ke_data.param};
            Native.call_native(zhi_ke_ad_data, callback);
          }else{
            zhi_ke_data.callback && (zhi_ke_data.callback(Number.MAX_VALUE));
          }
      }

      /**@description 播放二级弹窗的静态广告 */
      static play_static_sub_window_ad(sub_window_static_ad_interface: SubWindowStaticAdInterface){
          if(gamebase.WebViewJavascriptBridge){
             const callback = ()=>{
                sub_window_static_ad_interface.callback();
             }

             let data = {func: sub_window_static_ad_interface.func, params: {isShow: sub_window_static_ad_interface.is_show}}
             Native.call_native(data, callback);
          }else{
             if(sub_window_static_ad_interface.callback){
                sub_window_static_ad_interface.callback();
             }
          }
      }

      /**@description 播放主界面上的广告 */
      static play_main_window_static_ad(main_window_static_ad_interface:MainWindowStaticAdInterface){
          if(gamebase.WebViewJavascriptBridge){
            let data = {func: main_window_static_ad_interface.func, params: {isShow: main_window_static_ad_interface.is_show}};
            let callback = (result)=>{
                console.log(`显示主界面静态广告的结果${result}`)
                main_window_static_ad_interface.callback && main_window_static_ad_interface.callback();
            };
            Native.call_native(data, callback);
          }else{
             main_window_static_ad_interface.callback && main_window_static_ad_interface.callback();
          }
      }

}


export {Ad, VideoAdInterface, ZhiKeAdInterface, SubWindowStaticAdInterface,MainWindowStaticAdInterface};