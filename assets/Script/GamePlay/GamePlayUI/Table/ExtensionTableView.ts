// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseUI from "../../../Common/BaseUI";
import Loader from "../../../Common/Loader";
import TouchButton from "../../../Common/TouchButton";
import GamePlayConfig from "../../GamePlayConfig/GamePlayConfig";
import { ExtensionTypeButton } from "../../GamePlayEnum/GamePlayEnum";
import ExtensionTableFrameItem from "./ExtensionTableFrameItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ExtensionTableView extends BaseUI {

    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Node)
    table_button: cc.Node = null;

    @property(cc.Node)
    decoration_button: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    table_content: cc.Node = null;

    @property(cc.Node)
    decoration_content: cc.Node = null;

    @property(cc.Node)
    gold_coin_frame_node: cc.Node = null;

    private cur_button_type = ExtensionTypeButton.table;

    onLoad() {
        this.flush_view();
    }

    start() {
        this.load_gold_item();
        this.flush_table_content();
    }

    flush_view() {
        //关闭界面
        const close_button: TouchButton = this.close_button.addComponent(TouchButton);
        close_button.register_touch(this.close_view.bind(this));

        //选择桌子按钮
        const table_button: TouchButton = this.table_button.addComponent(TouchButton);
        table_button.register_touch(this.click_table_button_type.bind(this));

        //选择装饰按钮
        const decoration_button: TouchButton = this.decoration_button.addComponent(TouchButton);
        decoration_button.register_touch(this.click_decoration_button_type.bind(this));
    }

    click_table_button_type() {
        if (this.cur_button_type != ExtensionTypeButton.table) {
            this.cur_button_type = ExtensionTypeButton.table;
            let c_sprite_frame = this.decoration_button.getComponent(cc.Sprite).spriteFrame;
            this.decoration_button.getComponent(cc.Sprite).spriteFrame = this.table_button.getComponent(cc.Sprite).spriteFrame;
            this.table_button.getComponent(cc.Sprite).spriteFrame = c_sprite_frame;
            this.flush_table_content();
        }
    }

    click_decoration_button_type() {
        if (this.cur_button_type != ExtensionTypeButton.decoration) {
            this.cur_button_type = ExtensionTypeButton.decoration;
            let c_sprite_frame = this.decoration_button.getComponent(cc.Sprite).spriteFrame;
            this.decoration_button.getComponent(cc.Sprite).spriteFrame = this.table_button.getComponent(cc.Sprite).spriteFrame;
            this.table_button.getComponent(cc.Sprite).spriteFrame = c_sprite_frame;
            this.flush_decoration_content();
        }
    }

    close_view() {
        this.on_close_call();
    }

    flush_table_content() {
        this.decoration_content.removeAllChildren();
        for (let i = 0; i < GamePlayConfig.total_table_number; i++) {
            Loader.load_prefab("/GamePlay/GamePlayUI/ExtensionTable/ExtensionTableFrameItem", (prefab: cc.Prefab) => {
                const extension_table_frame_item = cc.instantiate(prefab);
                extension_table_frame_item.getComponent(ExtensionTableFrameItem).set_mark_number(i);
                extension_table_frame_item.y = -130 - i * extension_table_frame_item.height;
                extension_table_frame_item.parent = this.table_content;
            });
        }
    }

    flush_decoration_content() {
        this.table_content.removeAllChildren();
    }

    load_gold_item() {
        Loader.load_prefab("/GamePlay/GamePlayUI/Common/GoldCoinFrame/GoldCoinFrameItem", (prefab: cc.Prefab) => {
            const gold_coin_frame_item = cc.instantiate(prefab);
            gold_coin_frame_item.parent = this.gold_coin_frame_node;
        });
    }

}
