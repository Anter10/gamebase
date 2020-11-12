/**@description 广告暴漏的接口的方法名称的枚举 */
enum AdFuncEnum {
    /**@description 播放激励视频广告*/
    playVideoAd = "playVideoAd",
    /**@description 播放直客的广告 */
    playZhiKeAd = "playZhiKeAd",
    /**@description 播放二级弹窗的广告 */
    playStaticAd = "playStaticAd",
    /**@description 播放主界面的静态广告 */
    gameMainLayerIsShow = "gameMainLayerIsShow",
}

/**@description 分享原生端暴漏出来的接口名称 */
enum ShareFuncEnum {
    /**@description 分享游戏 */
    playShareGame = "playShareGame",
}

/**@description 原生端自定义的方法名称 */
enum NativeEnum {
    NEH5CallNative = "NEH5CallNative",
    NENativeCallH5 = "NENativeCallH5",
}

/**@description 分享类型 */
enum ShareType {
    Friend,
    Timeline
}

/**@description 和客服端的广告对应的广告的CODE */
enum NativeSupportStatueCode {
    /**@description 加载失败 */
    LOAD_FAIL = `0`,
    /**@description 加载成功  */
    LOAD_OK = `1`,
    /**@description 视屏加载结束 */
    VIDEO_END = `2`,
    /**@description 分享的Code */
    SHARE_CODE = "0",
}

export {NativeSupportStatueCode, AdFuncEnum, ShareType, ShareFuncEnum, NativeEnum };