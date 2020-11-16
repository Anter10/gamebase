import { HttpServer } from "../NetWork/HttpServer";

class IOSServer {
    public static audit_data: {audit: boolean} = {audit: true};

    /**@description 发送get 请求获得 */
    public static get_data(url: string, call_back?: Function, error_callback?: Function, data?: any) {
        const http = new HttpServer(url);
        http.get("", 5000, {}, call_back, error_callback);
    }
    
    public static get_audit_manifest() {
        const url = "https://yaotkj.oss-cn-beijing.aliyuncs.com/games_assets_update/channel/company/release/Restaurant/ios/audit_data.manifest";
        this.get_data(url, (data)=>{
            console.log("当前的审核配置信息 = ",data);
            if(data){
               this.audit_data.audit = data.audit
            }
        });
    }
}

export default IOSServer;