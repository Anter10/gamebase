import { gamebase } from "../Boot";

const Native = {
    init(){
        Native.registerHandler();
    },

    //JS调客户端
    callHandler(data: Object, callback: Function){
        if(gamebase.WebViewJavascriptBridge){
            console.log("==JS调客户端=",JSON.stringify(data));
            gamebase.WebViewJavascriptBridge.callHandler("NEH5CallNative", data, callback);
        }else{
            console.warn(`Native 当前客服端不能调用原生的方法`)
        }
       
    },

    
    //  JS给客户端发送消息
    bridgeSend(data: Object, callback: Function){
        if(gamebase.WebViewJavascriptBridge){
            console.log("==JS给客户端发送消息=",JSON.stringify(data));
            gamebase.WebViewJavascriptBridge.send("NEH5CallNative", data, callback);
        }else{
            console.warn(`Native JS不能给原生发送消息的方法`)
        }
    },

    
    //客户端调JS  
    registerHandler: function (){
        if(gamebase.WebViewJavascriptBridge)
            gamebase.WebViewJavascriptBridge.registerHandler('NENativeCallH5', (data: string, callback: Function)=>{
            console.log("==客户端调JS==",JSON.stringify(data));
            let jsonData = JSON.parse(data); 

            if(jsonData.func =="webReload")
            {//客户端告诉前端刷新数据 ：目前用于退出直客界面，刷新每日福利数据
                console.log("===客户端告诉前端刷新数据=====")
                // cc.common.data.notificationCenter.emit(UPDATE_DATA_DAILY_WELFARE);
            }

            if(jsonData.func =="webBackPage")
            {     
                //callback&&callback(cc.common.tool.addPrefabCount);
                // this.notificationCenter.emit(CURRENT_LAYER_EXIT);
            }
            if(jsonData.func =="webAlertMoney")
            {
                this.tvRedData = jsonData.params||null;
                // cc.common.data.notificationCenter.emit(UPDATE_HOME_SHOW, false);
            }
        });
    },


}



export default Native;