import { CardRule } from "../CardRule";
import { LordSendCardType } from "../GamePlayEnum";
import { AICardType, CardValCountInterface, LordCardInterface, SendCardInterface } from "../GamePlayInterface";
import { card_list, LordUtils } from "../LordUtils";
import Player from "./Player";


type AICardTypeList = Array<AICardType>;
type SendCardTypeList = Array<SendCardInterface>;

export class Ai {
    public _ai_player: Player;

    /**@description 单张 */
    public _one: AICardTypeList = [];
    /**@description 对子 */
    public _pairs: AICardTypeList = [];
    /**@description 三张 */
    public _three: AICardTypeList = [];
    /**@description 炸弹 */
    public _boom: AICardTypeList = [];
    /**@description 飞机 */
    public _plane: AICardTypeList = [];
    /**@description 顺子*/
    public _progression: AICardTypeList = [];
    /**@description 连对 */
    public _progress_pair: AICardTypeList = [];
    /**@description 王炸 */
    public _king_bomb: AICardTypeList = [];

    /**@description 排的规则信息 */
    public card_rule: CardRule = new CardRule();

    public clear(){
        this._one = [];
        this._pairs = [];
        this._three = [];
        this._boom = [];
        this._plane = [];
        this._progression = [];
        this._progress_pair = [];
        this._king_bomb = [];
    }

    /**@description 分析牌型 */
    public analyse() {
        this.clear();
        let target = this._ai_player.player_interface.cards.slice(0);
        let stat = null;
        let target_wob = null;
        let target_wobt = null;
        let target_wobp = null;
        let target_wobpp = null;
        // 对数组进行排序
        target.sort(LordUtils.sort_cards);

        // 确定王炸
        if (this.card_rule.is_king_boom(target.slice(0, 2))) {
            const ai_card_type: AICardType = {
                id: target.slice(0, 2)[0].id,
                cards: target.splice(0, 2),
            }
            this._king_bomb.push(ai_card_type)
        }

        // 确定炸弹
        stat = this.card_rule.val_count(target);
        for (let i = 0; i < stat.length; i++) {
            if (stat[i].count === 4) {
                var list: card_list = [];
                this.move_item(target, list, stat[i].id);
                const ai_card_type: AICardType = {
                    id: list[0].id,
                    cards: list,
                }
                this._boom.push(ai_card_type);
            }
        }

        target_wob = target.slice(0);
        //判定三根，用于判定三顺
        target_wobt = target_wob.slice(0);
        this.judge_three(target_wobt);
        //判定三顺(飞机不带牌)
        this.judge_plane();

        for (let i = 0; i < this._three.length; i++) {
            target_wobt = target_wobt.concat(this._three[i].cards);
        }
        this._three = [];
        target_wobt.sort(LordUtils.sort_cards);
        // 确定连子
        target_wobp = target_wobt.slice(0);
        this.judge_progression(target_wobp);
        // 判定连对
        this.judge_progression_pair(target_wobp);
        // 判定三顺子
        this.judge_three(target_wobp);
        //除去顺子、炸弹、三根后判断对子、单牌
        stat = this.card_rule.val_count(target_wobp);
        for (let i = 0; i < stat.length; i++) {
            if (stat[i].count === 1) {//单牌
                for (var j = 0; j < target_wobp.length; j++) {
                    if (target_wobp[j].id === stat[i].id) {
                        const ai_card_type: AICardType = {
                            id: stat[i].id,
                            cards: target_wobp.splice(j, 1),
                        }
                        this._one.push(ai_card_type);
                    }
                }
            } else if (stat[i].count === 2) {//对子
                for (var j = 0; j < target_wobp.length; j++) {
                    if (target_wobp[j].id === stat[i].id) {
                        const ai_card_type: AICardType = {
                            id: stat[i].id,
                            cards: target_wobp.splice(j, 2),
                        }
                        this._pairs.push(ai_card_type);
                    }
                }
            }
        }

        // 排序
        this._one.sort((a, b) => b.id - a.id)
        this._pairs.sort((a, b) => b.id - a.id)
        this._king_bomb.sort((a, b) => b.id - a.id)
        this._boom.sort((a, b) => b.id - a.id)
        this._three.sort((a, b) => b.id - a.id)
        this._plane.sort((a, b) => b.id - a.id)
        this._progression.sort((a, b) => b.id - a.id)
        this._progress_pair.sort((a, b) => b.id - a.id)

    }

    log() {
        console.info('以下显示【' + this._ai_player.player_interface.id + '】手牌概况，手数：' + this.play_times());
        console.info('王炸');
        console.info(this._king_bomb);
        console.info('炸弹');
        console.info(this._boom);
        console.info('三根');
        console.info(this._three);
        console.info('飞机');
        console.info(this._plane);
        console.info('顺子');
        console.info(this._progression);
        console.info('连对');
        console.info(this._progress_pair);
        console.info('单牌');
        console.info(this._one);
        console.info('对子');
        console.info(this._pairs);
    };


    /**
 * 获取指定张数的最小牌值
 * @param  {list} cards - 牌
 * @param  {number} n - 张数
 * @param  {number} n - 需要大过的值
 * @return 值
 */
    get_min_val(n, v) {
        let c = this.card_rule.val_count(this._ai_player.player_interface.cards);
        for (var i = c.length - 1; i >= 0; i--) {
            if (c[i].count === n && c[i].id > v) {
                return this._ai_player.player_interface.cards.splice(i, 1);
            }
        }
    };

    set_card_kind(obj, kind: LordSendCardType) {
        obj.card_kind = kind;
        obj.size = obj.cards.length;
        return obj;
    };


