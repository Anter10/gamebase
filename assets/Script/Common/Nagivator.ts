import { RankCurrentShowUIType } from "../UI/Rank/RankTypeEnum";
import UIConfig from "../UI/UIManager/UIConfig";
import ActionNode from "./ActionNode";
import BaseNode from "./BaseNode";
import { NagivatorActionInterface, NagivatorInterface, NagivatorUIInterface } from "./CommonInterface";
import Loader from "./Loader";
import TouchButton from "./TouchButton";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Nagivator extends BaseNode {

    @property(cc.Sprite)
    nagivator_bottom: cc.Sprite = null;
    @property(cc.Sprite)
    nagivator_back_bottom: cc.Sprite = null;
    @property(cc.Sprite)
    nagivator_back_button: cc.Sprite = null;

    @property(cc.Node)
    action_container: cc.Node = null;
    @property(cc.Node)
    back_button_node: cc.Node = null;

    @property(cc.Label)
    title_label: cc.Label = null;
    
    public nagivator_interface: NagivatorInterface = null;

    public actions: Array<NagivatorActionInterface> = [];
    

    public nagivator_ui_interface: NagivatorUIInterface = {
        nagivator_bottom: `common_title_bg`,
        nagivator_back_bottom: null, 
        nagivator_back_button: "common_icon_return",
    }

    onLoad(){
        super.onLoad();
    }

    start () {
        this.flush_ui_image(this.nagivator_ui_interface, "./UI/Common/texture/")
    }

    init_actions(actions: Array<NagivatorActionInterface>){
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
    
    set_nagivator_interface(nagivator_interface: NagivatorInterface ,current_show_ui_type?: RankCurrentShowUIType){
        this.nagivator_interface = nagivator_interface;
        this.set_title(this.nagivator_interface.title);
        if (current_show_ui_type) {
            const color_list = {
                wathet: cc.color(30 ,105 ,80 ,255) ,
                blue: cc.color(62 ,75 ,137 ,255),
                green: cc.color(29 ,134 ,125 ,255) ,   
                pink: cc.color(232 ,77 ,110 ,255) ,
                white: cc.color(255 ,255 ,255 ,255) ,   
            };
            this.set_color(color_list[current_show_ui_type]);
        }
        const touch_button: TouchButton = this.back_button_node.addComponent(TouchButton);
        touch_button.register_touch(this.nagivator_interface.back_callback);
        this.set_nagivator_back_bottom_left_widget(this.nagivator_interface.widget_left);
        this.nagivator_bottom.node.active = this.nagivator_interface.show_nagivator_bottom;
    }

    set_title(title: string){
        this.title_label.string = title;
    }

    set_color (color: cc.Color) {
        this.title_label.node.color = color;
        this.nagivator_back_button.node.color = color;
    }

    /**@description 设置返回按钮底部条的widget 左对齐的像素点 */
    set_nagivator_back_bottom_left_widget(widget_left: number){
        if(widget_left){
            const widget: cc.Widget = this.nagivator_back_bottom.getComponent(cc.Widget)
            widget.left = widget_left;
            widget.updateAlignment();
        }
    }

    /**@description 让导航栏撑满横屏 title 居中显示 */
    set_nagivate_bottom_full_screen(){
        const widget: cc.Widget = this.nagivator_back_bottom.getComponent(cc.Widget);
        const layout: cc.Layout = this.nagivator_back_bottom.getComponent(cc.Layout);
        this.title_label.node.x = cc.winSize.width / 2;
        this.title_label.node.anchorX = 0.5;
        layout.enabled = false;
        widget.isAlignRight = true;
        widget.left = 0;
        widget.right = 0;
        widget.updateAlignment();
    }
}
