import TouchButton from "../../../Script/Common/TouchButton";
import GameDataBaseConfig from "../../../Script/GameDataConfig/GameDataBaseConfig";
import GamePlay from "../../../Script/GamePlay/GamePlay";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PopupLayer extends cc.Component {
    @property(cc.Node)
    node_red: cc.Node = null;

    @property(cc.Node)
    node_no_coin: cc.Node = null;

    @property(cc.Node)
    node_tips: cc.Node = null;

    @property(cc.Node)
    node_benefits: cc.Node = null;

    public cur_show_node: cc.Node = null;
    public cur_show_type: number = null;
    public game_play: GamePlay = null;
    onLoad() { }

    start() {
        this.game_play = this.node.parent.getComponent(GamePlay);
    }

    /**@description 根据type展示相对应界面 */
    init(type: number ,data?: any) {
        this.cur_show_type = type;
        switch (type) {
            case GameDataBaseConfig.popup_type.red: {
                this.show_red_node();
                break;
            }
            case GameDataBaseConfig.popup_type.no_coin: {
                break;
            }
            case GameDataBaseConfig.popup_type.tips: {
                break;
            }
            case GameDataBaseConfig.popup_type.benefits: {
                break;
            }
        }
    }

    /**@description 展示红包界面 */
    show_red_node() {
        this.cur_show_node = this.node_red;
        this.node_red.active = true;
        const touch_button: TouchButton = this.node_red.addComponent(TouchButton);
        touch_button.register_touch(() => {
            cc.log(`获取红包奖励类型`);
        });
    }

    /**@description 移除当前界面 */
    remove_layer() {
        this.game_play.remove_popup(this.cur_show_type);
        this.node.destroy();
    }
    // update (dt) {}
}
