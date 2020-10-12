import Controller from "../../Common/Controller";
import { TurnTableInterface } from "./TurnTableInterface";
import TurnTableView from "./TurnTableView";

class TurnTableController implements Controller{
      public name: string = "TurnTableController";
      public view: TurnTableView = null;
      public turn_table_model: TurnTableInterface = null;

      turn_table(){
         
      }
}



export default TurnTableController;