// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class RightButtonContainer extends cc.Component {

    @property(cc.Node)
    main_button_jiasutixian: cc.Node = null;
    @property(cc.Node)
    main_button_meirilibao: cc.Node = null;
    @property(cc.Node)
    main_button_mianfeihongbao: cc.Node = null;
    @property(cc.Node)
    main_button_suipianduijiang: cc.Node = null;
    @property(cc.Node)
    main_button_zaiwanjiju: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
