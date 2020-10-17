 
const {ccclass, property} = cc._decorator;

@ccclass
export default class RanTypeNode extends cc.Component {

    @property(cc.Label)
    rank_type_node_value_label: cc.Label = null;


    // onLoad () {}

    start () {

    }

    set_value(value: string){
        this.rank_type_node_value_label.string = value;
    }

    set_width(width: number){
        this.node.width = width;
    }

    // update (dt) {}
}
