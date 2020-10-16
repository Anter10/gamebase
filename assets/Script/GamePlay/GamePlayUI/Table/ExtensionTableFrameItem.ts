import BaseNode from "../../../Common/BaseNode";
import Loader from "../../../Common/Loader";
import ExtensionTableItem from "./ExtensionTableItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ExtensionTableFrameItem extends BaseNode {

    @property(cc.Sprite)
    mark: cc.Sprite = null;

    @property(cc.Label)
    mark_label: cc.Label = null;

    @property(cc.Node)
    table_frame: Array<cc.Node> = [];

    private mark_number: number = 0;


    set_mark_number(mark_number: number) {
        this.mark_number = mark_number;
    }

    start() {
        this.mark_label.string = `${this.mark_number + 1}\n号\n桌`;
        if (this.mark_number % 2 == 1) {
            Loader.load_texture("GamePlay/GamePlayUI/ExtensionTable/texture/extension_bg_titlexiao2", (texture2d: cc.Texture2D) => {
                this.mark.spriteFrame = new cc.SpriteFrame(texture2d);
            });
        }
        this.flush_table_frame();
    }

    flush_table_frame() {
        for (let i = 0; i < this.table_frame.length; i++) {
            Loader.load_prefab("/GamePlay/GamePlayUI/ExtensionTable/ExtensionTableItem", (prefab: cc.Prefab) => {
                const extension_table_item = cc.instantiate(prefab);
                extension_table_item.getComponent(ExtensionTableItem).set_level_number(i + 1, this.mark_number);
                extension_table_item.parent = this.table_frame[i];
            });
        }
    }

}
