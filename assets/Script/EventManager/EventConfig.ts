// 游戏内部的事件配置信息
const EventConfig = {
      "test":"test",
      /**@description 客户端告诉前端刷新数据 ：目前用于退出直客界面，刷新每日福利数据 */
      "webReload":"webReload",
      /**@description 安卓手机返回键响应 */
      "webBackPage":"webBackPage",
      /**@description 小电视数据响应 */
      "webAlertMoney":"webAlertMoney",
      /**@description 展示静态广告，红包上移响应 */
      "webUpMoney":"webUpMoney",
      /**@description 开屏广告展示完成 */
      "splash_ad_on":"splash_ad_on",
      /**@description 请求到审核配置信息 */
      "audit_config_success": "audit_config_success",
}

export default EventConfig;