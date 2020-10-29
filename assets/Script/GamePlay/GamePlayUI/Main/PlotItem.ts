import BaseNode from "../../../Common/BaseNode";
import EventManager from "../../../EventManager/EventManager";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import PeopleData from "../../../GameLocalData/PeopleData";
import { CookWomanState } from "../../GamePlayEnum/GamePlayEnum";
import LinkGameBase from "../../LinkGameBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlotItem extends BaseNode {

    @property(cc.Node)
    fire: cc.Node = null;

    @property(cc.Node)
    cooking: cc.Node = null;

    @property(cc.Node)
    wait_node: cc.Node = null;

    plot_user_number: number = 0;
    people_data: PeopleData = null;

    onEnable() {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.change_cook_woman_state, this, this.set_plot_state);
    }

    onDisable() {
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.change_cook_woman_state, this, this.set_plot_state);
    }

    set_plot_user(add_order_id: number) {
        this.plot_user_number = add_order_id + 2;
        this.people_data = GameLocalData.get_instance().get_data<PeopleData>(PeopleData);
    }

    start() {
        this.set_plot_state();
    }

    set_plot_state() {
        let cook_woman_state = this.people_data.get_people_data_by_people_config_id(this.plot_user_number).cookWomanState;
        if (cook_woman_state == CookWomanState.Cook) {
            this.fire.active = true;
            this.wait_node.active = false;
            this.cooking.active = true;
        } else {
            this.fire.active = false;
            this.wait_node.active = true;
            this.cooking.active = false;
        }
    }

}
