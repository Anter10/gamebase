const GameConfig = {
      secretData: "fS*rD^NzBD847*KCBU7d^bgbzJddPU3u",
      /**@description 游戏的AB版本 */
      gameExamine : false,
      /**description 游戏的APPID */
      appId: 93,
      // 包ID
      pkgId: 118,
      // 设备的ID Android
      deviceId: "bff1979e4c6c74141414310680bdb547fc671844e483b95c7e4e7ac050462ae0",
      // brand名称
      brand:"Xiaomi",
      // 经纬度信息
      gps:"40.015551,116.361037",
      bs:"default",
      /**@description 游戏的版本号 */
      appVersion:"1.0.0",
      /**@description 游戏的平台名称 */
      os:"android",
      /**@description 游戏的渠道名称 */
      channel:"ALIYUN_MAN_CHANNEL",
      romVersion:"default",
      /**@description os 版本信息 */
      osVersion: "9",
      oaid: "default",
      /**@description accessKey Android端 */
      accessKey: "8a7bb4323159138e7b49d835f81a0f3f_27260",
      /**@description 请求地址的类型 apiType:0 测试地址  1：正式地址  */
      apiType: 0,
      /**@description 产品名称 */
      productName: "g3_wdct",
      /**@description 游戏包的名 */
      packageName:"com.hainanliangyou.wdct",
      post_id: 20010001,
      // 版本的版本号 1.0 开始
      version: "1.0",
      // 用户协议的网页链接
      user_protocol_url:"http://wdct.hainanliangyou.com/wdct/private.html",
      // 隐私声明的网页链接
      user_privacy_url:"http://wdct.hainanliangyou.com/wdct/user.html",

      /**@description BI的根地址 */
      bi_root_path:"g3-ocpc",
      /**@description 服务器的地址 地址规则 前面加上斜杠( / ) 后面不加斜杠( / ) */
      get serverUrl(){
           var serverUrl = "https://bp-api.coohua.com";
           if(GameConfig.is_debug){
              serverUrl = "https://bp-api.coohua.top";
           }
           return serverUrl;
      },

      // debug-version .// release-version
      timeId: 20201028,
      // preddefine
      versionCode: "",
      versionName: "",
      /**@description 当前游戏是debug 还是release 模式 debug | release */
      branch: "Restaurant", 
      /**@description 通用API的根地址 */
      api_root_path: "g3-odyssey",
      /**@description 专用API的地址 */
      game_api_root_path: "",
      /**@description 打包类型 */
      pack_type: "debug",
      get is_debug(){
          return true;
      },
      /**@description 显示debug 按钮 */
      show_debug: true,
      remoteName: "mvp",
      wx_appid: "wxc5fb17eb4bc6ba96",
      app_secret: "3285b60cb0035501714c90ad1a3e0e9d",
  
      // 自己定义的渠道 company tencent 
      s_channel:"company",
} 


export default GameConfig;