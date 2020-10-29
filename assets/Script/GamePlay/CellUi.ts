/**@description 单个小的UI的显示和管理逻辑 */

import Loader from "../Common/Loader";
import PiPeiNode from "./prefab_script/PiPeiNode";
import StartGameButton from "./prefab_script/StartGameButton";

export class CellUi{
    public static cell_parent_node: cc.Node = null;

    public static start_button_node: cc.Node = null;
    public static match_effect_node: cc.Node = null;

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