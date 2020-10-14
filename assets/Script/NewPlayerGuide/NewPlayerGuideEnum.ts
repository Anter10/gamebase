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

enum GuideMaskType{
     /**@description 没有mask */
     none = 1,
     /**@description 方形的形状 */
     rect = 2,
     /**@description 圆形的形状 */
     circle = 3,
}

export {GuideFingerDirection, GuideMaskType};
