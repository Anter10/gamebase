import FlowerCultureLayer from "../../resources/GamePlay/FlowerCulture/FlowerCultureLayer";
import OfflineBenefitsLayer from "../../resources/GamePlay/OfflineBenefits/OfflineBenefitsLayer";
import { gamebase } from "../Boot";
import { UIParamInterface } from "../Common/CommonInterface";
import TouchButton from "../Common/TouchButton";
import GameDataBaseConfig from "../GameDataConfig/GameDataBaseConfig";
import GameDataConfig from "../GameDataConfig/GameDataConfig";
import GameLocalData from "../GameLocalData/GameLocalData";
import GamePlayBaseData from "../GameLocalData/GamePlayBaseData";
import UIConfig from "../UI/UIManager/UIConfig";
import UIManager from "../UI/UIManager/UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
class GamePlay extends cc.Component {
    @property(cc.Prefab)
    flower_prefab: cc.Prefab = null;
    @property(cc.Prefab)
    hand_prefab: cc.Prefab = null;
    @property(cc.Prefab)
    flower_culture_prefab: cc.Prefab = null;
    @property(cc.Prefab)
    offline_benefits: cc.Prefab = null;

    public node_top: cc.Node = null;
    public node_mid: cc.Node = null;
    public node_bottom: cc.Node = null;

    public game_data_config: cc.JsonAsset = null;
    public base_data: GamePlayBaseData = null;
    public up_grade_need_time: number = 0;
    public acceleration_time: number = 0;
    public flower_culture: cc.Node = null;
    public updateLevelTime: number = 1;
    public updateExperienceTime: number = 0.1;
    public updateLevelCallBack: Function = null;
    public updateExperienceCallBack: Function = null;
    public updateAccelerationCallBack: Function = null;

    onLoad() {
        console.log(`进入游戏的game_play了`)
    }

    start() {
        this.node_mid = cc.instantiate(gamebase.gameScenePrefab[1]);
        this.node_mid.parent = this.node;
        this.node_top = cc.instantiate(gamebase.gameScenePrefab[0]);
        this.node_top.parent = this.node;
        this.node_bottom = cc.instantiate(gamebase.gameScenePrefab[2]);
        this.node_bottom.parent = this.node;
        this.regist_button_touch_event();
        this.init_player_base_data();
        this.init_flower_trellis(true);
        this.updateAccelerationCallBack = this.updateAcceleration.bind(this);
        this.schedule(this.updateAccelerationCallBack, 1);
    }

    /**@description 初始玩家基础信息 */
    init_player_base_data() {
        this.game_data_config = GameDataConfig.get_config_array("GameDataConfig");
        this.base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
        this.show_offline_benefits();
        const date = new Date().getTime();
        this.base_data.change_player_enter_game_time(date);
        this.up_grade_need_time = this.base_data.player_experience;
        this.acceleration_time = this.base_data.acceleration_time;
        if (this.acceleration_time > 0) {
            this.updateLevelTime = 1 / GameDataBaseConfig.accelerationMultiplier;
            this.updateExperienceTime = 0.1 / GameDataBaseConfig.accelerationMultiplier;
        }
        this.update_player_level();
        this.update_player_experience();
        this.update_player_coin_num();
        this.update_player_red_bag_num();
        if (this.up_grade_need_time == 0) {
            this.up_grade_need_time = -1;
            this.show_click_up_grade(this.base_data.player_level >= GameDataBaseConfig.playerMaxLevel ? false : true);
        }
        this.update_acceleration_status(true);
    }

    /**@description 更新玩家等级 */
    update_player_level() {
        const player_level_bg = this.node_top.getChildByName(`player_level_bg`);
        player_level_bg.getChildByName(`label_level`).getComponent(cc.Label).string = `${this.base_data.player_level}`;
    }

    /**@description 更新玩家经验 */
    update_player_experience() {
        const player_level_bg = this.node_top.getChildByName(`player_level_bg`);
        const need_experience = this.game_data_config[`GameData`][this.base_data.player_level + 1].experience;
        const current_experience = need_experience - this.base_data.player_experience;
        const fillRange = current_experience / this.game_data_config[`GameData`][this.base_data.player_level + 1].experience;
        player_level_bg.getChildByName(`bar`).getComponent(cc.Sprite).fillRange = fillRange;
    }

    /**@description 显示点击升级提示 */
    show_click_up_grade(type: boolean) {
        const player_level_bg = this.node_top.getChildByName(`player_level_bg`);
        player_level_bg.getChildByName(`label_level_up`).active = type;
        if (type) {
            this.node_top.getChildByName(`player_level_bg`).getComponent(TouchButton).enable_touch();
            const hand = cc.instantiate(this.hand_prefab);
            hand.parent = this.node_top.getChildByName(`player_level_bg`);
            hand.scale = 0.6;
            hand.setPosition(cc.v3(50 ,-35 ,0));
        }
        else {
            this.node_top.getChildByName(`player_level_bg`).getComponent(TouchButton).disable_touch();
            if (this.node_top.getChildByName(`player_level_bg`).getChildByName(`Hand`)) {
                this.node_top.getChildByName(`player_level_bg`).getChildByName(`Hand`).removeFromParent();
            }
        }
    }

