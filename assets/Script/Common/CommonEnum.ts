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
    /**@description 常规界面 */
    normal = "normal",
}

/**@description 邀请好友的界面 */
enum InviteFriendPath{
    /**@description 常规模式 */
    normal = "normal",

}


export {InviteFriendPath, RankRouterPath,CashOutRouterPath, ClickOnRouterPath};