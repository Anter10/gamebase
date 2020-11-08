import TouchButton from "../../Common/TouchButton";
import EventManager from "../../EventManager/EventManager";
import LinkGameBase from "../LinkGameBase";

 
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameLogicButton extends cc.Component {

    @property(cc.Label)
    clock_label: cc.Label = null;

    // 不出
    @property(cc.Node)
    no_out_btn: cc.Node = null;

    // 提示
    @property(cc.Node)
    tip_button: cc.Node = null;

    // 时间的节点
    @property(cc.Node)
    clock_node: cc.Node = null;

    // 出牌
    @property(cc.Node)
    out_btn: cc.Node = null;

    // 要不起
    @property(cc.Node)
    no_more_btn: cc.Node = null;
   
    onLoad () {
        this.no_more_btn.addComponent(TouchButton).register_touch(()=> {
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.no_send_card, {position: 0});
        });

        this.no_out_btn.addComponent(TouchButton).register_touch(()=> {
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.no_send_card, {position: 0});
        });

        this.out_btn.addComponent(TouchButton).register_touch(()=> {
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.player_send_card);
        });

        this.tip_button.addComponent(TouchButton).register_touch(()=> {
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.prompt_card);
        });
    }

    start () {

    }

    // update (dt) {}
}