    /**@description 更新玩家金币数量 */
    update_player_coin_num() {
        const player_coin_bg = this.node_top.getChildByName(`player_coin_bg`);
        const coin_num = GameDataBaseConfig.conversionCoin(this.base_data.player_coin_num);
        player_coin_bg.getChildByName(`label_coin`).getComponent(cc.Label).string = coin_num;
    }

    /**@description 更新玩家红包数 */
    update_player_red_bag_num() {
        const player_money_bg = this.node_top.getChildByName(`player_money_bg`);
        const red_bag = GameDataBaseConfig.conversionCash(this.base_data.player_red_bag);
        player_money_bg.getChildByName(`label_money`).getComponent(cc.Label).string = red_bag;
    }

    /**@description 更新一键加速状态 */
    update_acceleration_status(isStart?: boolean) {
        const btn_accelerate = this.node_bottom.getChildByName(`btn_accelerate`);
        if (this.base_data.acceleration_time > 0) {
            btn_accelerate.getChildByName(`label_count_down`).active = true;
            btn_accelerate.getChildByName(`sprite_ad_icon`).active = false;
            btn_accelerate.getChildByName(`label_count_down`).getComponent(cc.Label).string = `${this.base_data.acceleration_time}秒`;
            if (isStart) this.stop_schedule_then_restart_up();
        }
        else {
            btn_accelerate.getChildByName(`label_count_down`).active = false;
            btn_accelerate.getChildByName(`sprite_ad_icon`).active = true;
            this.stop_schedule_then_restart_up();
        }

        const sprite_red_bag_bg = btn_accelerate.getChildByName(`sprite_red_bag_bg`);
        const progress = `${this.base_data.acceleration_num}/${GameDataBaseConfig.accelerationNum}`;
        sprite_red_bag_bg.getChildByName(`label_progress`).getComponent(cc.Label).string = progress;
    }

    /**@description 初始化花架 */
    init_flower_trellis(isMove: boolean) {
        let len = this.get_create_flower_trellis_num();
        const scrollview = this.node_mid.getChildByName(`scrollview`);
        const content = scrollview.getChildByName(`view`).getChildByName(`content`);
        content.removeAllChildren();
        const item_height = Math.floor(scrollview.height / 3);
        content.height = item_height * len;
        let posY = -item_height + 50;
        for (let i = 0; i < len; ++i) {
            this.add_flower_trellis(posY, i, len);
            posY -= Math.floor(scrollview.height / 3);
        }
        if (!isMove) return;
        this.scheduleOnce(() => {
            scrollview.getComponent(cc.ScrollView).scrollToBottom();
        }, 0);
    }

    /**@description 获取创建花架数量 */
    get_create_flower_trellis_num() {
        const keys = Object.keys(this.game_data_config[`FlowerTrellis`]);
        let tmpNum = 0;
        let len = GameDataBaseConfig.flowerTrellisNum;
        for (let j = 0; j < keys.length; ++j) {
            if (this.game_data_config[`FlowerTrellis`][keys[j]].unlockLevel >= this.base_data.player_level
                && !this.base_data.flower_trellis_status[keys[j]]) {
                tmpNum++;
                if (tmpNum >= 2) {
                    len = j + 1;
                    break;
                }
            }
        }
        return len;
    }

    /**@description 添加花架 */
    add_flower_trellis(posY: number, i: number, len: number) {
        const scrollview = this.node_mid.getChildByName(`scrollview`);
        const content = scrollview.getChildByName(`view`).getChildByName(`content`);
        const node_item = this.node_mid.getChildByName(`node_item`);
        const clone_item = cc.instantiate(node_item);
        clone_item.parent = content;
        clone_item.y = posY;
        clone_item.active = true;
        clone_item[`index`] = len - i;
        const sprite_lock = clone_item.getChildByName(`sprite_lock`);
        const btn_unlock = clone_item.getChildByName(`btn_unlock`);
        this.update_flower_trellis_status(sprite_lock, btn_unlock, posY, i, len);
    }

