import UIConfig from "../UI/UIManager/UIConfig";
import ActionNode from "./ActionNode";
import { NagivatorActionInterface, NagivatorInterface, NagivatorUIInterface } from "./CommonInterface";
import Loader from "./Loader";
import TouchButton from "./TouchButton";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Nagivator extends cc.Component {
    @property(cc.Sprite)
    back_button_bottom: cc.Node = null;

    @property(cc.Node)
    action_container: cc.Node = null;
    @property(cc.Node)
    back_button_node: cc.Node = null;

    @property(cc.Label)
    title_label: cc.Label = null;
    
    public nagivator_interface: NagivatorInterface = null;

    public actions: Array<NagivatorActionInterface> = [];
    

    public nagivator_ui_interface: NagivatorUIInterface = {
        nagivator_bottom:"",
        nagivator_back_bottom:"", 
        nagivator_back_button: "",
    }

    start () {

    }

    init_actions(actions: Array<NagivatorActionInterface> ){
        this.actions = actions;

        if(this.actions.length > 0){
            let action_index: number = 0;
            const load_action = ()=>{
                Loader.load_prefab(UIConfig.ActionNode, (prefab: cc.Prefab) => {
                    const action = this.actions[action_index];
                    const action_node = cc.instantiate(prefab);
                    const action_script: ActionNode = action_node.getComponent(ActionNode);
                    action_script.register_action(action)
                    action_node.parent = this.action_container;
                    action_index ++;
                    if(action_index  < this.actions.length - 1){
                        load_action();
                    }
                });
            }

            load_action();
        }
    }

    set_backbutton_callback(back_call_back: Function){
        const touch_button: TouchButton = this.back_button_node.addComponent(TouchButton);
        touch_button.register_touch(back_call_back);
    }
    
    set_nagivator_interface(nagivator_interface: NagivatorInterface){
        this.nagivator_interface = nagivator_interface;
        this.set_title(this.nagivator_interface.title);
        const touch_button: TouchButton = this.back_button_node.addComponent(TouchButton);
        touch_button.register_touch(this.nagivator_interface.back_callback);
    }

    set_title(title: string){
        this.title_label.string = title;
    }


    // update (dt) {}
}
