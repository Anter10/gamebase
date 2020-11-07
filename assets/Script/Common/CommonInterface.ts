import Controller from "./Controller";

/**@description 模态框信息的显示接口 */
interface ModalInterface{
    cancel?: boolean;
    confirm?: boolean;
    cancel_text?:string;
    confirm_text?: string;
    cancel_callback?: Function;
    ok_callback?: Function;
    message?: string;

}


/**@description 提示信息的显示接口 */
interface ToastInterface{
    text: string,
    duration?: number,
    finishe_call?:Function,
    /**@description 16进制的颜色值 */
    text_color?:string,
    /**@description 底部的图片的纹理 */
    bottom_sprite_frame?: cc.SpriteFrame,
}

/**@description 点击按钮的接口 */
interface TouchButtonInterface{
    /**@description 触摸结束的回调 */
    touch_end_call_back: Function;
    /**@description 点击播放音乐类型ID */
    music_id?: number;
    /**@description 按钮的类型 1: 视频按钮 2: 分享按钮 默认的话为普通类型的按钮 */
    type?: number;
}

/**@游戏里面的路由 */
interface RouterInterface{
    /**@description 路由的控制器类名 */
    controller:{new():any};
    /**@description 视图的配置名称 */
    ui_config_name: string;
    /**@description 路由参数 */
    param?: any;
    /**@description 路径 */
    path?: string;
};

/**@description 控制器接口 */
interface ControllerInterface{
    /**@description 控制器的名称 */
    name: string;
}

/**@description 基本UI的接口 */
interface BaseUIInterface{
    start: Function;
}


/**@description Modal的UI界面的图片接口 */
interface ModalUiInterface{
    modal_bottom_image?: string;
    modal_top_tip_image?: string;
    modal_title_bottom_image?: string;
    close_button_image?: string;
    modal_cancel_button_image?: string;
    modal_ok_button_image?: string;
}


interface UIParamInterface {
    ui_config_path: string,
    ui_config_name:string;
    param?: any;
    controller?:Controller;
    router?:RouterInterface;
    complete_callback?:Function;
}

/**@description 顶部导航右边的动作按钮接口 */
interface NagivatorActionInterface{
    /**@description action 的 显示文本 */
    action_title: string;
    /**@description action 点击的回调方法 */
    action:Function;
}

/**@description 导航器的UI接口 */
interface NagivatorUIInterface{
    // 导航条自己的底的图片路径
    nagivator_bottom: string;
    // 导航条返回按钮的底的图片路径
    nagivator_back_bottom:string;
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
}





export  {NagivatorInterface,NagivatorUIInterface, NagivatorActionInterface, UIParamInterface, ModalUiInterface, BaseUIInterface, ControllerInterface, RouterInterface, ModalInterface, ToastInterface, TouchButtonInterface};