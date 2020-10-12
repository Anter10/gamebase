
/**@description 广告列表的参数接口[GET: /api/task] */
interface AdListItemInterface {
   /**@description ID */
   readonly id: number;
   /**@description 1: 未完成, 0: 可领取, 2:已完成 */
   readonly status: number;
   /**@description 奖励 */
   readonly reward: number;
   /**@description 标题 */
   readonly title: string;
   /**@description 副标题 */
   readonly content: string;
   /**@description 类型 */
   readonly type: string;
   /**@description 数据 */
   readonly data:{seconds:  number, url: string};
   /**@description 特效等级 */ 
   readonly effectLevel: number;
};

/**@description 直客广告 列表[GET: /api/task] */
interface AdListInterface{
    /**@description 直客广告列表数据 */
    items: Array<AdListItemInterface>;
}

export {AdListInterface, AdListItemInterface};