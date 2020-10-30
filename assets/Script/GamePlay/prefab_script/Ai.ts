import { card_list, LordUtils } from "../LordUtils";
import Player from "./Player";


export class Ai{
    public _ai_player: Player;

    /**@description 单张 */
    private _one: card_list = [];
    /**@description 对子 */
    private _pairs: card_list = [];
    /**@description 三张 */
    private _three: card_list = [];
    /**@description 炸弹 */
    private _boom: card_list = [];
    /**@description 飞机 */
    private _plane = [];
    /**@description 顺子*/
    private _progression: card_list = [];
    /**@description 连对 */
    private _progress_pair: card_list = [];
    /**@description 王炸 */
    private _king_bomb: card_list = [];


    /**@description 分析牌型 */
    public analyse(){
        let target = this._ai_player.player_interface.cards.slice(0);
        let state = null;
        let target_wob = null;
        let target_wobt = null;
        let target_wobp = null;
        let target_wobpp = null;

        target.sort(LordUtils.sort_cards);
        


    }

    /**@description 出牌的逻辑 出最小的牌 */
    public play(){
        
    }

}
