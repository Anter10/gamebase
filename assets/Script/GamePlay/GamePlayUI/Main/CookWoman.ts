import BaseNode from "../../../Common/BaseNode";
import { PeopleConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import PeopleData from "../../../GameLocalData/PeopleData";
import { ANode } from "../../AStar/ANode";
import { AStar } from "../../AStar/AStar";
import GamePlayConfig from "../../GamePlayConfig/GamePlayConfig";
import Map from "./Map";
import { PeopleInterface } from "../../../GameLocalData/PeopleData";
import { CookWomanState } from "../../GamePlayEnum/GamePlayEnum";
import OrderMenuData from "../../../GameLocalData/OrderMenuData";
import EventManager from "../../../EventManager/EventManager";
import LinkGameBase from "../../LinkGameBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CookWoman extends BaseNode {

    @property(sp.Skeleton)
    cook_woman_animation: sp.Skeleton = null;

    @property(cc.Node)
    cook_woman_node: cc.Node = null;

    @property(sp.SkeletonData)
    cook_woman_skeleton_array: Array<sp.SkeletonData> = [];

    /**@description 当前行走的路径 */
    _go_path: Array<ANode> = [];

    /**@description 当前走到行动路径的第几个格子 */
    _move_index: number = 1;

    /**@description 开始移动 */
    _start_move: boolean = false;

    /**@description 移动长度 */
    _move_length: number = 0;

    /**@description 移动方向 */
    _move_direction: cc.Vec2 = cc.v2(0, 0);

    /**@description 两个节点之间需要移动的总长度 */
    _total_length: number = 0;

    private cook_woman_config_id: number = 0;
    customer_config: PeopleConfig = null;
    people_data: PeopleData = null;
    order_menu_data: OrderMenuData = null;
    cook_woman_data: PeopleInterface = null;
    cur_position_x: number = 0;
    cur_position_y: number = 0;

    onLoad() {
        this.people_data = GameLocalData.get_instance().get_data<PeopleData>(PeopleData);
        this.order_menu_data = GameLocalData.get_instance().get_data<OrderMenuData>(OrderMenuData);
    }

    set_cook_woman_config_id(cook_woman_config_id: number) {
        this.cook_woman_config_id = cook_woman_config_id;
        this.cook_woman_data = this.people_data.get_people_data_by_people_config_id(this.cook_woman_config_id);
        this.customer_config = GameDataConfig.get_config_by_id("PeopleConfig", this.cook_woman_config_id);
        this.cook_woman_animation.skeletonData = this.cook_woman_skeleton_array[this.customer_config.id - 2];
    }

    cell_position(node: { x: number, y: number }) {
        const x = node.x * Map.map_item_size - this.node.parent.width / 2 + Map.map_item_size / 2;
        const y = -node.y * Map.map_item_size + this.node.parent.height / 2 - Map.map_item_size / 2 + 50;
        return cc.v2(x, y);
    }

    start() {
        this.node.setPosition(this.cell_position({ x: GamePlayConfig.cook_woman_cook_position[this.customer_config.id - 2][0], y: GamePlayConfig.cook_woman_cook_position[this.customer_config.id - 2][1] }));
        this.set_cook_woman();
    }

    walk_simple(start: { x: number, y: number }, end: { x: number, y: number }) {
        let grid = Map.map_grid;
        grid.set_start_node(start.x, start.y);
        grid.set_end_node(end.x, end.y);
        const star = new AStar();
        const all_path = star.find(grid);
        console.log("当前的路径1 = ", star.path);
        this._go_path = star.path;
        this._move_index = 1;
        this._move_length = 0;
        this._total_length = 0;
        if (!this._go_path) {
            console.log(start, end);
        }
        this._start_move = true;
    }

    set_child_position(move_y: number) {
        let insert_number = 0;
        for (let i = 0; i < Map.walk_unable_node_y.length; i++) {
            if (Map.walk_unable_node_y[i] && Map.walk_unable_node_y[i] < move_y + 2) {
                insert_number++;
            }
        }
        Map.walk_people_y[this.cook_woman_data.peopleDataNumber] = move_y;
        for (let i = 0; i < Map.walk_people_y.length; i++) {
            if (Map.walk_people_y[i] && Map.walk_people_y[i] < move_y + 2) {
                insert_number++;
            }
        }
        this.node.parent.insertChild(this.node, insert_number);
    }


    set_route_config() {
        let start_node = this.cell_position(this._go_path[this._move_index - 1]);
        let end_node = this.cell_position(this._go_path[this._move_index]);
        let sub_vector = cc.v2(end_node.x, end_node.y).sub(cc.v2(start_node.x, start_node.y));
        this._move_direction = sub_vector.normalize();
        this._total_length = sub_vector.len();
    }

    update(dt) {
        let move_dt_length = this._move_direction.mul(GamePlayConfig.cook_woman_speed).mul(dt);
        if (this._start_move && this._go_path[this._move_index]) {
            this.node.setPosition(cc.v2(this.node.getPosition().add(move_dt_length)));
            if (this._total_length > this._move_length) {
                this._move_length = this._move_length + move_dt_length.len();
            } else {
                this.node.setPosition(this.cell_position(this._go_path[this._move_index - 1]));
                this.set_route_config();
                this._move_length = 0;
                this.set_node_direction_animation();
                this.set_child_position(this._go_path[this._move_index].y);
                this.have_order_menu();
                this._move_index++;
            }
        } else {
            if (this._total_length > this._move_length) {
                this.node.setPosition(cc.v2(this.node.getPosition().add(move_dt_length)));
                this._move_length = this._move_length + move_dt_length.len();
            } else {
                if (this._move_index == this._go_path.length) {
                    this.walk_end_set_next_state();
                }
            }
        }
    }

    have_order_menu() {
        if (this.cook_woman_data.cookWomanState == CookWomanState.Stroll) {
            if (this.order_menu_data.get_order_menu().length != 0) {
                this.people_data.change_cook_woman_data({ peopleConfigId: this.cook_woman_config_id, cookWomanState: CookWomanState.GetOrder });
                this.set_cook_woman();
            }
        }
    }

    walk_end_set_next_state() {
        if (this.cook_woman_data.cookWomanState == CookWomanState.Stroll) {
            if (this._go_path[this._move_index - 1].x == GamePlayConfig.cook_woman_stroll_position[0][0]) {
                this.walk_simple({ x: GamePlayConfig.cook_woman_stroll_position[0][0], y: GamePlayConfig.cook_woman_stroll_position[0][1] }, { x: GamePlayConfig.cook_woman_stroll_position[1][0], y: GamePlayConfig.cook_woman_stroll_position[1][1] });
            } else {
                this.walk_simple({ x: GamePlayConfig.cook_woman_stroll_position[1][0], y: GamePlayConfig.cook_woman_stroll_position[1][1] }, { x: GamePlayConfig.cook_woman_stroll_position[0][0], y: GamePlayConfig.cook_woman_stroll_position[0][1] });
            }
        } else if (this.cook_woman_data.cookWomanState == CookWomanState.GetOrder) {
            const cook_menu_data = this.order_menu_data.get_order_menu()[0];
            this.people_data.change_cook_woman_data({ peopleConfigId: this.cook_woman_config_id, cookWomanState: CookWomanState.Cook, cookWomanMenuConfigId: cook_menu_data.menuConfigId });
            this.order_menu_data.complete_order_menu_data(cook_menu_data.menuNumber);
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.receiving_menu);
            this.set_cook_woman();
        } else if (this.cook_woman_data.cookWomanState == CookWomanState.Cook) {
            this.cook_woman_animation.animation = "cook_woman_node";
        }
    }

    set_cook_woman() {
        console.log(this.cook_woman_data.cookWomanState);
        switch (this.cook_woman_data.cookWomanState) {
            case CookWomanState.Null:
                this.people_data.change_cook_woman_data({ peopleConfigId: this.cook_woman_config_id, cookWomanState: CookWomanState.Stroll });
                this.set_cook_woman();
                break;
            case CookWomanState.Stroll:
                this.walk_simple({ x: GamePlayConfig.cook_woman_cook_position[this.customer_config.id - 2][0], y: GamePlayConfig.cook_woman_cook_position[this.customer_config.id - 2][1] }, { x: GamePlayConfig.cook_woman_stroll_position[0][0], y: GamePlayConfig.cook_woman_stroll_position[0][1] });
                break;
            case CookWomanState.GetOrder:
                if (this._go_path.length != 0) {
                    this.walk_simple({ x: this._go_path[this._move_index - 1].x, y: this._go_path[this._move_index - 1].y }, { x: GamePlayConfig.cook_woman_get_menu_position[0], y: GamePlayConfig.cook_woman_get_menu_position[1] });
                } else {
                    this.walk_simple({ x: GamePlayConfig.cook_woman_cook_position[this.customer_config.id - 2][0], y: GamePlayConfig.cook_woman_cook_position[this.customer_config.id - 2][1] }, { x: GamePlayConfig.cook_woman_get_menu_position[0], y: GamePlayConfig.cook_woman_get_menu_position[1] });
                }
                break;
            case CookWomanState.Cook:
                if (this._go_path.length != 0 && this._go_path[this._move_index - 1].x == GamePlayConfig.cook_woman_cook_position[this.customer_config.id - 2][0] && this._go_path[this._move_index - 1].y == GamePlayConfig.cook_woman_cook_position[this.customer_config.id - 2][1]) {
                    this.walk_simple({ x: GamePlayConfig.cook_woman_get_menu_position[0], y: GamePlayConfig.cook_woman_get_menu_position[1] }, { x: GamePlayConfig.cook_woman_cook_position[this.customer_config.id - 2][0], y: GamePlayConfig.cook_woman_cook_position[this.customer_config.id - 2][1] });
                } else {
                    this.cook_woman_animation.animation = "chaocai";
                }
                break;
        }

    }

    set_node_direction_animation() {
        //行走中的动画
        if (this.cook_woman_data.cookWomanState != CookWomanState.SendMenu) {
            if (this._move_direction.x > 0 && (this.cook_woman_animation.animation != "cemian_walk" || this.cook_woman_node.scaleX != -0.3)) {
                this.cook_woman_animation.animation = "cemian_walk";
                this.cook_woman_node.scaleX = -0.3;
            }
            if (this._move_direction.x < 0 && (this.cook_woman_animation.animation != "cemian_walk" || this.cook_woman_node.scaleX != 0.3)) {
                this.cook_woman_animation.animation = "cemian_walk";
                this.cook_woman_node.scaleX = 0.3;
            }
            if (this._move_direction.y < 0 && this.cook_woman_animation.animation != "zhengmian_walk") {
                this.cook_woman_animation.animation = "zhengmian_walk";
                this.cook_woman_node.scaleX = 0.3;
            }
            if (this._move_direction.y < 0 && this.cook_woman_animation.animation != "beimian_walk") {
                this.cook_woman_animation.animation = "beimian_walk";
                this.cook_woman_node.scaleX = 0.3;
            }
        } else {
            if (this._move_direction.y < 0 && this.cook_woman_animation.animation != "zhengmian_duancai") {
                this.cook_woman_animation.animation = "zhengmian_duancai";
                this.cook_woman_node.scaleX = 0.3;
            }
            if (this._move_direction.y > 0 && this.cook_woman_animation.animation != "beimian_duancai") {
                this.cook_woman_animation.animation = "beimian_duancai";
                this.cook_woman_node.scaleX = -0.3;
            }
            if (this._move_direction.x > 0 && (this.cook_woman_animation.animation != "cemian_duancai" || this.cook_woman_node.scaleX != -0.3)) {
                this.cook_woman_animation.animation = "cemian_duancai";
                this.cook_woman_node.scaleX = -0.3;
            }
            if (this._move_direction.x < 0 && (this.cook_woman_animation.animation != "cemian_duancai" || this.cook_woman_node.scaleX != 0.3)) {
                this.cook_woman_animation.animation = "cemian_duancai";
                this.cook_woman_node.scaleX = 0.3;
            }
        }

    }
}
