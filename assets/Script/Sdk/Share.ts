import { gamebase } from "../Boot";
import Native from "./Native";

class Share{
      /**@description 分享游戏 */
      static share_game(){
        if(gamebase.WebViewJavascriptBridge){
            let data = {func: "playShareGame", params: {}};
            const callback = (message: any)=>{
                console.log(`分享了游戏`);
            }

            Native.call_native(data, callback);
        }else{
            console.log(`当前平台不支持分享游戏`);
        }
      }
};


export default Share;