
import UIParamInterface from "../UI/UIManager/UIParamInterface";
import BaseUI from "./BaseUI";
import { ModalInterface } from "./CommonInterface";

const {ccclass, property} = cc._decorator;

@ccclass
class Modal extends BaseUI {
    public modal_interface: ModalInterface = null;


    start () {

    }

    show(ui_param_interface: UIParamInterface){
        super.show(ui_param_interface)
        this.set_modal_interface(<ModalInterface>ui_param_interface.param);
    }

    set_modal_interface(modal_interface : ModalInterface){
        this.modal_interface = modal_interface;
    }

    flush_modal(){

    }
}


export default  Modal;