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

/**@description 顾客状态  */
enum CustomerState {
    /**@description 无状态 */
    null = 0,
    /**@description 排队中 */
    line_up = 1,
    /**@description 坐座位 */
    sit_seat = 2,
    /**@description 点菜中 */
    order_menu = 3,
    /**@description 等菜 */
    wait_menu = 4,
    /**@description 吃饭中 */
    eat = 5,
    /**@description 离开 */
    exit = 6,
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

/**@description 升级店铺需要的条件类型  */
enum StoreUpgradeConditionType {
    /**@description 未解锁 */
    Table = 0,
    /**@description 解锁 */
    Decoration = 1,
    /**@description 解锁 */
    CookWoman = 2,
}

/**@description 厨娘状态  */
enum CookWomanState {
    /**@description 无 */
    Null = 0,
    /**@description 闲逛 */
    Stroll = 1,
    /**@description 获得订单*/
    GetOrder = 2,
    /**@description 走去做饭*/
    GoCook = 3,
    /**@description 做饭 */
    Cook = 4,
    /**@description 完成做饭 */
    CompleteCook = 5,
    /**@description 送餐 */
    SendMenu = 6,
    /**@description 送完回灶台 */
    CompleteSendMenu = 7,
}

export { ExtensionTypeButton, PeopleType, UnlockMenuRewardType, MenuType, StoreUpgradeConditionType, CustomerState, CookWomanState };