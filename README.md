# gamebase 项目的基本框架 master 分支是主要分支 

version1.0.0: 涉及到到的模块: 

1: 界面管理模块(UIManager)
2: 各个功能的数据接口(在各系统对应的interface 中 )
3: 网络模块(HttpClient)
4: 和原生段通信模块(Native)
5: 本地存档模块(GameLocalData)
6: 游戏中涉及到的工具类
   1:游戏本地配置数据的导出模块(项目根目录下的tools exportconfig.js 脚本) 导出的数据在resources/Config/config.json 下面
7: 事件管理模块(EventManager)
8: 通过MVC模式开发的功能的界面路由功能(在文件UIManager 脚本中)
9: 项目中涉及到的资源目录统一
10: 音频播放模块
11: 视频播放/分享组件 在Script下面的ShareOrVideo目录下 还没有开始开发