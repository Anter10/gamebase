import Time from "../Common/Time";
import EventManager from "../EventManager/EventManager";
import GameConfig from "../GameConfig";
import { PeopleConfig } from "../GameDataConfig/ConfigInterface";
import GameDataConfig from "../GameDataConfig/GameDataConfig";
import GamePlayConfig from "../GamePlay/GamePlayConfig/GamePlayConfig";
import { CookWomanState, CustomerState, PeopleType } from "../GamePlay/GamePlayEnum/GamePlayEnum";
import LinkGameBase from "../GamePlay/LinkGameBase";
import BaseRecord from "./BaseRecord";
import GameLocalData from "./GameLocalData";
import OrderMenuData from "./OrderMenuData";
import SeatData from "./SeatData";


export interface PeopleInterface {
    //人物数据编号
    peopleDataNumber: number;
    //人物配置编号
    peopleConfigId: number;
    //人物动作循环起点时间
    peopleMoveStartTime?: number;
    //人物等级
    peopleLevel?: number;
    //顾客排队入场
    lineUp?: number;
    //顾客座位号,厨娘走到座位号
    seatNumber?: number;
    //顾客点餐菜品配置id
    customerOrderConfig?: number;
    // //顾客点餐顺序id
    // customerOrderNumber?: number;
    //顾客每次状态改变时间
    changeStateTime?: number;
    //顾客状态
    customerState?: CustomerState;
    //行走节点数量
    walkNode?: number;
    //将要行走到的椅子
    walkToSeatNumber?: number;
    //厨娘状态
    cookWomanState?: CookWomanState;
    //厨娘做的菜
    cookWomanMenuNumberId?: number;
    //哪位厨娘选定了
    CookWomanConfigId?: number;
}

export interface CustomerPayInterface {
    //厨娘等级
    cookWomanLevel: number;
    //顾客座位号
    seatNumber: number;
    //顾客点餐菜品配置id
    customerOrderConfig: number;
}

// 游戏中人物的数据
class PeopleData extends BaseRecord {
    static _name = "PeopleData";
    base_name = "PeopleData";

    private people_data: Array<PeopleInterface> = [{ peopleDataNumber: 1, peopleConfigId: 2, peopleLevel: 1, cookWomanState: CookWomanState.Null }];

    constructor() {
        super();
        this.apply_auto_update();
    }

