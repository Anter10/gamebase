import { HttpServer } from "../NetWork/HttpServer";

class IOSServer {
    public static audit_data: { audit: { [key: string]: boolean } } = {audit: {}};
    public static ios_version: string = "1.0.0";

    /**@description 发送get 请求获得 */
    public static get_data(url: string, call_back?: Function, error_callback?: Function, data?: any) {
        const http = new HttpServer(url);
        http.get("", 5000, {}, call_back, error_callback);
    }

    public static get_audit_manifest() {
        const url = "https://yaotkj.oss-cn-beijing.aliyuncs.com/games_assets_update/channel/company/release/Restaurant/ios/audit_config.manifest";
        this.get_data(url, (data) => {
            console.log("当前的审核配置信息 = ", data);
            if (data) {
                this.audit_data.audit = data.audit
            }
            console.log("当前的审核模式 = ",this.auditing)
        });
    }

    public static get auditing(): boolean {
        if (this.audit_data && this.audit_data.audit) {
            return this.audit_data.audit[this.ios_version];
        } else {
            return true;
        }
    }
}

export default IOSServer;