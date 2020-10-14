/**@description 打卡相关的接口 */


interface ClickOnViewUiInterface{
     
}

/**@description 打卡界面的Item相关的图片 */
interface ClickOnViewItemUiInterface{
    /**@description 底图 */
    click_on_view_item_bottom: string;
    /**@description 打卡状态的ICON  */
    click_on_statue_sprite: string;
    /**@description 打卡进度的底部图 */
    click_on_progress_bottom: string;
    /**@description 打卡进度的上面进度图 */
    click_on_progress_upper: string;
    /**@description 打卡的奖励的图标 */
    award_icon_sprite: string;
}

/**@description 解锁打卡任务提示的接口 */
interface ClickOnFreeTipUiInterface{
    /**@description 打卡任务提示条的底部图片名称 */
    click_on_tip_bottom: string;
}


interface ClickOnViewInterface{
    
}

export {ClickOnFreeTipUiInterface, ClickOnViewItemUiInterface, ClickOnViewUiInterface};