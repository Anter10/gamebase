import { ModalInterface, ToastInterface } from "../../Common/CommonInterface";
import Controller from "../../Common/Controller";

interface UIParamInterface {
    ui_config_path: string,
    ui_config_name:string,
    param?: ModalInterface | ToastInterface,
    controller?:Controller,
}

export default UIParamInterface;