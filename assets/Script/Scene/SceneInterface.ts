
/**@description 加载场景接口 */
interface LoadingSceneInterface{
     /**@description 游戏的Logo图 */
     game_logo_iamge?: string;
     /**@description 游戏的背景图 */
     game_background_image?: string;
     /**@description 游戏的分享图名称 */
     game_share_image?: string;
     /**@description 游戏 loading 进度条的底图 */
     loading_progress_bottom_image?: string;
     /**@description 游戏 loading 进度条的图*/
     loading_progress_upper_image?: string;
     /**@description 游戏开始游戏按钮的图片 */
     start_game_button_image?: string;
     /**@description 开始游戏按钮上面的文本 */
     start_game_button_text?: string;
}


/**@description 游戏场景的接口 */
interface GameSceneInterface{

}


export {LoadingSceneInterface, GameSceneInterface}