    /**
 * 根据自己是否是庄家，来决定出牌，匹配最大或者最小
 * @method function
 * @param  {[array]} list 出牌列表
 * @return {[number]}      牌型
 * @param  {object} winc 当前牌面最大牌
 * @param  {boolean} isWinneris_lord 当前最大是否是地主
 * @return {number} winnerCardCount 当前最大那家剩余手牌数
 */
    match_cards(list, kind, winc, isWinneris_lord, winnerCardCount) {
        if (this._ai_player.is_lord) {//坐庄打法
            if (this._ai_player.next_player.player_interface.cards.length < 3 || this._ai_player.next_player.next_player.player_interface.cards.length < 3)
                return this.max_cards(list, kind, winc.val);
            else
                return this.min_cards(list, kind, winc.val);
        } else {//偏家打法
            if (isWinneris_lord) {//地主大时
                if (winnerCardCount < 3) {
                    return this.max_cards(list, kind, winc.val);
                } else {
                    return this.min_cards(list, kind, winc.val);
                }
            } else {
                var c = null;
                if (this._ai_player.next_player.is_lord && this._ai_player.next_player.player_interface.cards.length < 3) {
                    return this.max_cards(list, kind, winc.val);
                } else {
                    c = this.min_cards(list, kind, winc.val);
                    return c ? (c.id < 14 || this.play_times() <= 2 ? c : null) : null;
                }
            }
        }
    };

    /**
 * 获取list对应牌型最大
 * @param  {array} list [description]
 * @param  {number} kind    牌型
 * @param  {number} v    要大过的值
 * @return
 */
    max_cards(list, kind, v?) {
        var self = this,
            max = null;
        if (list.length > 0) {
            for (var i = 0; i < list.length; i++) {//从小值开始判断
                if ((max && list[i].id > max.val) || !max) {
                    max = list[i];
                }
            }
            return v ? (max.id > v ? this.set_card_kind(max, kind) : null) : this.set_card_kind(max, kind);
        }
        return null;
    };


    /**
 * 获取list中大过v的最小的元素
 * @param  {array} list [description]
 * @param  {number} kind    牌型
 * @param  {number} v    要大过的值
 * @return
 */
    min_cards(list, kind, v?: number):SendCardInterface {
        v = v ? v : 2;
        if (list.length > 0) {
            for (var i = list.length - 1; i >= 0; i--) {//从小值开始判断
                if (v < list[i].id) {
                    return this.set_card_kind(list[i], kind);
                }
            }
        }
        return null;
    }


    /**
* 获取大过当前最大牌的三顺最小值
* 指定牌张数
* @return
*/
    min_plane(len: number, winc: SendCardInterface) {
        if (this._plane.length > 0) {
            for (var i = this._plane.length - 1; i >= 0; i--) {//从小值开始判断
                if (winc.id < this._plane[i].id && len <= this._plane[i].cards.length) {
                    if (len === this._plane[i].cards.length) {
                        return this.set_card_kind(this._plane[i], LordSendCardType.plane);
                    } else {
                        var valDiff = this._plane[i].id - winc.id,
                            sizeDiff = (this._plane[i].cards.length - len) / 3;
                        for (var j = 0; j < sizeDiff; j++) {//拆顺
                            if (valDiff > 1) {
                                for (var k = 0; k < 3; k++) {
                                    this._plane[i].cards.shift();
                                }
                                valDiff--;
                                continue;
                            }
                            for (var k = 0; k < 3; k++) {
                                this._plane[i].cards.pop();
                            }
                        }
                        return this.set_card_kind(this._plane[i], LordSendCardType.plane);
                    }
                }
            }
        }
        return null;
    };

    /**
     * 从对子或者单牌中获取一张牌
     * @param  {array} list [description]
     * @param  {number} v    需要大过的值
     * * @param  {number} notEq    对子中不允许出现的值
     * @return
     */
    min_one(v, notEq) {
        let one = this.min_cards(this._one, LordSendCardType.one, v);
        let oneFromPairs = this.off_pairs(v, notEq);
        if (!one) {//没有单根，找对
            if (oneFromPairs) {
                this.delete_one(oneFromPairs);
                return oneFromPairs;
            } else {
                return null;
            }
        } else {
            if (one.id > 14) {//保留2和大小王
                if (oneFromPairs) {
                    this.delete_one(oneFromPairs);
                    return oneFromPairs;
                } else
                    return null;
            } else {
                return one.cards[0];
            }
        }
    };

