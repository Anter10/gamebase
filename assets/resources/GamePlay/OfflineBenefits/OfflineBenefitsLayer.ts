import TouchButton from "../../../Script/Common/TouchButton";
import GameDataBaseConfig from "../../../Script/GameDataConfig/GameDataBaseConfig";
import GameLocalData from "../../../Script/GameLocalData/GameLocalData";
import GamePlayBaseData from "../../../Script/GameLocalData/GamePlayBaseData";
import GamePlay from "../../../Script/GamePlay/GamePlay";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OfflineBenefitsLayer extends cc.Component {
    @property(cc.Node)
    node_bg: cc.Node = null;

    public can_add_coin_num: number = 0;

    public base_data: GamePlayBaseData = null;

    onLoad() {
        this.base_data = GameLocalData.get_instance().get_data<GamePlayBaseData>(GamePlayBaseData);
    }

    start() {
        this.regist_touch_event(this.node_bg.getChildByName(`btn_close`) ,this.btn_close_callback);
        this.regist_touch_event(this.node_bg.getChildByName(`btn_receive`) ,this.btn_receive_callback);
        this.regist_touch_event(this.node_bg.getChildByName(`btn_ad_receive`) ,this.btn_ad_receive_callback);
    }

    /**@description 按钮统一注册点击事件 */
    regist_touch_event(node: cc.Node ,callback: Function) {
        const touch_button: TouchButton = node.addComponent(TouchButton);
        touch_button.register_touch(callback.bind(this));
    }

    /**@description 展示离线收益 */
    init(time: number ,game_data_config: cc.JsonAsset) {
        const flowerpot_status = this.base_data.flowerpot_status;
        let coinNum: any = 0;
        for (let i = 0; i < flowerpot_status.length; ++i) {
            for (let j = 0; j < flowerpot_status[i].length; ++j) {
                if (flowerpot_status[i][j] > 10) {
                    const level = GameDataBaseConfig.getFlowerLevel(flowerpot_status[i][j]);
                    const type = GameDataBaseConfig.getFlowerType(flowerpot_status[i][j]);
                    coinNum += GameDataBaseConfig.getFlowerGenerateCoinSpeed(level, type, game_data_config);
                }
            }
        }
        let hours = Math.floor(time / 60 / 60);
        if (hours < 2) hours = 1
        else if (hours >=2 && hours < 3) hours = 2
        else if (hours >=3 && hours < 4) hours = 3
        else if (hours >=4 && hours < 5) hours = 4
        else if (hours >=5) hours = 5
        coinNum *= game_data_config[`OfflineBenefits`][hours][`multiplier`];
        this.can_add_coin_num = coinNum;
        coinNum = GameDataBaseConfig.conversionCoin(coinNum);
        this.node_bg.getChildByName(`label_coin`).getComponent(cc.Label).string = `${coinNum}金币`;
    }

    /**@description 看视频翻倍领取 */
    btn_ad_receive_callback() {
        this.base_data.change_player_coin_num(this.base_data.player_coin_num + this.can_add_coin_num * 2);
        this.node.parent.getComponent(GamePlay).showToast(`已成功领取${GameDataBaseConfig.conversionCoin(this.can_add_coin_num * 2)}金币`);
        this.node.parent.getComponent(GamePlay).update_player_coin_num();
        this.node.destroy();
    }

    /**@description 直接领取 */
    btn_receive_callback() {
        this.base_data.change_player_coin_num(this.base_data.player_coin_num + this.can_add_coin_num);
        this.node.parent.getComponent(GamePlay).showToast(`已成功领取${GameDataBaseConfig.conversionCoin(this.can_add_coin_num)}金币`);
        this.node.parent.getComponent(GamePlay).update_player_coin_num();
        this.node.destroy();
    }

    /**@description 关闭当前界面 */
    btn_close_callback() {
        this.node.destroy();
    }

    // update (dt) {}
}
