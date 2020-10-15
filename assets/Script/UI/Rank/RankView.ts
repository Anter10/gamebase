import BaseUI from "../../Common/BaseUI";
import RankViewController from "./RankViewController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankView extends BaseUI {
    public controller: RankViewController = null;

    onLoad () {
        super.onLoad();
        this.controller.init_view();
    }

    start () {
        super.start();

    }

    // update (dt) {}
}
