import { gamebase } from "../Boot";
import { AudioConfig } from "../GameDataConfig/ConfigInterface";
import GameDataConfig from "../GameDataConfig/GameDataConfig";
import CashOutController from "../UI/CashOut/CashOutController";
import UIConfig from "../UI/UIManager/UIConfig";
import UIManager from "../UI/UIManager/UIManager";
import Audio from "./Audio";
import { CashOutRouterPath } from "./CommonEnum";
import { ModalInterface, UIParamInterface } from "./CommonInterface";

class Test{
    // 使用 window.Test.audio()来测试相关的功能
    static audio(){
         const audio_config:AudioConfig = GameDataConfig.get_config_by_id("AudioConfig",1);
         const audio: Audio = new Audio();
         audio.play(audio_config);
    }

    static modal(){
        const modal_interface: ModalInterface = {
            cancel: true,
            confirm: true,
            cancel_text:"取消",
            confirm_text: "确定",
            cancel_callback: ()=>{
                console.log("取消调用");
            },
            ok_callback: ()=>{
                console.log("确定调用");
            },
            message: "这是一个测试提示框",
        }

        const ui_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.Modal,
            ui_config_name: "Modal",
            param:modal_interface
        }

        UIManager.show_ui(ui_param_interface);
    }

    /**@description 测试提现功能 */
    static cash_out(){
        CashOutController.open(CashOutRouterPath.no_balance);
    }


     /**@description 测试提现记录的界面 */
     static cash_out_order_view(){
        const ui_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.CashOutOrderView,
            ui_config_name: "CashOutOrderView",
            param:{}
        }

        UIManager.show_ui(ui_param_interface);
    }

    /**@description 测试提现功能 */
    static click_on_view(){
    }

    /**@description 测试提现功能 */
    static rank_view(){
    }

     /**@description 测试邀请好友的功能 */
     static invite_view(){
    }

    /**@description 测试邀请好友的功能 */
    static open_red_envelope_view(){
    }

    static open_red_envelope_success_view(){
        const ui_param_interface: UIParamInterface = {
            ui_config_path: UIConfig.NormalOpenRedEnvelopeSuccessView,
            ui_config_name: "NormalOpenRedEnvelopeSuccessView",
            param:{money: 10.5}
        }
    
        UIManager.show_ui(ui_param_interface);
    }

    /**@description 显示新手引导 */
    static guide_view(start_game_button_node:cc.Node){
        // NewPlayerGuideView.show_guide(
        //     1,
        //     GuideType.normal,
        //     start_game_button_node,
        //     ()=>{console.log()},
        //     {},//{show_help_msg:true, help_message:"这是一个测试的新手引导",horizonal_align_mode:GuideMsgAlignHorizontalMode.left, horizonal_align:120, verticle_align_mode: GuideMsgAlignVerticleMode.bottom, verticle_align: 320},
        //     {},//{show_mask:true,mask_size:cc.size(300,300), mask_animation:true,guide_mask_type: GuideMaskType.circle},
        //     {},//{show_hand: true, hand_finger_dir: GuideFingerDirection.right, hand_position_offset: cc.v3(-260,0,0), hand_angle: 45},
        //     {},//{npc_direction:GuideNpcDirection.left,show_npc: true,horizonal_align_mode:GuideNpcAlignHorizontalMode.left,horizonal_align:120, verticle_align_mode:GuideNpcAlignVerticleMode.bottom, verticle_align: 300}
        // )
    }
}

export default Test;