    /**@description 更新花架状态 */
    update_flower_trellis_status(sprite_lock: cc.Node, btn_unlock: cc.Node, posY: number, i: number, len: number) {
        if (this.base_data.player_level >= this.game_data_config[`FlowerTrellis`][len - i].unlockLevel) {
            sprite_lock.active = false;
            btn_unlock.active = !this.base_data.flower_trellis_status[len - i];
            if (btn_unlock.active) {
                const cloneHand = cc.instantiate(this.hand_prefab);
                cloneHand.parent = btn_unlock;
                cloneHand.scale = 0.6;
                cloneHand.setPosition(cc.v2(50, -40));
                const touch_button: TouchButton = btn_unlock.addComponent(TouchButton);
                touch_button.register_touch(() => {
                    this.unlock_flower_callback(i, len);
                });
            }
            else {
                const status = this.base_data.flowerpot_status[len - i - 1];
                for (let j = 0; j < status.length; ++j) {
                    if (status[j] >= 2) {
                        this.create_and_init_flowerpot(j, sprite_lock.parent);
                    }
                }
            }
        }
        else {
            sprite_lock.active = true;
            btn_unlock.active = false;
            sprite_lock.getChildByName(`label_level`).getComponent(cc.Label).string = `${this.game_data_config[`FlowerTrellis`][len - i].unlockLevel}级解锁`;
        }
    }

    /**@description 花架空闲位置，显示可放置图标 */
    flower_trellis_show_can_put_icon(index: number) {
        const scrollview = this.node_mid.getChildByName(`scrollview`);
        const content = scrollview.getChildByName(`view`).getChildByName(`content`);
        const sprite_put = this.node_mid.getChildByName(`sprite_put`);
        const children = content.children;
        let putList = [];
        let can_put = false;
        for (let i = 0; i < children.length; ++i) {
            const status = this.base_data.flowerpot_status[children[i][`index`] - 1];
            if (!status) continue;
            for (let j = 0; j < status.length; ++j) {
                if (status[j] == 1) {
                    const clone_put = cc.instantiate(sprite_put);
                    clone_put.parent = children[i];
                    clone_put.setPosition(GameDataBaseConfig.flowerpotPosition[j]);
                    clone_put.active = true;
                    putList.push(clone_put);
                    const touch_button: TouchButton = clone_put.addComponent(TouchButton);
                    touch_button.register_touch(() => {
                        this.create_and_init_flowerpot(j, children[i], index + 1);
                        for (let k = 0; k < putList.length; ++k) {
                            putList[k].removeFromParent();
                        }
                    });
                    can_put = true;
                }
            }
        }
        return can_put;
    }

