/**@description 金币掉落的数据接口[GET: /api/money/{function} {function} 表示通配符, 不同功能用不同的值 */
interface DropCoinInterface{
    /**@description 掉落的金额 */
    money: number;
    /**@description *新*红包翻倍的倍数值 */
    doubleCount: number;
}


/**@description 金币掉落翻倍同步的数据接口[POST: /api/money/double] */
interface DropIconInterface{
    /**@description 新的翻倍数 */
    newDoubleCount: number;
}

/**@description 金币掉落翻倍信息的数据接口[GET: /api/money/double] */
interface DropCoinDoubleInterface{
    /**@description 当前翻倍数(直接展示) */
    doubleCount: number;
    /**@description 最大翻倍数 */
    maxDoubleCount: number;
}

export {DropCoinDoubleInterface,DropIconInterface, DropCoinInterface};
