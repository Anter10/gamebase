/**@description *新* 邀请数据 */
interface InviteDataInterface{
    limitMoney:number;
    process: number;
    needProcess: number;
}

/**@description 物品类信息 */
interface GoodsDataInterface{
    name: string;
    content: string;
    image: string;
    money: string;
}

/**@description 用户的现金数据 */
class UserMoneyModel{
    readonly money: number;
    readonly newUser: boolean;
    readonly nickName: string;
    readonly photoUrl:string;
    readonly userId: string;
}

/**@description 提现界面的列表数据接口[GET: /api/withdraw] */
interface WithDrawInterface{
    /**@description 是否禁用  */
    readonly disable: boolean;
    /**@description 提现类型 */
    readonly goodsType: number;
    /**@description id  */
    readonly id: number;
    /**@description 金额 */
    readonly money:number;
    /**@description 所需进度 */
    readonly needProcess: number;
    /**@description 当前进度 */
    readonly process: number;
    /**@description 类型 0: 普通, 1:新人, 2:每日, 3:打卡, 4:通关数, 5:商人订单初级, 6:商人订单中级, 7:商人订单高级 8:欺骗功能,不会完成 */
    readonly type: number;
    /**@description 物品类信息 */
    readonly goodsData?:GoodsDataInterface;
    /**@description *新* 邀请数据 */
    readonly inviteData?:InviteDataInterface;
}

/**@description 提现界面的刷新接口 */
interface CashOutViewInterface{
    flush_money:Function;
    cash_out_callback: Function;
}

/**@description 提现操作的数据接口[POST: /api/withdraw] */
interface CashInterface{
    /**@description 是否金额 */
    readonly disable: boolean;
    /**@description 新的余额 */
    readonly newMoney:  number;
    /**@description 新的进度 */
    readonly newProgress: number;
}

/**@description 提现记录的数据接口[GET: /withdraw/order] */
interface CashOutOrderInterface{
    /**@description 消耗金额 */
    readonly costMoney: number;
    /**@description 提现金额 */
    readonly money: number;
    /**@description 提现状态 */
    readonly status: number;
    /**@description 提现日期 */
    readonly datetime: string;
}


/**@description 提现成功的界面接口 */
interface CashOutSuccessViewInterface{
    
}




export {CashOutOrderInterface, CashInterface, InviteDataInterface, GoodsDataInterface,UserMoneyModel, WithDrawInterface,CashOutViewInterface, CashOutSuccessViewInterface};
