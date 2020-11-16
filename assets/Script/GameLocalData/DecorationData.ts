import BaseRecord from "./BaseRecord";


interface DecorationInterface {
    //装饰编号
    decorationNumber: number;
    //装饰等级
    decorationLevel: number;
    //装饰看广告次数
    decorationAd: number;
}

class DecorationData extends BaseRecord {
    static _name = "DecorationData";
    base_name = "DecorationData";

    private decoration_data: Array<DecorationInterface> = [];

    constructor() {
        super();
        this.apply_auto_update();
    }

    get_all_data() {
        return this.decoration_data;
    }

    get_decoration_data(decoration_number: number): DecorationInterface {
        for (let i = 0; i < this.decoration_data.length; i++) {
            if (this.decoration_data[i].decorationNumber == decoration_number) {
                if (!this.decoration_data[i].decorationAd) {
                    this.decoration_data[i].decorationAd = 0;
                    this.store_decoration_data(this.decoration_data);
                }
                return this.decoration_data[i];
            }
        }
        let init_decoration_data: DecorationInterface = { decorationNumber: decoration_number, decorationLevel: 0, decorationAd: 0 };
        this.decoration_data.push(init_decoration_data);
        this.store_decoration_data(this.decoration_data);
        return init_decoration_data;
    }

    store_decoration_data(decoration_data) {
        this.decoration_data = decoration_data;
    }

    change_decoration_level_data(decoration_number: number, decoration_level: number) {
        for (let i = 0; i < this.decoration_data.length; i++) {
            if (this.decoration_data[i].decorationNumber == decoration_number) {
                this.decoration_data[i].decorationLevel = decoration_level;
                this.store_decoration_data(this.decoration_data);
            }
        }
    }

    change_decoration_ad_time(decoration_number: number, decoration_ad: number) {
        for (let i = 0; i < this.decoration_data.length; i++) {
            if (this.decoration_data[i].decorationNumber == decoration_number) {
                this.decoration_data[i].decorationAd = decoration_ad;
                this.store_decoration_data(this.decoration_data);
            }
        }
    }

}

export default DecorationData;