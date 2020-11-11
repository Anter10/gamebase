/**@description 用户的微信信息 */
export interface UserWeChatInterface{
    /**@description 昵称 */
    nickName: string;
    /**@description 性别 */
    sex: number;
    /**@description 头像 */
    avatarUrl: string;
    /**@description 地区 */
    area: string;
}

/**@description 观看激励视频广告的接口 */
export interface RewardedAdInterface{
     /**@description 观看激励视频广告的ID */
     ad_id: number;
     /**@description 观看激励视频成功的回调 */
     success: (res: any) => void;  
     /**@description 观看激励视频失败的成功回调*/
     fail:  (res: any) => void;
}

/**@description 观看直客广告的接口 */
export interface ZhikeAdInterface{
     /**@description 直客广告的ID */
     ad_id: string;
     /**@description 观看直客广告成功的时间 */
     ad_duration: number;
     /**@description 观看直客广告成功的回调 */
     success:(res: any) => void;
     /**@description 观看直客广告失败的回调 */
     fail:(res: any) => void;
}

/**@description 微信登陆的接口 */
export interface WechatLoginInterface{
    /**@description 微信登陆成功的回调方法 */
     success:(res: any) => void;
     /**@description 微信登陆失败的回调方法 */
     fail:(res: any) => void;
}

/**@description 微信分享的接口 */
export interface ShareInterface{
    /**@description 玩家头像地址 */
    image_url: string;
    /**@description 玩家微信名字 */
    nick_name: string;
    /**@description 分享的描述信息 */
    message?: string;  
    /**@description 分享的title */
    title?: string;
    /**@description 分享的额外参数[用二维码代替] */
    query?: string;
    /**@description 分享的成功回调*/
    success?: (res: any) => void;
    /**@description 分享的失败回调*/
    fail?: (res: any) => void;
}

/**@description 复制内容的接口 */
export interface CopyMessageInterface{
    /**@description 复制的文本内容 */
    message: string;
    /**@description 复制成功的回调 */
    success: (res: any) => void;
    /**@description 复制失败的回调 */
    fail: (res: any) => void;
}

/**@description 开屏广告的接口 */
export interface OSAdinterface{
    /**@description 广告的ID */
    ad_id: string;
    /**@description 开屏广告显示成功的回调 */
    success: (res: any) => void;
    /**@description 开屏广告显示失败的回调 */
    fail: (res: any) => void;
}


/**@description SDK模版的相关接口 */
export interface SdkModuleInterface{
    /**@description 微信登陆成功的回调 */
    wechat_login_success_callback?: Function; 
    /**@description 微信登陆失败的回调 */
    wechat_login_fail_callback?: Function; 
    /**@description 观看激励视频成功的回调 */
    rewarded_video_success_callback?: Function;  
    /**@description 观看激励视频失败的成功回调*/
    rewarded_video_fail_callback?: Function;
    /**@description 观看直客广告的回调 */
    video_zhike_success_callback?: Function;
    /**@description 观看直客广告的回调 */
    video_zhike_fail_callback?: Function;
    /**@description 分享成功的回调 */
    share_success_callback?:Function;
    /**@description 分享失败的回调 */
    share_fail_callback?:Function;
    /**@description 复制成功的回调方法 */
    copy_success_callback?:Function;
    /**@description 复制成功的回调方法 */
    copy_fail_callback?:Function;
    /**@description 开屏广告成功的回调 */
    os_ad_success_callback?:Function;
    /**@description 开屏广告失败的回调 */
    os_ad_fail_callback?:Function;
    /**@description 游戏初始化成功的回调 */
    init_success_callback?:Function;
    /**@description 成功展示静态图的广告 */
    show_image_ad_success_callback?:Function;
    /**@description 展示静态图广告失败 */
    show_image_ad_fail_callback?:Function;
}


export interface BiInterface{
    /**@description 事件ID */
    eventId: string;
    /**@description 事件名字 */
    eventName: string;
    /**@description 事件参数 */
    eventParam: string;
    /**@description 时间戳 */
    ts: string;
}

/**@description 游戏初始化的时候的参数 */
export interface GameInitInterface{
    param: any;
    success?: Function;
}


/**@description toast 接口 */
export interface ToastInterface{
    text: string;
}

/**@description 静态图广告的接口 */
export interface ImageAdInterface{
    /**@description 宽 */
    width: number;
    /**@description 高 */
    height: number;
    /**@description 距离顶部的距离 */
    top: number;
    /**@description 展示成功 */
    success?:(res?: any)=>void;
    /**@description 显示失败的回调 */
    fail?:(res?: any)=>void;
}

/**@description 静态图广告的接口 */
export interface WindowImageAdInterface{
    /**@description 宽 */
    width: number;
    /**@description 高 */
    height: number;
    /**@description 距离顶部的距离 */
    bottom: number;
    /**@description 展示成功 */
    success?:(res?: any)=>void;
    /**@description 显示失败的回调 */
    fail?:(res?: any)=>void;
}


/**@description 微信登陆成功后的接口数据 */
export interface WechatLoginSuccessInterface{
    /**@description 用户的access_key */
    access_key?: string,
    /**@description 用户的ID  */
    user_id?: string,
    /**@description 设备ID */
    device_id?: string,
    /**@description rom 版本 */
    romVersion?:string,
    /**@description gps 信息 */
    gps?: string,
    /**@description mac 地址 */
    mac?: string;
    /**@description brand */
    brand?:string;
    /**@description oaid */
    oaid?:string;
    /**@description 渠道 */
    channel?: string;
    /**@description app的版本号 */
    appVersion?: string;
    /**@description */ 
    env: string;
    /**@description */ 
    inviteCode: string;
}


/**@description 视频打点的数据接口 */
export interface VideoBiInterface{
    /**@description 视频点的名称 */
    name: string;
    /**@description 视频统计成功回调*/
    success?: Function;
    /**@description 视频统计失败回调*/
    fail?: Function;
}