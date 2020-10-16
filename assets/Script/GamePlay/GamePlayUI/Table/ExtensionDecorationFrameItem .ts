import BaseNode from "../../../Common/BaseNode";
import Loader from "../../../Common/Loader";
import { DecorationConfig } from "../../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../../GameDataConfig/GameDataConfig";
import ExtensionDecorationItem from "./ExtensionDecorationItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ExtensionDecorationFrameItem extends BaseNode {

    @property(cc.Sprite)
    mark: cc.Sprite = null;

    @property(cc.Label)
    mark_label: cc.Label = null;

    @property(cc.Node)
    decoration_frame: Array<cc.Node> = [];

    private mark_number: number = 0;


    set_mark_number(mark_number: number) {
        this.mark_number = mark_number;
    }

    start() {
        const decoration_config: DecorationConfig = GameDataConfig.get_config_by_id("DecorationConfig", (this.mark_number + 1));
        this.mark_label.string = decoration_config.chinese_name;
        if (this.mark_number % 2 == 1) {
            Loader.load_texture("GamePlay/GamePlayUI/ExtensionTable/texture/extension_bg_titlexiao2", (texture2d: cc.Texture2D) => {
                this.mark.spriteFrame = new cc.SpriteFrame(texture2d);
            });
        }
        this.flush_decoration_frame();
    }

    flush_decoration_frame() {
        for (let i = 0; i < this.decoration_frame.length; i++) {
            Loader.load_prefab("/GamePlay/GamePlayUI/ExtensionTable/ExtensionDecorationItem", (prefab: cc.Prefab) => {
                const extension_decoration_item = cc.instantiate(prefab);
                extension_decoration_item.getComponent(ExtensionDecorationItem).set_level_number(i + 1, this.mark_number);
                extension_decoration_item.parent = this.decoration_frame[i];
            });
        }
    }

}
