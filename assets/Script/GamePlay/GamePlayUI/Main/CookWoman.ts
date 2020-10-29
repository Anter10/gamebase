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

const { ccclass, property } = cc._decorator;

@ccclass
export default class CookWoman extends BaseNode {

    @property(sp.Skeleton)
    cook_woman_animation: sp.Skeleton = null;

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
    cur_node_y: number = 0;
    cook_woman_data: PeopleInterface = null;

    onLoad() {
        this.people_data = GameLocalData.get_instance().get_data<PeopleData>(PeopleData);
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
        this.node.setPosition(this.cell_position({ x: GamePlayConfig.cook_woman_init_position[0], y: GamePlayConfig.cook_woman_init_position[1] }));
    }

    walk_simple(start: { x: number, y: number }, end: { x: number, y: number }) {
        let grid = Map.map_grid;
        grid.set_start_node(start.x, start.y);
        grid.set_end_node(end.x, end.y);
        const star = new AStar();
        const all_path = star.find(grid);
        console.log("当前的路径1 = ", star.path);
        this._go_path = star.path;
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


    update(dt) {
        if (this._start_move && this._go_path[this._move_index]) {
            let move_dt_length = this._move_direction.mul(GamePlayConfig.customer_speed).mul(dt);
            this.node.setPosition(cc.v2(this.node.getPosition().add(move_dt_length)));
            if (this._total_length > this._move_length) {
                this._move_length = this._move_length + move_dt_length.len();
            } else {
                this.node.setPosition(this.cell_position(this._go_path[this._move_index - 1]));
                this._move_length = 0;
                this.set_node_direction_animation();
                this.set_child_position(this._go_path[this._move_index].y);
                this._move_index++;
                if (this._move_index == this._go_path.length) {
                    this.walk_end_set_next_state();
                }
            }
        }
    }

    walk_end_set_next_state() {

    }

    set_node_direction_animation() {
        //行走中的动画
        // if (this._move_direction.y > 0 && this.walk_animation.animation != "beimian_walk") {
        //     this.walk_animation.animation = "beimian_walk";
        //     this.customer_node.scaleX = 0.3;
        // }
        // if (this._move_direction.y < 0 && this.walk_animation.animation != "zhengmian_walk") {
        //     this.walk_animation.animation = "zhengmian_walk";
        //     this.customer_node.scaleX = 0.3;
        // }
        // if (this._move_direction.x > 0 && this.walk_animation.animation != "cemian_walk") {
        //     this.walk_animation.animation = "cemian_walk";
        //     this.customer_node.scaleX = -0.3;
        // }
        // if (this._move_direction.x < 0 && this.walk_animation.animation != "cemian_walk") {
        //     this.walk_animation.animation = "cemian_walk";
        //     this.customer_node.scaleX = 0.3;
        // }
    }
}
