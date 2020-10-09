import ModalInterface from "../Common/ModalInterface";
import ToastInterface from "../Common/ToastInterface";

interface UIParamInterface {
          ui_config_path: string,
          ui_config_name:string,
          param?: ModalInterface | ToastInterface,
}

export default UIParamInterface;