    /**@description 创建花盆，并且初始化数据 */
    create_and_init_flowerpot(index: number, parent: cc.Node, flowerType?: number) {
        const flower = cc.instantiate(this.flower_prefab);
        flower.parent = parent;
        flower.name = `flowerpot${index}`;
        flower[`time`] = 0;
        const curFlower = flower.getChildByName(`node_flower`);
        let pos = GameDataBaseConfig.flowerpotPosition[index];
        flower.setPosition(cc.v3(pos.x, pos.y - 10, pos.z));
        if (flowerType >= 0) {
            const tmp = flowerType * 10000;
            this.base_data.change_flowerpot_status(tmp, parent[`index`] - 1, index);
        }
        const flowerpot = curFlower.getChildByName(`sprite_flowerpot`);
        const shadow = curFlower.getChildByName(`sprite_shadow`);
        const sprite_flower = curFlower.getChildByName(`node_flower`).getChildByName(`sprite_flower`);
        const status = this.base_data.flowerpot_status[parent[`index`] - 1][index];
        if (!flowerType) flowerType = GameDataBaseConfig.getFlowerType(status);

        const label_name = curFlower.getChildByName(`label_name`);
        const node_touch = curFlower.getChildByName(`node_touch`);
        const noed_touch_button: TouchButton = node_touch.addComponent(TouchButton);
        label_name.getComponent(cc.Label).string = this.game_data_config[`FlowerData`][index + 1][`name`];
        const label_speed = label_name.getChildByName(`label_speed`);
        const coinNum = GameDataBaseConfig.getFlowerGenerateCoinSpeed(GameDataBaseConfig.getFlowerLevel(status), flowerType, this.game_data_config);
        label_speed.getComponent(cc.Label).string = `+${coinNum}每秒`;
        noed_touch_button.register_touch(() => {
            const curStatus = this.base_data.flowerpot_status[parent[`index`] - 1][index];
            if (GameDataBaseConfig.getFlowerLevel(curStatus) <= 0) return;
            label_name.active = true;
            cc.tween(label_name)
                .by(0.5, { opacity: 255 })
                .delay(5)
                .by(0.5, { opacity: -255 })
                .start();
        });

        const flowerpotType = GameDataBaseConfig.getFlowerpotType(status);
        curFlower.getChildByName(`node_flower`).y = GameDataBaseConfig.flowerPosY[flowerpotType - 1];
        const sprite_unlock_bg = curFlower.getChildByName(`node_flower`).getChildByName(`sprite_unlock_bg`);
        flowerpot.getComponent(cc.Sprite).spriteFrame = gamebase.flowerAtlas.getSpriteFrame(`huapen${flowerpotType}`);
        shadow.getComponent(cc.Sprite).spriteFrame = gamebase.flowerAtlas.getSpriteFrame(`huapen${flowerpotType}${flowerpotType}`);
        shadow.x = GameDataBaseConfig.flowerShadowPosX[flowerpotType - 1];
        if (GameDataBaseConfig.getFlowerLevel(status) == 0) { // 放置花盆
            sprite_flower.active = false;
            if (!this.base_data.flower_unlock_time[flowerType]) {
                this.base_data.change_flower_unlock_time(this.game_data_config[`FlowerData`][flowerType][`unlockTime`], flowerType);
            }
            this.base_data.change_flower_current_experience(0, flowerType);
            sprite_unlock_bg.active = true;
            curFlower.getChildByName(`sprite_flowerpot`).getChildByName(`progress`).active = false;
            curFlower.getChildByName(`sprite_flowerpot`).getChildByName(`sprite_level_bg`).active = false;
            const label_time = sprite_unlock_bg.getChildByName(`label_time`);
            const touch_button: TouchButton = sprite_unlock_bg.addComponent(TouchButton);
            const unlockFun = () => {
                label_time.stopAllActions();
                const tmp = flowerType * 10000 + 1;
                this.base_data.change_flowerpot_status(tmp, parent[`index`] - 1, index);
                this.base_data.change_flower_status(4, flowerType - 1);
                this.update_flowerpot_status(flower, index);
                this.update_flower_culture_layer(flowerType);
                curFlower.getComponent(cc.Animation).play();
                curFlower.getChildByName(`huabi`).getComponent(cc.Animation).play();
            }
            touch_button.register_touch(() => {
                cc.log(`看广告，立即解锁`);
                unlockFun();
            });
            const fun = () => {
                const time = GameDataBaseConfig.conversionTime(this.base_data.flower_unlock_time[flowerType]);
                label_time.getComponent(cc.Label).string = `${time}`;
                this.base_data.change_flower_status(3, flowerType - 1);
            }
            fun();
            label_time.stopAllActions();
            const unlockTime = this.base_data.flower_unlock_time[flowerType];
            cc.tween(label_time)
                .repeat(unlockTime,
                    cc.tween().delay(1).call(() => {
                        const curTime = this.base_data.flower_unlock_time[flowerType] - 1;
                        this.base_data.change_flower_unlock_time(curTime, flowerType);
                        fun();
                        if (curTime <= 0) {
                            unlockFun();
                        }
                    }))
                .start();
        }
        else { // 更新鲜花状态
            curFlower.getComponent(cc.Animation).play();
            curFlower.getChildByName(`huabi`).getComponent(cc.Animation).play();
            sprite_unlock_bg.active = false;
            sprite_flower.active = true;
            const curFlowerType = GameDataBaseConfig.getFlowerType(status);
            const flower_name = `flower${curFlowerType}${GameDataBaseConfig.flowerName[curFlowerType - 1]}${GameDataBaseConfig.getFlowerpotType(status)}`;
            sprite_flower.getComponent(cc.Sprite).spriteFrame = gamebase.flowerAtlas.getSpriteFrame(flower_name);
        }
    }

    /**@description 更新花盆状态 */
    update_flowerpot_status(node: cc.Node, index: number) {
        const curFlower = node.getChildByName(`node_flower`);
        const sprite_unlock_bg = curFlower.getChildByName(`node_flower`).getChildByName(`sprite_unlock_bg`);
        const sprite_flower = curFlower.getChildByName(`node_flower`).getChildByName(`sprite_flower`);
        sprite_unlock_bg.active = false;
        sprite_flower.active = true;

        const status = this.base_data.flowerpot_status[node.parent[`index`] - 1][index];
        const curFlowerType = GameDataBaseConfig.getFlowerType(status);
        const flower_name = `flower${curFlowerType}${GameDataBaseConfig.flowerName[curFlowerType - 1]}${GameDataBaseConfig.getFlowerpotType(status)}`;
        sprite_flower.getComponent(cc.Sprite).spriteFrame = gamebase.flowerAtlas.getSpriteFrame(flower_name);

        const flowerpot = curFlower.getChildByName(`sprite_flowerpot`);
        const shadow = curFlower.getChildByName(`sprite_shadow`);
        const flowerpotType = GameDataBaseConfig.getFlowerpotType(status);
        flowerpot.getComponent(cc.Sprite).spriteFrame = gamebase.flowerAtlas.getSpriteFrame(`huapen${flowerpotType}`);
        shadow.getComponent(cc.Sprite).spriteFrame = gamebase.flowerAtlas.getSpriteFrame(`huapen${flowerpotType}${flowerpotType}`);
    }

