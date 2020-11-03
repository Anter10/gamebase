
/**@description 排行榜里面单个玩家的排行数据 */
interface RankItemInterface{
    readonly key:{name: string, photoUrl: string};
    readonly rank: number;
    readonly reward:  string;
    readonly value: string;
}

/**@description 排行榜界面的数据结构 */
interface RankInterface{
    /**@description 排行榜的描述 */
    readonly desc: string;
    /**@description 排行榜的标题头部 */
    readonly headers: string;
    /**@description 排行榜的玩家排行数据 */
    readonly itemList: Array<RankItemInterface>;
    /**@description 玩家自己的排行数据 */
    readonly myItem: RankItemInterface;
}


/**@description 排行榜公示的数据接口 */
interface RankPublicInterface{
    /**@description 日期, 直接展示 */
    readonly date: string;
    /**@description 需要的分数 */
    readonly needScore: number;
    /**@description 排行 0表示未上榜 */
    readonly rank: number;
    /**@description 奖励红包数 */
    readonly money: number;
    /**@description 分数 */
    readonly score: number;
    /**@description 最新红包数 */
    readonly newMoney: number;
}

/**@description 排行榜的表头信息 */
interface HeaderItemInterface{
    /**@description 顶部标题的显示文本 */
    title: string;
    /**@description title所占的宽度 */
    item_width?: number;
}

/**@description 排行榜 UI 名称 */
interface RankUiNameInterface {
    /**@description 最底层背景 */
    backGround: string;
}

export {HeaderItemInterface, RankPublicInterface, RankItemInterface, RankInterface ,RankUiNameInterface}