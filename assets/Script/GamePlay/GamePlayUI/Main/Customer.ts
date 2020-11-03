import BaseNode from "../../../Common/BaseNode";
import Random from "../../../Common/Random";
import Time from "../../../Common/Time";
import TouchButton from "../../../Common/TouchButton";
import EventManager from "../../../EventManager/EventManager";
import { MenuConfig, PeopleConfig, TableConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import MenuData from "../../../GameLocalData/MenuData";
import PeopleData, { CustomerPayInterface } from "../../../GameLocalData/PeopleData";
import SeatData from "../../../GameLocalData/SeatData";
import TableData from "../../../GameLocalData/TableData";
import { AMap } from "../../AStar/AMap";
import { ANode } from "../../AStar/ANode";
import { AStar } from "../../AStar/AStar";
import GamePlayConfig from "../../GamePlayConfig/GamePlayConfig";
import { CustomerState } from "../../GamePlayEnum/GamePlayEnum";
import LinkGameBase from "../../LinkGameBase";
import Map from "./Map";
import { ChatConfig } from "../../../GameDataConfig/ConfigInterface";
import GameConfig from "../../../GameConfig";
import Loader from "../../../Common/Loader";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Customer extends BaseNode {

    @property(sp.Skeleton)
    walk_animation: sp.Skeleton = null;

    @property(cc.Sprite)
    menu_sprite: cc.Sprite = null;

    @property(cc.Node)
    customer_node: cc.Node = null;

    @property(cc.Node)
    menu: cc.Node = null;

    @property(cc.Node)
    dialogue: cc.Node = null;

    @property(cc.Label)
    speak_label: cc.Label = null;

    @property(sp.SkeletonData)
    customer_animation: Array<sp.SkeletonData> = [];

    @property(cc.Sprite)
    eat_menu: cc.Sprite = null;

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

    people_data: PeopleData = null;
    customer_config: PeopleConfig = null;
    customer_data_id: number = 0;
    chair_number: number = 0;

    onLoad() {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.finish_menu, this, this.get_menu);
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.new_seat, this, this.have_new_seat);
    }

    start() {
        //点击顾客头上的菜
        const menu_sprite_button: TouchButton = this.menu_sprite.addComponent(TouchButton);
        menu_sprite_button.register_touch(this.click_customer_menu.bind(this));
    }

    init(customer_data_id: number) {
        this.customer_data_id = customer_data_id;
        this.people_data = GameLocalData.get_instance().get_data<PeopleData>(PeopleData);
        this.customer_config = GameDataConfig.get_config_by_id("PeopleConfig", this.people_data.get_customer_data(this.customer_data_id).peopleConfigId);
        this.walk_animation.skeletonData = this.customer_animation[this.customer_config.id - 6];
    }

    onDestroy() {
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.finish_menu, this, this.get_menu);
        EventManager.get_instance().cancel_listen(LinkGameBase.game_play_event_config.new_seat, this, this.have_new_seat);
    }

    have_new_seat() {
        const customer_data = this.people_data.get_customer_data(this.customer_data_id);
        const table_data = GameLocalData.get_instance().get_data<TableData>(TableData);
        const seat_data = GameLocalData.get_instance().get_data<SeatData>(SeatData);
        let unlock_table_number = 0;
        let have_unlock_table = false;
        let unlock_chair_number = 0;
        for (let i = 0; i < GamePlayConfig.total_table_number; i++) {
            if (table_data.get_table_data(i).tableLevel > 0) {
                unlock_table_number++;
            }
        }
        for (let i = 1; i <= unlock_table_number * 2; i++) {
            if (seat_data.get_seat_data(i).seatHavePeople == false) {
                have_unlock_table = true;
                unlock_chair_number = i;
                break;
            }
        }
        if (have_unlock_table) {
            if (customer_data && customer_data.lineUp) {
                if (customer_data.lineUp == 1) {
                    this.chair_number = unlock_chair_number;
                    seat_data.change_seat_data(unlock_chair_number, true);
                    this.people_data.refresh_line_up_number();
                    this.people_data.change_customer_data({ peopleDataNumber: this.customer_data_id, walkToSeatNumber: unlock_chair_number })
                    this.walk_simple({ x: GamePlayConfig.line_up_position[0][0], y: GamePlayConfig.line_up_position[0][1] }, { x: GamePlayConfig.chair_position[unlock_chair_number - 1][0], y: GamePlayConfig.chair_position[unlock_chair_number - 1][1] });
                }
                else if (customer_data.lineUp == 2) {
                    this.walk_simple({ x: GamePlayConfig.line_up_position[1][0], y: GamePlayConfig.line_up_position[1][1] }, { x: GamePlayConfig.line_up_position[0][0], y: GamePlayConfig.line_up_position[0][1] });
                }
                else if (customer_data.lineUp == 3) {
                    this.node.setPosition(this.cell_position({ x: GamePlayConfig.line_up_position[1][0], y: GamePlayConfig.line_up_position[1][1] }));
                    this.set_child_position(GamePlayConfig.line_up_position[1][1]);
                    this.node.active = true;
                }
            }
        }
    }

    get_menu(event, seat_number: number) {
        const customer_data = this.people_data.get_customer_data(this.customer_data_id);
        if (customer_data && customer_data.seatNumber && seat_number == customer_data.seatNumber) {
            this.people_data.change_customer_data({ peopleDataNumber: this.customer_data_id, customerState: CustomerState.eat });
            this.set_customer();
        }
    }

    random_animation() {
        if (Random.rangeInt(0, 1) == 0) {
            this.walk_animation.animation = "dakeshui";
        } else {
            this.walk_animation.animation = "wanshouji";
        }
    }

    set_customer() {
        const customer_data = this.people_data.get_customer_data(this.customer_data_id);
        const seat_data = GameLocalData.get_instance().get_data<SeatData>(SeatData);
        if (customer_data.seatNumber != 0 && customer_data.seatNumber % 2 != 0) {
            this.customer_node.scaleX = -0.3;
        } else {
            this.customer_node.scaleX = 0.3;
        }
        this.dialogue.active = false;
        if (customer_data.customerState && customer_data.customerState == CustomerState.wait_menu) {
            this.random_animation();
            this.walk_animation.setCompleteListener((a, b, c) => {
                this.random_animation();
            });
        } else {
            if (customer_data.customerState) {
                this.walk_animation.setCompleteListener(() => {
                })
            }
        }
        switch (customer_data.customerState) {
            case CustomerState.line_up:
                this.walk_animation.animation = "zhengmian_walk";
                this.line_up_node(customer_data.lineUp);
                this.have_new_seat();

                //椅子上锁了。人没走到
                //排队到一半退出的。
                if (customer_data.walkToSeatNumber && customer_data.walkToSeatNumber != 0) {
                    this.node.active = true;
                    this.chair_number = customer_data.walkToSeatNumber;
                    this.walk_simple({ x: 8, y: 5 }, { x: GamePlayConfig.chair_position[customer_data.walkToSeatNumber - 1][0], y: GamePlayConfig.chair_position[customer_data.walkToSeatNumber - 1][1] });
                }
                break;
            case CustomerState.sit_seat:
                this.walk_animation.animation = "wanshouji";
                break;
            case CustomerState.order_menu:
                this.walk_animation.animation = "diancai";
                break;
            case CustomerState.wait_menu:
                if (customer_data.peopleDataNumber % 3 == 1) {
                    const chat_config: Array<ChatConfig> = GameDataConfig.get_config_array("ChatConfig");
                    let random_index = Random.rangeInt(0, chat_config.length - 1);
                    this.scheduleOnce(() => {
                        this.speak_label.string = chat_config[random_index].text;
                        this.dialogue.active = true;
                        this.scheduleOnce(() => {
                            this.dialogue.active = false;
                        }, GamePlayConfig.chat_exist_time);
                    }, GamePlayConfig.chat_active_time)
                }
                break;
            case CustomerState.eat:
                this.walk_animation.animation = "chifan";
                let eat_menu_x = 50;
                if (this.customer_node.scaleX > 0) {
                    eat_menu_x = -eat_menu_x;
                }
                this.eat_menu.node.active = true;
                this.eat_menu.node.x = eat_menu_x;
                break;
            case CustomerState.exit:
                this.eat_menu.node.active = false;
                seat_data.change_seat_data(customer_data.seatNumber, false);
                this.people_data.delete_people_by_people_data_number(this.customer_data_id);
                EventManager.get_instance().emit(LinkGameBase.game_play_event_config.new_seat);
                Map.walk_people_y[this.customer_data_id] = undefined;
                this.node.destroy();
                //清除这个垃圾数据
                break;
        }
        if (customer_data.customerState != CustomerState.line_up && customer_data.customerState != CustomerState.exit) {
            this.node.setPosition(this.cell_position({ x: GamePlayConfig.chair_position[customer_data.seatNumber - 1][0], y: GamePlayConfig.chair_position[customer_data.seatNumber - 1][1] }));
            this.set_child_position(GamePlayConfig.chair_position[customer_data.seatNumber - 1][1]);
            if (customer_data.seatNumber != 0) {
                switch (customer_data.seatNumber % 4) {
                    case 0:
                        this.node.x = this.node.x + 10;
                        break;
                    case 1:
                        this.node.x = this.node.x - 15;
                        break;
                    case 2:
                        this.node.x = this.node.x + 20;
                        break;
                    case 3:
                        this.node.x = this.node.x + 10;
                        break;
                }
                if ((customer_data.seatNumber - 1) / 4 >= 3) {
                    this.node.y = this.node.y - 20;
                }
            }
        }
        if (customer_data.customerState == CustomerState.order_menu) {
            this.menu.active = true;
        } else {
            this.menu.active = false;
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
                this.chair_number = i;
                this.people_data.change_customer_data({ peopleDataNumber: this.customer_data_id, walkToSeatNumber: i })
                this.walk_simple({ x: 8, y: 5 }, { x: GamePlayConfig.chair_position[i - 1][0], y: GamePlayConfig.chair_position[i - 1][1] });
                return;
            }
        }
        this.wait_line_up();
    }

    wait_line_up() {
        const line_up = this.people_data.get_line_max();
        this.people_data.change_customer_data({ peopleDataNumber: this.customer_data_id, lineUp: line_up });
        this.walk_animation.animation = "zhengmian_walk";
        this.line_up_node(line_up);
    }

    line_up_node(line_up_number: number) {
        if (line_up_number == 1) {
            this.node.setPosition(this.cell_position({ x: GamePlayConfig.line_up_position[0][0], y: GamePlayConfig.line_up_position[0][1] }));
            this.set_child_position(GamePlayConfig.line_up_position[0][1]);
        } else if (line_up_number == 2) {
            this.node.setPosition(this.cell_position({ x: GamePlayConfig.line_up_position[1][0], y: GamePlayConfig.line_up_position[1][1] }));
            this.set_child_position(GamePlayConfig.line_up_position[1][1]);
        } else {
            this.node.active = false;
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
        this._move_index = 1;
        this._move_length = 0;
        this._total_length = 0;
        this._start_move = true;
        this._end_move = false;
    }

    //点击接单
    click_customer_menu() {
        const customer_data = this.people_data.get_customer_data(this.customer_data_id);
        if (customer_data.customerState == CustomerState.order_menu) {
            this.people_data.change_customer_data({ peopleDataNumber: this.customer_data_id, customerState: CustomerState.wait_menu });
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.order_menu, { order_menu_config_id: customer_data.customerOrderConfig, order_seat_id: this.chair_number, customer_number: this.customer_data_id });
            this.set_customer();
        }
    }

    //自动接单
    automatic_customer_menu() {
        const customer_data = this.people_data.get_customer_data(this.customer_data_id);
        if (customer_data && customer_data.customerState && customer_data.customerState == CustomerState.order_menu) {
            if (Time.get_second_time() - customer_data.changeStateTime >= GamePlayConfig.automatic_menu_time) {
                this.click_customer_menu();
            }
        }
    }

    //顾客是不是吃完了
    is_eat_end() {
        const customer_data = this.people_data.get_customer_data(this.customer_data_id);
        if (customer_data && customer_data.customerState && customer_data.customerState == CustomerState.eat) {
            if (Time.get_second_time() - customer_data.changeStateTime >= GamePlayConfig.customer_eat_menu) {
                this.people_data.change_customer_data({ peopleDataNumber: this.customer_data_id, customerState: CustomerState.exit });
                this.eat_menu.node.active = false;
                this.walk_simple({ x: GamePlayConfig.chair_position[customer_data.seatNumber - 1][0], y: GamePlayConfig.chair_position[customer_data.seatNumber - 1][1] }, { x: 8, y: 5 });
                //吃完给钱
                const cook_woman_level = GameLocalData.get_instance().get_data(PeopleData).get_people_data_by_people_config_id(customer_data.CookWomanConfigId).peopleLevel;
                const pay: CustomerPayInterface = {
                    //厨娘等级
                    cookWomanLevel: cook_woman_level,
                    //顾客座位号
                    seatNumber: customer_data.seatNumber,
                    //顾客点餐菜品配置id
                    customerOrderConfig: customer_data.customerOrderConfig,
                }
                EventManager.get_instance().emit(LinkGameBase.game_play_event_config.customer_pay, pay);
            }
        }
    }

    set_route_config() {
        let start_node = this.cell_position(this._go_path[this._move_index - 1]);
        let end_node = this.cell_position(this._go_path[this._move_index]);
        let sub_vector = cc.v2(end_node.x, end_node.y).sub(cc.v2(start_node.x, start_node.y));
        this._move_direction = sub_vector.normalize();
        this._total_length = sub_vector.len();
    }

    update(dt) {
        let move_dt_length = this._move_direction.mul(GamePlayConfig.customer_speed).mul(dt);
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
        this.automatic_customer_menu();
        this.is_eat_end();
    }

    walk_end_set_next_state() {
        this._end_move = true;
        const customer_data = this.people_data.get_customer_data(this.customer_data_id);
        if (customer_data.customerState == CustomerState.line_up && customer_data.lineUp == 0) {
            this.people_data.change_customer_data({ peopleDataNumber: this.customer_data_id, customerState: CustomerState.sit_seat, seatNumber: this.chair_number, walkToSeatNumber: 0 });
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.new_seat);
            this.set_customer();
            this.scheduleOnce(() => {
                this.set_order_menu();
                this.set_customer();
            }, 1);
        }
        if (customer_data.customerState == CustomerState.exit) {
            this.set_customer();
        }
    }

    //设置点菜中
    set_order_menu() {
        const menu_data = GameLocalData.get_instance().get_data<MenuData>(MenuData);
        const menu_config: Array<MenuConfig> = GameDataConfig.get_config_array("MenuConfig");
        let min = 1;
        let max = 1;
        if (menu_data.get_unlock_number() < 5) {
            min = 1;
            max = menu_data.get_unlock_number() + 1;
        } else if (menu_data.get_unlock_number() >= 5 && menu_data.get_unlock_number() != menu_config.length) {
            min = menu_data.get_unlock_number() - 4;
            max = menu_data.get_unlock_number() + 1;
        } else {
            min = menu_data.get_unlock_number() - 4;
            max = menu_data.get_unlock_number();
        }
        let random_menu = Random.rangeInt(min, max);
        Loader.load_texture(`GamePlay/GamePlayUI/Menu/texture/UI_DishIcon_${menu_config[random_menu - 1].id}`, (texture2d: cc.Texture2D) => {
            this.menu_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
            this.eat_menu.spriteFrame = new cc.SpriteFrame(texture2d);
        })
        this.people_data.change_customer_data({ peopleDataNumber: this.customer_data_id, customerState: CustomerState.order_menu, customerOrderConfig: random_menu });
    }

    set_child_position(move_y: number) {
        let insert_number = 0;
        for (let i = 0; i < Map.walk_unable_node_y.length; i++) {
            if (Map.walk_unable_node_y[i] && Map.walk_unable_node_y[i] < move_y + 1) {
                insert_number++;
            }
        }
        Map.walk_people_y[this.customer_data_id] = move_y;
        Map.walk_people_y.forEach((value, id) => {
            if (Map.walk_people_y[id] && Map.walk_people_y[id] < move_y + 1) {
                insert_number++;
            }
        })
        this.node.parent.insertChild(this.node, insert_number);
    }

    set_node_direction_animation() {
        if (this._move_direction.y > 0 && this.walk_animation.animation != "beimian_walk") {
            this.walk_animation.animation = "beimian_walk";
            this.customer_node.scaleX = 0.3;
        }
        if (this._move_direction.y < 0 && this.walk_animation.animation != "zhengmian_walk") {
            this.walk_animation.animation = "zhengmian_walk";
            this.customer_node.scaleX = 0.3;
        }
        if (this._move_direction.x > 0 && this.walk_animation.animation != "cemian_walk") {
            this.walk_animation.animation = "cemian_walk";
            this.customer_node.scaleX = -0.3;
        }
        if (this._move_direction.x < 0 && this.walk_animation.animation != "cemian_walk") {
            this.walk_animation.animation = "cemian_walk";
            this.customer_node.scaleX = 0.3;
        }
    }

    cell_position(node: { x: number, y: number }) {
        const x = node.x * Map.map_item_size - this.node.parent.width / 2 + Map.map_item_size / 2;
        const y = -node.y * Map.map_item_size + this.node.parent.height / 2 - Map.map_item_size / 2 + 50;
        return cc.v2(x, y);
    }

}
