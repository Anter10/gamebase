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




export {GuideNpcDirection, GuideType, GuideFingerDirection, GuideMaskType};