    /**
    * 跟牌,AI根据上家牌出牌
    * @method function
    * @param  {object} winc 当前牌面最大牌
    * @param  {boolean} isWinneris_lord 当前最大是否是地主
    * @return {number} winnerCardCount 当前最大那家剩余手牌数
    */
    follow(winc: SendCardInterface, isWinneris_lord, winnerCardCount) {
        const cards = this._ai_player.player_interface.cards;
        var result = () => {
            switch (winc.card_kind) {//判断牌型
                case LordSendCardType.one://单牌
                    var one = this.match_cards(this._one, LordSendCardType.one, winc, isWinneris_lord, winnerCardCount);
                    if (!one) {
                        if (isWinneris_lord || this._ai_player.is_lord) {
                            for (var i = 0; i < cards.length; i++) {
                                if (cards[i].id <= 15 && cards[i].id > winc.id) {
                                    const send_card: SendCardInterface = {
                                        cards: cards.slice(i, i + 1),
                                        card_kind: LordSendCardType.one,
                                        size: 1,
                                        id: cards[i].id
                                    };
                                    return send_card;
                                }
                            }
                        }
                        if (this.play_times() <= 1 && this._pairs.length > 0 && this._pairs[0].id > 10) {//剩下一对大于10拆牌
                            var c = cards.slice(0, 1);
                            if (c[0].id > winc.id) {
                                const send_card: SendCardInterface = {
                                    cards: c,
                                    card_kind: LordSendCardType.one,
                                    size: 1,
                                    id: cards[i].id
                                };

                                return send_card;
                            } else {
                                return null;
                            }
                        }
                    }
                    return one;
                case LordSendCardType.double://对子
                    var pairs = this._pairs.length > 0 ? this.match_cards(this._pairs, LordSendCardType.double, winc, isWinneris_lord, winnerCardCount) : null;
                    if (pairs == null && (isWinneris_lord || this._ai_player.is_lord)) {//对手需要拆牌大之
                        //从连对中拿对
                        if (this._progress_pair.length > 0) {
                            for (var i = this._progress_pair.length - 1; i >= 0; i--) {
                                if (winc.id >= this._progress_pair[i].id) continue;
                                for (var j = this._progress_pair[i].cards.length - 1; j >= 0; j -= 2) {
                                    if (this._progress_pair[i].cards[j].id > winc.id) {
                                        var pairsFromPP = this._progress_pair[i].cards.splice(j - 1, 2);
                                        return {
                                            cards: pairsFromPP,
                                            cardKind: LordSendCardType.double,
                                            size: 2,
                                            val: pairsFromPP[0].id
                                        };
                                    }
                                }
                            }
                        } else if (this._three.length > 0) {
                            for (var i = this._three.length - 1; i >= 0; i--) {
                                if (this._three[i].id > winc.id) {
                                    const send_card: SendCardInterface = {
                                        cards: this._three[i].cards.slice(0, 2),
                                        card_kind: LordSendCardType.double,
                                        size: 2,
                                        id: this._three[i].id
                                    };

                                    return send_card;
                                }
                            }
                        }
                    }
                    return pairs;
                case LordSendCardType.three://三根
                    if (!isWinneris_lord && !this._ai_player.is_lord) {
                        return null;
                    }
                    return this.match_cards(this._three, LordSendCardType.three, winc, isWinneris_lord, winnerCardCount);

                case LordSendCardType.three_with_one://三带一
                    if (!isWinneris_lord && !this._ai_player.is_lord) {
                        return null;
                    }
                    var three = this.min_cards(this._three, LordSendCardType.three_with_one, winc.id);
                    if (three) {
                        let one = this.min_one(2, three.id);
                        if (!one) {
                            return null;
                        } else {
                            three.cards.push(one);
                        }
                        three.card_kind = LordSendCardType.three_with_one;
                        three.size = 4;
                    }
                    return three;

                case LordSendCardType.three_withe_two: //三带一对
                    if (!isWinneris_lord && !this._ai_player.is_lord) {
                        return null;
                    }
                    var three = this.min_cards(this._three, LordSendCardType.three, winc.id);
                    if (three) {
                        let pairs = this.min_cards(this._pairs, LordSendCardType.double);
                        while (true) {//避免对子三根重叠
                            if (pairs.cards[0].id === three.id) {
                                pairs = this.min_cards(this._pairs, LordSendCardType.double, pairs.cards[0].id);
                            } else {
                                break;
                            }
                        }
                        if (pairs) {
                            three.cards = three.cards.concat(pairs.cards);
                        } else {
                            return null;
                        }
                        three.card_kind = LordSendCardType.three_withe_two;
                        three.size = 5;
                    }
                    return three;

                case LordSendCardType.progression://顺子
                    if (!isWinneris_lord && !this._ai_player.is_lord) {
                        return null;
                    }
                    if (this._progression.length > 0) {
                        for (var i = this._progression.length - 1; i >= 0; i--) {//从小值开始判断
                            if (winc.id < this._progression[i].id && winc.size <= this._progression[i].cards.length) {
                                if (winc.size === this._progression[i].cards.length) {
                                    return this.set_card_kind(this._progression[i], LordSendCardType.progression);
                                } else {
                                    if (this._ai_player.is_lord || isWinneris_lord) {
                                        var valDiff = this._progression[i].id - winc.id,
                                            sizeDiff = this._progression[i].cards.length - winc.size;
                                        for (var j = 0; j < sizeDiff; j++) {//拆顺
                                            if (valDiff > 1) {
                                                this._progression[i].cards.shift();
                                                this._progression[i].id--;
                                                valDiff--;
                                                continue;
                                            }
                                            this._progression[i].cards.pop();
                                        }
                                        return this.set_card_kind(this._progression[i], LordSendCardType.progression);
                                    } else {
                                        return null;
                                    }
                                }
                            }
                        }
                    }
                    return null;

                case LordSendCardType.progression_pair://连对
                    if (!isWinneris_lord && !this._ai_player.is_lord) {
                        return null;
                    }
                    if (this._progress_pair.length > 0) {
                        for (var i = this._progress_pair.length - 1; i >= 0; i--) {//从小值开始判断
                            if (winc.id < this._progress_pair[i].id && winc.size <= this._progress_pair[i].cards.length) {
                                if (winc.size === this._progress_pair[i].cards.length) {
                                    return this.set_card_kind(this._progress_pair[i], LordSendCardType.progression_pair);
                                } else {
                                    if (this._ai_player.is_lord || isWinneris_lord) {
                                        var valDiff = this._progress_pair[i].id - winc.id,
                                            sizeDiff = (this._progress_pair[i].cards.length - winc.size) / 2;
                                        for (var j = 0; j < sizeDiff; j++) {//拆顺
                                            if (valDiff > 1) {
                                                this._progress_pair[i].cards.shift();
                                                this._progress_pair[i].cards.shift();
                                                valDiff--;
                                                continue;
                                            }
                                            this._progress_pair[i].cards.pop();
                                            this._progress_pair[i].cards.pop();
                                        }
                                        return this.set_card_kind(this._progress_pair[i], LordSendCardType.progression_pair);
                                    } else {
                                        return null;
                                    }
                                }
                            }
                        }
                    }
                    return null;

                case LordSendCardType.plane://三顺
                    if (!isWinneris_lord && !this._ai_player.is_lord) {
                        return null;
                    }
                    return this.min_cards(winc.size, winc);
                case LordSendCardType.plane_with_one: //飞机带单
                    if (!isWinneris_lord && !this._ai_player.is_lord) {
                        return null;
                    }
                    var cnt = winc.size / 4,
                        plane = this.min_plane(cnt * 3, winc);
                    if (plane) {
                        var currOneVal = 2;
                        for (var i = 0; i < cnt; i++) {
                            let one = this.min_one(currOneVal, plane.val);//拿一张单牌
                            if (one) {
                                plane.cards.push(one);
                                currOneVal = one.id;
                            } else {
                                return null;
                            }
                        }
                        plane.cardKind = LordSendCardType.plane_with_one;
                        plane.size = plane.cards.length;
                    }
                    return plane;
                case LordSendCardType.plane_with_two://飞机带对
                    if (!isWinneris_lord && !this._ai_player.is_lord) {
                        return null;
                    }
                    var cnt = winc.size / 5,
                        plane = this.min_plane(cnt * 3, winc);
                    if (plane) {
                        var currPairsVal = 2;
                        for (var i = 0; i < cnt; i++) {
                            let pairs = this.min_cards(this._pairs, LordSendCardType.double, currPairsVal);//拿一对
                            if (pairs) {
                                plane.cards = plane.cards.concat(pairs.cards);
                                currPairsVal = pairs.id;
                            } else {
                                return null;
                            }
                        }
                        plane.cardKind = LordSendCardType.plane_with_two;
                        plane.size = plane.cards.length;
                    }
                    return plane;

                case LordSendCardType.boom://炸弹
                    if (!isWinneris_lord && !this._ai_player.is_lord) {//同是农民不压炸弹
                        return null;
                    }
                    var bomb = this.min_cards(this._boom, LordSendCardType.boom, winc.id);
                    if (bomb) {
                        return bomb;
                    } else {
                        if (this._king_bomb.length > 0) {
                            if ((isWinneris_lord && winnerCardCount < 6)
                                || (this._ai_player.is_lord && this._ai_player.player_interface.cards.length < 6)) {
                                return this.set_card_kind(this._king_bomb[0], LordSendCardType.king_boom);
                            }
                        }
                        return null;
                    }
                case LordSendCardType.four_with_two:
                    return this.min_cards(this._boom, LordSendCardType.boom, winc.id);
                case LordSendCardType.four_withe_tow_pairs:
                    return this.min_cards(this._boom, LordSendCardType.boom, winc.id);
                case LordSendCardType.king_boom:
                    return null;
                default:
                    return null;
            }
        };

        result();

        //如果有炸弹，根据牌数量确定是否出
        if (result) {
            return result;
        } else if (winc.card_kind != LordSendCardType.boom && winc.card_kind != LordSendCardType.king_boom
            && (this._boom.length > 0 || this._king_bomb.length > 0)) {
            if ((isWinneris_lord && winnerCardCount < 5)
                || (this._ai_player.is_lord && (this._ai_player.player_interface.cards.length < 5 || (this._ai_player.next_player.player_interface.cards.length < 5 || this._ai_player.next_player.next_player.player_interface.cards.length < 6)))
                || this.play_times() <= 2) {//自己只有两手牌或只有炸弹必出炸弹
                if (this._boom.length > 0) {
                    return this.min_cards(this._boom, LordSendCardType.boom);
                } else {
                    return this.set_card_kind(this._king_bomb[0], LordSendCardType.king_boom);
                }
            }
        } else {
            return null;
        }
    };

