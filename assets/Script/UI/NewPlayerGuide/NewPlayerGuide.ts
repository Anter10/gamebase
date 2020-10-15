
/**@description 新手引导的蒙版层 */

import BaseUI from "../../Common/BaseUI";
import GameLocalData from "../../GameLocalData/GameLocalData";
import GuideData from "../../GameLocalData/GuideData";
import { NewPlayerGuideInterface } from "./NewPlayerGuideInterface";

//id,node,function
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewPlayerGuide extends BaseUI {

    @property(cc.Mask)
    help_guide_mask: cc.Mask = null;

    @property(cc.Label)
    help_message_label:cc.Label = null;

    @property(cc.Node)
    help_message_bottom:cc.Node = null;
    @property(cc.Node)
    click_button: cc.Node = null;

    @property(cc.Sprite)
    finger_icon: cc.Sprite = null;
    @property(cc.Sprite)
    help_mask_background:cc.Node = null;
    @property(cc.Sprite)
    npc_icon: cc.Sprite = null;

    new_player_guide_interface: NewPlayerGuideInterface = null;

    show_new_player_guide_msg(new_player_guide_interface: NewPlayerGuideInterface) {
        this.new_player_guide_interface = new_player_guide_interface;

        // this.help_guide_area_node.width = this.new_player_guide_interface
        // this.help_guide_area_node.height = GuideConfig[new_player_guide.guide_id][1];
        // this.click_button.width = GuideConfig[new_player_guide.guide_id][0];
        // this.click_button.height = GuideConfig[new_player_guide.guide_id][1];
        // this.finger_effect.angle = GuideConfig[new_player_guide.guide_id][2];
        // this.finger_effect.active = GuideConfig[new_player_guide.guide_id][3];
        // this.mask_sprite.active = GuideConfig[new_player_guide.guide_id][6];
        // this.help_guide_tip_label.node.active = GuideConfig[new_player_guide.guide_id][4];
        // this.write_background.active = GuideConfig[new_player_guide.guide_id][4];
        // if (this.help_guide_tip_label.node.active) {
        //     this.help_guide_tip_label.string = GuideConfig[new_player_guide.guide_id][5];
        // }
        // let click_node = new_player_guide.guide_node;
        // let click_node_word_space = click_node.parent.convertToWorldSpaceAR(click_node.position);
        // let pos = this.node.parent.convertToNodeSpaceAR(click_node_word_space);
        // this.help_guide_area_node.setPosition(pos);
        // this.finger_effect.setPosition(pos);
        // this.click_button.setPosition(pos);
    }

    on_click_guide_area() {
        this.on_close_call();
        let new_player_guide_data:GuideData = GameLocalData.get_instance().get_data(GuideData);
        new_player_guide_data.pass_a_guide(this.new_player_guide_interface.guide_id);
        this.new_player_guide_interface.callback && this.new_player_guide_interface.callback();
    }
}
