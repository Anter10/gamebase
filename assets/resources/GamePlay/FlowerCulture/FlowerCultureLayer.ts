import { gamebase } from "../../../Script/Boot";
import { UIParamInterface } from "../../../Script/Common/CommonInterface";
import TouchButton from "../../../Script/Common/TouchButton";
import GameDataBaseConfig from "../../../Script/GameDataConfig/GameDataBaseConfig";
import GamePlayBaseData from "../../../Script/GameLocalData/GamePlayBaseData";
import GamePlay from "../../../Script/GamePlay/GamePlay";
import UIConfig from "../../../Script/UI/UIManager/UIConfig";
import UIManager from "../../../Script/UI/UIManager/UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FlowerCultureLayer extends cc.Component {
    @property(cc.Node)
    node_scrollview: cc.Node = null;
    @property(cc.Node)
    node_content: cc.Node = null;
    @property(cc.Node)
    node_item: cc.Node = null;

    public gamePlay: GamePlay = null;
    public base_data: GamePlayBaseData = null;
    public game_data_config: cc.JsonAsset = null;
    public listMaxLength: number = 8;
    public scrolStartPosY: number = 0;
    public flowerLevelList: object = {};
    onLoad() { }

    start() {
        this.node.getComponent(cc.Widget).updateAlignment();
        this.gamePlay = this.node.parent.getComponent(GamePlay);
        this.base_data = this.gamePlay.base_data;
        this.game_data_config = this.gamePlay.game_data_config;
        this.node.getChildByName(`sprite_bg`).opacity = 0;
        this.scheduleOnce(() => {
            this.add_show_ani();
        }, 0);

        this.get_flower_level();
        const touch_button: TouchButton = this.node.getChildByName(`sprite_bg`).getChildByName(`btn_close`).addComponent(TouchButton);
        touch_button.register_touch(this.close_layer.bind(this));
        this.init_scrollview();
    }

    /**@description 获取已种植鲜花的等级 */
    get_flower_level() {
        this.flowerLevelList = {};
        const list = this.base_data.flowerpot_status;
        for (let i = 0; i < list.length; ++i) {
            for (let j = 0; j < list[i].length; ++j) {
                if (list[i][j] > 10) {
                    const type = GameDataBaseConfig.getFlowerType(list[i][j]);
                    const level = GameDataBaseConfig.getFlowerLevel(list[i][j]);
                    if (level > 0) this.flowerLevelList[type] = level;
                }
            }
        }
    }

    /**@description 界面展示动画，需要在widget对齐之后执行，否则位置会在widget对齐后发生错乱 */
    add_show_ani() {
        const sprite_bg = this.node.getChildByName(`sprite_bg`);
        sprite_bg.opacity = 255;
        sprite_bg.y -= sprite_bg.height;
        cc.tween(sprite_bg)
            .by(0.5, { position: cc.v3(0, sprite_bg.height + 50, 0) })
            .by(0.2, { position: cc.v3(0, -50, 0) })
            .start();
    }

    /**@description 初始化scrollview */
    init_scrollview() {
        this.node_content.height = (this.node_item.height + 10) * this.listMaxLength;
        this.scrolStartPosY = this.node_content.y;
        let posY = 0;
        for (let i = 0; i < this.listMaxLength; ++i) {
            const clone_item = cc.instantiate(this.node_item);
            clone_item.parent = this.node_content;
            this.update_item_info(clone_item, posY, i);
            posY -= clone_item.height + 10;
        }
    }

    /**@description 更新item信息 */
    update_item_info(item: cc.Node, posY: number, index: number) {
        const flowerName = `flower${index + 1}` + GameDataBaseConfig.flowerName[index] + `6`;
        item.getChildByName(`sprite_icon`).getComponent(cc.Sprite).spriteFrame = gamebase.flowerAtlas.getSpriteFrame(flowerName);
        if (posY != null) item.y = posY;
        item[`index`] = index;
        item.active = true;
        const flowerInfo = this.game_data_config[`FlowerData`][index + 1];
        item.getChildByName(`label_name`).getComponent(cc.Label).string = `${flowerInfo[`name`]}`;
        const btn_harvest = item.getChildByName(`btn_harvest`);
        btn_harvest.removeComponent(TouchButton);
        const touch_button: TouchButton = btn_harvest.addComponent(TouchButton);
        touch_button.register_touch(() => {
            this.harvest_callback(index, this.base_data.flower_status[index] ,item);
        });
        const materials = btn_harvest.getComponent(cc.Sprite).getMaterials();
        btn_harvest.getComponent(cc.Sprite).setMaterial(0, materials[1]);
        btn_harvest.getComponent(TouchButton).disable_touch();
        btn_harvest.active = true;
        if (this.base_data.flower_status[index] == 0) {
            btn_harvest.getChildByName(`sprite_red`).active = false;
            item.getChildByName(`label_speed`).active = false;
            btn_harvest.getChildByName(`sprite_coin`).active = false;
            btn_harvest.getChildByName(`sprite_ad_icon`).active = false;
            item.getChildByName(`label_level`).getComponent(cc.Label).string = `幼苗`;
            btn_harvest.getChildByName(`label_status`).getComponent(cc.Label).string = `${GameDataBaseConfig.flowerStatus[0]}${flowerInfo.level}`;
            btn_harvest.getChildByName(`label_status`).setPosition(cc.v3(0, 20, 0));
            btn_harvest.getComponent(cc.Sprite).setMaterial(0, materials[2]);
        }
        else if (this.base_data.flower_status[index] == 1) {
            btn_harvest.getChildByName(`sprite_red`).active = true;
            item.getChildByName(`label_speed`).active = false;
            btn_harvest.getChildByName(`sprite_coin`).active = false;
            btn_harvest.getChildByName(`sprite_ad_icon`).active = false;
            item.getChildByName(`label_level`).getComponent(cc.Label).string = `幼苗`;
            btn_harvest.getChildByName(`label_status`).getComponent(cc.Label).string = `${GameDataBaseConfig.flowerStatus[1]}`;
            btn_harvest.getChildByName(`label_status`).setPosition(cc.v3(38, 39, 0));
            btn_harvest.getComponent(TouchButton).enable_touch();
        }
        else if (this.base_data.flower_status[index] == 2) {
            btn_harvest.getChildByName(`sprite_red`).active = false;
            item.getChildByName(`label_speed`).active = false;
            btn_harvest.getChildByName(`sprite_coin`).active = false;
            btn_harvest.getChildByName(`sprite_ad_icon`).active = false;
            item.getChildByName(`label_level`).getComponent(cc.Label).string = `幼苗`;
            btn_harvest.getChildByName(`label_status`).getComponent(cc.Label).string = `${GameDataBaseConfig.flowerStatus[2]}`;
            btn_harvest.getChildByName(`label_status`).setPosition(cc.v3(0, 20, 0));
            btn_harvest.getComponent(TouchButton).enable_touch();
        }
        else if (this.base_data.flower_status[index] == 3) {
            btn_harvest.getChildByName(`sprite_red`).active = false;
            item.getChildByName(`label_speed`).active = false;
            btn_harvest.getChildByName(`sprite_coin`).active = false;
            btn_harvest.getChildByName(`sprite_ad_icon`).active = true;
            item.getChildByName(`label_level`).getComponent(cc.Label).string = `幼苗`;
            btn_harvest.getChildByName(`label_status`).getComponent(cc.Label).string = `${GameDataBaseConfig.flowerStatus[3]}`;
            btn_harvest.getChildByName(`label_status`).setPosition(cc.v3(38, 39, 0));
            btn_harvest.getComponent(TouchButton).enable_touch();
        }
        else if (this.base_data.flower_status[index] == 4) {
            btn_harvest.getChildByName(`sprite_red`).active = false;
            item.getChildByName(`label_speed`).active = true;
            btn_harvest.getChildByName(`sprite_coin`).active = false;
            btn_harvest.getChildByName(`sprite_ad_icon`).active = false;
            const level = this.flowerLevelList[index + 1];
            const coinNum = GameDataBaseConfig.getFlowerGenerateCoinSpeed(level, index + 1, this.game_data_config);
            item.getChildByName(`label_speed`).getComponent(cc.Label).string = `${coinNum}金币/秒`;
            item.getChildByName(`label_level`).getComponent(cc.Label).string = `${level}级`;
            btn_harvest.getChildByName(`label_status`).getComponent(cc.Label).string = `${GameDataBaseConfig.flowerStatus[4]}`;
            btn_harvest.getChildByName(`label_status`).setPosition(cc.v3(0, 20, 0));
            btn_harvest.active = false;
        }
        else if (this.base_data.flower_status[index] == 5 || this.base_data.flower_status[index] == 7) {
            btn_harvest.getChildByName(`sprite_red`).active = true;
            item.getChildByName(`label_speed`).active = true;
            btn_harvest.getChildByName(`sprite_coin`).active = true;
            btn_harvest.getChildByName(`sprite_ad_icon`).active = false;
            const level = this.flowerLevelList[index + 1];
            const coinNum = GameDataBaseConfig.getFlowerGenerateCoinSpeed(level, index + 1, this.game_data_config);
            item.getChildByName(`label_speed`).getComponent(cc.Label).string = `${coinNum}金币/秒`;
            item.getChildByName(`label_level`).getComponent(cc.Label).string = `${level}级`;
            btn_harvest.getChildByName(`label_status`).getComponent(cc.Label).string = `${GameDataBaseConfig.flowerStatus[this.base_data.flower_status[index]]}`;
            btn_harvest.getChildByName(`label_status`).setPosition(cc.v3(38, 39, 0));
            btn_harvest.getComponent(TouchButton).enable_touch();
            const label_coin = btn_harvest.getChildByName(`sprite_coin`).getChildByName(`label_coin`);
            const consumeCoinNum = GameDataBaseConfig.getFlowerGenerateConsumeCoinNum(level, index + 1, this.game_data_config);
            label_coin.getComponent(cc.Label).string = GameDataBaseConfig.conversionCoin(consumeCoinNum);
        }
        else if (this.base_data.flower_status[index] == 6) {
            btn_harvest.getChildByName(`sprite_red`).active = true;
            item.getChildByName(`label_speed`).active = true;
            btn_harvest.getChildByName(`sprite_coin`).active = false;
            btn_harvest.getChildByName(`sprite_ad_icon`).active = false;
            const level = this.flowerLevelList[index + 1];
            const coinNum = GameDataBaseConfig.getFlowerGenerateCoinSpeed(level, index + 1, this.game_data_config);
            item.getChildByName(`label_speed`).getComponent(cc.Label).string = `${coinNum}金币/秒`;
            item.getChildByName(`label_level`).getComponent(cc.Label).string = `已成熟`;
            btn_harvest.getChildByName(`label_status`).getComponent(cc.Label).string = `${GameDataBaseConfig.flowerStatus[6]}`;
            btn_harvest.getChildByName(`label_status`).setPosition(cc.v3(38, 39, 0));
            btn_harvest.getComponent(TouchButton).enable_touch();
        }
    }

    /**@description 更新指定鲜花类型的item */
    update_special_flower_item(flowerType: number) {
        const children = this.node_content.children;
        for (let i = 0;i < children.length;++ i) {
            if (children[i][`index`] == flowerType - 1) {
                this.update_item_info(children[i] ,null ,children[i][`index`]);
                break;
            }
        }
    }

    /**@description 点击种植按钮 */
    harvest_callback(index: number, status: number ,node: cc.Node) {
        switch (status) {
            case 2: 
            case 1: {
                const can_put = this.gamePlay.flower_trellis_show_can_put_icon(index);
                if (can_put) {
                    this.node.destroy();
                }
                else {
                    const ui_param_interface: UIParamInterface = {
                        ui_config_path: UIConfig.Toast,
                        ui_config_name: "Toast",
                        param: {
                            text: "花架没有位置了，快去收获鲜花得现金吧。"
                        }
                    }
                    UIManager.show_ui(ui_param_interface);
                }
                break;
            }
            case 3: {
                cc.log(`看广告，立即解锁`);
                const flower = this.gamePlay.get_specify_location_flower(index);
                const pos = parseInt(flower.name[9]);
                const tmp = (index + 1) * 10000 + 1;
                this.flowerLevelList[index + 1] = 1;
                this.base_data.change_flowerpot_status(tmp, flower.parent[`index`] - 1, pos);
                this.base_data.change_flower_status(4, index);
                this.gamePlay.update_flowerpot_status(flower ,pos);
                this.update_item_info(node, null, index);
                break;
            }
            case 5: {
                cc.log(`鲜花成长`);
                const flower = this.gamePlay.get_specify_location_flower(index);
                const pos = parseInt(flower.name[9]);
                this.flowerLevelList[index + 1] += 1;
                const curStatus = this.base_data.flowerpot_status[flower.parent[`index`] - 1][pos] + 1;
                this.base_data.change_flowerpot_status(curStatus ,flower.parent[`index`] - 1 ,pos);
                this.base_data.change_flower_current_experience(0 ,GameDataBaseConfig.getFlowerType(curStatus));
                this.base_data.change_flower_status(4, GameDataBaseConfig.getFlowerType(curStatus) - 1);
                this.gamePlay.show_grow_up(flower ,-1);
                this.gamePlay.update_flowerpot_status(flower ,pos);
                this.update_item_info(node, null, index);
                break;
            }
            case 6: {
                cc.log(`收获鲜花`);
                const flower = this.gamePlay.get_specify_location_flower(index);
                const pos = parseInt(flower.name[9]);
                this.flowerLevelList[index + 1] = 0;
                const curStatus = this.base_data.flowerpot_status[flower.parent[`index`] - 1][pos];
                this.base_data.change_flowerpot_status(1 ,flower.parent[`index`] - 1 ,pos);
                this.base_data.change_flower_current_experience(0 ,GameDataBaseConfig.getFlowerType(curStatus));
                this.base_data.change_flower_status(2, GameDataBaseConfig.getFlowerType(curStatus) - 1);
                flower.removeFromParent();
                this.update_item_info(node, null, index);
                break;
            }
            case 7: {
                cc.log(`鲜花成熟`);
                const flower = this.gamePlay.get_specify_location_flower(index);
                const pos = parseInt(flower.name[9]);
                this.flowerLevelList[index + 1] += 1;
                const curStatus = this.base_data.flowerpot_status[flower.parent[`index`] - 1][pos] + 1;
                this.base_data.change_flowerpot_status(curStatus ,flower.parent[`index`] - 1 ,pos);
                this.base_data.change_flower_status(6, GameDataBaseConfig.getFlowerType(curStatus) - 1);
                this.gamePlay.show_grow_up(flower ,-1);
                this.gamePlay.update_flowerpot_status(flower ,pos);
                this.update_item_info(node, null, index);
                break;
            }
        }
    }

    /**@description 更新item位置（为了复用item,相当于虚拟列表） */
    update_item() {
        const children = this.node_content.children;
        const len = children.length;
        if (len >= this.listMaxLength) {
            const moveY = this.node_content.y - this.scrolStartPosY;
            if (moveY > 0 && children[len - 1][`index`] + 1 < GameDataBaseConfig.flowerTypeNum) { // 向上滑动
                const pos = this.node_content.convertToWorldSpaceAR(children[0].position);
                const pos1 = this.node_scrollview.convertToNodeSpaceAR(pos);
                if (pos1.y >= children[0].height + 10) {
                    const posY = children[len - 1].y - children[0].height - 10;
                    this.update_item_info(children[0], posY, children[len - 1][`index`] + 1);
                    const item = children[0];
                    children[0].parent = null;
                    item.parent = this.node_content;
                }
                this.node_content.height += this.node_content.y - this.scrolStartPosY;
                this.scrolStartPosY = this.node_content.y;
            }
            else if (moveY < 0 && children[0][`index`] - 1 >= 0) {// 向下滑动
                const pos = this.node_content.convertToWorldSpaceAR(children[len - 1].position);
                const pos1 = this.node_scrollview.convertToNodeSpaceAR(pos);
                if (pos1.y <= -(this.listMaxLength - 2) * (children[0].height + 10)) {
                    const posY = children[0].y + children[0].height + 10;
                    this.update_item_info(children[len - 1], posY, children[0][`index`] - 1);
                    const item = children[len - 1];
                    item.parent = null;
                    this.node_content.insertChild(item, 0);
                }
                this.node_content.height += this.node_content.y - this.scrolStartPosY;
                this.scrolStartPosY = this.node_content.y;
                this.update_item();
            }
        }
    }

    /**@description 关闭当前界面 */
    close_layer() {
        this.node.destroy();
    }

    onDestroy() {
        this.gamePlay.flower_culture = null;
    }

    update() {
        this.update_item();
    }
}