    //出牌将单根放最后出牌
    play_one_at_the_end(landlordCardsCnt) {
        const cards = this._ai_player.player_interface.cards;
        var self = this;
        if (this._progression.length > 0) {//出顺子
            return this.min_cards(this._progression, LordSendCardType.progression);
        }
        else if (this._plane.length > 0) {//三顺
            var plane = this.min_cards(this._plane, LordSendCardType.plane);
            var len = plane.cards.length / 3;
            if (this._one.length > len && this._pairs.length > len) {
                if (this._one.length >= this._pairs.length) {//单根多带单
                    var currOneVal = 2;
                    for (var i = 0; i < len; i++) {
                        var one = this.min_one(currOneVal, plane.id);//拿一张单牌
                        plane.cards.push(one);
                        currOneVal = one.id;
                    }
                    return this.set_card_kind(plane, LordSendCardType.plane_with_one);
                } else {
                    var currPairsVal = 2;
                    for (var i = 0; i < len; i++) {
                        var pairs = this.min_cards(this._pairs, LordSendCardType.double, currPairsVal);//拿一对
                        plane.cards = plane.cards.concat(pairs.cards);
                        currPairsVal = pairs.id;
                    }
                    return this.set_card_kind(plane, LordSendCardType.plane_with_two);
                }
            } else if (this._pairs.length > len) {
                var currPairsVal = 2;
                for (var i = 0; i < len; i++) {
                    var pairs = this.min_cards(this._pairs, LordSendCardType.double, currPairsVal);//拿一对
                    plane.cards = plane.cards.concat(pairs.cards);
                    currPairsVal = pairs.id;
                }
                return this.set_card_kind(plane, LordSendCardType.plane_with_two);
            } else if (this._one.length > len) {
                var currOneVal = 2;
                for (var i = 0; i < len; i++) {
                    var one = this.min_one(currOneVal, plane.id);//拿一张单牌
                    plane.cards.push(one);
                    currOneVal = one.id;
                }
                return this.set_card_kind(plane, LordSendCardType.plane_with_one);
            } else {
                return this.set_card_kind(plane, LordSendCardType.plane);
            }
        }
        else if (this._progress_pair.length > 0) {//出连对
            return this.min_cards(this._progress_pair, LordSendCardType.progression_pair);
        }
        else if (this._three.length > 0) {//三根、三带一、三带对
            var three = this.min_cards(this._three, LordSendCardType.three);
            var len = three.cards.length / 3;
            if (this._one.length >= 0) {//单根多带单
                var one = this.min_one(currOneVal, three.id);//拿一张单牌
                three.cards.push(one);
                return this.set_card_kind(three, LordSendCardType.three_with_one);
            } else if (this._pairs.length > 0) {
                var pairs = this.min_cards(this._pairs, LordSendCardType.double, currPairsVal);//拿一对
                three.cards = three.cards.concat(pairs.cards);
                return this.set_card_kind(three, LordSendCardType.three_withe_two);
            } else {
                return this.set_card_kind(three, LordSendCardType.three);
            }
        }
        else if (this._pairs.length > 0) {//对子
            if ((this._ai_player.is_lord && (this._ai_player.next_player.player_interface.cards.length === 2 || this._ai_player.next_player.next_player.player_interface.cards.length === 2))
                || (!this._ai_player.is_lord && landlordCardsCnt === 2))
                return this.max_cards(this._pairs, LordSendCardType.double);
            else
                return this.min_cards(this._pairs, LordSendCardType.double);
        }
        else if (this._one.length > 0) {//出单牌
            if ((this._ai_player.is_lord && (this._ai_player.next_player.player_interface.cards.length <= 2 || this._ai_player.next_player.next_player.player_interface.cards.length <= 2))
                || (!this._ai_player.is_lord && landlordCardsCnt <= 2))
                return this.max_cards(this._one, LordSendCardType.one);
            else
                return this.min_cards(this._one, LordSendCardType.one);
        } else {//都计算无结果出最小的那张牌
            let one = null;
            if ((this._ai_player.is_lord && (this._ai_player.next_player.player_interface.cards.length <= 2 || this._ai_player.next_player.next_player.player_interface.cards.length <= 2))
                || (!this._ai_player.is_lord && landlordCardsCnt <= 2))
                one = cards.slice(-1);
            else
                one = cards.slice(0, 1);
            return {
                size: 1,
                cardKind: LordSendCardType.one,
                cards: one,
                val: one[0].val
            };
        }
    };

