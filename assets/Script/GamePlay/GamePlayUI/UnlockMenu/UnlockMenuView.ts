import BaseNode from "../../../Common/BaseNode";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UnlockMenuView extends BaseNode {

    @property(cc.Label)
    label: cc.Label = null;

}
