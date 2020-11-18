import BaseUI from "../../../Common/BaseUI";
import TouchButton from "../../../Common/TouchButton";
import GameLocalData from "../../../GameLocalData/GameLocalData";
import GamePlayBaseData from "../../../GameLocalData/GamePlayBaseData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GetCardRecorderView extends BaseUI {

    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Node)
    get_button: cc.Node = null;

    @property(cc.RichText)
    today_label: cc.RichText = null;

    private game_base_data: GamePlayBaseData = null;

    onLoad() {
        super.onLoad();
        this.close_button.addComponent(TouchButton).register_touch(() => {
            this.on_close_call();
        })

        //领取记牌器
        const get_button: TouchButton = this.get_button.addComponent(TouchButton);
        get_button.register_touch(this.click_get_button.bind(this));

        this.game_base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
    }

    click_get_button() {
        this.game_base_data.get_card_record_by_ad_time = this.game_base_data.get_card_record_by_ad_time + 1;
    }

    refresh_today_label() {
        this.today_label.string = `<color=#000000>今日剩余</c><color=#ffc000>${10 - this.game_base_data.get_card_record_by_ad_time}</c><color=#000000>次</c>`;
    }

}
