/**@description 签到页面的数据接口[GET: /api/sign] */
interface SignInInterface{
    /**@description 已签到天数 */
     readonly day: number;
     /**@description 红包 */
     readonly money: number;
     /**@description 今日是否已签到 */
     readonly sign: boolean;
      /**@description 所需签到天数 */
     readonly totalDay: number;
      /**@description 是否已领取红包 */
     readonly done: boolean;
};

/**@description 签到操作返回的数据接口[POST: /api/sign ] */
interface SignPostInterface{
   /**@description 新的签到天数 */
   readonly newDay: number;
}


/**@description 签到领取红包的数据接口[POST: /api/sign/receive] */
interface SignReceiveInterface{
    /**@description 新的红包余额 */
   readonly newMoney:number;
};



export  {SignReceiveInterface, SignInInterface, SignPostInterface};