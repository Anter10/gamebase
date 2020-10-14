
import BaseNode from "../../Common/BaseNode";

const {ccclass, property} = cc._decorator;

@ccclass
class ClickOnViewItem extends BaseNode {
    
    @property(cc.Sprite)
    click_on_view_item_bottom: cc.Sprite = null;
    @property(cc.Sprite)
    click_on_statue_sprite: cc.Sprite = null;
    @property(cc.Sprite)
    click_on_progress_bottom: cc.Sprite = null;
    @property(cc.Sprite)
    click_on_progress_upper: cc.Sprite = null;
    @property(cc.Sprite)
    award_icon_sprite: cc.Sprite = null;


    @property(cc.Label)
    click_on_date_label: cc.Label = null;
    @property(cc.RichText)
    click_on_tip_label: cc.RichText = null;
    @property(cc.Label)
    click_on_progress_tip_label: cc.Label = null;
    @property(cc.Label)
    special_award_label: cc.Label = null;
    @property(cc.Label)
    award_type_number_tip_label: cc.Label = null;
    

    onLoad () {}

    start () {

    }

    // update (dt) {}
}


export default ClickOnViewItem;