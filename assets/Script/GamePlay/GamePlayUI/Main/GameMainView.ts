import UIConfig from "../../../UI/UIManager/UIConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMainView extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    init_game_play_ui_config() {
        // UIConfig
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    }

    start() {

    }

    // update (dt) {}
}
