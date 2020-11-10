import BaseUI from "../../../Common/BaseUI";
import { UIParamInterface } from "../../../Common/CommonInterface";
import Loader from "../../../Common/Loader";
import Toast from "../../../Common/Toast";
import TouchButton from "../../../Common/TouchButton";
import ServerData from "../../../GameServerData/ServerData";
import UIConfig from "../../UIManager/UIConfig";
import UIManager from "../../UIManager/UIManager";
import ClickOnController from "../ClickOnController";
import { ClockInTitleType } from "../ClickOnEnum";
import ClickOnViewItem from "../ClickOnViewItem";

const { ccclass, property } = cc._decorator;

const CLICK_IN_LENGTH = 7;
@ccclass
class NormalClickOnView extends BaseUI {
    @property(cc.Sprite)
    click_background_bottom: cc.Sprite = null;
    @property(cc.Node)
    click_on_item_scroll_view_bottom: cc.Node = null;
    @property(cc.Node)
    label_explain: cc.Node = null;

    @property(cc.Node)
    container: cc.Node = null;
    @property(cc.Sprite)
    sprite_title_bg: cc.Sprite = null;
    @property(cc.Node)
    sprite_clockin_progress: cc.Node = null;

    @property(cc.Prefab)
    normal_click_on_free_tip: cc.Prefab = null;
    @property(cc.Prefab)
    click_on_item_prefab: cc.Prefab = null;
    @property(cc.Prefab)
    click_on_red_prefab: cc.Prefab = null;

    private clock_in_data: any = null;
    onLoad() {
        super.onLoad();
        console.log(this.controller)
        // this.init_view();

        // 点击打卡声明
        const label_explain: TouchButton = this.label_explain.addComponent(TouchButton);
        label_explain.register_touch(this.click_label_explain.bind(this));
    }

    click_label_explain(){
        const ui_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.NormalClickOnStatementView,
            ui_config_name: "NormalClickOnStatementView",
     }
     UIManager.show_ui(ui_param_interface);
    }
    
    init_view(data: any) {
        this.clock_in_data = data;
        const label_clockin_progress = this.sprite_title_bg.node.getChildByName(`label_clockin_progress`);
        label_clockin_progress.getComponent(cc.RichText).string = `<color=#ffffff>今日打卡进度</c><color=#fffc00>(看视频${data.process}/${data.needProcess})</color>`

        const checkInDay = data.checkInDay < 10 ? `0${data.checkInDay}` : data.checkInDay;
        const label_clockin_day_num = this.sprite_title_bg.node.getChildByName(`label_clockin_day_num`);
        label_clockin_day_num.getComponent(cc.Label).string = `${checkInDay}`;

        const label_clockin_day_num1 = this.sprite_clockin_progress.getChildByName(`label_clockin_day_num`);
        label_clockin_day_num1.getComponent(cc.RichText).string = `<color=#1B1B1B>已连续签到</c><color=#F16700>${data.checkInDay}<color=#1B1B1B>天</color>`;

        this.init_clickin_progress();
        if (this.clock_in_data.special && this.clock_in_data.special.length > 0) {
            const len = this.clock_in_data.special.length;
            for (let i = 0; i < len; i++) {
                const item = cc.instantiate(this.click_on_item_prefab);
                item.parent = this.container;
                const view_item = item.getComponent(ClickOnViewItem);
                view_item.init_item_data(this.clock_in_data.special[i], this.clock_in_data.checkInDay, this.clock_in_data.todayDone);
            }
        }
    }

    init_clickin_progress() {
        let redImageList = [];
        let posX = -295;
        let startIndex = (Math.ceil(this.clock_in_data.checkInDay / (CLICK_IN_LENGTH - 1)) - 1) * (CLICK_IN_LENGTH - 1) + 1;
        for (let i = startIndex; i < CLICK_IN_LENGTH + startIndex; ++i) {
            const clone_sprite_red = cc.instantiate(this.click_on_red_prefab);
            clone_sprite_red.parent = this.sprite_clockin_progress;
            clone_sprite_red.x = posX;
            posX += 107;
            this.update_item(clone_sprite_red, i, redImageList);
        }
    }

    update_item(clone_sprite_red: cc.Node, i: number, redImageList: Array<cc.SpriteFrame>) {
        let index = this.clock_in_data.checkInDay < i ? 2 : (i <= this.clock_in_data.receivedDay ? 1 : 0);
        if (!redImageList[index]) {
            Loader.load_texture(`./UI/ClickOn/Normal/res/dakazpp_icon_mark1_hongbao${index}`, (texture: cc.Texture2D) => {
                redImageList[index] = new cc.SpriteFrame(texture);
                clone_sprite_red.getComponent(cc.Sprite).spriteFrame = redImageList[index];
            });
        }
        else {
            clone_sprite_red.getComponent(cc.Sprite).spriteFrame = redImageList[index];
        }

        clone_sprite_red.getChildByName(`label_day_num`).getComponent(cc.Label).string = `${i}天`;
        clone_sprite_red.getChildByName(`label_money`).getComponent(cc.Label).string = `${this.clock_in_data.normal}`;
        clone_sprite_red.getChildByName(`sprite_line`).active = this.clock_in_data.checkInDay > i;
        clone_sprite_red.getChildByName(`sprite_point`).active = this.clock_in_data.checkInDay >= i;
        let isDone = this.clock_in_data.checkInDay > i;
        if (this.clock_in_data.checkInDay == i && this.clock_in_data.todayDone) isDone = true;
        clone_sprite_red.getChildByName(`sprite_ok`).active = isDone;

        if (index == 0) {
            const touch_button: TouchButton = clone_sprite_red.addComponent(TouchButton);
            touch_button.register_touch(() => {
                ServerData.get_instance().sendOutServerDataSignIn(i, (data?: any) => {
                    if (!data) return;
                    const ui_param_interface: UIParamInterface = {
                        ui_config_path: UIConfig.Toast,
                        ui_config_name: "Toast",
                        param: {
                            text: `+${data.result.addMoney / 100}元`
                        }
                    }
                    UIManager.show_ui(ui_param_interface);
                    this.clock_in_data.receivedDay++;
                    this.update_item(clone_sprite_red, i, redImageList);
                });
            });
        }
    }

    start() {
        super.start();
    }

    // update (dt) {}
}


export default NormalClickOnView;