/**@description 引导手指的方向 */
enum GuideFingerDirection{
     /**@description 上 */
     up = 1,
     /**@description 下 */
     down = 2,
     /**@description 左 */
     left = 3,
     /**@description 右 */
     right = 4,
}

/**@description mask的类型 */
enum GuideMaskType{
     /**@description 方形的形状 */
     rect = 1,
     /**@description 圆形的形状 */
     circle = 2,
}

/**@description 引导的类型 */
enum GuideType{
     /**@description 正常的类型 */
     normal = "normal",
     /**@description 图片类型 */
     pciture = "picture",
}

/**@description  NPC的朝向 */
enum GuideNpcDirection{
     /**@description 朝左 */
     left = "left",
     /**@description 朝右 */
     right = "right",
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



export {GuideNpcAlignHorizontalMode,GuideNpcAlignVerticleMode,GuideMsgAlignHorizontalMode,GuideMsgAlignVerticleMode,GuideNpcDirection, GuideType, GuideFingerDirection, GuideMaskType};
