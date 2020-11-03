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

    @property(cc.Animation)
    complete_cook_animation: cc.Animation = null;

    @property(cc.Animation)
    home_tool_pot: cc.Animation = null;

    @property(cc.ParticleSystem)
    part_system: Array<cc.ParticleSystem> = [];

    plot_user_number: number = 0;
    people_data: PeopleData = null;

    onEnable() {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.change_cook_woman_state, this, this.set_plot_state);
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.complete_cook_menu, this, this.complete_cook);
    }

    onDisable() {
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.change_cook_woman_state, this, this.set_plot_state);
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.complete_cook_menu, this, this.complete_cook);
    }

    set_plot_user(add_order_id: number) {
        this.plot_user_number = add_order_id + 2;
        this.people_data = GameLocalData.get_instance().get_data<PeopleData>(PeopleData);
    }

    start() {
        this.set_plot_state();
        this.complete_cook_animation.node.active = false;
    }

    complete_cook(event, cook_woman_id: number) {
        if (this.plot_user_number == cook_woman_id) {
            this.complete_cook_animation.node.active = true;
            this.complete_cook_animation.play();
            for (let i = 0; i < this.part_system.length; i++) {
                this.part_system[i].resetSystem();
            }
            this.scheduleOnce(() => {
                this.complete_cook_animation.node.active = false;
            }, 1)
        }
    }

    set_plot_state() {
        let cook_woman_state = this.people_data.get_people_data_by_people_config_id(this.plot_user_number).cookWomanState;
        if (cook_woman_state == CookWomanState.Cook) {
            this.fire.active = true;
            this.wait_node.active = false;
            this.cooking.active = true;
            this.home_tool_pot.play();
        } else {
            this.fire.active = false;
            this.wait_node.active = true;
            this.cooking.active = false;
        }
    }

}
