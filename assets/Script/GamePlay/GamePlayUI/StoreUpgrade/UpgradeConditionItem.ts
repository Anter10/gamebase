import BaseNode from "../../../Common/BaseNode";
import DecorationData from "../../../GameLocalData/DecorationData";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import PeopleData from "../../../GameLocalData/PeopleData";
import TableData from "../../../GameLocalData/TableData";
import { StoreUpgradeConditionType } from "../../GamePlayEnum/GamePlayEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UpgradeConditionItem extends BaseNode {

    @property(cc.Node)
    progress: cc.Node = null;

    @property(cc.Label)
    condition_label: cc.Label = null;

    @property(cc.Node)
    complete: cc.Node = null;

    @property(cc.Node)
    incomplete: cc.Node = null;

    private condition_type: StoreUpgradeConditionType = null;
    private condition_config: Array<number> = null;

    set_condition_config(condition_type: StoreUpgradeConditionType, condition_config: Array<number>) {
        this.condition_config = condition_config;
        this.condition_type = condition_type;
        console.log(condition_type, condition_config);
    }

    start() {
        this.refresh_progress();
    }

    refresh_progress() {
        switch (this.condition_type) {
            case StoreUpgradeConditionType.Table:
                const table_data = GameLocalData.get_instance().get_data<TableData>(TableData);
                let complete_number = 0;
                for (let i = 0; i < this.condition_config[0]; i++) {
                    if (table_data.get_table_data(i).tableLevel >= this.condition_config[1]) {
                        complete_number++;
                    }
                }
                if (complete_number >= this.condition_config[0]) {
                    this.set_progress(1);
                } else {
                    this.set_progress(complete_number / this.condition_config[0]);
                }
                if (this.condition_config[1] == 1) {
                    this.condition_label.string = `拥有${this.condition_config[0]}张餐桌`;
                } else {
                    this.condition_label.string = `拥有${this.condition_config[0]}张${this.condition_config[1]}级餐桌`;
                }
                break;
            case StoreUpgradeConditionType.CookWoman:
                const cook_woman_data = GameLocalData.get_instance().get_data<PeopleData>(PeopleData);
                let cook_woman_complete_number = 0;
                for (let i = 0; i < this.condition_config[0]; i++) {
                    if (cook_woman_data.get_people_data_by_people_config_id(i + 2).peopleLevel >= this.condition_config[1]) {
                        cook_woman_complete_number++;
                    }
                }
                if (cook_woman_complete_number >= this.condition_config[0]) {
                    this.set_progress(1);
                } else {
                    this.set_progress(cook_woman_complete_number / this.condition_config[0]);
                }
                if (this.condition_config[1] == 1) {
                    this.condition_label.string = `拥有${this.condition_config[0]}个厨娘`;
                } else {
                    this.condition_label.string = `拥有${this.condition_config[0]}个${this.condition_config[1]}级厨娘`;
                }
                break;
            case StoreUpgradeConditionType.Decoration:
                const decoration_data = GameLocalData.get_instance().get_data<DecorationData>(DecorationData);
                let decoration_complete_number = 0;
                for (let i = 0; i < this.condition_config[0]; i++) {
                    if (decoration_data.get_decoration_data(i).decorationLevel >= this.condition_config[1]) {
                        decoration_complete_number++;
                    }
                }
                if (decoration_complete_number >= this.condition_config[0]) {
                    this.set_progress(1);
                } else {
                    this.set_progress(decoration_complete_number / this.condition_config[0]);
                }
                if (this.condition_config[1] == 1) {
                    this.condition_label.string = `拥有${this.condition_config[0]}个装饰`;
                } else {
                    this.condition_label.string = `拥有${this.condition_config[0]}个${this.condition_config[1]}级装饰`;
                }
                break;
        }
    }

    set_progress(progress_number: number) {
        this.progress.scaleX = progress_number;
        if (progress_number == 1) {
            this.incomplete.active = false;
            this.complete.active = true;
        } else {
            this.incomplete.active = true;
            this.complete.active = false;
        }
    }
}
