import TouchButton from "../../Common/TouchButton";
import EventManager from "../../EventManager/EventManager";
import LinkGameBase from "../LinkGameBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartGameButton extends cc.Component {

    @property(cc.Label)
    start_game_test_label: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        const start_game_button: TouchButton = this.node.addComponent(TouchButton);
        start_game_button.register_touch(() => {
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.mating);
            this.node.active = false;
        });
    }

    flush_test(event: any, label_text: string){
        this.start_game_test_label.string = label_text;
    }

    start () {

    }

    // update (dt) {}
}
