import TouchButton from "../../Common/TouchButton";
import EventManager from "../../EventManager/EventManager";
import { LordGameConfig } from "../../GameDataConfig/ConfigInterface";
import GameDataConfig from "../../GameDataConfig/GameDataConfig";
import LinkGameBase from "../LinkGameBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CallLordButton extends cc.Component {

    @property(cc.Label)
    time_label: cc.Label = null;

    // 不叫
    @property(cc.Node)
    nocall_button: cc.Node = null;
    // 分数2
    @property(cc.Node)
    score1_btn: cc.Node = null;
    // 分数1
    @property(cc.Node)
    score2_btn: cc.Node = null;

    public score1: number = 2;
    public score2: number = 4;

    public time_tick: number = 0;

    public start_tick: boolean = false;

    public pass_second_time = 0;

    onLoad () {
        const nocall_button: TouchButton = this.nocall_button.addComponent(TouchButton);
        nocall_button.register_touch(()=>{
             this.no_call_lord();
        });

        const score1_btn: TouchButton = this.score1_btn.addComponent(TouchButton);
        score1_btn.register_touch(() => {
             // 位置2叫地主
             const call_lord_interface = {
                pos: 0,
                score: this.score1,
            }

            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.call_lord, call_lord_interface);
            this.node.active = false;
        });

        const score2_btn: TouchButton = this.score2_btn.addComponent(TouchButton);
        score2_btn.register_touch(() => {
            const call_lord_interface = {
                pos: 0,
                score: this.score2,
            }
            EventManager.get_instance().emit(LinkGameBase.game_play_event_config.call_lord, call_lord_interface);
            this.node.active = false;
        });
    }

    show(){
        this.time_tick = parseInt( GameDataConfig.get_config_by_id<LordGameConfig>("LordGameConfig", 5).value);
        const base_score: Array<number> = JSON.parse( GameDataConfig.get_config_by_id<LordGameConfig>("LordGameConfig", 7).value);
        this.score1 = base_score[0];
        this.score2 = base_score[1];

        this.time_label.string = `${this.time_tick}`;
        this.start_tick = true;
        this.pass_second_time = 0;
    }

    // 不叫地主
    no_call_lord(){
        EventManager.get_instance().emit(LinkGameBase.game_play_event_config.no_call_lord);
        this.node.active = false;
    }

    // 倒计时结束的时候调用
    time_tick_out(){
        this.no_call_lord();
    }

    start () {

    }

    update (dt) {
        if(this.start_tick){
           this.pass_second_time = this.pass_second_time + dt;
           if(this.time_tick > 0){
               if(this.pass_second_time >= 1){
                  this.time_tick = this.time_tick - 1;
                  this.time_label.string = `${this.time_tick}`;
                  this.pass_second_time = 0;
               }
           }else{
               this.time_tick_out();
               this.start_tick = false;
           }
        }
    }
}
