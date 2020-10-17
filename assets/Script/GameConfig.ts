const GameConfig = {
      secretData: "fS*rD^NzBD847*KCBU7d^bgbzJddPU3u",
      /**@description 游戏的AB版本 */
      gameExamine : false,
      /**description 游戏的APPID */
      appId: 41,
      // 包ID
      pkgId: 67,
      // 设备的ID
      deviceId: "861144046191155",
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
      /**@description accessKey */
      accessKey: "239cc2d850fbd17f61b6bc23c02db044_21944",
      /**@description 请求地址的类型 apiType:0 测试地址  1：正式地址  */
      apiType: 0,
      /**@description 产品名称 */
      productName: "g3_zlzdd",
      /**@description 游戏包的名 */
      packageName:"com.hainanliangyou.zlzdd",
    
      /**@description 当前游戏是debug 还是release 模式 debug | release */
      branch: "debug", 
      /**@description 显示debug 按钮 */
      show_debug: true,

      /**@description posId */
      posId: 1000191,

      /**description remoteName mvp | test  */
      remoteName: "mvp",

      /**@description 通用API的根地址 */
      api_root_path: "g3-odyssey",
      /**@description 专用API的地址 */
      game_api_root_path: "",

      get is_debug(){
          return GameConfig.branch == "debug";
      },

      // 用户协议的网页链接
      user_protocol_url:"http://waqqq.hainanliangyou.com/user.html",
      // 隐私声明的网页链接
      user_privacy_url:"http://waqqq.hainanliangyou.com/private.html",

      /**@description 服务器的地址 地址规则 前面加上斜杠( / ) 后面不加斜杠( / ) */
      get serverUrl(){
           var serverUrl = "https://bp-api.coohua.com";
           if(GameConfig.is_debug){
              serverUrl = "http://bp-api.coohua.top";
           }
           return serverUrl;
      }
} 


export default GameConfig;