    /**
    * 出牌,默认出包含最小牌的牌
    * @method function
    * @param {Number} landlordCardsCnt 地主剩余牌的数量
    * @return {array} [description]
    */
    play(landlordCardsCnt) {
        const cards = this._ai_player.player_interface.cards;
        var cardsWithMin = (idx) => {
            var minCard = cards[idx];
            //在单根里找
            for (var i = 0; i < this._one.length; i++) {
                if (this._one[i].id === minCard.id) {
                    return this.min_cards(this._one, LordSendCardType.one);
                }
            }
            //对子里找
            for (let i = 0; i < this._pairs.length; i++) {
                if (this._pairs[i].id === minCard.id) {
                    return this.min_cards(this._pairs, LordSendCardType.double);
                }
            }
            //三根里找
            for (let i = 0; i < this._three.length; i++) {
                if (this._three[i].id === minCard.id) {
                    return this.min_cards(this._three, LordSendCardType.three);
                }
            }
            //炸弹里找
            for (let i = 0; i < this._boom.length; i++) {
                if (this._boom[i].id === minCard.id) {
                    return this.min_cards(this._boom, LordSendCardType.boom);
                }
            }
            //三顺里找
            for (let i = 0; i < this._plane.length; i++) {
                for (var j = 0; j < this._plane[i].cards.length; j++) {
                    if (this._plane[i].cards[j].id === minCard.id && this._plane[i].cards[j].card_type === minCard.card_type) {
                        return this.min_cards(this._plane, LordSendCardType.plane);
                    }
                }
            }
            //顺子里找
            for (let i = 0; i < this._progression.length; i++) {
                for (var j = 0; j < this._progression[i].cards.length; j++) {
                    if (this._progression[i].cards[j].id === minCard.id && this._progression[i].cards[j].card_type === minCard.card_type) {
                        return this.min_cards(this._progression, LordSendCardType.progression);
                    }
                }
            }
            //连对里找
            for (let i = 0; i < this._progress_pair.length; i++) {
                for (var j = 0; j < this._progress_pair[i].cards.length; j++) {
                    if (this._progress_pair[i].cards[j].id === minCard.id && this._progress_pair[i].cards[j].card_type === minCard.card_type) {
                        return this.min_cards(this._progress_pair, LordSendCardType.progression_pair);
                    }
                }
            }
            if (this._king_bomb.length > 0) {
                return this.min_cards(this._king_bomb, LordSendCardType.king_boom);
            }
        };

        for (var i = cards.length - 1; i >= 0; i--) {
            var r = cardsWithMin(i);
            if (r.card_kind === LordSendCardType.one) {
                if (this._plane.length > 0) {//三顺
                    var plane = this.min_cards(this._plane, LordSendCardType.plane);
                    var len = plane.cards.length / 3;
                    var currOneVal = 2;
                    for (var i = 0; i < len; i++) {
                        var one = this.min_one(currOneVal, plane.id);//拿一张单牌
                        plane.cards.push(one);
                        currOneVal = one.id;
                    }
                    return this.set_card_kind(plane, LordSendCardType.plane_with_one);
                }
                else if (this._three.length > 0) {//三带一
                    var three = this.min_cards(this._three, LordSendCardType.three);
                    var len = three.cards.length / 3;
                    var one = this.min_one(currOneVal, three.id);//拿一张单牌
                    three.cards.push(one);
                    if (three.id < 14)
                        return this.set_card_kind(three, LordSendCardType.three_with_one);
                }
                if (this._ai_player.is_lord) {//坐庄打法
                    if (this._ai_player.is_lord) {//坐庄打法
                        if (this._ai_player.next_player.player_interface.cards.length <= 2 || this._ai_player.next_player.next_player.player_interface.cards.length <= 2)
                            return this.play_one_at_the_end(landlordCardsCnt);
                        else
                            return this.min_cards(this._one, LordSendCardType.one);
                    }
                } else {//偏家打法
                    if (landlordCardsCnt <= 2)
                        return this.play_one_at_the_end(landlordCardsCnt);
                    else
                        return this.min_cards(this._one, LordSendCardType.one);
                }
            } else if (r.card_kind === LordSendCardType.three) {
                var three = this.min_cards(this._three, LordSendCardType.three);
                var len = three.cards.length / 3;
                if (this._one.length > 0) {//单根多带单
                    var one = this.min_one(currOneVal, three.id);//拿一张单牌
                    three.cards.push(one);
                    return this.set_card_kind(three, LordSendCardType.three_with_one);
                } else if (this._pairs.length > 0) {
                    var pairs = this.min_cards(this._pairs, LordSendCardType.double, currPairsVal);//拿一对
                    three.cards = three.cards.concat(pairs.cards);
                    return this.set_card_kind(three, LordSendCardType.three_withe_two);
                } else {
                    return this.set_card_kind(three, LordSendCardType.three);
                }
            } else if (r.card_kind === LordSendCardType.plane) {
                var plane = this.min_cards(this._plane, LordSendCardType.plane);
                var len = plane.cards.length / 3;
                if (this._one.length > len && this._pairs.length > len) {
                    if (this._one.length >= this._pairs.length) {//单根多带单
                        var currOneVal = 2;
                        for (var i = 0; i < len; i++) {
                            var one = this.min_one(currOneVal, plane.id);//拿一张单牌
                            plane.cards.push(one);
                            currOneVal = one.id;
                        }
                        return this.set_card_kind(plane, LordSendCardType.plane_with_two);
                    } else {
                        var currPairsVal = 2;
                        for (var i = 0; i < len; i++) {
                            var pairs = this.min_cards(this._pairs, LordSendCardType.plane_with_two, currPairsVal);//拿一对
                            plane.cards = plane.cards.concat(pairs.cards);
                            currPairsVal = pairs.id;
                        }
                        return this.set_card_kind(plane, LordSendCardType.plane_with_two);
                    }
                } else if (this._pairs.length > len) {
                    var currPairsVal = 2;
                    for (var i = 0; i < len; i++) {
                        var pairs = this.min_cards(this._pairs, LordSendCardType.plane_with_two, currPairsVal);//拿一对
                        plane.cards = plane.cards.concat(pairs.cards);
                        currPairsVal = pairs.id;
                    }
                    return this.set_card_kind(plane, LordSendCardType.plane_with_two);
                } else if (this._one.length > len) {
                    var currOneVal = 2;
                    for (var i = 0; i < len; i++) {
                        var one = this.min_one(currOneVal, plane.id);//拿一张单牌
                        plane.cards.push(one);
                        currOneVal = one.id;
                    }
                    return this.set_card_kind(plane, LordSendCardType.plane_with_one);
                } else {
                    return this.set_card_kind(plane, LordSendCardType.plane);
                }
            } else if (r.card_kind === LordSendCardType.boom && this.play_times() === 1) {
                return r;
            } else if (r.card_kind === LordSendCardType.boom && this.play_times() != 1) {
                continue;
            } else {
                return r;
            }
        }
    };

