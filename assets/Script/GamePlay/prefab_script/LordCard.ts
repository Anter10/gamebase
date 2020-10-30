// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Loader from "../../Common/Loader";
import TouchButton from "../../Common/TouchButton";
import { CardStatue, CardTypeNumber, LordCardStatue, LordCardType } from "../GamePlayEnum";
import { LordCardInterface } from "../GamePlayInterface";
import { LordUtils } from "../LordUtils";

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

    @property(cc.Sprite)
    id_sprite: cc.Sprite = null;

    private _lord_card_statue: LordCardStatue = LordCardStatue.in_hand;
    public _select: boolean = false;
    public _selected_pre_y: number = 0;
    public isChoose = false;
    public status: CardStatue = CardStatue.SITDOWN;
    public row: number = 1;
    public special: boolean = false;

    public set lord_card_statue(_lord_card_statue:LordCardStatue){
        this._lord_card_statue = _lord_card_statue;
    }

    public get lord_card_statue(): LordCardStatue{
        return this._lord_card_statue;
    }

    public card: LordCardInterface = null;

    flush_data(card: LordCardInterface){
        this.card = card;
        if(card.id < 16){
           this.normal_node.active = true;
           this.king_icon.active = false;
        
           Loader.load_texture(`./GamePlay/prefab/card/${card.card_type}`,(texture2d: cc.Texture2D) => {
               this.big_icon.spriteFrame = new cc.SpriteFrame(texture2d);
               this.small_icon.spriteFrame = new cc.SpriteFrame(texture2d);
           });

           Loader.load_texture(`./GamePlay/prefab/card/pkp_hong_${card.id}`,(texture2d: cc.Texture2D) => {
                this.id_sprite.spriteFrame = new cc.SpriteFrame(texture2d);
           });

        }else{
           this.normal_node.active = false; 
           this.king_icon.active = true;

           Loader.load_texture(`./GamePlay/prefab/card/${card.card_type}`,(texture2d: cc.Texture2D) => {
               this.king_icon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture2d);
           });

        }

        if(this.card.card_type == LordCardType.clubs || this.card.card_type == LordCardType.spade){
            this.id_sprite.node.color = cc.Color.BLACK.fromHEX("#000000");
            this.big_icon.node.color = cc.Color.BLACK.fromHEX("#000000");
            this.small_icon.node.color = cc.Color.BLACK.fromHEX("#000000");
        }else{
            this.id_sprite.node.color = cc.Color.BLACK.fromHEX("#ff0000");
            this.big_icon.node.color = cc.Color.BLACK.fromHEX("#ff0000");
            this.small_icon.node.color = cc.Color.BLACK.fromHEX("#ff0000");
        }
    }
  

    onLoad () {
           

        // const touch_button = this.node.addComponent(TouchButton);
        // touch_button.register_touch(() => {
        //     this.select_card();
        // });
    }



    select_card(){
        if(this.lord_card_statue == LordCardStatue.in_hand){
            this._select = !this._select;
            if(this._select){
                this._selected_pre_y = this.node.y;
                this.node.y = this._selected_pre_y + 20; 
            }else{
                this.node.y = this._selected_pre_y; 
            }
         }
    }

    start () {
        cc.SpriteFrame
    }

    // update (dt) {}
}
