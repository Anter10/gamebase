// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseNode from "../../../Common/BaseNode";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ExtensionTableItem extends BaseNode {

    @property(cc.Label)
    label: cc.Label = null;

    start() {

    }

}