    /**@description 获取指定位置的鲜花 */
    get_specify_location_flower(index: number) {
        const scrollview = this.node_mid.getChildByName(`scrollview`);
        const content = scrollview.getChildByName(`view`).getChildByName(`content`);
        const children = content.children;
        const list = this.base_data.flowerpot_status;
        for (let i = 0; i < list.length; ++i) {
            for (let j = 0; j < list[i].length; ++j) {
                if (list[i][j] > 10) {
                    const type = GameDataBaseConfig.getFlowerType(list[i][j]);
                    if (type == (index + 1)) {
                        return children[children.length - i - 1].getChildByName(`flowerpot${j}`);
                    }
                }
            }
        }
    }

    /**@description 更新鲜花当前经验值 */
    update_flower_current_experience() {
        const scrollview = this.node_mid.getChildByName(`scrollview`);
        const content = scrollview.getChildByName(`view`).getChildByName(`content`);
        const children = content.children;
        for (let i = 0; i < children.length; ++i) {
            for (let j = 0; j < GameDataBaseConfig.canBePlacedFlowerNum; ++j) {
                const child = children[i].getChildByName(`flowerpot${j}`);
                if (!child) continue;
                const status = this.base_data.flowerpot_status[children[i][`index`] - 1][j];
                const level = GameDataBaseConfig.getFlowerLevel(status);
                if (status < 10 || level < 1) continue;
                const curFlower = child.getChildByName(`node_flower`);
                const flowerType = GameDataBaseConfig.getFlowerType(status);
                const progress = curFlower.getChildByName(`sprite_flowerpot`).getChildByName(`progress`);
                const spriteLevelBg = curFlower.getChildByName(`sprite_flowerpot`).getChildByName(`sprite_level_bg`);
                spriteLevelBg.getChildByName(`label_level`).getComponent(cc.Label).string = `${level}`;
                const labelStatus = curFlower.getChildByName(`sprite_flowerpot`).getChildByName(`label_status`);
                const needExperience = GameDataBaseConfig.getFlowerUpgradeNeedExperience(level, flowerType, this.game_data_config);
                const label_name = curFlower.getChildByName(`label_name`);
                const label_speed = label_name.getChildByName(`label_speed`);
                label_name.getComponent(cc.Label).string = this.game_data_config[`FlowerData`][flowerType][`name`];
                const coinNum = GameDataBaseConfig.getFlowerGenerateCoinSpeed(level, flowerType, this.game_data_config);
                label_speed.getComponent(cc.Label).string = `+${coinNum}每秒`;

                const ani = curFlower.getComponent(cc.Animation);
                let cur = ani.getAnimationState(`hua`);
                if (this.base_data.acceleration_time > 0) {
                    cur.speed = 2;
                }
                else {
                    cur.speed = 1;
                }
                child[`time`] += 1;
                if (child[`time`] >= 10) {
                    child[`time`] = 0;
                    const label_add_coin = cc.instantiate(child.getChildByName(`label_add_coin`));
                    label_add_coin.parent = child;
                    label_add_coin.getComponent(cc.Label).string = `+${coinNum}`;
                    label_add_coin.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED ,() => {
                        label_add_coin.destroy();
                    });
                    this.base_data.change_player_coin_num(coinNum + this.base_data.player_coin_num);
                    this.update_player_coin_num();
                }
                if (this.base_data.flower_current_experience[flowerType] === undefined) { // 不存在则认为，该鲜花刚解锁等级为1
                    this.base_data.change_flower_current_experience(0, flowerType);
                }
                else if (this.base_data.flower_current_experience[flowerType] >= needExperience
                    || level > GameDataBaseConfig.flowerMaxLevel) {
                    if (level % 10 == 0) { // 鲜花达到瓶颈（10、20、30、40、50）
                        progress.active = false;
                        spriteLevelBg.active = true;
                        if (level == 50) {
                            labelStatus.getComponent(cc.Label).string = `可成熟`;
                            this.base_data.change_flower_status(7, flowerType - 1);
                        }
                        else {
                            labelStatus.getComponent(cc.Label).string = `可成长`;
                            this.base_data.change_flower_status(5, flowerType - 1);
                        }
                        if (!labelStatus.active) {
                            this.update_flower_culture_layer(flowerType);
                            this.update_flowerpot_status(child, j);
                            this.show_grow_up(child, level == 50 ? 1 : 0, flowerType, level, j);
                        }
                        labelStatus.active = true;
                    }
                    else if (level > GameDataBaseConfig.flowerMaxLevel) { // 鲜花已成熟
                        progress.active = false;
                        labelStatus.active = true;
                        if (spriteLevelBg.active) {
                            this.update_flower_culture_layer(flowerType);
                            this.update_flowerpot_status(child, j);
                            this.show_grow_up(child, 2, flowerType, level, j);
                        }
                        spriteLevelBg.active = false;
                        labelStatus.getComponent(cc.Label).string = `已成熟`;
                        this.base_data.change_flower_status(6, flowerType - 1);
                    }
                    else { // 鲜花升级
                        this.base_data.change_flowerpot_status(status + 1, children[i][`index`] - 1, j);
                        spriteLevelBg.getChildByName(`label_level`).getComponent(cc.Label).string = `${level + 1}`;
                        this.base_data.change_flower_current_experience(0, flowerType);
                        this.update_flower_culture_layer(flowerType);
                        // this.play_grow_up_ani(curFlower.getChildByName(`shengji`));
                    }
                }
                else { // 增加经验
                    progress.active = true;
                    labelStatus.active = false;
                    spriteLevelBg.active = true;
                    const curExperience = this.base_data.flower_current_experience[flowerType] + 1;
                    this.base_data.change_flower_current_experience(curExperience, flowerType);
                    progress.getChildByName(`bar`).getComponent(cc.Sprite).fillRange = curExperience / needExperience;
                }
            }
        }
    }

    /**@description 升级动画播放完成，隐藏 */
    play_grow_up_ani(node: cc.Node) {
        node.active = true;
        node.getComponent(cc.Animation).play();
        node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED ,() => {
            node.active = false;
        });
    }

    /**@description 花盆下边，可成长、可成熟、已成熟展示 */
    show_grow_up(node: cc.Node, status: number, flowerType?: number, level?: number, index?: number) {
        const sprite_growup_bg = node.getChildByName(`sprite_growup_bg`);
        if (status == -1) {
            sprite_growup_bg.active = false;
            return;
        }
        const curFlower = node.getChildByName(`node_flower`);
        const showLabel = [`可成长`, `可成熟`, `收获鲜花`];
        const label_status = sprite_growup_bg.getChildByName(`label_status`);
        label_status.getComponent(cc.Label).string = showLabel[status];
        if (status == 2) {
            label_status.setPosition(cc.v3(20, -16, 0));
            sprite_growup_bg.getChildByName(`sprite_coin`).active = false;
        }
        else {
            label_status.setPosition(cc.v3(20, -8, 0));
            sprite_growup_bg.getChildByName(`sprite_coin`).active = true;
        }
        sprite_growup_bg.active = true;
        const consumeCoinNum = GameDataBaseConfig.getFlowerGenerateConsumeCoinNum(level, flowerType, this.game_data_config);
        const label_coin = sprite_growup_bg.getChildByName(`sprite_coin`).getChildByName(`label_coin`);
        label_coin.getComponent(cc.Label).string = GameDataBaseConfig.conversionCoin(consumeCoinNum);
        // const touch_button: TouchButton = sprite_growup_bg.addComponent(TouchButton);
        sprite_growup_bg.on(`click` ,() => {
            const canGrowUp = this.consume_player_coin(consumeCoinNum);
            if (!canGrowUp) {
                this.showToast("金币不足了，试试一键加速吧!");
                return;
            }
            const pos = parseInt(node.name[9]);
            const curStatus = this.base_data.flowerpot_status[node.parent[`index`] - 1][pos] + 1;
            if (status == 2) {
                const flowerName = curFlower.getChildByName(`label_name`).getComponent(cc.Label).string;
                if (this.base_data.flower_harvest_num[flowerType - 1] >= GameDataBaseConfig.flowerMaxHarvestNum) {
                    this.showToast(`今天${flowerName}收获已达上限，请明天再来吧!`);
                    return;
                }
                // this.play_grow_up_ani(curFlower.getChildByName(`shengji`));
                sprite_growup_bg.off(`click`);
                this.harvest_flower(node, flowerType, () => {
                    this.base_data.change_flowerpot_status(1, node.parent[`index`] - 1, pos);
                    this.base_data.change_flower_current_experience(0, GameDataBaseConfig.getFlowerType(curStatus));
                    this.base_data.change_flower_status(2, GameDataBaseConfig.getFlowerType(curStatus) - 1);
                    node.removeFromParent();
                    this.showToast(`${flowerName}已收获并放入仓库`);
                    if (!this.base_data.flower_harvest_num[flowerType - 1]) {
                        this.base_data.flower_harvest_num[flowerType - 1] = 0;
                    }
                    this.base_data.change_flower_harvest_num(this.base_data.flower_harvest_num[flowerType - 1] + 1 ,flowerType - 1);
                });
                return;
            }
            else if (status == 1) {
                this.base_data.change_flowerpot_status(curStatus, node.parent[`index`] - 1, pos);
                this.base_data.change_flower_status(6, GameDataBaseConfig.getFlowerType(curStatus) - 1);
            }
            else {
                this.base_data.change_flowerpot_status(curStatus, node.parent[`index`] - 1, pos);
                this.base_data.change_flower_status(4, GameDataBaseConfig.getFlowerType(curStatus) - 1);
                this.base_data.change_flower_current_experience(0, GameDataBaseConfig.getFlowerType(curStatus));
            }
            this.play_grow_up_ani(curFlower.getChildByName(`shengji`));
            sprite_growup_bg.off(`click`);
            this.update_flowerpot_status(node, index);
            this.show_grow_up(node, -1, flowerType, level, index);
        });
    }

    /**@description 鲜花等级、状态变更，如果“我要养花”界面打卡，同步更新我要养花界面 */
    update_flower_culture_layer(flowerType: number) {
        if (!this.flower_culture) return;
        this.flower_culture.getComponent(FlowerCultureLayer).get_flower_level();
        this.flower_culture.getComponent(FlowerCultureLayer).update_special_flower_item(flowerType);
    }

    /**@description 鲜花成长，消耗金币 */
    consume_player_coin(consume: number) {
        if (consume >= this.base_data.player_coin_num) return false;
        this.base_data.change_player_coin_num(this.base_data.player_coin_num - consume);
        this.update_player_coin_num();
        return true;
    }

    /**@description 收获鲜花 */
    harvest_flower(node: cc.Node, type: number, callBack?: Function) {
        const warehouse = this.node_top.getChildByName(`btn_warehouse`);
        const pos1 = warehouse.parent.convertToWorldSpaceAR(warehouse.position);
        const pos2 = node.parent.convertToNodeSpaceAR(pos1);
        const pos3 = node.position;
        cc.tween(node)
            .parallel(
                cc.tween().bezierTo(1, cc.v2(pos3.x, pos3.y), cc.v2(pos3.x, pos2.y), cc.v2(pos2.x, pos2.y)),
                cc.tween().to(1, { scale: 0.5 }),
            )
            .call(() => {
                callBack && callBack();
            })
            .start();
    }

    /**@description 按钮统一注册点击事件 */
    regist_button_touch_event() {
        const regist = (node: cc.Node, callBack: Function) => {
            const touch_button: TouchButton = node.addComponent(TouchButton);
            touch_button.register_touch(callBack.bind(this));
        }
        regist(this.node_top.getChildByName(`player_level_bg`), this.player_level_up_callback); // 提升玩家等级
        this.node_top.getChildByName(`player_level_bg`).getComponent(TouchButton).disable_touch();

        regist(this.node_top.getChildByName(`btn_signin`), this.open_sign_in_callback); // 打开每日登陆界面
        regist(this.node_top.getChildByName(`btn_redbag`), this.red_bag_callback); // 领取倒计时红包
        regist(this.node_top.getChildByName(`btn_strategy`), this.open_strategy_callback); // 打开攻略界面
        regist(this.node_top.getChildByName(`btn_drawCash`), this.open_draw_cash_callback); // 打开提现商店界面
        regist(this.node_top.getChildByName(`btn_warehouse`), this.open_ware_house_callback); // 打开我的仓库界面

        regist(this.node_bottom.getChildByName(`btn_flower_culture`), this.open_flower_culture_callback); // 打开我要养花界面
        regist(this.node_bottom.getChildByName(`btn_task`), this.open_task_callback); // 打开现金任务界面
        regist(this.node_bottom.getChildByName(`btn_invite`), this.open_invite_callback); // 打开邀请好友界面
        regist(this.node_bottom.getChildByName(`btn_clock_in`), this.open_clock_in_callback); // 打开打卡界面
        regist(this.node_bottom.getChildByName(`btn_accelerate`), this.open_accelerate_callback); // 打卡一键加速功能
    }

    /**@description 提升玩家等级 */
    player_level_up_callback() {
        cc.log(`提升玩家等级`);
        const player_level = this.base_data.player_level >= GameDataBaseConfig.playerMaxLevel ? this.base_data.player_level : (this.base_data.player_level + 1);
        this.base_data.change_player_level(player_level);
        const isChange = this.base_data.change_flower_status_by_level(player_level, this.game_data_config);
        if (isChange) {
            this.node_bottom.getChildByName(`btn_flower_culture`).getChildByName(`sprite_hand`).active = true;
        }
        this.update_player_level();

        this.base_data.change_player_experience(this.game_data_config[`GameData`][this.base_data.player_level + 1].experience);
        this.up_grade_need_time = this.base_data.player_experience;
        this.update_player_experience();
        this.show_click_up_grade(false);
    }

    /**@description 打开每日登录界面 */
    open_sign_in_callback() {
        cc.log(`打开每日登陆界面`);
    }

    /**@description 领取倒计时红包 */
    red_bag_callback() {
        cc.log(`领取倒计时红包`);
    }

    /**@description 打开攻略界面 */
    open_strategy_callback() {
        cc.log(`打开攻略界面`);
    }

    /**@description 打开提现商店界面 */
    open_draw_cash_callback() {
        cc.log(`打开提现商店界面`);
    }

    /**@description 打开我的仓库界面 */
    open_ware_house_callback() {
        cc.log(`打开我的仓库界面`);
    }

    /**@description 打开我要养花界面 */
    open_flower_culture_callback() {
        cc.log(`打开我要养花界面`);
        if (this.flower_culture) return;
        this.flower_culture = cc.instantiate(this.flower_culture_prefab);
        this.flower_culture.parent = this.node;
        this.node_bottom.getChildByName(`btn_flower_culture`).getChildByName(`sprite_hand`).active = false;
    }

    /**@description 打开现金任务界面 */
    open_task_callback() {
        cc.log(`打开现金任务界面`);
    }

    /**@description 打开邀请好友界面 */
    open_invite_callback() {
        cc.log(`打开邀请好友界面`);
    }

    /**@description 打开打卡界面 */
    open_clock_in_callback() {
        cc.log(`打开打卡界面`);
    }

    /**@description 打开一键加速功能 */
    open_accelerate_callback() {
        cc.log(`一键加速功能`);
        if (this.acceleration_time > 0) return;
        this.base_data.change_acceleration_time(GameDataBaseConfig.accelerationTime);
        this.base_data.change_acceleration_num(this.base_data.acceleration_num + 1);
        this.acceleration_time = this.base_data.acceleration_time;
        this.schedule(this.updateAccelerationCallBack ,1);
        this.update_acceleration_status();
        this.updateLevelTime = 1 / GameDataBaseConfig.accelerationMultiplier;
        this.updateExperienceTime = 0.1 / GameDataBaseConfig.accelerationMultiplier;
        this.stop_schedule_then_restart_up();
    }

    /**@description 取消定时器，更改时间后，重新启动 */
    stop_schedule_then_restart_up() {
        if (this.updateLevelCallBack) {
            this.unschedule(this.updateLevelCallBack);
        }
        else {
            this.updateLevelCallBack = this.updateLevel.bind(this);
        }
        if (this.updateExperienceCallBack) {
            this.unschedule(this.updateExperienceCallBack);
        }
        else {
            this.updateExperienceCallBack = this.update_flower_current_experience.bind(this);
        }
        cc.log(`--------updateExperienceTime-------`+this.updateExperienceTime);
        this.schedule(this.updateLevelCallBack, this.updateLevelTime);
        this.schedule(this.updateExperienceCallBack, this.updateExperienceTime);
    }

    /**@description 点击看视频，解锁当前花架 */
    unlock_flower_callback(i: number, len: number) {
        cc.log(`解锁花架`);
        this.base_data.change_flower_trellis_status(true, len - i);
        this.add_flower_trellis(0, i + 1, len);

        const scrollview = this.node_mid.getChildByName(`scrollview`);
        const content = scrollview.getChildByName(`view`).getChildByName(`content`);
        len = this.get_create_flower_trellis_num();
        content.height = Math.floor(scrollview.height / 3) * len;
        let posY = -Math.floor(scrollview.height / 3) + 50;
        for (let j = 0; j < len; ++j) {
            const clone_item = content.children[j];
            clone_item[`index`] = len - j;
            const sprite_lock = clone_item.getChildByName(`sprite_lock`);
            const btn_unlock = clone_item.getChildByName(`btn_unlock`);
            this.update_flower_trellis_status(sprite_lock, btn_unlock, posY, j, len);
            clone_item.y = posY;
            posY -= Math.floor(scrollview.height / 3);
        }
    }

    /**@description 离线收益 */
    show_offline_benefits() {
        let time = new Date().getTime();
        if (this.base_data.player_enter_game_time > 0) time = this.base_data.player_enter_game_time;
        const offline_time = GameDataBaseConfig.get_offline_time(time);
        if (offline_time > 0) {
            const offlineLayer = cc.instantiate(this.offline_benefits);
            offlineLayer.parent = this.node;
            offlineLayer.getComponent(OfflineBenefitsLayer).init(offline_time ,this.game_data_config);
        }
    }

    /**@description 展示Toast */
    showToast(tips: string) {
        const ui_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.Toast,
            ui_config_name: "Toast",
            param: {
                text: tips
            }
        }
        UIManager.show_ui(ui_param_interface);
    }

    /**@description 每秒更新经验1次 */
    updateLevel() {
        if (this.up_grade_need_time == 0) { //等级提升
            this.up_grade_need_time = -1;
            this.show_click_up_grade(this.base_data.player_level >= GameDataBaseConfig.playerMaxLevel ? false : true);
        }
        else if (this.up_grade_need_time > 0) {
            this.up_grade_need_time--;
            this.base_data.change_player_experience(this.up_grade_need_time);
            this.update_player_experience();
        }
    }

    /**@description 更新一键加速倒计时次 */
    updateAcceleration() {
        if (this.acceleration_time > 0) {
            this.acceleration_time--;
            this.base_data.change_acceleration_time(this.acceleration_time);
            this.update_acceleration_status();
        }
        else {
            this.updateLevelTime = 1;
            this.updateExperienceTime = 0.1;
            this.unschedule(this.updateAccelerationCallBack);
            this.update_acceleration_status();
        }
    }
    // update (dt) {}
}


export default GamePlay;