import TouchButton from "../../Common/TouchButton";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BottomNode extends cc.Component {

    @property(cc.Node)
    main_button_jipaiqi: cc.Node = null;

    @property(cc.Node)
    main_button_cash_out_button: cc.Node = null;

    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.main_button_jipaiqi.addComponent(TouchButton).register_touch(() =>{
            
        });

        this.main_button_cash_out_button.addComponent(TouchButton).register_touch(() =>{
            
        })
    }

  

    // update (dt) {}
}
