
/**@description 提现界面的类型 有余额的类型 和 非余额的类型 */
enum CashOutType{
    /**@description  1: 有余额类型的 */
    balance = 1,
    /**@description 2： 无余额类型的 */
    no_balance = 2,
}


/**@description 提现Item的类型 */
enum CashOutItemType{
   /**@description 0: 普通 */
   normal = 0,
   /**@description 1:新人 */
   new_plyaer = 1,
    /**@description 2:每日 */
   every_day = 2,
    /**@description 3:打卡 */
   click_on = 3,
    /**@description 4:通关数 */
   pass_level = 4,
    /**@description 5:商人订单初级 */
   people_order_levle_1 = 5,
    /**@description 6:商人订单中级 */
   people_order_middle_2 = 6,
    /**@description  7:商人订单高级 */
   people_order_high_3 = 7,
    /**@description  7:商人订单高级 */
   cheat = 8,
}


export {CashOutType, CashOutItemType};
