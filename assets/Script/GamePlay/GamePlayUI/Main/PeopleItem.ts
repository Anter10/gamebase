import BaseNode from "../../../Common/BaseNode";
import { PeopleConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import PeopleData from "../../../GameLocalData/PeopleData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PeopleItem extends BaseNode {

    @property(cc.Label)
    label: cc.Label = null;

    private people_data: PeopleData = null;
    private people_config: PeopleConfig = null;

    start() {
        this.people_data = GameLocalData.get_instance().get_data<PeopleData>(PeopleData);
        this.people_config = GameDataConfig.get_config_by_id("PeopleConfig", 1);
        
    }

    update(dt) {

    }

}
