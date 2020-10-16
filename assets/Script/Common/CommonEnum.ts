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

/**@description 拆红包的露肩 */
enum OpenRedEnvelopePath{
    normal = "normal",
}

/**@description 点击按钮的效果类型 */
enum TouchButtonEffectType{
     /**@description 没有效果 */
     none = 1,
     /**@description 缩放效果 */
     scale = 2,
     /**@description 透明的变化的效果 */
     opacity = 3,
}

/**@description 新手引导的类型的枚举类型 */
enum NewPlayerGuideType{
     /**@description 正常模式 */
     normal = "normal",
     /**@description 图片类型的模式 */
     picture = "picture",
}

/**@description 新手引导NPC的水平方向的适配 */
enum GuideNpcAlignHorizontalMode{
     // 左对齐
     left = 1,
     // 右对齐
     right = 2,
}

/**@description 新手引导NPC的水平方向的适配 */
enum GuideNpcAlignVerticleMode{
    // 左对齐
    top = 1,
    // 右对齐
    bottom = 2,
}

/**@description 新手引导NPC的水平方向的适配 */
enum GuideMsgAlignHorizontalMode{
    // 左对齐
    left = 1,
    // 右对齐
    right = 2,
}

/**@description 新手引导NPC的水平方向的适配 */
enum GuideMsgAlignVerticleMode{
   // 左对齐
   top = 1,
   // 右对齐
   bottom = 2,
}


export {GuideMsgAlignHorizontalMode,GuideMsgAlignVerticleMode,GuideNpcAlignVerticleMode,GuideNpcAlignHorizontalMode, NewPlayerGuideType, TouchButtonEffectType, OpenRedEnvelopePath, InviteFriendPath, RankRouterPath,CashOutRouterPath, ClickOnRouterPath};