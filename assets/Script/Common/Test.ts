import { AudioConfig } from "../GameDataConfig/ConfigInterface";
import GameDataConfig from "../GameDataConfig/GameDataConfig";
import UIConfig from "../UI/UIManager/UIConfig";
import UIManager from "../UI/UIManager/UIManager";
import UIParamInterface from "../UI/UIManager/UIParamInterface";
import Audio from "./Audio";
import { ModalInterface } from "./CommonInterface";

class Test{
    // 使用 window.Test.audio()来测试相关的功能
    static audio(){
         const audio_config:AudioConfig = GameDataConfig.get_data("AudioConfig",1);
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
}

export default Test;