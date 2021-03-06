import { gamebase } from "../Boot";
import { ShareInterface } from "./SdkInterface";
import { SdkModule } from "./SdkModule";

class Share {
    /**@description 分享游戏 */
    static share_game(share_interface: ShareInterface) {
        if (gamebase.jsb) {
            SdkModule.share(share_interface);
        } else {
            console.log(`当前平台不支持分享游戏`);
        }
    }
};


export default Share;