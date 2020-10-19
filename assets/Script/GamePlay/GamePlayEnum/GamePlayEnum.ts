/**@description 扩建界面的按钮枚举  */
enum ExtensionTypeButton {
    /**@description 扩建桌子 */
    table = "table",
    /**@description 扩建装饰 */
    decoration = "decoration",
}

/**@description 人物类型的枚举  */
enum PeopleType {
    /**@description 灶王爷 */
    kitchen_god = 0,
    /**@description 厨娘 */
    cook_woman = 1,
    /**@description 顾客 */
    customer = 2,
}

/**@description 解锁菜品的奖励类型  */
enum UnlockMenuRewardType {
    /**@description 未解锁 */
    lock = 0,
    /**@description 解锁未领取 */
    unlock = 1,
    /**@description 已领取 */
    get = 2,
}

/**@description 菜谱类型  */
enum MenuType {
    /**@description 未解锁 */
    lock = 0,
    /**@description 解锁 */
    unlock = 1,
}
export { ExtensionTypeButton, PeopleType, UnlockMenuRewardType, MenuType };