
/**@description 邀请好友的奖励数据的接口 */
interface StageInterface{
     /**@description 好友数量 */
    readonly num: number;
    /**@description 金额, 单位分 */
    readonly money: number;
    /**@description 总共金额, 单位元 */
    readonly totalMoney: number;
}

/**@description 分享页面的数据接口[GET :"/g3-odyssey/api/share"] */
interface ShareInterface{
     /**@description 我的邀请码 */
    readonly code: number;
    /**@description 今日是否领取 */
    readonly received: boolean;
    /**@description 领取剩余天数 */
    readonly leftDays: number;
    /**@description 好友数量 */
    readonly friendNum: number;
    /**@description 师傅名字 */
    readonly masterName: string;
    /**@description 师傅的头像 */
    readonly masterPhotoUrl: string; 
    /**@description 邀请好友的奖励信息 */
    readonly stages:Array<StageInterface>;
}

/**@description 填入邀请码返回的数据接口[post: ] */
interface InputShareCodeInterface{
    /**@description 师傅的名称 */
    readonly masterName: string;
    /**@description 师傅的头像 */
    readonly masterPhotoUrl: string;
}

/**@description 领取风向奖励的接口[post: /g3-odyssey/api/share] */
interface GetShareAwardMoneyInterface{
    /**@description 领取后, 刷新最新的余额 */
    readonly newMoney: number;
}

/**@description 邀请好友的UI接口[post: /g3-odyssey/api/share/add] */
interface InviteFriendUiInterface{
   
}

/**@description 邀请好友的item的UI变化节目 */
interface InviteFriendItemUiInterface{

}


export {InputShareCodeInterface, StageInterface, GetShareAwardMoneyInterface, ShareInterface, InviteFriendUiInterface, InviteFriendItemUiInterface}