# gamebase 项目的基本框架 master 分支是主要分支 

## 模版的目标是
   ### 对外抽象接口和暴漏接口
   
### 分支之间的关系
   ### 1: tempalte 是master的子分之 (master是template的上级分之 也是各个游戏切出去的父分之)
   ### 2: 各个模版的上级分之tempalte (只允许各个模版合并tempalte分之)
   ### 3: 允许每个游戏合并master分之 允许每个游戏合并想要的各个模版的功能

### 从template分之切出去的分之(以下分之只能合并template分之)
   ### 1: tempate_CashOut 提现模版
   ### 2: tempate_ClickOn 打卡的模版
   ### 3: tempate_OpenRedEnvelope 拆红包的模版

   ### 5: template_InviteFriend 邀请好友的功能模版
   ### 4: tempate_Rank 排行榜的模版
   ### 6: tempate_UserProtocolAndPrivacy 声明和用户协议的模版
   ### 7: tempalte_NewPlayerGuide 新手引导的模版


## 项目根目录的说明(用到的目录)
   ### 1: config 项目配置说明
   ### 2: icons 项目的Android Logo资源
   ### 3: tool 项目下面相关的脚本工具 (有好的工具的话 可以切到master分之添加)


## version1.0.0: 涉及到到的模块: 

### 1: 界面管理模块(UIManager)
### 2: 各个功能的数据接口(在各系统对应的interface 中 )
### 3: 网络模块(HttpClient)
### 4: 和原生段通信模块(Native)
### 5: 本地存档模块(GameLocalData)
### 6: 游戏中涉及到的工具类
     6.1:游戏本地配置数据的导出模块(项目根目录下的tools exportconfig.js 脚本) 导出的数据在resources/    Config/config.json 下面

### 7: 事件管理模块(EventManager)
### 8: 通过MVC模式开发的功能的界面路由功能(在文件UIManager 脚本中)
### 9: 项目中涉及到的资源目录统一
### 10: 音频播放模块
### 11: 视频播放/分享组件 在Script下面的ShareOrVideo目录下 还没有开始开发


## 定义的相关模版
### 提现功能 (两种类型: 1 有余额的类型 2 无余额的类型) 包括体现记录的展示
### 打卡功能 (1: 暂时就定一种通用的打卡功能)
### loading 场景的逻辑

### 拆红包功能 遵循  我爱猜成语 的设计文稿
### 排行榜 通用排行榜类型
### 邀请赚钱的功能 
### 新手引导的功能