    /**
    * 玩家出牌提示
    * @method prompt
    * @param  {object} winc 当前牌面最大牌
    * @return {Array}      提示结果
    */
    prompt(winc: SendCardInterface) {
        const cards = this._ai_player.player_interface.cards;
        let stat = this.card_rule.val_count(cards);
        // this.log();
        if (winc) {//跟牌
            var promptList = [];
            /**
             * 设置符合条件的提示牌
             * @method function
             * @param  {int} c 几张的牌，比如单牌：1，对子：2
             * @param  {int} winVal 要求大过的值
             * @param  {array} st 牌统计
             */
            var setPrompt = (c, winVal, st) => {
                var result = [];
                //除去不能大过当前的牌
                for (let i = st.length - 1; i >= 0; i--) {
                    if (st[i].count < c || st[i].id <= winVal) {
                        st.splice(i, 1);
                    }
                }
                st.sort(this.prompt_sort);

                //加入各个符合值的单牌
                for (let i = 0; i < st.length; i++) {
                    const val = st[i].val
                    const t_cards = []

                    for (let j = cards.length - 1; j >= 0; j--) {
                        if (cards[j].id === val) {
                            if (t_cards.length < c) {
                                t_cards.push(cards[j])
                            } else {
                                break
                            }
                        }
                    }
                    t_cards.length && result.push(t_cards)
                }
                return result;
            };
            /**
             * 获取三顺提示牌
             * @method function
             * @param  {int} n 数量(有几个三根)
             */
            var getPlanePrompt = (n) => {
                var result = [];
                if (winc.id < 14 && cards.length >= winc.size) {//不是最大顺子才有的比
                    for (let i = winc.id + 1; i < 15; i++) {
                        var proList: LordCardInterface[] = [];
                        for (var j = 0; j < cards.length; j++) {
                            if (cards[j].id < i && proList.length === 0) break;
                            if (cards[j].id > i || (proList.length > 0 && cards[j].id === proList[proList.length - 1].id)) {
                                continue;
                            }
                            if (cards[j].id === i
                                && cards[j + 1]
                                && cards[j + 1].id === i
                                && cards[j + 2]
                                && cards[j + 2].id === i
                                && proList.length === 0) {
                                proList = proList.concat(cards.slice(j, j + 3));
                                j += 2;
                                continue;
                            }
                            if (proList.length > 0
                                && proList[proList.length - 1].id - 1 === cards[j].id
                                && cards[j + 1]
                                && proList[proList.length - 1].id - 1 === cards[j + 1].id
                                && cards[j + 2]
                                && proList[proList.length - 1].id - 1 === cards[j + 2].id) {//判定递减
                                proList = proList.concat(cards.slice(j, j + 3));
                                j += 2;
                                if (proList.length === n * 3) {
                                    result.push(proList);
                                    break;
                                }
                            } else { break; }
                        }
                    }
                }
                return result;
            };

            switch (winc.card_kind) {
                case LordSendCardType.one://单牌
                    promptList = setPrompt(1, winc.id, stat);
                    break;
                case LordSendCardType.double://对子
                    promptList = setPrompt(2, winc.id, stat);
                    break;
                case LordSendCardType.three://三根
                    promptList = setPrompt(3, winc.id, stat);
                    break;
                case LordSendCardType.three_with_one://三带一
                    var threePrompt = setPrompt(3, winc.id, stat.slice(0)),
                        onePrompt = setPrompt(1, 2, stat.slice(0));
                    for (var i = 0; i < threePrompt.length; i++) {
                        for (var j = 0; j < onePrompt.length; j++) {
                            if (onePrompt[j][0].id != threePrompt[i][0].val) {
                                promptList.push(threePrompt[i].concat(onePrompt[j]));
                            }
                        }
                    }
                    break;
                case LordSendCardType.three_withe_two://三带对
                    var threePrompt = setPrompt(3, winc.id, stat.slice(0)),
                        pairsPrompt = setPrompt(2, 2, stat.slice(0));
                    for (var i = 0; i < threePrompt.length; i++) {
                        for (var j = 0; j < pairsPrompt.length; j++) {
                            if (pairsPrompt[j][0].id != threePrompt[i][0].val) {
                                promptList.push(threePrompt[i].concat(pairsPrompt[j]));
                            }
                        }
                    }
                    break;
                case LordSendCardType.progression://顺子
                    if (winc.id < 14 && cards.length >= winc.size) {//不是最大顺子才有的比
                        for (let i = winc.id + 1; i < 15; i++) {
                            var proList = [];
                            for (var j = 0; j < cards.length; j++) {
                                if (cards[j].id < i && proList.length === 0) break;
                                if (cards[j].id > i || (proList.length > 0 && cards[j].id === proList[proList.length - 1].id)) {
                                    continue;
                                }
                                if (cards[j].id === i && proList.length === 0) {
                                    proList.push(cards.slice(j, j + 1)[0]);
                                    continue;
                                }
                                if (proList[proList.length - 1].id - 1 === cards[j].id) {//判定递减
                                    proList.push(cards.slice(j, j + 1)[0]);
                                    if (proList.length === winc.size) {
                                        promptList.push(proList);
                                        break;
                                    }
                                } else { break; }
                            }
                        }
                    }
                    break;
                case LordSendCardType.progression_pair://连对
                    if (winc.id < 14 && cards.length >= winc.size) {//不是最大顺子才有的比
                        for (let i = winc.id + 1; i < 15; i++) {
                            var proList = [];
                            for (var j = 0; j < cards.length; j++) {
                                if (cards[j].id < i && proList.length === 0) break;
                                if (cards[j].id > i || (proList.length > 0 && cards[j].id === proList[proList.length - 1].id)) {
                                    continue;
                                }
                                if (cards[j].id === i && cards[j + 1] && cards[j + 1].id === i && proList.length === 0) {
                                    proList = proList.concat(cards.slice(j, j + 2));
                                    j++;
                                    continue;
                                }
                                if (proList.length > 0
                                    && proList[proList.length - 1].id - 1 === cards[j].id
                                    && cards[j + 1]
                                    && proList[proList.length - 1].id - 1 === cards[j + 1].id) {//判定递减
                                    proList = proList.concat(cards.slice(j, j + 2));
                                    j++;
                                    if (proList.length === winc.size) {
                                        promptList.push(proList);
                                        break;
                                    }
                                } else { break; }
                            }
                        }
                    }
                    break;
                case LordSendCardType.plane://三顺
                    promptList = getPlanePrompt(winc.size / 3);
                    break;
                case LordSendCardType.plane_with_one:
                    promptList = getPlanePrompt(winc.size / 4);
                    break;
                case LordSendCardType.plane_with_two:
                    promptList = getPlanePrompt(winc.size / 5);
                    break;
                case LordSendCardType.four_with_two:
                    promptList = setPrompt(4, winc.id, stat);
                    break;
                case LordSendCardType.four_withe_tow_pairs:
                    promptList = setPrompt(4, winc.id, stat);
                    break;
                case LordSendCardType.boom:
                    promptList = setPrompt(4, winc.id, stat);
                    break;
                default:
                    break;
            }

            if (winc.card_kind != LordSendCardType.king_boom && winc.card_kind != LordSendCardType.boom) {
                //炸弹加入
                if (this._boom.length > 0) {
                    for (var i = this._boom.length - 1; i >= 0; i--) {
                        promptList.push(this._boom[i].cards);
                    }
                }
            }
            if (winc.card_kind != LordSendCardType.king_boom) {
                //王炸加入
                if (this._king_bomb.length > 0) {
                    promptList.push(this._king_bomb[0].cards);
                }
            }
            return promptList;
        } else {//出牌
            let promptList = [
                ...this._one, // 单牌
                ...this._pairs, // 对子
                ...this._progress_pair, // 连对
                ...this._progression, // 顺子
                ...this._plane, // 飞机
                ...this._three, // 三根
                ...this._boom, // 炸弹
                ...this._king_bomb // 王炸
            ].map(a => a.cards && a.cards).filter(a => a);

            return promptList;
        }
    };




