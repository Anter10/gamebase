import { ModalInterface, ToastInterface } from "../Common/CommonInterface";

interface UIParamInterface {
          ui_config_path: string,
          ui_config_name:string,
          param?: ModalInterface | ToastInterface,
}

export default UIParamInterface;