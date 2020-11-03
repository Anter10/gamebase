import BaseRecord from "./BaseRecord";


// 离线收益
class OfflineData extends BaseRecord {
    static _name = "OfflineData";
    base_name = "OfflineData";

    private offline_data: number = 0;

    constructor() {
        super();
        this.apply_auto_update();
    }

    get_all_data() {
        return this.offline_data;
    }

    set_offline_data(time: number) {
        this.offline_data = time;
        this.store_offline_data(this.offline_data);
    }

    store_offline_data(offline_data: number) {
        this.offline_data = offline_data;
    }

}

export default OfflineData;