import BaseNode from "../../../Common/BaseNode";
import { PeopleConfig, TableConfig } from "../../../GameDataConfig/ConfigInterface";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import PeopleData from "../../../GameLocalData/PeopleData";
import SeatData from "../../../GameLocalData/SeatData";
import TableData from "../../../GameLocalData/TableData";
import { AMap } from "../../AStar/AMap";
import { ANode } from "../../AStar/ANode";
import { AStar } from "../../AStar/AStar";
import GamePlayConfig from "../../GamePlayConfig/GamePlayConfig";
import { CustomerState } from "../../GamePlayEnum/GamePlayEnum";
import Map from "./Map";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Customer extends BaseNode {

    @property(sp.Skeleton)
    walk_animation: sp.Skeleton = null;

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

    people_data: PeopleData = null;
    customer_config: PeopleConfig = null;
    customer_data_id: number = 0;

    init(customer_data_id: number) {
        this.customer_data_id = customer_data_id;
        this.people_data = GameLocalData.get_instance().get_data<PeopleData>(PeopleData);
        // this.customer_config = 
    }

    start() {

    }

    set_customer() {
        const customer_data = this.people_data.get_customer_data(this.customer_data_id);
        if (customer_data.seatNumber != 0 && customer_data.seatNumber % 2 != 0) {
            this.node.scaleX = -0.3;
        }
        switch (customer_data.customerState) {
            case CustomerState.line_up:
                this.line_up_node(customer_data.lineUp);
                break;
            case CustomerState.sit_seat:
                console.log("customer_data.seatNumber", customer_data.seatNumber)
                this.node.setPosition(this.cell_position({ x: GamePlayConfig.chair_position[customer_data.seatNumber - 1][0], y: GamePlayConfig.chair_position[customer_data.seatNumber - 1][1] }));
                this.walk_animation.animation = "wanshouji";
                break;
            case CustomerState.oder_menu:
                this.walk_animation.animation = "diancan";
                break;
            case CustomerState.eat:
                this.walk_animation.animation = "chifan";
                break;
        }
    }

    add_new_customer() {
        const table_data = GameLocalData.get_instance().get_data<TableData>(TableData);
        const seat_data = GameLocalData.get_instance().get_data<SeatData>(SeatData);
        let unlock_table_number = 0;
        for (let i = 0; i < GamePlayConfig.total_table_number; i++) {
            if (table_data.get_table_data(i).tableLevel > 0) {
                unlock_table_number++;
            }
        }
        for (let i = 1; i <= unlock_table_number * 2; i++) {
            if (seat_data.get_seat_data(i).seatHavePeople == false) {
                seat_data.change_seat_data(i, true);
                this.people_data.change_customer_data({ peopleDataNumber: this.customer_data_id, seatNumber: i, customerState: CustomerState.sit_seat });
                this.walk_simple({ x: 8, y: 5 }, { x: GamePlayConfig.chair_position[i][0], y: GamePlayConfig.chair_position[i][1] });
                return;
            }
        }
        this.wait_line_up();
    }

    wait_line_up() {
        const line_up = this.people_data.get_line_max();
        this.people_data.change_customer_data({ peopleDataNumber: this.customer_data_id, lineUp: line_up });
        this.line_up_node(line_up);
    }

    line_up_node(line_up_number: number) {
        if (line_up_number == 1) {
            this.node.setPosition(this.cell_position({ x: GamePlayConfig.line_up_position[0][0], y: GamePlayConfig.line_up_position[0][1] }));
        } else if (line_up_number == 2) {
            this.node.setPosition(this.cell_position({ x: GamePlayConfig.line_up_position[1][0], y: GamePlayConfig.line_up_position[1][1] }));
        } else {
            this.node.active = false;
            console.log("等排队");
        }
    }

    walk_simple(start: { x: number, y: number }, end: { x: number, y: number }) {
        let grid = Map.map_grid;
        grid.set_start_node(start.x, start.y);
        grid.set_end_node(end.x, end.y);
        const star = new AStar();
        const all_path = star.find(grid);
        console.log("当前的路径1 = ", star.path);
        this._go_path = star.path;
        this.set_people_position();
        this._start_move = true;
    }

    set_people_position() {
        this.node.setPosition(this.cell_position(this._go_path[this._move_index - 1]));
    }

    set_route_config() {
        let start_node = this.cell_position(this._go_path[this._move_index - 1]);
        let end_node = this.cell_position(this._go_path[this._move_index]);
        let sub_vector = cc.v2(end_node.x, end_node.y).sub(cc.v2(start_node.x, start_node.y));
        this._move_direction = sub_vector.normalize();
        this._total_length = sub_vector.len();
    }

    update(dt) {
        if (this._start_move && this._go_path[this._move_index]) {
            let move_dt_length = this._move_direction.mul(GamePlayConfig.customer_speed).mul(dt);
            this.node.setPosition(cc.v2(this.node.getPosition().add(move_dt_length)));
            if (this._total_length > this._move_length) {
                this._move_length = this._move_length + move_dt_length.len();
            } else {
                this.set_people_position();
                this.set_route_config();
                this._move_length = 0;
                this.set_node_direction_animation();
                this.set_child_position();
                this._move_index++;
            }
        }
    }

    set_child_position() {
        let insert_number = 0;
        for (let i = 0; i < Map.walk_unable_node_y.length; i++) {
            if (Map.walk_unable_node_y[i] < this._go_path[this._move_index].y + 2) {
                insert_number++;
            }
        }
        this.node.parent.insertChild(this.node, insert_number);
    }

    set_node_direction_animation() {
        if (this._move_direction.y > 0 && this.walk_animation.animation != "beimian_walk") {
            this.walk_animation.animation = "beimian_walk";
            this.node.scaleX = 0.3;
        }
        if (this._move_direction.y < 0 && this.walk_animation.animation != "zhengmian_walk") {
            this.walk_animation.animation = "zhengmian_walk";
            this.node.scaleX = 0.3;
        }
        if (this._move_direction.x > 0 && this.walk_animation.animation != "cemian_walk") {
            this.walk_animation.animation = "cemian_walk";
            this.node.scaleX = -0.3;
        }
        if (this._move_direction.x < 0 && this.walk_animation.animation != "cemian_walk") {
            this.walk_animation.animation = "cemian_walk";
            this.node.scaleX = 0.3;
        }
    }

    cell_position(node: { x: number, y: number }) {
        const x = node.x * Map.map_item_size - this.node.parent.width / 2 + Map.map_item_size / 2;
        const y = -node.y * Map.map_item_size + this.node.parent.height / 2 - Map.map_item_size / 2 + 50;
        return cc.v2(x, y);
    }

}
