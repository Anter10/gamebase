import BaseUI from "../../Common/BaseUI";
import { NagivatorInterface } from "../../Common/CommonInterface";
import Loader from "../../Common/Loader";
import Nagivator from "../../Common/Nagivator";
import ClickOnController from "./ClickOnController";

const {ccclass, property} = cc._decorator;

@ccclass
class ClickOnView extends BaseUI {
    public controller: ClickOnController = null;

    onLoad () {
        super.onLoad();
        this.controller.init_view();
        const nagivator_interface: NagivatorInterface = {
            title: "",
            show_nagivator_bottom: false ,
            /**@description 返回按钮的回调*/
            back_callback: ()=>{
                this.on_close_call();
            },
            hide_return_back_button: true,
        };

        this.add_nagivator([],nagivator_interface,(nagivator_script: Nagivator)=> {
            Loader.load_texture("./UI/ClickOn/Normal/res/commen_button_back",(texture: cc.Texture2D)=>{
                nagivator_script.set_back_arrow_sprite_frame(new cc.SpriteFrame(texture));
                nagivator_script.nagivator_back_arrow.node.x = nagivator_script.nagivator_back_arrow.node.x + 40;
            })
        });
        
    }

    start () {
        super.start();
        
    }

    // update (dt) {}
}


export default ClickOnView;