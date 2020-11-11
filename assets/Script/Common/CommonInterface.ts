import Controller from "./Controller";

/**@description 模态框信息的显示接口 */
interface ModalInterface {
    cancel?: boolean;
    confirm?: boolean;
    cancel_text?: string;
    confirm_text?: string;
    cancel_callback?: Function;
    ok_callback?: Function;
    message?: string;
}

/**@description 提示信息的显示接口 */
interface ToastInterface {
    text: string,
    duration?: number,
    finishe_call?: Function,
    /**@description 16进制的颜色值 */
    text_color?: string,
    /**@description 底部的图片的纹理 */
    bottom_sprite_frame?: cc.SpriteFrame,
}

/**@description 点击按钮的接口 */
interface TouchButtonInterface {
    /**@description 触摸结束的回调 */
    touch_end_call_back: Function;
    /**@description 点击播放音乐类型ID */
    music_id?: number;
    /**@description 按钮的类型 1: 视频按钮 2: 分享按钮 默认的话为普通类型的按钮 */
    type?: number;
}

/**@游戏里面的路由 */
interface RouterInterface {
    /**@description 路由的控制器类名 */
    controller: { new(): any };
    /**@description 视图的配置名称 */
    ui_config_name: string;
    /**@description 路由参数 */
    param?: any;
    /**@description 路径 */
    path?: string;
};

/**@description 控制器接口 */
interface ControllerInterface {
    /**@description 控制器的名称 */
    name: string;
}

/**@description 基本UI的接口 */
interface BaseUIInterface {
    start: Function;
}


/**@description Modal的UI界面的图片接口 */
interface ModalUiInterface {
    modal_bottom_image?: string;
    modal_top_tip_image?: string;
    modal_title_bottom_image?: string;
    close_button_image?: string;
    modal_cancel_button_image?: string;
    modal_ok_button_image?: string;
}


interface UIParamInterface {
    ui_config_path: string,
    ui_config_name: string;
    param?: any;
    controller?: Controller;
    router?: RouterInterface;
    complete_callback?: Function;
}

/**@description 顶部导航右边的动作按钮接口 */
interface NagivatorActionInterface {
    /**@description action 的 显示文本 */
    action_title: string;
    /**@description action 点击的回调方法 */
    action: Function;
}

/**@description 导航器的UI接口 */
interface NagivatorUIInterface {
    // 导航条自己的底的图片路径
    nagivator_bottom: string;
    // 导航条返回按钮的底的图片路径
    nagivator_back_bottom: string;
    // 导航条返回按钮的图片路径
    nagivator_back_button: string;
}


/**@description 导航器的接口 */
interface NagivatorInterface{
     /**@description 返回按钮的标题 */
     title: string;
     /**@description 返回按钮的回调*/
     back_callback: Function;
     /**@description 返回按钮底部节点的widget 的左边的像素值 */
     widget_left?: number;
     /**@description 显示导航栏的底部 */
     show_nagivator_bottom?: boolean;
     /**@description  */
     hide_return_back_button?: boolean;
}


/**@description Android端初始化的时候的数据接口 */
interface AndroidInitParamInterface {
    /**@description 游戏的ID */
    appId: number;
    /**@description pkg id */
    pkgId: number,
    /**@description 游戏的版本号 */
    version: string,
    /**@description API的类型 0: 测试环境 1: 正式环境 */
    apiType: number,
    /**@description 产品的名称 */
    productName: string,
    /**@description 包的名称 */
    packageName: string,

    // —————————————————————————————— 非header ————————————————————————————
    // 广告信息
    // 正式环境的激励视频广告的ID信息
    release_awarded_video_ids: Array<string>,
    /**@description 测试环境的激励视频广告的ID信息 */
    debug_awarded_video_ids: Array<string>,
    // 静态图广告的正式环境的广告ID
    release_static_image_ad_id: string,
    // 静态图广告的测试环境下的广告ID
    debug_static_image_ad_id: string,
    // 三个APPID
    // 1: 头条的正式环境的广告ID
    release_tt_appid: string,
    // 2: 头条的测试环境的广告ID
    debug_tt_appid: string, 
    // 快手的APPID
    ks_appid: string, 
    // 广点通的APPID
    gdt_appid: string, 
    // 百度地图定位的key
    baidu_map_key: string,
    // bugly key
    bugly_key: string,
    // wx_id
    wx_id: string,
}


/**@description android初始化成功后返回给客服端的数据接口 */
interface AndroidInitSuccessInterface{
    /**@description 登陆成功的时候返回 */
    deviceId:string,
    brand:string,
    gps:string,
    bs:string,
    channel: string,
    romVersion: string,
    osVersion: string,
    oaid:string,
    accessKey: string,
}

/**@description http网络请求的Header包含的字段信息接口 */
interface HttpHeaderInterface{
   /**@description 设备的型号 */
   brand: string;
   /**@description 系统的版本 */
   osVersion: string;
   /**@description rom的版本 */
   romVersion: string;
   /**@description 应用的版本号 */
   appVersion: string;
   /**@description 渠道*/
   channel: string;
   /**@description 所处的系统名称 */
   os:string;
   /**@descriptions bs */
   bs: string;
   /**@description gps信息 */
   gps: string;
   /**@description 设备的ID */
   deviceId:string;
   /**@description accessKey */
   accessKey: string;
   /**@description 应用的ID */
   appId: number;
   /**@description */
   pkgId: number;
   /**@description 游戏的接口类型 0: 测试环境 1: 正式环境 */
   apiType: number;
   /**@description oaid */
   oaid: string;
}


/**@description 请求用户信息的数据接口 */
interface ApiUserInterface{
    /**@description 用户的ID */
    userId: number;
    /**@description 用户的昵称 */
    nickName:string;
    /**@description 用户的头像 */
    photoUrl:string;
    /**@description 用户的money */
    money:number;
    /**@description 是否是新用户 */
    newUser:boolean;
    /**@description 是否是友好的 */
    friendly:boolean;
}

/**@description 用户版本信息是否强制更新 */
interface ApiVersionInterface{
    /**@description 是否需要更新版本 */
    update: boolean;
    /**@description 更新版本的APK包的地址 */
    url: string;
    /**@description 版本更新描述*/
    desc: string;
    /**@description force 是否强制更新*/
    force: boolean;
}

/**@description 特殊奖励 */
interface ApiV2SpecialCheckinInterface{
    day: number;
    money: number;
    received: number;
}

/**@description 打卡功能首页的数据接口 */
interface ApiV2CheckinInterface{
    /**@description 第几天 */
    checkInDay: number;
    /**@description 今日是否完成 */
    todayDone: boolean;
    /**@description 已领取天数 */
    receivedDay: number;
    /**@description 当前进度 */
    process: number;
    /**@description 所需进度 */
    needProcess: number;
    /**@description 每页展示多少 */
    pageSize: number; 
    /**@description 普通奖励 */
    normal: string;
    /**@description 特殊奖励 */
    special?:Array<ApiV2SpecialCheckinInterface>
}


export {ApiV2CheckinInterface, ApiVersionInterface, ApiUserInterface, HttpHeaderInterface,AndroidInitSuccessInterface, AndroidInitParamInterface, NagivatorInterface, NagivatorUIInterface, NagivatorActionInterface, UIParamInterface, ModalUiInterface, BaseUIInterface, ControllerInterface, RouterInterface, ModalInterface, ToastInterface, TouchButtonInterface };