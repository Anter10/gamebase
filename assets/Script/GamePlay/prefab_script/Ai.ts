import { CardRule } from "../CardRule";
import { LordSendCardType } from "../GamePlayEnum";
import { AICardType, CardValCountInterface, LordCardInterface, SendCardInterface } from "../GamePlayInterface";
import { card_list, LordUtils } from "../LordUtils";
import Player from "./Player";


type AICardTypeList = Array<AICardType>;

export class Ai {
    public _ai_player: Player;

    /**@description 单张 */
    private _one: AICardTypeList = [];
    /**@description 对子 */
    private _pairs: AICardTypeList = [];
    /**@description 三张 */
    private _three: AICardTypeList = [];
    /**@description 炸弹 */
    private _boom: AICardTypeList = [];
    /**@description 飞机 */
    private _plane = [];
    /**@description 顺子*/
    private _progression: AICardTypeList = [];
    /**@description 连对 */
    private _progress_pair: AICardTypeList = [];
    /**@description 王炸 */
    private _king_bomb: AICardTypeList = [];
    /**@description 排的规则信息 */
    public card_rule: CardRule = new CardRule();

    /**@description 分析牌型 */
    public analyse() {
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
                type_value: target.slice(0, 2)[0].id,
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
                    type_value: list[0].id,
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
        this.judge_progression_pairs(target_wobp);
        // 判定三顺子
        this.judge_three(target_wobp);
        //除去顺子、炸弹、三根后判断对子、单牌
        stat = this.card_rule.val_count(target_wobp);
        for (let i = 0; i < stat.length; i++) {
            if (stat[i].count === 1) {//单牌
                for (var j = 0; j < target_wobp.length; j++) {
                    if (target_wobp[j].id === stat[i].id) {
                        const ai_card_type: AICardType = {
                            type_value: stat[i].id,
                            cards: target_wobp.splice(j, 1),
                        }
                        this._one.push(ai_card_type);
                    }
                }
            } else if (stat[i].count === 2) {//对子
                for (var j = 0; j < target_wobp.length; j++) {
                    if (target_wobp[j].id === stat[i].id) {
                        const ai_card_type: AICardType = {
                            type_value: stat[i].id,
                            cards: target_wobp.splice(j, 2),
                        }
                        this._pairs.push(ai_card_type);
                    }
                }
            }
        }

        // 排序
        this._one.sort((a, b) => b.type_value - a.type_value)
        this._pairs.sort((a, b) => b.type_value - a.type_value)
        this._king_bomb.sort((a, b) => b.type_value - a.type_value)
        this._boom.sort((a, b) => b.type_value - a.type_value)
        this._three.sort((a, b) => b.type_value - a.type_value)
        this._plane.sort((a, b) => b.type_value - a.type_value)
        this._progression.sort((a, b) => b.type_value - a.type_value)
        this._progress_pair.sort((a, b) => b.type_value - a.type_value)

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

    set_card_kind(obj: SendCardInterface, kind: LordSendCardType) {
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
 * @param  {boolean} isWinnerIsLandlord 当前最大是否是地主
 * @return {number} winnerCardCount 当前最大那家剩余手牌数
 */
    match_cards(list, kind, winc, isWinnerIsLandlord, winnerCardCount) {
        var self = this;
        if (self.player.isLandlord) {//坐庄打法
            if (self.player.nextPlayer.cardList.length < 3 || self.player.nextPlayer.nextPlayer.cardList.length < 3)
                return self.max_cards(list, kind, winc.val);
            else
                return self.min_cards(list, kind, winc.val);
        } else {//偏家打法
            if (isWinnerIsLandlord) {//地主大时
                if (winnerCardCount < 3) {
                    return self.max_cards(list, kind, winc.val);
                } else {
                    return self.min_cards(list, kind, winc.val);
                }
            } else {
                var c = null;
                if (self.player.nextPlayer.isLandlord && self.player.nextPlayer.cardList.length < 3) {
                    return self.max_cards(list, kind, winc.val);
                } else {
                    c = self.min_cards(list, kind, winc.val);
                    return c ? (c.val < 14 || self.play_times() <= 2 ? c : null) : null;
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
    max_cards(list, kind, v) {
        var self = this,
            max = null;
        if (list.length > 0) {
            for (var i = 0; i < list.length; i++) {//从小值开始判断
                if ((max && list[i].val > max.val) || !max) {
                    max = list[i];
                }
            }
            return v ? (max.val > v ? self.set_card_kind(max, kind) : null) : self.set_card_kind(max, kind);
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
    min_cards(list, kind, v) {
        v = v ? v : 2;
        if (list.length > 0) {
            for (var i = list.length - 1; i >= 0; i--) {//从小值开始判断
                if (v < list[i].val) {
                    return this.set_card_kind(list[i], kind);
                }
            }
        }
        return null;
    };


    /**
* 获取大过当前最大牌的三顺最小值
* 指定牌张数
* @return
*/
    min_plane(len, winc) {
        if (this._plane.length > 0) {
            for (var i = this._plane.length - 1; i >= 0; i--) {//从小值开始判断
                if (winc.val < this._plane[i].val && len <= this._plane[i].cardList.length) {
                    if (len === this._plane[i].cardList.length) {
                        return this.set_card_kind(this._plane[i], LordSendCardType.plane);
                    } else {
                        var valDiff = this._plane[i].val - winc.val,
                            sizeDiff = (this._plane[i].cardList.length - len) / 3;
                        for (var j = 0; j < sizeDiff; j++) {//拆顺
                            if (valDiff > 1) {
                                for (var k = 0; k < 3; k++) {
                                    this._plane[i].cardList.shift();
                                }
                                valDiff--;
                                continue;
                            }
                            for (var k = 0; k < 3; k++) {
                                this._plane[i].cardList.pop();
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
 * 跟牌,AI根据上家牌出牌
 * @method function
 * @param  {object} winc 当前牌面最大牌
 * @param  {boolean} isWinnerIsLandlord 当前最大是否是地主
 * @return {number} winnerCardCount 当前最大那家剩余手牌数
 */
follow (winc, isWinnerIsLandlord, winnerCardCount) {
    var self = this;
    self.log();
    var result = (function () {
      switch (winc.cardKind) {//判断牌型
        case G.gameRule.ONE://单牌
          var one = self.matchCards(self._one, G.gameRule.ONE, winc, isWinnerIsLandlord, winnerCardCount);
          if (!one) {
            if (isWinnerIsLandlord || self.player.isLandlord) {
              for (var i = 0; i < self.cards.length; i++) {
                if (self.cards[i].val <= 15 && self.cards[i].val > winc.val) {
                  return {
                    cardList: self.cards.slice(i, i + 1),
                    cardKind: G.gameRule.ONE,
                    size: 1,
                    val: self.cards[i].val
                  };
                }
              }
            }
            if (self.times <= 1 && self._pairs.length > 0 && self._pairs[0].val > 10) {//剩下一对大于10拆牌
              var c = self.cards.slice(0, 1);
              if (c[0].val > winc.val) {
                return {
                  cardList: c,
                  cardKind: G.gameRule.ONE,
                  size: 1,
                  val: c[0].val
                };
              } else {
                return null;
              }
            }
          }
          return one;
        case G.gameRule.PAIRS://对子
          var pairs = self._pairs.length > 0 ? self.matchCards(self._pairs, G.gameRule.PAIRS, winc, isWinnerIsLandlord, winnerCardCount) : null;
          if (pairs == null && (isWinnerIsLandlord || self.player.isLandlord)) {//对手需要拆牌大之
            //从连对中拿对
            if (self._progressionPairs.length > 0) {
              for (var i = self._progressionPairs.length - 1; i >= 0; i--) {
                if (winc.val >= self._progressionPairs[i].val) continue;
                for (var j = self._progressionPairs[i].cardList.length - 1; j >= 0; j -= 2) {
                  if (self._progressionPairs[i].cardList[j].val > winc.val) {
                    var pairsFromPP = self._progressionPairs[i].cardList.splice(j - 1, 2);
                    return {
                      cardList: pairsFromPP,
                      cardKind: G.gameRule.PAIRS,
                      size: 2,
                      val: pairsFromPP[0].val
                    };
                  }
                }
              }
            } else if (self._three.length > 0) {
              for (var i = self._three.length - 1; i >= 0; i--) {
                if (self._three[i].val > winc.val) {
                  return {
                    cardList: self._three[i].cardList.slice(0, 2),
                    cardKind: G.gameRule.PAIRS,
                    size: 2,
                    val: self._three[i].val
                  };
                }
              }
            }
          }
          return pairs;
        case G.gameRule.THREE://三根
          if (!isWinnerIsLandlord && !self.player.isLandlord) {
            return null;
          }
          return self.matchCards(self._three, G.gameRule.THREE, winc, isWinnerIsLandlord, winnerCardCount);
  
        case G.gameRule.THREE_WITH_ONE://三带一
          if (!isWinnerIsLandlord && !self.player.isLandlord) {
            return null;
          }
          var three = self.minCards(self._three, G.gameRule.THREE, winc.val);
          if (three) {
            var one = self.minOne(2, three.val);
            if (!one) {
              return null;
            } else {
              three.cardList.push(one);
            }
            three.cardKind = G.gameRule.THREE_WITH_ONE;
            three.size = 4;
          }
          return three;
  
        case G.gameRule.THREE_WITH_PAIRS: //三带一对
          if (!isWinnerIsLandlord && !self.player.isLandlord) {
            return null;
          }
          var three = self.min_cards(self._three, G.gameRule.THREE, winc.val);
          if (three) {
            var pairs = self.minCards(self._pairs, G.gameRule.PAIRS);
            while (true) {//避免对子三根重叠
              if (pairs.cardList[0].val === three.val) {
                pairs = self.minCards(self._pairs, G.gameRule.PAIRS, pairs.cardList[0].val);
              } else {
                break;
              }
            }
            if (pairs) {
              three.cardList = three.cardList.concat(pairs.cardList);
            } else {
              return null;
            }
            three.cardKind = G.gameRule.THREE_WITH_PAIRS;
            three.size = 5;
          }
          return three;
  
        case G.gameRule.PROGRESSION://顺子
          if (!isWinnerIsLandlord && !self.player.isLandlord) {
            return null;
          }
          if (self._progression.length > 0) {
            for (var i = self._progression.length - 1; i >= 0; i--) {//从小值开始判断
              if (winc.val < self._progression[i].val && winc.size <= self._progression[i].cardList.length) {
                if (winc.size === self._progression[i].cardList.length) {
                  return self.setCardKind(self._progression[i], G.gameRule.PROGRESSION);
                } else {
                  if (self.player.isLandlord || isWinnerIsLandlord) {
                    var valDiff = self._progression[i].val - winc.val,
                      sizeDiff = self._progression[i].cardList.length - winc.size;
                    for (var j = 0; j < sizeDiff; j++) {//拆顺
                      if (valDiff > 1) {
                        self._progression[i].cardList.shift();
                        self._progression[i].val--;
                        valDiff--;
                        continue;
                      }
                      self._progression[i].cardList.pop();
                    }
                    return self.setCardKind(self._progression[i], G.gameRule.PROGRESSION);
                  } else {
                    return null;
                  }
                }
              }
            }
          }
          return null;
  
        case G.gameRule.PROGRESSION_PAIRS://连对
          if (!isWinnerIsLandlord && !self.player.isLandlord) {
            return null;
          }
          if (self._progressionPairs.length > 0) {
            for (var i = self._progressionPairs.length - 1; i >= 0; i--) {//从小值开始判断
              if (winc.val < self._progressionPairs[i].val && winc.size <= self._progressionPairs[i].cardList.length) {
                if (winc.size === self._progressionPairs[i].cardList.length) {
                  return self.setCardKind(self._progressionPairs[i], G.gameRule.PROGRESSION_PAIRS);
                } else {
                  if (self.player.isLandlord || isWinnerIsLandlord) {
                    var valDiff = self._progressionPairs[i].val - winc.val,
                      sizeDiff = (self._progressionPairs[i].cardList.length - winc.size) / 2;
                    for (var j = 0; j < sizeDiff; j++) {//拆顺
                      if (valDiff > 1) {
                        self._progressionPairs[i].cardList.shift();
                        self._progressionPairs[i].cardList.shift();
                        valDiff--;
                        continue;
                      }
                      self._progressionPairs[i].cardList.pop();
                      self._progressionPairs[i].cardList.pop();
                    }
                    return self.setCardKind(self._progressionPairs[i], G.gameRule.PROGRESSION_PAIRS);
                  } else {
                    return null;
                  }
                }
              }
            }
          }
          return null;
  
        case G.gameRule.PLANE://三顺
          if (!isWinnerIsLandlord && !self.player.isLandlord) {
            return null;
          }
          return self.minPlane(winc.size, winc);
        case G.gameRule.PLANE_WITH_ONE: //飞机带单
          if (!isWinnerIsLandlord && !self.player.isLandlord) {
            return null;
          }
          var cnt = winc.size / 4,
            plane = self.minPlane(cnt * 3, winc);
          if (plane) {
            var currOneVal = 2;
            for (var i = 0; i < cnt; i++) {
              var one = self.minOne(currOneVal, plane.val);//拿一张单牌
              if (one) {
                plane.cardList.push(one);
                currOneVal = one.val;
              } else {
                return null;
              }
            }
            plane.cardKind = G.gameRule.PLANE_WITH_ONE;
            plane.size = plane.cardList.length;
          }
          return plane;
        case G.gameRule.PLANE_WITH_PAIRS://飞机带对
          if (!isWinnerIsLandlord && !self.player.isLandlord) {
            return null;
          }
          var cnt = winc.size / 5,
            plane = self.minPlane(cnt * 3, winc);
          if (plane) {
            var currPairsVal = 2;
            for (var i = 0; i < cnt; i++) {
              var pairs = self.minCards(self._pairs, G.gameRule.PAIRS, currPairsVal);//拿一对
              if (pairs) {
                plane.cardList = plane.cardList.concat(pairs.cardList);
                currPairsVal = pairs.val;
              } else {
                return null;
              }
            }
            plane.cardKind = G.gameRule.PLANE_WITH_PAIRS;
            plane.size = plane.cardList.length;
          }
          return plane;
  
        case G.gameRule.BOMB://炸弹
          if (!isWinnerIsLandlord && !self.player.isLandlord) {//同是农民不压炸弹
            return null;
          }
          var bomb = self.minCards(self._bomb, G.gameRule.BOMB, winc.val);
          if (bomb) {
            return bomb;
          } else {
            if (self._kingBomb.length > 0) {
              if ((isWinnerIsLandlord && winnerCardCount < 6)
                || (self.player.isLandlord && self.player.cardList.length < 6)) {
                return self.setCardKind(self._kingBomb[0], G.gameRule.KING_BOMB);
              }
            }
            return null;
          }
        case G.gameRule.FOUR_WITH_TWO:
          return self.minCards(self._bomb, G.gameRule.BOMB, winc.val);
        case G.gameRule.FOUR_WITH_TWO_PAIRS:
          return self.minCards(self._bomb, G.gameRule.BOMB, winc.val);
        case G.gameRule.KING_BOMB:
          return null;
        default:
          return null;
      }
    })();
  
    //如果有炸弹，根据牌数量确定是否出
    if (result) {
      return result;
    } else if (winc.cardKind != G.gameRule.BOMB && winc.cardKind != G.gameRule.KING_BOMB
      && (self._bomb.length > 0 || self._kingBomb.length > 0)) {
      if ((isWinnerIsLandlord && winnerCardCount < 5)
        || (self.player.isLandlord && (self.player.cardList.length < 5 || (self.player.nextPlayer.cardList.length < 5 || self.player.nextPlayer.nextPlayer.cardList.length < 6)))
        || self.times() <= 2) {//自己只有两手牌或只有炸弹必出炸弹
        if (self._bomb.length > 0) {
          return self.minCards(self._bomb, G.gameRule.BOMB);
        } else {
          return self.setCardKind(self._kingBomb[0], G.gameRule.KING_BOMB);
        }
      }
    } else {
      return null;
    }
  };

    //出牌将单根放最后出牌
   play_one_at_the_end(landlordCardsCnt) {
    var self = this;
    if (self._progression.length > 0) {//出顺子
      return self.minCards(self._progression, G.gameRule.PROGRESSION);
    }
    else if (self._plane.length > 0) {//三顺
      var plane = self.minCards(self._plane, G.gameRule.PLANE);
      var len = plane.cardList.length / 3;
      if (self._one.length > len && self._pairs.length > len) {
        if (self._one.length >= self._pairs.length) {//单根多带单
          var currOneVal = 2;
          for (var i = 0; i < len; i++) {
            var one = self.minOne(currOneVal, plane.val);//拿一张单牌
            plane.cardList.push(one);
            currOneVal = one.val;
          }
          return self.setCardKind(plane, G.gameRule.PLANE_WITH_ONE);
        } else {
          var currPairsVal = 2;
          for (var i = 0; i < len; i++) {
            var pairs = self.minCards(self._pairs, G.gameRule.PAIRS, currPairsVal);//拿一对
            plane.cardList = plane.cardList.concat(pairs.cardList);
            currPairsVal = pairs.val;
          }
          return self.setCardKind(plane, G.gameRule.PLANE_WITH_PAIRS);
        }
      } else if (self._pairs.length > len) {
        var currPairsVal = 2;
        for (var i = 0; i < len; i++) {
          var pairs = self.minCards(self._pairs, G.gameRule.PAIRS, currPairsVal);//拿一对
          plane.cardList = plane.cardList.concat(pairs.cardList);
          currPairsVal = pairs.val;
        }
        return self.setCardKind(plane, G.gameRule.PLANE_WITH_PAIRS);
      } else if (self._one.length > len) {
        var currOneVal = 2;
        for (var i = 0; i < len; i++) {
          var one = self.minOne(currOneVal, plane.val);//拿一张单牌
          plane.cardList.push(one);
          currOneVal = one.val;
        }
        return self.setCardKind(plane, G.gameRule.PLANE_WITH_ONE);
      } else {
        return self.setCardKind(plane, G.gameRule.PLANE);
      }
    }
    else if (self._progressionPairs.length > 0) {//出连对
      return self.minCards(self._progressionPairs, G.gameRule.PROGRESSION_PAIRS);
    }
    else if (self._three.length > 0) {//三根、三带一、三带对
      var three = self.minCards(self._three, G.gameRule.THREE);
      var len = three.cardList.length / 3;
      if (self._one.length >= 0) {//单根多带单
        var one = self.minOne(currOneVal, three.val);//拿一张单牌
        three.cardList.push(one);
        return self.setCardKind(three, G.gameRule.THREE_WITH_ONE);
      } else if (self._pairs.length > 0) {
        var pairs = self.minCards(self._pairs, G.gameRule.PAIRS, currPairsVal);//拿一对
        three.cardList = three.cardList.concat(pairs.cardList);
        return self.setCardKind(three, G.gameRule.THREE_WITH_PAIRS);
      } else {
        return self.setCardKind(three, G.gameRule.THREE);
      }
    }
    else if (self._pairs.length > 0) {//对子
      if ((self.player.isLandlord && (self.player.nextPlayer.cardList.length === 2 || self.player.nextPlayer.nextPlayer.cardList.length === 2))
        || (!self.player.isLandlord && landlordCardsCnt === 2))
        return self.maxCards(self._pairs, G.gameRule.PAIRS);
      else
        return self.minCards(self._pairs, G.gameRule.PAIRS);
    }
    else if (self._one.length > 0) {//出单牌
      if ((self.player.isLandlord && (self.player.nextPlayer.cardList.length <= 2 || self.player.nextPlayer.nextPlayer.cardList.length <= 2))
        || (!self.player.isLandlord && landlordCardsCnt <= 2))
        return self.maxCards(self._one, G.gameRule.ONE);
      else
        return self.minCards(self._one, G.gameRule.ONE);
    } else {//都计算无结果出最小的那张牌
      var one = null;
      if ((self.player.isLandlord && (self.player.nextPlayer.cardList.length <= 2 || self.player.nextPlayer.nextPlayer.cardList.length <= 2))
        || (!self.player.isLandlord && landlordCardsCnt <= 2))
        one = self.cards.slice(-1);
      else
        one = self.cards.slice(0, 1);
      return {
        size: 1,
        cardKind: G.gameRule.ONE,
        cardList: one,
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
                    return this.minCards(this._one, G.gameRule.ONE);
                }
            }
            //对子里找
            for (let i = 0; i < this._pairs.length; i++) {
                if (this._pairs[i].id === minCard.id) {
                    return self.minCards(this._pairs, G.gameRule.PAIRS);
                }
            }
            //三根里找
            for (let i = 0; i < this._three.length; i++) {
                if (this._three[i].id === minCard.id) {
                    return self.minCards(this._three, G.gameRule.THREE);
                }
            }
            //炸弹里找
            for (let i = 0; i < self._bomb.length; i++) {
                if (self._bomb[i].val === minCard.val) {
                    return self.minCards(self._bomb, G.gameRule.BOMB);
                }
            }
            //三顺里找
            for (let i = 0; i < self._plane.length; i++) {
                for (var j = 0; j < self._plane[i].cardList.length; j++) {
                    if (self._plane[i].cardList[j].val === minCard.val && self._plane[i].cardList[j].shape === minCard.shape) {
                        return self.minCards(self._plane, G.gameRule.PLANE);
                    }
                }
            }
            //顺子里找
            for (let i = 0; i < self._progression.length; i++) {
                for (var j = 0; j < self._progression[i].cardList.length; j++) {
                    if (self._progression[i].cardList[j].val === minCard.val && self._progression[i].cardList[j].shape === minCard.shape) {
                        return self.minCards(self._progression, G.gameRule.PROGRESSION);
                    }
                }
            }
            //连对里找
            for (let i = 0; i < self._progressionPairs.length; i++) {
                for (var j = 0; j < self._progressionPairs[i].cardList.length; j++) {
                    if (self._progressionPairs[i].cardList[j].val === minCard.val && self._progressionPairs[i].cardList[j].shape === minCard.shape) {
                        return self.minCards(self._progressionPairs, G.gameRule.PROGRESSION_PAIRS);
                    }
                }
            }
            if (self._kingBomb.length > 0) {
                return self.minCards(self._kingBomb, G.gameRule.KING_BOMB);
            }
        };

        for (var i = self.cards.length - 1; i >= 0; i--) {
            var r = cardsWithMin(i);
            if (r.cardKind === G.gameRule.ONE) {
                if (self._plane.length > 0) {//三顺
                    var plane = self.minCards(self._plane, G.gameRule.PLANE);
                    var len = plane.cardList.length / 3;
                    var currOneVal = 2;
                    for (var i = 0; i < len; i++) {
                        var one = self.minOne(currOneVal, plane.val);//拿一张单牌
                        plane.cardList.push(one);
                        currOneVal = one.val;
                    }
                    return self.setCardKind(plane, G.gameRule.PLANE_WITH_ONE);
                }
                else if (self._three.length > 0) {//三带一
                    var three = self.minCards(self._three, G.gameRule.THREE);
                    var len = three.cardList.length / 3;
                    var one = self.minOne(currOneVal, three.val);//拿一张单牌
                    three.cardList.push(one);
                    if (three.val < 14)
                        return self.setCardKind(three, G.gameRule.THREE_WITH_ONE);
                }
                if (self.player.isLandlord) {//坐庄打法
                    if (self.player.isLandlord) {//坐庄打法
                        if (self.player.nextPlayer.cardList.length <= 2 || self.player.nextPlayer.nextPlayer.cardList.length <= 2)
                            return self.playOneAtTheEnd(landlordCardsCnt);
                        else
                            return self.minCards(self._one, G.gameRule.ONE);
                    }
                } else {//偏家打法
                    if (landlordCardsCnt <= 2)
                        return self.playOneAtTheEnd(landlordCardsCnt);
                    else
                        return self.minCards(self._one, G.gameRule.ONE);
                }
            } else if (r.cardKind === G.gameRule.THREE) {
                var three = self.minCards(self._three, G.gameRule.THREE);
                var len = three.cardList.length / 3;
                if (self._one.length > 0) {//单根多带单
                    var one = self.minOne(currOneVal, three.val);//拿一张单牌
                    three.cardList.push(one);
                    return self.setCardKind(three, G.gameRule.THREE_WITH_ONE);
                } else if (self._pairs.length > 0) {
                    var pairs = self.minCards(self._pairs, G.gameRule.PAIRS, currPairsVal);//拿一对
                    three.cardList = three.cardList.concat(pairs.cardList);
                    return self.setCardKind(three, G.gameRule.THREE_WITH_PAIRS);
                } else {
                    return self.setCardKind(three, G.gameRule.THREE);
                }
            } else if (r.cardKind === G.gameRule.PLANE) {
                var plane = self.minCards(self._plane, G.gameRule.PLANE);
                var len = plane.cardList.length / 3;
                if (self._one.length > len && self._pairs.length > len) {
                    if (self._one.length >= self._pairs.length) {//单根多带单
                        var currOneVal = 2;
                        for (var i = 0; i < len; i++) {
                            var one = self.minOne(currOneVal, plane.val);//拿一张单牌
                            plane.cardList.push(one);
                            currOneVal = one.val;
                        }
                        return self.setCardKind(plane, G.gameRule.PLANE_WITH_ONE);
                    } else {
                        var currPairsVal = 2;
                        for (var i = 0; i < len; i++) {
                            var pairs = self.minCards(self._pairs, G.gameRule.PAIRS, currPairsVal);//拿一对
                            plane.cardList = plane.cardList.concat(pairs.cardList);
                            currPairsVal = pairs.val;
                        }
                        return self.setCardKind(plane, G.gameRule.PLANE_WITH_PAIRS);
                    }
                } else if (self._pairs.length > len) {
                    var currPairsVal = 2;
                    for (var i = 0; i < len; i++) {
                        var pairs = self.minCards(self._pairs, G.gameRule.PAIRS, currPairsVal);//拿一对
                        plane.cardList = plane.cardList.concat(pairs.cardList);
                        currPairsVal = pairs.val;
                    }
                    return self.setCardKind(plane, G.gameRule.PLANE_WITH_PAIRS);
                } else if (self._one.length > len) {
                    var currOneVal = 2;
                    for (var i = 0; i < len; i++) {
                        var one = self.minOne(currOneVal, plane.val);//拿一张单牌
                        plane.cardList.push(one);
                        currOneVal = one.val;
                    }
                    return self.setCardKind(plane, G.gameRule.PLANE_WITH_ONE);
                } else {
                    return self.setCardKind(plane, G.gameRule.PLANE);
                }
            } else if (r.cardKind === G.gameRule.BOMB && self.times() === 1) {
                return r;
            } else if (r.cardKind === G.gameRule.BOMB && self.times() != 1) {
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
        // self.log();
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
                    if (st[i].count < c || st[i].val <= winVal) {
                        st.splice(i, 1);
                    }
                }
                st.sort(this.prompt_sort);
                //加入各个符合值的单牌
                for (let i = 0; i < st.length; i++) {
                    const val = st[i].val
                    const cards = []
                    const cardList = cards;
                    for (let j = cardList.length - 1; j >= 0; j--) {
                        if (cardList[j].val === val) {
                            if (cards.length < c) {
                                cards.push(cardList[j])
                            } else {
                                break
                            }
                        }
                    }
                    cards.length && result.push(cards)
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
                            if (onePrompt[j][0].val != threePrompt[i][0].val) {
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
                            if (pairsPrompt[j][0].val != threePrompt[i][0].val) {
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
                                if (proList[proList.length - 1].val - 1 === cards[j].id) {//判定递减
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
                                    && proList[proList.length - 1].val - 1 === cards[j].id
                                    && cards[j + 1]
                                    && proList[proList.length - 1].val - 1 === cards[j + 1].id) {//判定递减
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
            var promptList = [
                ...this._one, // 单牌
                ...this._pairs, // 对子
                ...this._progress_pair, // 连对
                ...this._progression, // 顺子
                ...this._plane, // 飞机
                ...this._three, // 三根
                ...this._boom, // 炸弹
                ...this._king_bomb // 王炸
            ].map(a => a.cardList && a.cardList).filter(a => a);
            // for (var i = stat.length - 1; i >= 0; i--) {
            //   if (i != 0) {
            //     promptList.push(self.cards.splice(self.cards.length - stat[i].count, self.cards.length - 1));
            //   } else {
            //     promptList.push(self.cards);
            //   }
            // }
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
            pairs = self.minCards(self._pairs, G.gameRule.PAIRS, v);
        if (pairs) {
            while (true) {
                if (pairs.cardList[0].val === notEq) {
                    pairs = self.minCards(self._pairs, G.gameRule.PAIRS, pairs.cardList[0].val);
                } else {
                    break;
                }
            }
        }

        return pairs ? pairs.cardList[0] : null;
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
    * @method judgeProgressionPairs
    * @param  {[array]}         cards 指定的牌
    */
    judge_progression_pairs(cards: card_list) {
        var save_progression_pairs = (proList) => {
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
                type_value: proList[0],
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
                        //saveProgressionPairs(proList);
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
                save_progression_pairs(proList);
                this.judge_progression_pairs(cards);
            }
        }
    };


    /**
    * 判断给定牌中的顺子(五连)
    * @method judgeProgression
    * @param  {[array]}         cards 指定的牌
    */
    judge_progression(cards: card_list) {
        var self = this;

        var saveProgression = function (proList) {
            var progression = [];
            for (var j = 0; j < proList.length; j++) {
                progression.push(proList[j].obj);
            }

            const ai_card_type: AICardType = {
                type_value: proList[0].obj.type_value,
                cards: progression,
            }

            self._progression.push(ai_card_type);
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
                if (proList[proList.length - 1].obj.type_value - 1 === cards[i].id) {//判定递减
                    proList.push({ 'obj': cards[i], 'fromIndex': i });
                    if (proList.length === 5) break;
                } else if (proList[proList.length - 1].obj.type_value === cards[i].id) {//相等跳出本轮
                    continue;
                } else {
                    if (proList.length >= 5) {//已经有顺子，先保存
                        //saveProgression(proList);
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
                saveProgression(proList);
                this.judge_progression(cards);//再次判断顺子
            } else {
                this.judge_progression(cards);
            }
        }
    };

    /**
    * 判断给定牌中的三根
    * @method judgeThree
    */
    judge_three(cards: card_list) {
        var self = this,
            stat = this.card_rule.val_count(cards);
        for (let i = 0; i < stat.length; i++) {
            if (stat[i].count === 3) {
                var list = [];
                this.move_item(cards, list, stat[i].id);
                const ai_card_type: AICardType = {
                    type_value: list[0].type_value,
                    cards: list,
                }
                self._three.push(ai_card_type);
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
                if (this._three[i].type_value >= 15) {
                    continue;//三顺必须小于2
                }
                if (proList.length == 0) {
                    proList.push({ 'obj': this._three[i], 'fromIndex': i });
                    continue;
                }
                if (proList[proList.length - 1].obj.type_value - 1 == this._three[i].type_value) {//判定递减
                    proList.push({ 'obj': this._three[i], 'fromIndex': i });
                } else {
                    if (proList.length > 1) {//已经有三顺，先保存
                        var planeCards = [];
                        for (var j = 0; j < proList.length; j++) {
                            planeCards = planeCards.concat(proList[j].obj.cardList);
                        }
                        const ai_card_type: AICardType = {
                            type_value: proList[0].obj.type_value,
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
                    planeCards = planeCards.concat(proList[j].obj.cardList);
                }
                const ai_card_type: AICardType = {
                    type_value: proList[0].obj.type_value,
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
    delete_one(card) {
        for (var i = 0; i < this._ai_player.player_interface.cards.length; i++) {
            if (this.cards[i].val === card.val && this.cards[i].shape === card.shape) {
                this.cards.splice(i, 1);
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
        var self = this,
            score = 0;
        score += self._bomb.length * 6;//有炸弹加六分
        if (self._kingBomb.length > 0) {//王炸8分
            score += 8;
        } else {
            if (self.cards[0].val === 17) {
                score += 4;
            } else if (self.cards[0].val === 16) {
                score += 3;
            }
        }
        for (var i = 0; i < self.cards.length; i++) {
            if (self.cards[i].val === 15) {
                score += 2;
            }
        }
        console.info(self.player.userId + "手牌评分：" + score);
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
