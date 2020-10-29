// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Loader from "../../Common/Loader";
import { CardTypeNumber } from "../GamePlayEnum";
import { LordCardInterface } from "../GamePlayInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LordCard extends cc.Component {

    @property(cc.Node)
    normal_node: cc.Node = null;
    @property(cc.Node)
    king_icon: cc.Node = null;
    @property(cc.Node)
    bottom: cc.Node = null;
    

    @property(cc.Sprite)
    big_icon: cc.Sprite = null;
    @property(cc.Sprite)
    small_icon: cc.Sprite = null;

    @property(cc.Label)
    id_label: cc.Label = null;

    

    flush_data(card: LordCardInterface){
        if(card.id < 15){
           this.normal_node.active = true;
           this.king_icon.active = false;
           this.id_label.string = `${card.id}`;

           Loader.load_texture(`./GamePlay/prefab/card/${card.card_type}`,(texture2d: cc.Texture2D) => {
               this.big_icon.spriteFrame = new cc.SpriteFrame(texture2d);
               this.small_icon.spriteFrame = new cc.SpriteFrame(texture2d);
           });

        }else{
           this.normal_node.active = false; 
           this.king_icon.active = true;

           Loader.load_texture(`./GamePlay/prefab/card/${card.card_type}`,(texture2d: cc.Texture2D) => {
               this.king_icon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture2d);
           });

        }
    }
  

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        cc.SpriteFrame
    }

    // update (dt) {}
}
