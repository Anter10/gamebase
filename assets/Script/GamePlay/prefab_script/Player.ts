
const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Label)
    where_name_label: cc.Label = null;

    @property(cc.Label)
    money_label: cc.Label = null;

    @property(cc.Label)
    player_name_label: cc.Label = null;

    
    @property(cc.Sprite)
    icon_sprite: cc.Sprite = null;

    @property(cc.Node)
    card_container: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
