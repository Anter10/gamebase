 
const {ccclass, property} = cc._decorator;

@ccclass
class CashItem extends cc.Component {
    onLoad () {
         
    }

    touch_cashout_callback(){
        console.log("点击提现回调")
    }

    start () {

    }
}

export default CashItem;