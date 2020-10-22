import { AMap } from "../../AStar/AMap";
import { ANode } from "../../AStar/ANode";
import { AStar } from "../../AStar/AStar";
import GamePlayConfig from "../../GamePlayConfig/GamePlayConfig";
import Map from "./Map";

const { ccclass, property } = cc._decorator;

@ccclass
export default class People extends cc.Component {

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

    start() {
        this.walk_simple();
    }

    walk_simple() {
        let grid = Map.map_grid;
        this.scheduleOnce(() => {
            grid.set_start_node(1, 10);
            grid.set_end_node(6, 20);
            const star = new AStar();
            const all_path = star.find(grid);
            console.log("当前的路径1 = ", star.path);
            this._go_path = star.path;
            this.set_people_position();
            this.set_route_config();
            this._start_move = true;
        }, 1);
    }

    set_people_position() {
        this.node.setPosition(this.cell_position(this._go_path[this._move_index - 1]));
        console.log(this.node.getPosition());
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
                this.set_route_config();
                this._move_length = 0;
                this.set_node_direction_animation();
                this._move_index++;
                console.log("this._move_index", this._move_index);
            }
        }
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
        const y = -node.y * Map.map_item_size + this.node.parent.height / 2 - Map.map_item_size / 2;
        return cc.v2(x, y);
    }

}
