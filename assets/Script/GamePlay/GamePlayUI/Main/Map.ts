import { AMap } from "../../AStar/AMap";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Map extends cc.Component {

    @property(cc.Node)
    line: cc.Node = null;

    @property(cc.Node)
    vertical: cc.Node = null;

    @property(cc.Node)
    walk_abel_array: Array<cc.Node> = [];

    static map_grid: any = null;
    static map_item_size: number = 40;

    private line_number: number = 0;
    private vertical_number: number = 0;

    start() {
        this.init_map();
        this.set_guide();
    }

    init_map() {
        this.line_number = Math.round(this.node.width / Map.map_item_size);//20   i 
        this.vertical_number = Math.round(this.node.height / Map.map_item_size);//40 32  j
        Map.map_grid = new AMap(this.line_number, this.vertical_number);
        for (let i = 0; i < this.line_number; i++) {
            for (let j = 0; j < this.vertical_number; j++) {
                if (j == 0 || j >= 30 || i == 0 || i == this.vertical_number - 1) {
                    Map.map_grid.set_walk_able(i, j, false);
                }

            }
        }
    }

    set_guide() {
        for (let i = 0; i < this.vertical_number; i++) {
            if (i >= 32) {

            } else {
                let line_node = cc.instantiate(this.line);
                line_node.y = this.line.y - i * Map.map_item_size;
                line_node.parent = this.node;
            }
        }
        for (let i = 0; i < this.line_number; i++) {
            let vertical_node = cc.instantiate(this.vertical);
            vertical_node.x = this.vertical.x + i * Map.map_item_size;
            vertical_node.parent = this.node;
        }
    }

}
