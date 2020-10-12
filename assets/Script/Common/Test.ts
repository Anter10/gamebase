import { AudioConfig } from "../GameDataConfig/ConfigInterface";
import GameDataConfig from "../GameDataConfig/GameDataConfig";
import Audio from "./Audio";

class Test{
    // 使用 window.Test.audio()来测试相关的功能
    static audio(){
         const audio_config:AudioConfig = GameDataConfig.get_data("AudioConfig",1);
         const audio: Audio = new Audio();
         audio.play(audio_config);
    }
}

export default Test;