    change_cook_woman_data(cook_woman: { peopleConfigId: number, cookWomanState?: CookWomanState, walkToSeatNumber?: number, seatNumber?: number, changeStateTime?: number, cookWomanMenuNumberId?: number }) {
        this.people_data.forEach((value, id) => {
            if (cook_woman.peopleConfigId == this.people_data[id].peopleConfigId) {
                if (cook_woman.cookWomanState) {
                    this.people_data[id].cookWomanState = cook_woman.cookWomanState;
                    this.people_data[id].changeStateTime = Time.get_second_time();
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.change_cook_woman_state);
                }
                if (cook_woman.walkToSeatNumber) {
                    this.people_data[id].walkToSeatNumber = cook_woman.walkToSeatNumber;
                }
                if (cook_woman.seatNumber) {
                    this.people_data[id].seatNumber = cook_woman.seatNumber;
                }
                if (cook_woman.cookWomanMenuNumberId) {
                    this.people_data[id].cookWomanMenuNumberId = cook_woman.cookWomanMenuNumberId;
                }
                this.store_people_data(this.people_data);
            }
        })
    }

    get_people_data(): Array<PeopleInterface> {
        return this.people_data;
    }

    store_people_data(people_data) {
        this.people_data = people_data;
    }

    delete_people_by_people_data_number(people_data_number: number) {
        let cur_people_data = [];
        for (let i = 0; i < this.people_data.length; i++) {
            if (this.people_data[i].peopleDataNumber != people_data_number) {
                cur_people_data.push(this.people_data[i]);
            }
        }
        this.people_data = cur_people_data;
        this.store_people_data(this.people_data);
    }

    seat_have_people(seat_number: number): boolean {
        for (let i = 0; i < this.people_data.length; i++) {
            if (this.people_data[i].seatNumber == seat_number) {
                return true;
            }
        }
        return false;
    }

    get_people_data_by_people_config_id(people_config_id: number): PeopleInterface {
        let max_people_data_number = -1;
        if (people_config_id == 0) {
            console.log("?");
        }
        for (let i = 0; i < this.people_data.length; i++) {
            if (this.people_data[i].peopleConfigId == people_config_id) {
                return this.people_data[i];
            }
            if (max_people_data_number < this.people_data[i].peopleDataNumber) {
                max_people_data_number = this.people_data[i].peopleDataNumber;
            }
        }
        let init_new_people: PeopleInterface = {
            peopleDataNumber: max_people_data_number + 1,
            peopleConfigId: people_config_id,
            peopleMoveStartTime: Time.get_second_time(),
            peopleLevel: 0,
            cookWomanState: CookWomanState.Null,
            seatNumber: 0,
        };
        this.people_data.push(init_new_people);
        this.store_people_data(this.people_data);
        return init_new_people;
    }

    set_people_move_start_time(people_config_id: number, people_move_start_time: number) {
        for (let i = 0; i < this.people_data.length; i++) {
            if (this.people_data[i].peopleConfigId == people_config_id) {
                this.people_data[i].peopleMoveStartTime = people_move_start_time;
                this.store_people_data(this.people_data);
                return;
            }
        }
    }

    change_cook_woman_level(people_config_id: number, people_level: number) {
        for (let i = 0; i < this.people_data.length; i++) {
            if (this.people_data[i].peopleConfigId == people_config_id) {
                if (people_level == 1 && this.people_data[i].peopleLevel != 1) {
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.add_cook_woman, people_config_id);
                }
                this.people_data[i].peopleLevel = people_level;
                this.store_people_data(this.people_data);
                return;
            }
        }
    }

    add_customer(people_config_id: number): PeopleInterface {
        let max_people_data_number = -1;
        for (let i = 0; i < this.people_data.length; i++) {
            if (max_people_data_number < this.people_data[i].peopleDataNumber) {
                max_people_data_number = this.people_data[i].peopleDataNumber;
            }
        }
        let init_new_people: PeopleInterface = {
            peopleDataNumber: max_people_data_number + 1,
            peopleConfigId: people_config_id,
            lineUp: 0,
            seatNumber: 0,
            changeStateTime: Time.get_second_time(),
            customerState: CustomerState.line_up,
            walkToSeatNumber: 0,
        };
        this.people_data.push(init_new_people);
        return init_new_people;
    }

    get_customer_data(people_data_number: number): PeopleInterface {
        for (let i = 0; i < this.people_data.length; i++) {
            if (people_data_number == this.people_data[i].peopleDataNumber) {
                return this.people_data[i];
            }
        }
    }

    get_line_max(): number {
        let max_line_up = 0;
        for (let i = 0; i < this.people_data.length; i++) {
            if (this.people_data[i].lineUp > max_line_up) {
                max_line_up = this.people_data[i].lineUp;
            }
        }
        return max_line_up + 1;
    }

    change_customer_data(customer: { peopleDataNumber: number, lineUp?: number, seatNumber?: number, changeStateTime?: number, customerState?: CustomerState, walkNode?: number, customerOrderConfig?: number, walkToSeatNumber?: number, CookWomanConfigId?: number }) {
        for (let i = 0; i < this.people_data.length; i++) {
            if (customer.peopleDataNumber == this.people_data[i].peopleDataNumber) {
                if (customer.lineUp) {
                    this.people_data[i].lineUp = customer.lineUp;
                }
                if (customer.seatNumber) {
                    this.people_data[i].seatNumber = customer.seatNumber;
                }
                if (customer.changeStateTime) {
                    this.people_data[i].changeStateTime = customer.changeStateTime;
                }
                if (customer.customerState) {
                    this.people_data[i].customerState = customer.customerState;
                    this.people_data[i].changeStateTime = Time.get_second_time();
                }
                if (customer.walkNode) {
                    this.people_data[i].walkNode = customer.walkNode;
                }
                if (customer.customerOrderConfig) {
                    this.people_data[i].customerOrderConfig = customer.customerOrderConfig;
                }
                if (customer.walkToSeatNumber) {
                    this.people_data[i].walkToSeatNumber = customer.walkToSeatNumber;
                }
                if (customer.CookWomanConfigId) {
                    this.people_data[i].CookWomanConfigId = customer.CookWomanConfigId;
                }
                this.store_people_data(this.people_data);
            }
        }
    }

    refresh_line_up_number() {
        for (let i = 0; i < this.people_data.length; i++) {
            if (this.people_data[i].lineUp && this.people_data[i].lineUp != 0) {
                this.people_data[i].lineUp = this.people_data[i].lineUp - 1;
                this.store_people_data(this.people_data);
            }
        }
    }

    fix_people_data_by_time() {
        let refresh_line_up_number = 0;
        let seat_number: Array<number> = [];
        for (let i = 0; i < this.people_data.length; i++) {
            let people = this.people_data[i];
            let differ_time = Time.get_second_time() - people.changeStateTime;
            const people_config: PeopleConfig = GameDataConfig.get_config_by_id("PeopleConfig", people.peopleConfigId);
            if (!people_config) {
                this.delete_people_by_people_data_number(people.peopleDataNumber);
            }
            if (people_config && people_config.type == PeopleType.customer) {
                if (people.lineUp == 0 && people.walkToSeatNumber == 0) {
                    this.delete_people_by_people_data_number(people.peopleDataNumber);
                }
                if (differ_time > 40) {
                    if (people.customerState == CustomerState.line_up) {
                        let need_time = people.lineUp * 40 + 40;
                        if (differ_time > need_time) {
                            refresh_line_up_number++;
                            people.customerState = CustomerState.exit;
                            //获得收益
                            const pay: CustomerPayInterface = {
                                //厨娘等级
                                cookWomanLevel: 0,
                                //顾客座位号
                                seatNumber: 0,
                                //顾客点餐菜品配置id
                                customerOrderConfig: 0,
                            }
                            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.customer_pay, pay);
                        }
                    } else {
                        let cook_woman_level = 0;
                        if (people.CookWomanConfigId) {
                            cook_woman_level = GameLocalData.get_instance().get_data(PeopleData).get_people_data_by_people_config_id(people.CookWomanConfigId).peopleLevel;
                        }
                        const order_menu_data: OrderMenuData = GameLocalData.get_instance().get_data(OrderMenuData);
                        if (order_menu_data.get_menu_by_customer_number_config_id(people.peopleDataNumber)) {
                            console.log("people.peopleDataNumber", people.peopleDataNumber);
                            let menu_number = order_menu_data.get_menu_by_customer_number_config_id(people.peopleDataNumber).menuNumber;
                            order_menu_data.complete_order_menu_data(menu_number);
                        }
                        //获得收益
                        const pay: CustomerPayInterface = {
                            //厨娘等级
                            cookWomanLevel: cook_woman_level,
                            //顾客座位号
                            seatNumber: people.walkToSeatNumber,
                            //顾客点餐菜品配置id
                            customerOrderConfig: people.customerOrderConfig ? people.customerOrderConfig : 0,
                        }
                        EventManager.get_instance().emit(LinkGameBase.game_play_event_config.customer_pay, pay);
                        people.customerState = CustomerState.exit;
                        this.store_people_data(this.people_data);
                    }
                } else if (differ_time <= 40) {
                    people.changeStateTime = Time.get_second_time();
                }
                if (people.customerState != CustomerState.exit) {
                    if (people.walkToSeatNumber != 0 || people.seatNumber != 0) {
                        if (people.walkToSeatNumber == people.seatNumber) {
                            seat_number.push(people.seatNumber);
                        } else {
                            seat_number.push(people.walkToSeatNumber);
                        }
                    }
                }
            }
        }

        for (let i = 0; i < refresh_line_up_number; i++) {
            this.refresh_line_up_number();
        }

        for (let i = 0; i < this.people_data.length; i++) {
            let people = this.people_data[i];
            let differ_time = Time.get_second_time() - people.changeStateTime;
            const people_config: PeopleConfig = GameDataConfig.get_config_by_id("PeopleConfig", people.peopleConfigId);
            if (people_config && people_config.type == PeopleType.cook_woman) {
                if (differ_time > 40) {
                    const order_menu_data: OrderMenuData = GameLocalData.get_instance().get_data(OrderMenuData);
                    if (order_menu_data.get_menu_by_cook_woman_config_id(people.peopleConfigId)) {
                        let menu_number = order_menu_data.get_menu_by_cook_woman_config_id(people.peopleConfigId).menuNumber;
                        order_menu_data.complete_order_menu_data(menu_number);
                    }
                    people.cookWomanState = CookWomanState.Stroll;
                    this.store_people_data(this.people_data);
                } else if (differ_time <= 40) {
                    people.changeStateTime = Time.get_second_time();
                }
            }
        }

        for (let j = 1; j <= GamePlayConfig.total_table_number * 2; j++) {
            let flag = false;
            for (let i = 0; i < seat_number.length; i++) {
                if (seat_number[i] == j) {
                    flag = true;
                }
            }
            const seat_data = GameLocalData.get_instance().get_data<SeatData>(SeatData);
            seat_data.change_seat_data(j, flag);
        }

    }

}
export default PeopleData;