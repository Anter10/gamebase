import EventManager from "../EventManager/EventManager";
import LinkGameBase from "../GamePlay/LinkGameBase";
import BaseRecord from "./BaseRecord";


interface SeatInterface {
    //椅子编号
    seatNumber: number;
    //椅子有没有人
    seatHavePeople: boolean;
}

// 游戏中16个椅子的数据
class SeatData extends BaseRecord {
    static _name = "SeatData";
    base_name = "SeatData";

    private seat_data: Array<SeatInterface> = [];

    constructor() {
        super();
        this.apply_auto_update();
    }

    get_all_data() {
        return this.seat_data;
    }

    get_seat_data(seat_number: number): SeatInterface {
        for (let i = 0; i < this.seat_data.length; i++) {
            if (this.seat_data[i].seatNumber == seat_number) {
                return this.seat_data[i];
            }
        }
        let init_seat_data: SeatInterface = { seatNumber: seat_number, seatHavePeople: false };
        this.seat_data.push(init_seat_data);
        this.store_seat_data(this.seat_data);
        return init_seat_data;
    }

    store_seat_data(seat_data) {
        this.seat_data = seat_data;
    }

    change_seat_data(seat_number: number, seat_have_people: boolean) {
        for (let i = 0; i < this.seat_data.length; i++) {
            if (this.seat_data[i].seatNumber == seat_number) {
                this.seat_data[i].seatHavePeople = seat_have_people;
                if (seat_have_people == false) {
                    EventManager.get_instance().emit(LinkGameBase.game_play_event_config.new_seat);
                }
                this.store_seat_data(this.seat_data);
            }
        }
    }

}

export default SeatData;