/**@description 游戏的配置资源 */
const GameConfig = {
    secretData: "fS*rD^NzBD847*KCBU7d^bgbzJddPU3u",
    /**@description 游戏的AB版本 */
    gameExamine: false,
    /**@description 游戏的版本号 */
    appVersion: "1.0",
    /**@description 游戏的平台名称 */
    os: "android",
    /**@description 产品名称 */
    productName: "g3_zlzdd",
    /**@description 游戏包的名 */
    packageName: "com.hainanliangyou.zlzdd",
    /**@description post id */
    post_id: 20010001,
    /**@description 显示debug 按钮 */
    show_debug: true,
    /**@description remoteName */
    remoteName: "mvp",
    // 自己定义的渠道 company tencent 
    s_channel: "company",
    // debug-version .// release-version
    timeId: 20201028,
    // preddefine
    /**@description 当前游戏所在的分支 */
    branch: "Restaurant",
    // 用户协议的网页链接
    user_protocol_url: "http://waqqq.hainanliangyou.com/user.html",
    // 隐私声明的网页链接
    user_privacy_url: "http://waqqq.hainanliangyou.com/private.html",
    /**@description 通用API的根地址 */
    api_root_path: "g3-odyssey",
    /**@description BI的根地址 */
    bi_root_path: "g3-ocpc",
    /**@description 专用API的地址 */
    game_api_root_path: "",
    /**@description 当前的打包类型 debug 测试环境 release 正式环境 */
    pack_type: "debug",
    /**@description env 类型 0: 测试环境 1: 正式环境*/
    env: "0",

    /**@description android初始化成功返回的参数 */
    android_init_success_param: {
        deviceId: `bff1979e4c6c74141414310680bdb547fc671844e483b95c7e4e7ac050462ae0`,
        brand: `Xiaomi`,
        gps: "40.015551,116.361037",
        bs: `default`,
        channel: "ALIYUN_MAN_CHANNEL",
        romVersion: "default",
        osVersion: "9",
        oaid: "",
        accessKey: "8a7bb4323159138e7b49d835f81a0f3f_27260",
        timeId: "20201109",
        user_id: "27260",
    },

    /**@description 初始化的时候传递给Android端的数据 */
    android_init_param: {
        appId: 93,
        pkgId: 118,
        version: "1.0",
        apiType: 0,
        productName: "",
        packageName: "",

        // —————————————————————————————— 非header ————————————————————————————
        // 广告信息
        release_awarded_video_ids: [
            1000433,
            1000434,
        ],

        debug_awarded_video_ids: [
            1000451,
            1000451,
        ],
        // 开屏广告的ID
        debug_splash_ad_id: 1000448,
        release_splash_ad_id: 1000430,

        // 静态图的ID
        release_static_image_ad_id: 1000432,
        debug_static_image_ad_id: 1000450,

        // 弹窗静态图的广告ID
        window_release_static_image_ad_id: 1000431,
        window_debug_static_image_ad_id: 1000449,
        // 三个APPID
        release_tt_appid: 5117863, // 头条的广告ID
        debug_tt_appid: 5078148, // 头条的广告ID
        ks_appid: 502500061, // 快手的APPID
        gdt_appid: 1111096891, // 广点通的APPID
        // 百度地图定位的key
        baidu_map_key: "xxxxxx1",
        // bugly key
        bugly_key: "xxxxxx1",
        // wx_id
        wx_id: "wxc5fb17eb4bc6ba96",
    },

    /**@description 服务器的地址 地址规则 前面加上斜杠( / ) 后面不加斜杠( / ) */
    get serverUrl() {
        var serverUrl = "https://bp-api.coohua.com";
        if (GameConfig.android_init_param.apiType == 0) {
            serverUrl = "https://bp-api.coohua.top";
        }
        return serverUrl;
    },

    /**@description 是否是debug版本 */
    get is_debug(): boolean {
        return this.pack_type == "debug";
    },

    /**@description 当前的环境是debug环境 */
    get env_is_debug(): boolean {
        return GameConfig.env == "0";
    },

    /**@description 当前播放激励视频广告的ID */
    get video_ad_id(): number {
        if (GameConfig.env_is_debug) {
            return GameConfig.android_init_param.debug_awarded_video_ids[0];
        } else {
            return GameConfig.android_init_param.release_awarded_video_ids[0];
        }
    },

    /**@description 弹窗静态图的广告ID */
    get window_static_image_ad_id(): number {
        if (GameConfig.env_is_debug) {
            return GameConfig.android_init_param.window_debug_static_image_ad_id;
        } else {
            return GameConfig.android_init_param.window_release_static_image_ad_id;
        }
    },

    /**@description 静态图的广告ID */
    get static_image_ad_id(): number {
        if (GameConfig.env_is_debug) {
            return GameConfig.android_init_param.window_debug_static_image_ad_id;
        } else {
            return GameConfig.android_init_param.window_release_static_image_ad_id;
        }
    }

}


export default GameConfig;