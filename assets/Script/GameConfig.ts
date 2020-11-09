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
            "xxxx1",
            "xxxx2",
        ],

        debug_awarded_video_ids: [
            "xxxx1",
            "xxxx2",
        ],
        // 静态图的ID
        release_static_image_ad_id: `xxxxx1`,
        debug_static_image_ad_id: `xxxxx2`,
        // 三个APPID
        release_tt_appid: `xxxxxx1`, // 头条的广告ID
        debug_tt_appid: `xxxxxx2`, // 头条的广告ID
        ks_appid: `xxxxxx1`, // 快手的APPID
        gdt_appid: "xxxxxx1", // 广点通的APPID
        // 百度地图定位的key
        baidu_map_key: "xxxxxx1",
        // bugly key
        bugly_key: "xxxxxx1",
        // wx_id
        wx_id: "xxxxxx2",
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
    }

}


export default GameConfig;