
import BaseUI from "./BaseUI";
import { ApiVersionInterface } from "./CommonInterface";
import TouchButton from "./TouchButton";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ApiVersionView extends BaseUI {
    @property(cc.Label)
    desc_label: cc.Label = null;
    
    @property(cc.Node)
    close_button: cc.Node = null;

    @property(cc.Node)
    ok_button: cc.Node = null;

    public api_version_interface: ApiVersionInterface = null;
    

    onLoad () {
        super.onLoad();
        this.api_version_interface = this.ui_param_interface.param;
        this.desc_label.string = this.api_version_interface.desc || "没有版本更新描述";
        if(this.api_version_interface.force){
            this.close_button.active = false;
        }else{
            this.close_button.active = true;
            this.close_button.addComponent(TouchButton).register_touch(()=> {
                this.on_close_call();
            })
        }

        this.ok_button.addComponent(TouchButton).register_touch(()=>{
            this.download_apk();
        })
    }

    download_apk(){
        cc.sys.openURL(this.api_version_interface.url);
    }

    start () {

    }

    // update (dt) {}
}
