import Controller from "./Controller";

/**@description 模态框信息的显示接口 */
interface ModalInterface{
    cancel?: boolean,
    confirm?: boolean,
    cancel_text?:String,
    confirm_text?: String,
    cancel_callback?: Function,
    ok_callback?: Function,
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
    controller:{new():any},
    /**@description 视图的配置名称 */
    ui_config_name: string;
    /**@description 路由参数 */
    param?: any,
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




export  {BaseUIInterface, ControllerInterface, RouterInterface, ModalInterface, ToastInterface, TouchButtonInterface};