    /**
     * 拆对
     * @param  {number} v 要大过的值
     * @param  {number} notEq 不能等于的值
     * @return {card}    拆出来得到的牌
     */
    off_pairs(v, notEq) {
        var self = this,
            pairs = this.min_cards(this._pairs, LordSendCardType.double, v);
        if (pairs) {
            while (true) {
                if (pairs.cards[0].id === notEq) {
                    pairs = this.min_cards(this._pairs, LordSendCardType.double, pairs.cards[0].id);
                } else {
                    break;
                }
            }
        }

        return pairs ? pairs.cards[0] : null;
    };

    //出牌排序
    //排序，单牌、对，三根，炸弹从小到大
    prompt_sort(a: CardValCountInterface, b: CardValCountInterface) {
        if (a.count === b.count) {
            return a.id > b.id ? 1 : -1;
        } if (a.count < b.count) {
            return -1;
        } else {
            return 1;
        }
    }


    /**
    * 手数，手牌需要打出几次才能打完
    * @method times
    */
    play_times() {
        var t = this._king_bomb.length +
            this._boom.length +
            this._progression.length +
            this._progress_pair.length +
            this._one.length +
            this._pairs.length;
        var threeCount = this._three.length;
        if (this._plane.length > 0) {
            for (var i = 0; i < this._plane.length; i++) {
                threeCount += this._plane[i].cards.length / 3;
            }
        }
        if (threeCount - (this._one.length + this._pairs.length) > 0) {
            t += threeCount - (this._one.length + this._pairs.length);
        }
        return t;
    };

    /**
    * 判断给定牌中的连对
    * @method judgeprogressionPairs
    * @param  {[array]}         cards 指定的牌
    */
    judge_progression_pair(cards: card_list) {
        var save_progression_pair = (proList) => {
            var progressionPairs = [];
            for (var i = proList.length - 1; i >= 0; i--) {//除去已经被取走的牌
                for (var j = 0; j < cards.length; j++) {
                    if (cards[j].id === proList[i]) {
                        progressionPairs = progressionPairs.concat(cards.splice(j, 2));
                        break;
                    }
                }
            }
            progressionPairs.sort(LordUtils.sort_cards);
            const ai_card_type: AICardType = {
                id: proList[0],
                cards: progressionPairs,
            }
            this._progress_pair.push(ai_card_type);
        };
        //判定连对
        if (cards.length >= 6) {
            var proList = [];
            var stat = this.card_rule.val_count(cards);//统计
            for (var i = 0; i < stat.length; i++) {
                if (stat[i].id >= 15) {//连对必须小于2
                    continue;
                }
                if (proList.length == 0 && stat[i].count >= 2) {
                    proList.push(stat[i].id);
                    continue;
                }
                if (proList[proList.length - 1] - 1 === stat[i].id && stat[i].count >= 2) {//判定递减
                    proList.push(stat[i].id);
                } else {
                    if (proList.length >= 3) {//已经有连对，先保存
                        //saveprogressionPairs(proList);
                        //proList = [];
                        break;
                    } else {
                        //重新计算
                        proList = [];
                        if (stat[i].count >= 2) proList.push(stat[i].id);
                    }
                }
            }
            if (proList.length >= 3) {//有顺子，保存
                save_progression_pair(proList);
                this.judge_progression_pair(cards);
            }
        }
    };


