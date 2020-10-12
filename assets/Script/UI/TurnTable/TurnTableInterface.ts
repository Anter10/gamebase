interface TurnTableItemInterface{
    /**@description type=0 有效 */
    readonly icon: string;
    /**@description 奖品的ID */
    readonly id: number;
    /**@description 奖品名称 */
    readonly name: string;
    /**@description 奖品的数量 */
    readonly num: number;
    /**@description 奖励数量 type!=0 有效 */
    readonly reward: number;
    /**@description 奖品的类型 */
    readonly type: number;
}

/**@description 转盘的数据接口[GET: /api/turntable] */
interface TurnTableConfigInterface{
    /**@description 每日看视频次数  */
    readonly dayAddEnergyTimes: number;
    /**@description 每日三倍次数 */
    readonly dayTripleTimes: number;
    /**@description 开始日期 */
    readonly startDate:string;
    /**@description 结束日期 */
    readonly endDate: string;
    /**@description 后续行为额外宝箱次数 */
    readonly extraChestTimes:number;
    /**@description 看视频额外能量  */
    readonly extraEnergy: number;
    /**@description 活动初始能量 */
    readonly initialEnergy: number;
    /**@description 奖品的配置信息 */
    readonly config:Array<TurnTableItemInterface>;
}

/**@description 转盘的数据模型接口 */
interface TurnTableInterface{
    readonly config:  TurnTableConfigInterface;
    readonly showExtraFunction: boolean;
}


/**@description 转盘抽奖界面的接口 */
interface TurnTableViewInterface{
    flush_items: Function;
    start_rotate: Function;
}


export {TurnTableItemInterface,TurnTableConfigInterface, TurnTableInterface,TurnTableViewInterface }