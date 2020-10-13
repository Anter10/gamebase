import { ControllerInterface } from "./CommonInterface";

/**@description 控制器的基本类 */
class Controller implements ControllerInterface{
      public name: string = "Controller";
      public view?: any = null;
};




export default Controller;