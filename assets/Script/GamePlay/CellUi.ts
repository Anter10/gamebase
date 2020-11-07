/**@description 单个小的UI的显示和管理逻辑 */

import Loader from "../Common/Loader";
import { LordCardInterface } from "./GamePlayInterface";
import CallLordButton from "./prefab_script/CallLordButton";
import LordBottomCardNode from "./prefab_script/LordBottomCardNode";
import PiPeiNode from "./prefab_script/PiPeiNode";
import QiangDiZhuEffect from "./prefab_script/QiangDiZhuEffect";
import StartGameButton from "./prefab_script/StartGameButton";

export class CellUi{
    public static cell_parent_node: cc.Node = null;

    public static start_button_node: cc.Node = null;
    public static match_effect_node: cc.Node = null;
    public static call_lord_button_node: cc.Node = null;
    public static game_logic_button_node: cc.Node = null;
    public static lord_bottom_card_node: cc.Node = null;
    public static call_lord_effect_node: cc.Node = null;
    

    static show_game_logic_node(){
        if(!this.game_logic_button_node){
            Loader.load_prefab(`./GamePlay/prefab/cells/GameLogicButton`,(prefab: cc.Prefab)=>{
                const start_button_node = cc.instantiate(prefab);
                this.game_logic_button_node = start_button_node;
                this.game_logic_button_node.parent = this.cell_parent_node;
                this.game_logic_button_node.active = true;
                this.game_logic_button_node.zIndex = cc.macro.MAX_ZINDEX - 100;
            });
        }else{
            this.game_logic_button_node.active = true;
        }
    }

    /**@description 显示叫地主的特效 */
    static show_call_lord_effect_node(target_pos: cc.Vec3){
        if(!this.call_lord_effect_node){
            Loader.load_prefab(`./GamePlay/effect/select_lord/prefab/QiangDiZhuEffect`,(prefab: cc.Prefab)=>{
                const start_button_node = cc.instantiate(prefab);
                this.call_lord_effect_node = start_button_node;
                this.call_lord_effect_node.parent = this.cell_parent_node;
                this.call_lord_effect_node.getComponent(QiangDiZhuEffect).show(target_pos);
                this.call_lord_effect_node.active = true;
                this.call_lord_effect_node.zIndex = cc.macro.MAX_ZINDEX - 100;
            });
        }else{
            this.call_lord_effect_node.active = true;
            this.call_lord_effect_node.getComponent(QiangDiZhuEffect).show(target_pos);
        }
    }


    /**@description 显示叫地主的按钮 */
    static show_lord_bottom_card_node(cards:Array<LordCardInterface>){
        if(!this.lord_bottom_card_node){
            Loader.load_prefab(`./GamePlay/prefab/cells/LordBottomCardNode`,(prefab: cc.Prefab)=>{
                const start_button_node = cc.instantiate(prefab);
                this.lord_bottom_card_node = start_button_node;
                this.lord_bottom_card_node.parent = this.cell_parent_node;
                this.lord_bottom_card_node.getComponent(LordBottomCardNode).show(cards);
                this.lord_bottom_card_node.active = true;
            });
        }else{
            this.lord_bottom_card_node.active = true;
            this.lord_bottom_card_node.getComponent(LordBottomCardNode).show(cards);
        }
    }
    


    /**@description 显示叫地主的按钮 */
    static show_call_lord_button_node(){
        if(!this.call_lord_button_node){
            Loader.load_prefab(`./GamePlay/prefab/cells/CallLordButton`,(prefab: cc.Prefab)=>{
                const start_button_node = cc.instantiate(prefab);
                this.call_lord_button_node = start_button_node;
                this.call_lord_button_node.parent = this.cell_parent_node;
                this.call_lord_button_node.getComponent(CallLordButton).show();
                this.call_lord_button_node.active = true;
            });
        }else{
            this.call_lord_button_node.getComponent(CallLordButton).show();
            this.call_lord_button_node.active = true;
        }
    }


    /**@description 显示开始游戏的按钮 */
    static show_start_button(){
        if(!this.start_button_node){
            Loader.load_prefab(`./GamePlay/prefab/cells/StartGameButton`,(prefab: cc.Prefab)=>{
                const start_button_node = cc.instantiate(prefab);
                this.start_button_node = start_button_node;
                this.start_button_node.parent = this.cell_parent_node;
                this.start_button_node.getComponent(StartGameButton);
                this.start_button_node.active = true;
            });
        }else{
            this.start_button_node.active = true;
        }
    }

    /**@description 展示匹配的效果界面 */
    static show_match_effect(){
        if(!this.match_effect_node){
            Loader.load_prefab(`./GamePlay/prefab/cells/PiPeiNode`,(prefab: cc.Prefab)=>{
                const match_effect_node = cc.instantiate(prefab);
                this.match_effect_node = match_effect_node;
                this.match_effect_node.parent = this.cell_parent_node;
                this.match_effect_node.getComponent(PiPeiNode).show();
                this.match_effect_node.active = true;
            });
        }else{
            this.match_effect_node.active = true;
            this.match_effect_node.getComponent(PiPeiNode).show();
        }
    }
}