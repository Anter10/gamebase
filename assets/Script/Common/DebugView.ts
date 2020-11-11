import GameConfig from "../GameConfig";
import OSRuntime from "../OSRuntime";
import BaseUI from "./BaseUI";
import TouchButton from "./TouchButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DebugView extends BaseUI {

    @property(cc.Label)
    msg_label: cc.Label = null;

    @property(cc.Node)
    close_btn: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        super.onLoad();
        this.close_btn.addComponent(TouchButton).register_touch(()=>{
            this.on_close_call();   
        })
    }

    start() {
        const msg = `accesskey: ${(OSRuntime.wechat_login_success_interface && OSRuntime.wechat_login_success_interface.access_key) || GameConfig.android_init_success_param.accessKey}\n\nuser_id: ${(OSRuntime.wechat_login_success_interface && OSRuntime.wechat_login_success_interface.user_id) || GameConfig.android_init_success_param.user_id }
            \napp_version:${(OSRuntime.wechat_login_success_interface && OSRuntime.wechat_login_success_interface.appVersion) || GameConfig.android_init_success_param.appVersion}, \n\nenv: ${(OSRuntime.wechat_login_success_interface && OSRuntime.wechat_login_success_interface.env) || GameConfig.env}(0: 测试环境, 1: 正式环境)\n\n服务器请求地址: ${GameConfig.serverUrl}\n\nappid: ${GameConfig.android_init_param.appId}\n\npkg_id: ${GameConfig.android_init_param.pkgId}`;
        this.msg_label.string = msg;
    }

    // update (dt) {}
}
