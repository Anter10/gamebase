
const {ccclass, property} = cc._decorator;

@ccclass
class GamePlay extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    
    onLoad () {
        console.log(`进入游戏的game_play了`)
    }

    start () {

    }

    // update (dt) {}
}


export default GamePlay;