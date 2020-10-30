// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { gamebase } from "../../Boot";
import EventManager from "../../EventManager/EventManager";
import GamePlay from "../GamePlay";
import { LordCardInterface } from "../GamePlayInterface";
import LinkGameBase from "../LinkGameBase";
import { LordUtils } from "../LordUtils";
import LordCard from "./LordCard";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LordBottomCardNode extends cc.Component {
    @property(cc.Sprite)
    card_1: cc.Sprite = null;

    @property(cc.Sprite)
    card_2: cc.Sprite = null;

    @property(cc.Sprite)
    card_3: cc.Sprite = null;

    public convert_cards: Array<cc.Node> = [];
    public cards: Array<LordCardInterface> = [];
    
    onLoad () {
        EventManager.get_instance().listen(LinkGameBase.game_play_event_config.convert_card, this, this.convert.bind(this));

    }

    convert(){
        const game_play = <GamePlay>gamebase.game_play;

        for(const card of this.convert_cards){
            game_play.remove_card(card);
        }

        this.convert_cards = [];

        cc.tween(this).
        call(()=>{
            this.card_1.node.active = false;
            const card1 = game_play.create_card();
            card1.getComponent(LordCard).flush_data(this.cards[0]);
            this.convert_cards.push(card1);
            card1.scale = 0.9;
            card1.position = this.card_1.node.position;
            card1.parent = this.card_1.node.parent;
        })
        .delay(0.2)
        .call(() => {
            this.card_2.node.active = false;
            const card2 = game_play.create_card();
            card2.getComponent(LordCard).flush_data(this.cards[1]);
            this.convert_cards.push(card2);
            card2.scale = 0.9;
            card2.position = this.card_2.node.position;
            card2.parent = this.card_2.node.parent;
        })
        .delay(0.2)
        .call(() => {
            this.card_3.node.active = false;
            const card3 = game_play.create_card();
            card3.getComponent(LordCard).flush_data(this.cards[2]);
            this.convert_cards.push(card3);
            card3.scale = 0.9;
            card3.position = this.card_3.node.position;
            card3.parent = this.card_3.node.parent;
        })
        .delay(0.1)
        .call(()=>{
            // 开始飞牌
            let fly_index = 0;

            const start_fly_card = ()=> {
                let target_node_pos = game_play.main_difenbangzi.parent.convertToNodeSpaceAR(cc.v3(0,0,0));
                const world_pos = game_play.node.convertToWorldSpaceAR(target_node_pos);
                const fly_card = this.convert_cards[fly_index];
                let offset_pos = cc.v3(0,0,0);
                if(fly_index == 0){
                   offset_pos = cc.v3(-40,10,0);
                }else if(fly_index == 1){
                    offset_pos = cc.v3(-90,10,0);
                }else if(fly_index == 2){
                    offset_pos = cc.v3(-140,10,0);
                }
                cc.tween(fly_card).to(0.6,{
                    position: fly_card.position.sub(world_pos).sub(cc.v3(fly_card.width / 2, fly_card.height / 2, 0)).add(offset_pos),
                    scale:0.45
                }).start();
                fly_index ++;
                if(fly_index < this.convert_cards.length){
                    start_fly_card();
                }
            }

            start_fly_card();
        })
        .start();
    }

    show(cards: Array<LordCardInterface>){
        this.card_1.node.active = true;
        this.card_2.node.active = true;
        this.card_3.node.active = true;

        // 对底牌排序
        this.cards = cards.sort(LordUtils.sort_cards);
        
    }

    start () {

    }

    // update (dt) {}
}
