import { gamebase } from "../Boot";
import EventConfig from "../EventManager/EventConfig";
import EventManager from "../EventManager/EventManager";
import { NativeEnum } from "./SdkEnum";

/**@description 原生端和前端的交互 */
const Native = {
    init(){
        Native.register_handler();
    },

    /**@description JS调客户端 */
    call_native(data: Object, callback: Function){
        if(gamebase.WebViewJavascriptBridge){
            console.log("==JS调客户端=",JSON.stringify(data));
            gamebase.WebViewJavascriptBridge.callHandler(NativeEnum.NEH5CallNative, data, callback);
        }else{
            console.warn(`Native 当前客服端不能调用原生的方法`)
        }
    },

    
    /**@description JS给客户端发送消息 */
    post_message_to_native(data: Object, callback: Function){
        if(gamebase.WebViewJavascriptBridge){
            console.log("==JS给客户端发送消息=",JSON.stringify(data));
            gamebase.WebViewJavascriptBridge.send(NativeEnum.NEH5CallNative, data, callback);
        }else{
            console.warn(`Native JS不能给原生发送消息的方法`)
        }
    },

    
    /**@description 客户端调JS */  
    register_handler: function (){
        if(gamebase.WebViewJavascriptBridge)
            gamebase.WebViewJavascriptBridge.registerHandler(NativeEnum.NENativeCallH5, (data: string, callback: Function)=>{
            let jsonData = JSON.parse(data); 
            console.log(`原生端发送的数据  = ${jsonData}`);
            if(jsonData && jsonData.func){
               EventManager.get_instance().emit(jsonData.func, jsonData);
            }
        });
    },

    
}



export default Native;