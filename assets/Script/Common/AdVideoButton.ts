import { Ad, VideoAdInterface, ZhiKeAdInterface } from "../Sdk/Ad";
import { AdFuncEnum } from "../Sdk/SdkEnum";
import BaseNode from "./BaseNode";
import { AdVideoType } from "./CommonEnum";
import TouchButton from "./TouchButton";

const {ccclass, property} = cc._decorator;

@ccclass
class AdVideoButton  extends BaseNode {
    public ad_video_type: AdVideoType = AdVideoType.zhike;
    public touch_button: TouchButton = null;
    public ad_video_callback: Function = null;
    public fail_call_back: Function = null;
    public ad_param: any = {};
    public direct_success: boolean = false;
    public init_ad_data_success: boolean = false;

    onLoad () {
        this.touch_button = this.node.addComponent(TouchButton);
        this.touch_button.register_touch(this.ad_video_call.bind(this));
    }
    
    /**@description 设置当前按钮的广告类型 */
    init_ad_video_data(ad_video_type: AdVideoType, ad_video_callback: Function, fail_call_back: Function, ad_param: any) {
        this.ad_video_type = ad_video_type;
        this.fail_call_back = fail_call_back;
        this.ad_video_callback = ad_video_callback;
        this.ad_param = ad_param;
        this.init_ad_data_success = true;
    }


    /**@description 看视频的调用 */
    ad_video_call(){
        if(!this.init_ad_data_success){
           console.error("没有初始化看视频广告的数据 请调用 AdVideoButton中的init_ad_video_data 方法初始化");
        }else if(this.direct_success){
           console.log("当前直接调用了看视频成功");
           this.ad_video_callback && this.ad_video_callback();
        }else{
            if(this.ad_video_type == AdVideoType.video_ad){
                const video_ad_interface: VideoAdInterface = {
                    func: AdFuncEnum.playZhiKeAd,
                    param: {playSource: this.ad_param} ,
                    success:this.ad_video_callback,
                    fail: this.fail_call_back
                }
                Ad.play_video_ad(video_ad_interface);
            }else if(this.ad_video_type == AdVideoType.zhike){
               const zhike_ad_interface: ZhiKeAdInterface = {
                     func: AdFuncEnum.playZhiKeAd,
                     param: this.ad_param,
                     callback:this.ad_video_callback
               }
               Ad.play_zhi_ke_video(zhike_ad_interface);
            }else{
                console.log("当前按钮没有设置广告视频类型")
            }
        }
    }

    start () {

    }
}


export default AdVideoButton;