import Time from "../Common/Time";
import BaseRecord from "./BaseRecord";


interface PeopleInterface {
    //人物数据编号
    peopleDataNumber: number;
    //人物配置编号
    peopleConfigId: number;
    //人物动作循环起点时间
    peopleMoveStartTime: number;
    //人物等级
    peopleLevel: number;
}

// 游戏中八张桌子的数据
class PeopleData extends BaseRecord {
    static _name = "PeopleData";
    base_name = "PeopleData";

    private people_data: Array<PeopleInterface> = [{ peopleDataNumber: 1, peopleConfigId: 2, peopleMoveStartTime: 0, peopleLevel: 1 }];

    constructor() {
        super();
        this.apply_auto_update();
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
            max_people_data_number = this.people_data[i].peopleConfigId;
        }
        let init_new_people: PeopleInterface = {
            peopleDataNumber: max_people_data_number + 1,
            peopleConfigId: people_config_id,
            peopleMoveStartTime: Time.get_second_time(),
            peopleLevel: 0,
        };
        this.people_data.push(init_new_people);
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

}

export default PeopleData;