    /**
    * 判断给定牌中的顺子(五连)
    * @method judgeprogression
    * @param  {[array]}         cards 指定的牌
    */
    judge_progression(cards: card_list) {
        var saveprogression =  (proList) => {
            var progression = [];
            for (var j = 0; j < proList.length; j++) {
                progression.push(proList[j].obj);
            }

            const ai_card_type: AICardType = {
                id: proList[0].obj.id,
                cards: progression,
            }

            this._progression.push(ai_card_type);
            for (var k = proList.length - 1; k >= 0; k--) {//除去已经被取走的牌
                cards.splice(proList[k].fromIndex, 1);
            }
        };
        //判定顺子
        if (cards.length >= 5) {
            var proList = [];
            for (var i = 0; i < cards.length; i++) {
                if (cards[i].id >= 15) {
                    continue;
                }//顺子必须小于2
                if (proList.length == 0) {
                    proList.push({ 'obj': cards[i], 'fromIndex': i });
                    continue;
                }
                if (proList[proList.length - 1].obj.id - 1 === cards[i].id) {//判定递减
                    proList.push({ 'obj': cards[i], 'fromIndex': i });
                    if (proList.length === 5) break;
                } else if (proList[proList.length - 1].obj.id === cards[i].id) {//相等跳出本轮
                    continue;
                } else {
                    if (proList.length >= 5) {//已经有顺子，先保存
                        //saveprogression(proList);
                        //proList = [];
                        break;
                    } else {
                        //重新计算
                        proList = [];
                        proList.push({ 'obj': cards[i], 'fromIndex': i });
                    }
                }
            }
            if (proList.length === 5) {//有顺子，保存
                saveprogression(proList);
                this.judge_progression(cards);//再次判断顺子
            } else {
                this.join_progression(cards);
            }
        }
    };

     /**
     * 将顺子与剩下的牌进行拼接，组成更大的顺子
     * @param {*} cards 
     */
    join_progression(cards: card_list) {
        var self = this;
        for (var i = 0; i < this._progression.length; i++) {//拼接其他散牌
            for (var j = 0; j < cards.length; j++) {
                if (this._progression[i].id != 14 && this._progression[i].id === cards[j].id - 1) {
                    this._progression[i].cards.unshift(cards.splice(j, 1)[0]);
                } else if (cards[j].id === this._progression[i].id - this._progression[i].cards.length) {
                    this._progression[i].cards.push(cards.splice(j, 1)[0]);
                }
            }
        }
        var temp = this._progression.slice(0);
        for (i = 0; i < temp.length; i++) {//连接顺子
            if (i < temp.length - 1 && temp[i].id - temp[i].cards.length === temp[i + 1].id) {
                this._progression[i].cards = this._progression[i].cards.concat(this._progression[i + 1].cards);
                this._progression.splice(++i, 1);
            }
        }
    }

    /**
    * 判断给定牌中的三根
    * @method judgeThree
    */
    judge_three(cards: card_list) {
        let stat = this.card_rule.val_count(cards);
        console.log(this._ai_player.player_interface.position, "三对的数据 = ", stat);
        for (let i = 0; i < stat.length; i++) {
            if (stat[i].count === 3) {
                var list = [];
                this.move_item(cards, list, stat[i].id);
                const ai_card_type: AICardType = {
                    id: list[0].id,
                    cards: list,
                }
                this._three.push(ai_card_type);
            }
        }
    };

    /**
    * 判断给定牌中的飞机
    * @method judgePlane
    */
    judge_plane() {
        if (this._three.length > 1) {
            var proList = [];
            for (let i = 0; i < this._three.length; i++) {//遍历统计结果
                if (this._three[i].id >= 15) {
                    continue;//三顺必须小于2
                }
                if (proList.length == 0) {
                    proList.push({ 'obj': this._three[i], 'fromIndex': i });
                    continue;
                }
                if (proList[proList.length - 1].obj.id - 1 == this._three[i].id) {//判定递减
                    proList.push({ 'obj': this._three[i], 'fromIndex': i });
                } else {
                    if (proList.length > 1) {//已经有三顺，先保存
                        var planeCards = [];
                        for (var j = 0; j < proList.length; j++) {
                            planeCards = planeCards.concat(proList[j].obj.cards);
                        }
                        const ai_card_type: AICardType = {
                            id: proList[0].obj.id,
                            cards: planeCards,
                        }

                        this._plane.push(ai_card_type);
                        for (var k = proList.length - 1; k >= 0; k--) {//除去已经被取走的牌
                            this._three.splice(proList[k].fromIndex, 1);
                        }
                    }
                    //重新计算
                    proList = [];
                    proList.push({ 'obj': this._three[i], 'fromIndex': i });
                }
            }

            //有三顺，保存
            if (proList.length > 1) {
                var planeCards = [];
                for (var j = 0; j < proList.length; j++) {
                    planeCards = planeCards.concat(proList[j].obj.cards);
                }
                const ai_card_type: AICardType = {
                    id: proList[0].obj.id,
                    cards: planeCards,
                }

                this._plane.push(ai_card_type);
                for (var k = proList.length - 1; k >= 0; k--) {//除去已经被取走的牌
                    this._three.splice(proList[k].fromIndex, 1);
                }
            }
        }
    };

    /**
    * 将src中对应值的牌数据移到dest中
    */
    public move_item(src, dest, v) {
        for (var i = src.length - 1; i >= 0; i--) {
            if (src[i].id === v) {
                dest.push(src.splice(i, 1)[0]);
            }
        }
    };


    /*
    删掉一张牌并重新分析
 */
    delete_one(card: LordCardInterface) {
        const cards = this._ai_player.player_interface.cards;
        for (var i = 0; i < this._ai_player.player_interface.cards.length; i++) {
            if (cards[i].id === card.id && cards[i].card_type === card.card_type) {
                cards.splice(i, 1);
            }
        }
        this.analyse();
    };

    /**
   * 手牌评分,用于AI根据自己手牌来叫分
   * @method function
   * @return {[nmber]} 所评得分
   */
    judge_score() {
        const cards = this._ai_player.player_interface.cards;
        var score = 0;
        score += this._boom.length * 6;//有炸弹加六分
        if (this._king_bomb.length > 0) {//王炸8分
            score += 8;
        } else {
            if (cards[0].id === 17) {
                score += 4;
            } else if (cards[0].id === 16) {
                score += 3;
            }
        }
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].id === 15) {
                score += 2;
            }
        }
        console.info(this._ai_player.player_interface.id + "手牌评分：" + score);
        if (score >= 7) {
            return 3;
        } else if (score >= 5) {
            return 2;
        } else if (score >= 3) {
            return 1;
        } else {//4相当于不叫
            return 4;
        }
    };


}
