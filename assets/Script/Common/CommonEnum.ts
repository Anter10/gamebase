/**@description 提现界面的路由路径  */
enum CashOutRouterPath{
    /**@description 余额模式 */
    balance = "balance",
    /**@description 非余额模式 */
    no_balance = "no_balance",
}

/**@description 打卡界面的路径 */
enum ClickOnRouterPath{
    /**@description 打卡界面的普通界面 */
    normal = "noraml",
}

/**@description 排行榜的显示路径 */
enum RankRouterPath{
    /**@description  */
    normal = "normal",
}


export {RankRouterPath,CashOutRouterPath, ClickOnRouterPath};