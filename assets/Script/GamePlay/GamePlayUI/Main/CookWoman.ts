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
import OrderMenuData, { OrderMenuInterface } from "../../../GameLocalData/OrderMenuData";
import EventManager from "../../../EventManager/EventManager";
import LinkGameBase from "../../LinkGameBase";
import Time from "../../../Common/Time";
import GameConfig from "../../../GameConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CookWoman extends BaseNode {

    @property(sp.Skeleton)
    cook_woman_animation: sp.Skeleton = null;

    @property(cc.Node)
    cook_woman_node: cc.Node = null;

    @property(sp.SkeletonData)
    cook_woman_skeleton_array: Array<sp.SkeletonData> = [];

    @property(cc.Node)
    yanwu: cc.Node = null;

    /**@description 当前行走的路径 */
    _go_path: Array<ANode> = [];

    /**@description 当前走到行动路径的第几个格子 */
    _move_index: number = 1;

    /**@description 开始移动 */
    _start_move: boolean = false;

    /**@description 结束移动 */
    _end_move: boolean = false;

    /**@description 移动长度 */
    _move_length: number = 0;

    /**@description 移动方向 */
    _move_direction: cc.Vec2 = cc.v2(0, 0);

    /**@description 两个节点之间需要移动的总长度 */
    _total_length: number = 0;

    /**@description 移动速度 */
    _move_speed: number = 0;

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
        if (start.x == end.x && start.y == end.y) {
            console.log("起点和终点相同容错处理");
            this.walk_end_set_next_state();
        } else {
            grid.set_start_node(start.x, start.y);
            grid.set_end_node(end.x, end.y);
            const star = new AStar();
            const all_path = star.find(grid);
            console.log("当前的路径1 = ", star.path);
            this._go_path = star.path;
            this._end_move = false;
            this._move_index = 1;
            this._move_length = 0;
            this._total_length = 0;
            if (!this._go_path) {
                console.log(start, end);
            }
            this._start_move = true;
        }
    }

    set_child_position(move_y: number) {
        let insert_number = 0;
        for (let i = 0; i < Map.walk_unable_node_y.length; i++) {
            if (Map.walk_unable_node_y[i] && Map.walk_unable_node_y[i] < move_y + 1) {
                insert_number++;
            }
        }
        Map.walk_people_y[this.cook_woman_data.peopleDataNumber] = move_y;
        Map.walk_people_y.forEach((value, id) => {
            if (Map.walk_people_y[id] && Map.walk_people_y[id] < move_y + 1) {
                insert_number++;
            }
        })
        this.node.parent.insertChild(this.node, insert_number);
    }


    set_route_config() {
        let start_node = this.cell_position(this._go_path[this._move_index - 1]);
        let end_node = this.cell_position(this._go_path[this._move_index]);
        let sub_vector = cc.v2(end_node.x, end_node.y).sub(cc.v2(start_node.x, start_node.y));
        this._move_direction = sub_vector.normalize();
        this._total_length = sub_vector.len();
        if (this.cook_woman_data.cookWomanState == CookWomanState.Stroll) {
            this._move_speed = GamePlayConfig.cook_woman_stroll_speed;
            this.yanwu.active = false;
        } else {
            this._move_speed = GamePlayConfig.cook_woman_send_menu_speed;
            this.yanwu.active = true;
        }
    }

    update(dt) {
        let move_dt_length = this._move_direction.mul(this._move_speed).mul(dt);
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
            if (!this._end_move) {
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
        this.change_cook_state();
    }

    change_cook_state() {
        if (this.cook_woman_data.cookWomanState == CookWomanState.Cook && Time.get_second_time() - this.cook_woman_data.changeStateTime > GamePlayConfig.cook_woman_cook_spend) {
            this.cook_woman_animation.animation = "chaocaiwancheng";
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.complete_cook_menu, this.cook_woman_config_id);
            this.people_data.change_cook_woman_data({ peopleConfigId: this.cook_woman_config_id, cookWomanState: CookWomanState.CompleteCook });
            this.cook_woman_node.scaleX = 0.35;
            this.scheduleOnce(() => {
                this.set_cook_woman();
            }, 1.5);
        }
    }

    have_order_menu() {
        if (this.cook_woman_data.cookWomanState == CookWomanState.Stroll) {
            let menu_array = this.order_menu_data.get_order_menu();
            if (menu_array.length != 0) {
                for (let i = 0; i < menu_array.length; i++) {
                    if (menu_array[i].CookWomanConfigId == 0) {
                        this.order_menu_data.change_have_cook_woman(menu_array[i].menuNumber, this.cook_woman_config_id);
                        this.people_data.change_cook_woman_data({ peopleConfigId: this.cook_woman_config_id, cookWomanState: CookWomanState.GetOrder });
                        this.set_cook_woman();
                        console.log("this.cook_woman_config_id", menu_array[i].menuNumber);
                        break;
                    }
                }
            }
        }
    }

    walk_end_set_next_state() {
        this._end_move = true;
        if (this.cook_woman_data.cookWomanState == CookWomanState.Stroll) {
            if (this._go_path[this._move_index - 1].x == GamePlayConfig.cook_woman_stroll_position[0][0]) {
                this.walk_simple({ x: GamePlayConfig.cook_woman_stroll_position[0][0], y: GamePlayConfig.cook_woman_stroll_position[0][1] }, { x: GamePlayConfig.cook_woman_stroll_position[1][0], y: GamePlayConfig.cook_woman_stroll_position[1][1] });
            } else {
                this.walk_simple({ x: GamePlayConfig.cook_woman_stroll_position[1][0], y: GamePlayConfig.cook_woman_stroll_position[1][1] }, { x: GamePlayConfig.cook_woman_stroll_position[0][0], y: GamePlayConfig.cook_woman_stroll_position[0][1] });
            }
        } else if (this.cook_woman_data.cookWomanState == CookWomanState.GetOrder) {
            const cook_menu_data: OrderMenuInterface = this.order_menu_data.get_menu_by_cook_woman_config_id(this.cook_woman_config_id);
            this.people_data.change_cook_woman_data({ peopleConfigId: this.cook_woman_config_id, cookWomanState: CookWomanState.GoCook, cookWomanMenuNumberId: cook_menu_data.menuNumber, seatNumber: cook_menu_data.menuSeatId });
            this.cook_woman_animation.animation = "liulancaidan";
            this.cook_woman_node.scaleX = 0.35;
            this.order_menu_data.complete_order_menu_data(cook_menu_data.menuNumber);
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.receiving_menu, cook_menu_data.menuNumber);
            this.scheduleOnce(() => {
                this.set_cook_woman();
            }, 1);
        } else if (this.cook_woman_data.cookWomanState == CookWomanState.GoCook) {
            this.people_data.change_cook_woman_data({ peopleConfigId: this.cook_woman_config_id, cookWomanState: CookWomanState.Cook });
            this.set_cook_woman();
        } else if (this.cook_woman_data.cookWomanState == CookWomanState.Cook) {
            this.cook_woman_animation.animation = "chaocai";
            this.cook_woman_node.scaleX = 0.35;

        } else if (this.cook_woman_data.cookWomanState == CookWomanState.CompleteCook) {
            this.cook_woman_animation.animation = "beimian_shangcai";
            this.cook_woman_node.scaleX = 0.35;

            this.people_data.change_cook_woman_data({ peopleConfigId: this.cook_woman_config_id, cookWomanState: CookWomanState.SendMenu });
            this.scheduleOnce(() => {
                this.set_cook_woman();
            }, 1);
        } else if (this.cook_woman_data.cookWomanState == CookWomanState.SendMenu) {
            this.people_data.change_cook_woman_data({ peopleConfigId: this.cook_woman_config_id, cookWomanState: CookWomanState.CompleteSendMenu });
            this.set_cook_woman();
        }
    }

    set_cook_woman() {
        let seat_number: number;
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
            case CookWomanState.GoCook:
                this.walk_simple({ x: GamePlayConfig.cook_woman_get_menu_position[0], y: GamePlayConfig.cook_woman_get_menu_position[1] }, { x: GamePlayConfig.cook_woman_cook_position[this.customer_config.id - 2][0], y: GamePlayConfig.cook_woman_cook_position[this.customer_config.id - 2][1] });
                break;
            case CookWomanState.Cook:
                this.cook_woman_animation.animation = "chaocai";
                this.cook_woman_node.scaleX = 0.35;
                break;
            case CookWomanState.CompleteCook:
                seat_number = this.cook_woman_data.seatNumber;
                this.walk_simple({ x: GamePlayConfig.cook_woman_cook_position[this.customer_config.id - 2][0], y: GamePlayConfig.cook_woman_cook_position[this.customer_config.id - 2][1] }, { x: GamePlayConfig.chair_position[seat_number - 1][0], y: GamePlayConfig.chair_position[seat_number - 1][1] });
                break;
            case CookWomanState.SendMenu:
                seat_number = this.cook_woman_data.seatNumber;
                EventManager.get_instance().emit(LinkGameBase.game_play_event_config.finish_menu, seat_number);
                this.walk_simple({ x: GamePlayConfig.chair_position[seat_number - 1][0], y: GamePlayConfig.chair_position[seat_number - 1][1] }, { x: GamePlayConfig.cook_woman_cook_position[this.customer_config.id - 2][0], y: GamePlayConfig.cook_woman_cook_position[this.customer_config.id - 2][1] });
                break;
            case CookWomanState.CompleteSendMenu:
                this.people_data.change_cook_woman_data({ peopleConfigId: this.cook_woman_config_id, cookWomanState: CookWomanState.Stroll });
                this.set_cook_woman();
                break;
        }

    }

    set_node_direction_animation() {
        //行走中的动画
        if (this.cook_woman_data.cookWomanState == CookWomanState.Stroll) {
            if (this._move_direction.x > 0 && (this.cook_woman_animation.animation != "liuda" || this.cook_woman_node.scaleX != -0.35)) {
                this.cook_woman_animation.animation = "liuda";
                this.cook_woman_node.scaleX = -0.35;
            }
            if (this._move_direction.x < 0 && (this.cook_woman_animation.animation != "liuda" || this.cook_woman_node.scaleX != 0.35)) {
                this.cook_woman_animation.animation = "liuda";
                this.cook_woman_node.scaleX = 0.35;
            }
            if (this._move_direction.y < 0 && this.cook_woman_animation.animation != "zhengmian_walk") {
                this.cook_woman_animation.animation = "zhengmian_walk";
                this.cook_woman_node.scaleX = 0.35;
            }
            if (this._move_direction.y > 0 && this.cook_woman_animation.animation != "beimian_walk") {
                this.cook_woman_animation.animation = "beimian_walk";
                this.cook_woman_node.scaleX = 0.35;
            }
        } else if (this.cook_woman_data.cookWomanState == CookWomanState.CompleteCook) {
            if (this._move_direction.y < 0 && this.cook_woman_animation.animation != "zhengmian_duancai") {
                this.cook_woman_animation.animation = "zhengmian_duancai";
                this.cook_woman_node.scaleX = 0.35;
            }
            if (this._move_direction.y > 0 && this.cook_woman_animation.animation != "beimian_duancai") {
                this.cook_woman_animation.animation = "beimian_duancai";
                this.cook_woman_node.scaleX = -0.35;
            }
            if (this._move_direction.x > 0 && (this.cook_woman_animation.animation != "cemian_duancai" || this.cook_woman_node.scaleX != -0.35)) {
                this.cook_woman_animation.animation = "cemian_duancai";
                this.cook_woman_node.scaleX = -0.35;
            }
            if (this._move_direction.x < 0 && (this.cook_woman_animation.animation != "cemian_duancai" || this.cook_woman_node.scaleX != 0.35)) {
                this.cook_woman_animation.animation = "cemian_duancai";
                this.cook_woman_node.scaleX = 0.35;
            }
        } else {
            if (this._move_direction.x > 0 && (this.cook_woman_animation.animation != "cemian_walk" || this.cook_woman_node.scaleX != -0.35)) {
                this.cook_woman_animation.animation = "cemian_walk";
                this.cook_woman_node.scaleX = -0.35;
            }
            if (this._move_direction.x < 0 && (this.cook_woman_animation.animation != "cemian_walk" || this.cook_woman_node.scaleX != 0.35)) {
                this.cook_woman_animation.animation = "cemian_walk";
                this.cook_woman_node.scaleX = 0.35;
            }
            if (this._move_direction.y < 0 && this.cook_woman_animation.animation != "zhengmian_walk") {
                this.cook_woman_animation.animation = "zhengmian_walk";
                this.cook_woman_node.scaleX = 0.35;
            }
            if (this._move_direction.y > 0 && this.cook_woman_animation.animation != "beimian_walk") {
                this.cook_woman_animation.animation = "beimian_walk";
                this.cook_woman_node.scaleX = 0.35;
            }
        }
    }
}
