
## 新的Android和前端交互的接口

### 1: 系统层的接口（由android主动调用 json: 为JSON格式的字符串）
1. on_show(json?: string) 回到前段的调用
2. on_hide(json?: string) 切到后台的调用
3. on_back(json?: string) 点击返回的调用
4. init_success(json?: string) 游戏初始化成功的回调
5. login_success(json?: string) 用户微信登录成功的回调
6. login_fail(json?:string) 用户微信登录成功的回调
7. copy_success(json?: string) 复制成功的调用
8. copy_fail(json?: string) 复制失败的调用
9. share_success(json?: string) 分享成功的调用
10. share_fail(json?: string) 分享失败的调用
11. rewarded_ad_success(json?: string) 观看激励视频成功的调用
12. rewarded_ad_fail(json?: string) 观看激励视频失败的调用
13. zhike_ad_success(json?: string) 观看直客广告成功的调用
14. zhike_ad_fail(json?: string) 观看直客广告失败的调用


### 2: 前端主动调用的接口
1. game_init 游戏的初始化的时候调用 参数 param: string 由android端确定需要啥类型的参数
2. wechat_login 微信登陆接口 无参数
3. copy_message 复制文本信息 参数: message: string 复制的文本信息
4. share 分享接口 参数title: 分享的标题, message:string 分享的文本内容, image_url:string 分享图片的地址 query: string 其他的数据(格式 name=12&age=24)
5. show_os_ad  显示开屏广告 ad_id: string 开屏广告的ID
6. close_os_ad 关闭开屏广告 无参数
7. rewarded_ad 观看激励视频广告 ad_id:string 激励视频广告的ID
8. zhike_video 观看直客广告 ad_duration: int 观看广告算成功的时间  ad_id: string 观看直客广告的广告id。
