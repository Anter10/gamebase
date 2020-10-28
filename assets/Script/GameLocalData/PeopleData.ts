import Time from "../Common/Time";
import { CustomerState } from "../GamePlay/GamePlayEnum/GamePlayEnum";
import BaseRecord from "./BaseRecord";


interface PeopleInterface {
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
    //顾客座位号
    seatNumber?: number;
    //顾客点餐菜品配置id
    customerOderConfig?: number;
    //顾客点餐顺序id
    customerOderNumber?: number;
    //顾客每次状态改变时间
    changeStateTime?: number;
    //人物状态
    customerState?: CustomerState;
    //行走节点数量
    walkNode?: number;
}

// 游戏中人物的数据
class PeopleData extends BaseRecord {
    static _name = "PeopleData";
    base_name = "PeopleData";

    private people_data: Array<PeopleInterface> = [{ peopleDataNumber: 1, peopleConfigId: 2, peopleLevel: 1 }];

    constructor() {
        super();
        this.apply_auto_update();
    }

    get_people_data(): Array<PeopleInterface> {
        return this.people_data;
    }

    store_people_data(people_data) {
        this.people_data = people_data;
    }

    get_people_data_by_people_config_id(people_config_id: number): PeopleInterface {
        let max_people_data_number = -1;
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

    get_oder_number_max(): number {
        let max_oder_number = 0;
        for (let i = 0; i < this.people_data.length; i++) {
            if (this.people_data[i].customerOderNumber > max_oder_number) {
                max_oder_number = this.people_data[i].lineUp;
            }
        }
        return max_oder_number + 1;
    }

    change_customer_data(customer: { peopleDataNumber: number, lineUp?: number, seatNumber?: number, changeStateTime?: number, customerState?: CustomerState, walkNode?: number, customerOderNumber?: number, customerOderConfig?: number }) {
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
                if (customer.customerOderNumber) {
                    this.people_data[i].customerOderNumber = customer.customerOderNumber;
                }
                if (customer.customerOderConfig) {
                    this.people_data[i].customerOderConfig = customer.customerOderConfig;
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

}
export default PeopleData;