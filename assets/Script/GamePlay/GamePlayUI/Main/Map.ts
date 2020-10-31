import Loader from "../../../Common/Loader";
import Random from "../../../Common/Random";
import EventManager from "../../../EventManager/EventManager";
import { PeopleConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import PeopleData from "../../../GameLocalData/PeopleData";
import { AMap } from "../../AStar/AMap";
import { CustomerState, PeopleType } from "../../GamePlayEnum/GamePlayEnum";
import LinkGameBase from "../../LinkGameBase";
import CookWoman from "./CookWoman";
import Customer from "./Customer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Map extends cc.Component {

    @property(cc.Node)
    line: cc.Node = null;

    @property(cc.Node)
    vertical: cc.Node = null;

    @property(cc.Node)
    walk_abel_array: Array<cc.Node> = [];

    @property(cc.Node)
    decoration_array: Array<cc.Node> = [];

    static map_grid: any = null;
    static map_item_size: number = 40;
    static walk_unable_node_y: Array<number> = [];
    static walk_people_y: Array<number> = [];

    private line_number: number = 0;
    private vertical_number: number = 0;
    people_data: PeopleData = null;
    people_configs: Array<PeopleConfig> = null;

    onLoad() {
        this.init_map();
        // this.set_guide();
    }

    start() {
        this.people_data = GameLocalData.get_instance().get_data<PeopleData>(PeopleData);
        this.people_configs = GameDataConfig.get_config_array("PeopleConfig");
        this.init_cook_woman();
        this.init_customer();
    }

    init_cook_woman() {
        for (let i = 0; i < this.people_configs.length; i++) {
            if (this.people_configs[i].type == PeopleType.cook_woman) {
                if (this.people_data.get_people_data_by_people_config_id(this.people_configs[i].id).peopleLevel > 0) {
                    this.add_cook_woman(0, this.people_configs[i].id);
                }
            }
        }
    }

    onEnable() {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.add_customer, this, this.add_customer);
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.add_cook_woman, this, this.add_cook_woman);
    }

    onDisable() {
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.add_customer, this, this.add_customer);
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.add_cook_woman, this, this.add_cook_woman);
    }

    add_cook_woman(event, people_config_id: number) {
        Loader.load_prefab("GamePlay/GamePlayUI/Main/CookWoman", (customer: cc.Prefab) => {
            const cook_woman_node = cc.instantiate(customer);
            const cook_woman_script = cook_woman_node.getComponent(CookWoman);
            cook_woman_node.parent = this.node;
            cook_woman_script.set_cook_woman_config_id(people_config_id);
        })
    }

    init_customer() {
        let customer_data_array = [];
        for (let i = 0; i < this.people_data.get_people_data().length; i++) {
            if (this.people_configs[this.people_data.get_people_data()[i].peopleConfigId - 1].type == PeopleType.customer) {
                customer_data_array.push(this.people_data.get_people_data()[i]);
            }
        }
        for (let i = 0; i < customer_data_array.length; i++) {
            if (customer_data_array[i].customerState != CustomerState.null && customer_data_array[i].customerState != CustomerState.exit) {
                Loader.load_prefab("GamePlay/GamePlayUI/Main/Customer", (customer: cc.Prefab) => {
                    const customer_node = cc.instantiate(customer);
                    const customer_script = customer_node.getComponent(Customer);
                    customer_node.parent = this.node;
                    customer_script.init(customer_data_array[i].peopleDataNumber);
                    customer_script.set_customer();
                })
            }
        }
    }

    add_customer() {
        let customer_configs: Array<PeopleConfig> = [];
        for (let i = 0; i < this.people_configs.length; i++) {
            if (this.people_configs[i].type == PeopleType.customer) {
                customer_configs.push(this.people_configs[i]);
            }
        }
        const customer_config = customer_configs[Random.rangeInt(0, customer_configs.length - 1)];
        const add_customer_data = this.people_data.add_customer(customer_config.id);
        Loader.load_prefab("GamePlay/GamePlayUI/Main/Customer", (customer: cc.Prefab) => {
            const customer_node = cc.instantiate(customer);
            const customer_script = customer_node.getComponent(Customer);
            customer_node.parent = this.node;
            customer_script.init(add_customer_data.peopleDataNumber);
            customer_script.add_new_customer();
        })
    }

    init_map() {
        this.line_number = Math.round(this.node.width / Map.map_item_size);//20   i 
        this.vertical_number = Math.round(this.node.height / Map.map_item_size);//40 32  j
        Map.map_grid = new AMap(this.line_number, this.vertical_number);

        //地图四周不能走
        for (let i = 0; i < this.line_number; i++) {
            for (let j = 0; j < this.vertical_number; j++) {
                if (j == 0 || j > 30 || i == 0 || i == this.vertical_number - 1) {
                    Map.map_grid.set_walk_able(i, j, false);
                }
            }
        }
        for (let i = 0; i < this.line_number; i++) {
            for (let j = 0; j < this.vertical_number; j++) {
                if (j == 0 || j > 30 || i == 0 || i == this.vertical_number - 1) {
                    Map.map_grid.set_walk_able(i, j, false);
                }
            }
        }
        //设置装饰层级
        for (let i = 0; i < this.decoration_array.length; i++) {
            let node_y = Math.floor(this.cell_position(this.decoration_array[i].x, this.decoration_array[i].y).n);
            Map.walk_unable_node_y.push(node_y);
        }

        // //中间的道路留给灶王爷
        for (let i = 8; i < 11; i++) {
            for (let j = 8; j < 27; j++) {
                Map.map_grid.set_walk_able(i, j, false);
            }
        }

        // 大门
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                Map.map_grid.set_walk_able(i, j, false);
                // console.log("大门左", i, j);
            }
        }
        for (let i = 11; i < 19; i++) {
            for (let j = 0; j < 7; j++) {
                Map.map_grid.set_walk_able(i, j, false);
                // console.log("大门右", i, j);
            }
        }

        //红柱子。桌子
        for (let i = 0; i < this.walk_abel_array.length; i++) {
            let node_x = Math.floor(this.cell_position(this.walk_abel_array[i].x, this.walk_abel_array[i].y).m);
            let node_y = Math.floor(this.cell_position(this.walk_abel_array[i].x, this.walk_abel_array[i].y).n);
            Map.walk_unable_node_y.push(node_y);
            if (i == this.walk_abel_array.length - 1) {
                for (let point_x = 0; point_x < 15; point_x++) {
                    for (let point_y = 0; point_y < 3; point_y++) {
                        Map.map_grid.set_walk_able(node_x + point_x - 7, node_y - point_y, false);
                        // console.log("大红色柱子", node_x + point_x - 7, node_y - point_y);
                    }
                }
            }
            else if (i == 2 || i == 3 || i == 8 || i == 9) {
                if (node_x == 5) {
                    for (let point_x = 0; point_x < 3; point_x++) {
                        for (let point_y = 0; point_y < 2; point_y++) {
                            Map.map_grid.set_walk_able(node_x + point_x - 1, node_y - point_y, false);
                            // console.log("四个红色柱子", node_x + point_x - 1, node_y - point_y);
                        }
                    }
                } else {
                    for (let point_x = 0; point_x < 5; point_x++) {
                        for (let point_y = 0; point_y < 2; point_y++) {
                            Map.map_grid.set_walk_able(node_x + point_x - 2, node_y - point_y, false);
                            // console.log("四个红色柱子", node_x + point_x - 2, node_y - point_y);
                        }
                    }
                }
            } else {
                for (let point_x = 0; point_x < 2; point_x++) {
                    for (let point_y = 0; point_y < 2; point_y++) {
                        Map.map_grid.set_walk_able(node_x + point_x - 1, node_y - point_y, false);
                        // console.log("8个桌子", node_x + point_x - 1, node_y - point_y);
                    }
                }
            }
        }
    }

    cell_position(x: number, y: number) {
        const m = (x + this.node.width / 2) / Map.map_item_size;
        const n = (this.node.height / 2 - y) / Map.map_item_size;
        return { m, n };
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
