import BaseUI from "../../../Common/BaseUI";
import OpenRedEnvelopeViewItem from "../OpenRedEnvelopeViewItem";

const {ccclass, property} = cc._decorator;

@ccclass
class NormalOpenRedEnvelopeView extends BaseUI {

    @property(cc.Sprite)
    open_red_envelope_view_bottom: cc.Sprite = null;

    @property(cc.Node)
    container: cc.Node = null;

    @property(cc.Prefab)
    open_red_envelope_view_item_prefab: cc.Prefab = null;

    onLoad () {
        super.onLoad();
        this.init_open_red_list_view();
    }

    /**@description 初始化拆红包的界面 */
    init_open_red_list_view(){
        for(let i = 0; i < 8; i ++){
            const open_red_envelope_view_item = cc.instantiate(this.open_red_envelope_view_item_prefab);
            const open_red_envelope_view_item_script: OpenRedEnvelopeViewItem = open_red_envelope_view_item.getComponent(OpenRedEnvelopeViewItem);
            open_red_envelope_view_item.parent = this.container;
            const width = open_red_envelope_view_item.width;
            const height = open_red_envelope_view_item.height;

            const row = Math.floor(i / 4);
            const column = i % 4;

            open_red_envelope_view_item.x = width / 2 + (column * width) + column * 30;
            open_red_envelope_view_item.y = -(height / 2 + (row * height));
        }
    }

    set_position_by_node(node: cc.Node, x_offset?: number, y_offset?: number){
        let word_pos = this.node.convertToWorldSpaceAR(node.position);
        let node_pos = this.node.parent.convertToNodeSpaceAR(word_pos);
        this.open_red_envelope_view_bottom.node.position = node_pos;
    }

    start () {
        super.start();

    }
}


export default NormalOpenRedEnvelopeView;