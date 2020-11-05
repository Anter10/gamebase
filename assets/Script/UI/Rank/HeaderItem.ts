import BaseNode from "../../Common/BaseNode";
import { HeaderItemInterface } from "./RankInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HeaderItem extends BaseNode {

   @property(cc.Label)
   item_title: cc.Label = null;


   onLoad () {
       super.onLoad();
   }

   flush(header_item_interface: HeaderItemInterface){
       this.set_title(header_item_interface.title);
       this.set_width(header_item_interface.item_width);
   }

   set_title(title: string): void{
       this.item_title.string = title;
   }

   set_width(width: number): void{
       if(width){
          this.node.width = width;
       }
   }

   set_title_position_x(x: number){
       this.item_title.node.x = x;
   }

   start () {
       super.start();
   }

    // update (dt) {}
}
