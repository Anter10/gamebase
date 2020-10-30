import Random from "../Common/Random";
import { LordCardType, LordDealCardsType } from "./GamePlayEnum";
import { DealCardInterface, LordCardInterface } from "./GamePlayInterface";

export type card_list = Array<LordCardInterface>;

export class LordUtils {

    static special_card_id(card_id: number) {
        if (card_id == 11) {
            return "J";
        } else if (card_id == 12) {
            return "Q";
        } else if (card_id == 13) {
            return "K";
        } else if (card_id == 14) {
            return "A";
        }
    }

    /**@description 初始得到新的牌 */
    static new_cards(): Array<LordCardInterface> {
        //                [3,4,5,6,7,8,9,10, J, Q, K, A, 2, 👑, 👑];  
        const cur_cards = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
        const t_cards: Array<LordCardInterface> = [];

        for (const card_id of cur_cards) {
            if (card_id < 16) {
                for (let i = 0; i < 4; i++) {
                    let card_type = LordCardType.none;
                    if (i == 0) {
                        card_type = LordCardType.clubs;
                    } else if (i == 1) {
                        card_type = LordCardType.spade;
                    } else if (i == 2) {
                        card_type = LordCardType.heart;
                    } else if (i == 3) {
                        card_type = LordCardType.dianmond;
                    }
                    const card: LordCardInterface = {
                        id: card_id,
                        card_type: card_type
                    }
                    t_cards.push(card);
                }
            } else {
                let card_type = LordCardType.none;

                if (card_id == 16) {
                    card_type = LordCardType.small_king;
                } else if (card_id == 17) {
                    card_type = LordCardType.big_king;
                }

                const card: LordCardInterface = {
                    id: card_id,
                    card_type: card_type
                }
                t_cards.push(card);
            }
        }

        return t_cards;
    }

    /**@description 洗牌逻辑 */
    static shuffle_card(): Array<LordCardInterface> {
        const t_cards: Array<LordCardInterface> = LordUtils.new_cards();
        let card_number = t_cards.length - 1;
        while (card_number >= 0) {
            const random_index = Random.rangeInt(0, card_number);
            const pre_final_card = t_cards[card_number];
            const cur_random_card = t_cards[random_index];
            t_cards[card_number] = cur_random_card;
            t_cards[random_index] = pre_final_card;
            card_number--;
        }
        console.log("当前洗完的牌 = ", t_cards);
        return t_cards;
    }

    static sort_cards(card1: LordCardInterface, card2: LordCardInterface) {
        // 对牌进行排序ID从大到小
        if (card1 && card2) {
            if (card2.id > card1.id) {
                return 1;
            } else if (card2.id < card1.id) {
                return -1;
            } else {
                return 0;
            }
        } else {
            return -1;
        }
    }

    static normal_deal_cards(t_cards): DealCardInterface {
        const every_people_count = 17;
        // 每次每个玩家的发牌张数
        const deal_card_number = 3;
        // 正常发牌次数
        const deal_card_count = Math.floor(every_people_count / deal_card_number);
        // 最后一次每个人发牌的张数
        const final_card_count = every_people_count % deal_card_number;

        const all_cards: { [position: number]: Array<LordCardInterface> } = {};

        let cur_deal_index = 0;

        for (let deal_count = 0; deal_count < deal_card_count; deal_count++) {
            for (let position = 0; position < 3; position++) {
                const cur_deal_pos = position % 3;
                if (!all_cards[cur_deal_pos]) {
                    all_cards[cur_deal_pos] = []
                }

                for (let deal_index = 0; deal_index < deal_card_number; deal_index++) {
                    const cur_card = t_cards[cur_deal_index];
                    all_cards[cur_deal_pos].push(cur_card);
                    cur_deal_index++;
                }
            }
        }

        // 发最后一次牌
        for (let position = 0; position < 3; position++) {
            const cur_deal_pos = position % 3;
            if (!all_cards[cur_deal_pos]) {
                all_cards[cur_deal_pos] = []
            }

            for (let deal_index = 0; deal_index < final_card_count; deal_index++) {
                const cur_card = t_cards[cur_deal_index];
                all_cards[cur_deal_pos].push(cur_card);
                cur_deal_index++;
            }
        }



        for (let pos of Object.keys(all_cards)) {
            all_cards[pos].sort(this.sort_cards);
        }

        // 最后三张为底牌
        const card_number = t_cards.length - 1;
        const in_bottom_cards: Array<LordCardInterface> = [t_cards[card_number - 2], t_cards[card_number - 1], t_cards[card_number]];
        const deal_cards: DealCardInterface = {
            in_bottom_cards: in_bottom_cards,
            every_pos_cards: all_cards,
        }
        return deal_cards;
    }

    //牌型之间大小数值的定义
    static CardsValue = {
        'one': {
            name: 'One',
            value: 1
        },
        'double': {
            name: 'Double',
            value: 1
        },
        'three': {
            name: 'Three',
            value: 1
        },
        'boom': { //炸弹
            name: 'Boom',
            value: 2
        },
        'threeWithOne': {
            name: 'ThreeWithOne',
            value: 1
        },
        'threeWithTwo': {
            name: 'ThreeWithTwo',
            value: 1
        },
        'plane': {
            name: 'Plane',
            value: 1
        },
        'planeWithOne': {
            name: 'PlaneWithOne',
            value: 1
        },
        'planeWithTwo': {
            name: 'PlaneWithTwo',
            value: 1
        },
        'scroll': { //顺子
            name: 'Scroll',
            value: 1
        },
        'doubleScroll': {  //连队
            name: 'DoubleScroll',
            value: 1
        },
        'kingboom':{ //王炸
            name: 'kingboom',
            value: 3
        },
    };

    /**@description 发牌逻辑 */
    static deal_cards(deal_cards_type: LordDealCardsType): DealCardInterface {
        const t_cards: Array<LordCardInterface> = LordUtils.shuffle_card();
        let deal_cards: DealCardInterface = null;
        if (deal_cards_type == LordDealCardsType.none) {
            deal_cards = this.normal_deal_cards(t_cards);
        }
        return deal_cards;
    }

    // 牌型的相关逻辑

    /**@description 是否为单张扑克牌 */
    static is_one_card(card_list: card_list) {
        if (card_list.length === 1) {
            return true;
        }
        return false;
    }

    /**@description 是否为对子 */
    static is_double_card(card_list: card_list) {
        if (card_list.length != 2) {
            return false
        }

        const is_king = card_list[0].card_type == LordCardType.big_king || card_list[0].card_type == LordCardType.small_king;
        const is_dz = card_list[0].id == card_list[1].id;

        if (is_king || !is_dz) {
            return false;
        }

        return true
    }

    /**@description 三张不带 */
    static is_three(card_list: card_list) {
        if (card_list.length != 3) {
            return false
        }

        //不能是大小王
        if (card_list[0].id > 15) {
            return false
        }

        //判断三张牌是否相等
        if (card_list[0].id != card_list[1].id) {
            return false
        }

        if (card_list[0].id != card_list[2].id) {
            return false
        }

        if (card_list[1].id != card_list[2].id) {
            return false
        }

        return true
    }

    //三带一
    static is_three_with_one(card_list: card_list) {
        if (card_list.length != 4) {
            return false
        }

        const pre_cards = card_list.slice(0, 3);
        const after_cards = card_list.slice(3, 4);

        if (pre_cards[0].id == pre_cards[1].id && pre_cards[1].id == pre_cards[2].id && pre_cards[2].id != card_list[3].id) {
            return true;
        }

        if (after_cards[0].id != card_list[0].id && card_list[0].id == card_list[1].id && card_list[1].id == card_list[2].id) {
            return true;
        }

        return false
    }

    /**@description 三带二 */
    static is_three_with_two(card_list: card_list) {
        if (card_list.length != 5) {
            return false
        }

        if (card_list[0].id == card_list[1].id
            && card_list[1].id == card_list[2].id) {
            if (card_list[3].id == card_list[4].id) {
                return true;
            }

        } else if (card_list[2].id == card_list[3].id &&
            card_list[3].id == card_list[4].id) {
            if (card_list[0].id == card_list[1].id) {
                return true;
            }
        }

        return false;
    }

    /**@description 四张炸弹 */
    static is_boom(card_list: card_list) {
        if (card_list.length != 4) {
            return false
        }

        var map = {}

        for (var i = 0; i < card_list.length; i++) {
            if (map.hasOwnProperty(card_list[i].id)) {
                map[card_list[i].id]++
            } else {
                map[card_list[i].id] = 1
            }
        }

        var keys = Object.keys(map)
        if (keys.length == 1) {
            return true
        }

        return false
    }


    /**@description 王炸 */
    static is_king_boom(card_list: card_list) {
        if (card_list.length != 2) {
            return false
        }

        if (card_list[0].card_type == LordCardType.small_king && card_list[1].card_type == LordCardType.big_king) {
            return true
        }

        return false
    }

    /**@description 飞机不带 */
    static is_plan(card_list: card_list) {
        if (card_list.length != 6) {
            return false
        }

        var map = {}
        for (var i = 0; i < card_list.length; i++) {
            if (map.hasOwnProperty(card_list[i].id)) {
                map[card_list[i].id]++
            } else {
                map[card_list[i].id] = 1
            }
        }

        var keys = Object.keys(map)
        console.log("IsPlan keys" + keys)
        if (keys.length == 2) {
            //判断相同牌是否为三张
            for (let key in map) {
                if (map[key] != 3) {
                    return false
                }
            }

            //判断是否为相邻的牌
            var p1 = Number(keys[0])
            var p2 = Number(keys[1])
            if (Math.abs(p1 - p2) != 1) {
                return false
            }
            return true
        }

        return false
    }


    /**@description 飞机带2个单张 */
    static is_plan_with_two_single(card_list: card_list) {
        if (card_list.length != 8) {
            return false
        }

        var map = {}
        for (let i = 0; i < card_list.length; i++) {
            if (map.hasOwnProperty(card_list[i].id)) {
                map[card_list[i].id]++
            } else {
                map[card_list[i].id] = 1
            }
        }

        var keys = Object.keys(map)
        console.log("IsPlan keys" + keys)
        if (keys.length != 4) {
            return false
        }
        //判断是否有2个三张牌
        var three_list = []
        var sing_count = 0
        for (let i in map) {
            if (map[i] == 3) {
                three_list.push(i)
            } else if (map[i] == 1) {
                sing_count++
            }
        }

        if (three_list.length != 2 || sing_count != 2) {
            return false
        }

        //判断是否为相邻的牌
        var p1 = Number(three_list[0])
        var p2 = Number(three_list[1])
        if (Math.abs(p1 - p2) != 1) {
            return false
        }

        return true
    }


    /**@description 飞机带2对 */
    static is_plan_with_two_double(card_list: card_list) {
        if (card_list.length != 10) {
            return false
        }

        var map = {}
        for (var i = 0; i < card_list.length; i++) {
            if (map.hasOwnProperty(card_list[i].id)) {
                map[card_list[i].id]++
            } else {
                map[card_list[i].id] = 1
            }
        }

        var keys = Object.keys(map)
        if (keys.length != 4) {
            return false
        }
        var three_list = []
        var double_count = 0
        for (let i in map) {
            if (map[i] == 3) {
                three_list.push(i)
            } else if (map[i] == 2) {
                double_count++
            }
        }

        if (three_list.length != 2 || double_count != 2) {
            return false
        }

        //判断是否为相邻的牌
        var p1 = Number(three_list[0])
        var p2 = Number(three_list[1])
        if (Math.abs(p1 - p2) != 1) {
            return false
        }

        return true
    }


    /**@description 顺子 */
    static is_shunzi(card_list: card_list) {
        if (card_list.length < 5 || card_list.length > 12) {
            return false
        }

        var tmp_cards = card_list

        //不能有2或者大小王
        for (var i = 0; i < tmp_cards.length; i++) {
            if (tmp_cards[i].id == 15 || tmp_cards[i].id == 16 || tmp_cards[i].id == 17) {
                return false
            }
        }

        //排序 从小到大
        //sort返回正值做交换
        tmp_cards.sort((x, y) => {
            return Number(x.id) - Number(y.id)
        })

        //console.log("IsShunzi tmp_cards"+JSON.stringify(tmp_cards))
        for (var i = 0; i < tmp_cards.length; i++) {
            if (i + 1 == tmp_cards.length) {
                break
            }
            var p1 = Number(tmp_cards[i].id)
            var p2 = Number(tmp_cards[i + 1].id)
            if (Math.abs(p1 - p2) != 1) {
                return false
            }
        }

        return true
    }

    //连队
    static is_liandui(card_list: card_list) {
        if (card_list.length < 6 || card_list.length > 24) {
            return false
        }

        //不能包括大小王,和 2
        for (var i = 0; i < card_list.length; i++) {
            if (card_list[i].id == 15 || card_list[i].id == 16 || card_list[i].id == 17) {
                return false
            }
        }

        var map = {}
        for (let i = 0; i < card_list.length; i++) {
            if (map.hasOwnProperty(card_list[i].id)) {
                map[card_list[i].id]++
            } else {
                map[card_list[i].id] = 1
            }
        }

        //相同牌只能是2张
        for (let key in map) {
            if (map[key] != 2) {
                return false
            }
        }
        var keys = Object.keys(map)
        if (keys.length < 3) {
            return false
        }
        //从小到大排序
        keys.sort(function (x, y) {
            return Number(x) - Number(y)
        })

        //对子之间相减绝对值只能是1
        for (let i = 0; i < keys.length; i++) {
            if (i + 1 == keys.length) {
                break
            }
            var p1 = Number(keys[i])
            var p2 = Number(keys[i + 1])
            if (Math.abs(p1 - p2) != 1) {
                return false
            }

        }

        return true
    }

    /**@description 比较牌 返回 true: B > A */
    static compare_one(card_a: card_list, card_b: card_list) {
        var valueA = card_a[0].id;
        var valueB = card_b[0].id

        if (valueB > valueA) {
            return true
        }

        return false
    }

    /**@description 比较两张 */
    static compare_two(card_a: card_list, card_b: card_list) {
        var result = this.compare_one(card_a, card_b);
        return result
    }

    /**@description 比较三张 */
    static compare_three(card_a: card_list, card_b: card_list) {
        var result = this.compare_one(card_a, card_b)
        return result
    }

    /**@description 比较炸弹 */
    static compare_boom(card_a: card_list, card_b: card_list) {
        var result = false
        if (card_a.length == 4 && card_b.length == 4) {
            result = this.compare_one(card_a, card_b);
        }
        return result
    }

    static compare_boom_king(card_a: card_list, card_b: card_list) {
        if (card_b.length != 2) {
            return false
        }
        return true
    }

    /**@description 三带一大小比较 */
    static compare_three_with_one(card_a: card_list, card_b: card_list) {
        //将三带存储到2个列表
        var lista = []
        var listb = []
        var map = {}

        for (let i = 0; i < card_a.length; i++) {
            if (map.hasOwnProperty(card_a[i].id)) {
                lista.push(card_a)
            } else {
                map[card_a[i].id] = 1
            }
        }

        for (let i = 0; i < card_b.length; i++) {
            if (map.hasOwnProperty(card_b[i].id)) {
                listb.push(card_b)
            } else {
                map[card_b[i].id] = 1
            }
        }

        var result = this.compare_one(card_a, card_b);

        return result
    }

    /**@description 比较三带2 */
    static compare_three_with_two(card_a: card_list, card_b: card_list) {
        let mapA = {};
        let mapB = {};

        for (let i = 0; i < card_a.length; i++) {
            if (mapA.hasOwnProperty(card_a[i].id)) {
                mapA[card_a[i].id].push(card_a[i]);
            } else {
                mapA[card_a[i].id] = [card_a[i]];
            }
        }

        for (let i = 0; i < card_b.length; i++) {
            if (mapB.hasOwnProperty(card_b[i].id)) {
                mapB[card_b[i].id].push(card_b[i]);
            } else {
                mapB[card_b[i].id] = [card_b[i]];
            }
        }

        var listA = [];
        for (let i in mapA) {
            if (mapA[i].length === 3) {
                listA = mapA[i];
            }
        }

        var listB = [];
        for (let i in mapB) {
            if (mapB[i].length === 3) {
                listB = mapB[i];
            }
        }

        var result = this.compare_one(listA, listB);

        return result

    }

    static compare_plan(card_a: card_list, card_b: card_list) {
        var mapA = {};
        for (var i = 0; i < card_a.length; i++) {
            if (mapA.hasOwnProperty(card_a[i].id)) {
                mapA[card_a[i].id].push(card_a[i]);
            } else {
                mapA[card_a[i].id] = [card_a[i]];
            }
        }

        var listA = []
        var maxNum = 16
        //找到飞机里最小的一张牌
        for (let i in mapA) {
            if (Number(i) < maxNum) {
                maxNum = Number(i)
                listA = mapA[i]
            }
        }

        //处理card_b
        var mapB = {};
        for (let i = 0; i < card_b.length; i++) {
            if (mapB.hasOwnProperty(card_b[i].id)) {
                mapB[card_b[i].id].push(card_b[i]);
            } else {
                mapB[card_b[i].id] = [card_b[i]];
            }
        }

        maxNum = 16
        var listB = [];
        for (let i in mapB) {
            if (Number(i) < maxNum) {
                maxNum = Number(i);
                listB = mapB[i];
            }
        }

        var result = this.compare_three(listA, listB)
        return result
    }

    //飞机带2张单排
    static compare_plan_with_one(card_a: card_list, card_b: card_list) {
        var result = false
        var mapA = {};
        var listA = [];
        for (var i = 0; i < card_a.length; i++) {
            if (mapA.hasOwnProperty(card_a[i].id)) {
                listA.push(card_a[i]);
            } else {
                mapA[card_a[i].id] = [card_a[i]];
            }
        }

        var mapB = {};
        var listB = [];
        for (var i = 0; i < card_b.length; i++) {
            if (mapB.hasOwnProperty(card_b[i].id)) {
                listB.push(card_b[i]);
            } else {
                mapB[card_b[i].id] = [card_b[i]];
            }
        }

        result = this.compare_plan(listA, listB);
        return result
    }

    /**@description 飞机带2对 */
    static compare_plan_with_double(card_a: card_list, card_b: card_list) {
        var mapA = {};
        for (let i = 0; i < card_a.length; i++) {
            if (mapA.hasOwnProperty(card_a[i].id)) {
                mapA[card_a[i].id].push(card_a[i]);
            } else {
                mapA[card_a[i].id] = [card_a[i]];
            }
        }
        var mapB = {};
        for (let i = 0; i < card_b.length; i++) {
            if (mapB.hasOwnProperty(card_b[i].id)) {
                mapB[card_b[i].id].push(card_b[i]);
            } else {
                mapB[card_b[i].id] = [card_b[i]];
            }
        }

        var listA = [];
        for (let i in mapA) {
            if (mapA[i].length === 3) {
                for (let j = 0; j < mapA[i].length; j++) {
                    listA.push(mapA[i][j]);
                }
            }
        }
        console.log('list a = ' + JSON.stringify(listA));

        var listB = [];
        for (let i in mapB) {
            if (mapB[i].length === 3) {
                for (let j = 0; j < mapB[i].length; j++) {
                    listB.push(mapB[i][j]);
                }
            }
        }

        var result = this.compare_plan(listA, listB);
        return result
    }

    /**@description 比较顺子 */
    static compare_scroll(card_a: card_list, card_b: card_list) {
        console.log("compareScroll")

        if (card_a.length != card_b.length) {
            return false
        }

        var minNumA = 100;
        for (let i = 0; i < card_a.length; i++) {
            if (card_a[i].id < minNumA) {
                minNumA = card_a[i].id
            }
        }

        var minNumB = 100;

        for (let i = 0; i < card_b.length; i++) {
            if (card_b[i].id < minNumB) {
                minNumB = card_b[i].id;
            }
        }

        console.log('min a = ' + minNumA);
        console.log('min b = ' + minNumB);

        if (minNumA <= minNumB) {
            return true;
        }

        return false
    }

    static compare_double_scroll(card_a: card_list, card_b: card_list) {
        var mapA = {};
        var listA = [];
        for (var i = 0; i < card_a.length; i++) {
            if (mapA.hasOwnProperty(card_a[i].id)) {

            } else {
                mapA[card_a[i].id] = true;
                listA.push(card_a[i]);
            }
        }

        var mapB = {};
        var listB = [];
        for (var i = 0; i < card_b.length; i++) {
            if (mapB.hasOwnProperty(card_b[i].id)) {

            } else {
                mapB[card_b[i].id] = true;
                listB.push(card_b[i]);
            }
        }
        
        console.log('list a = ' + JSON.stringify(listA));
        console.log('list b = ' + JSON.stringify(listB));

        return this.compare_scroll(listA, listB);
    }

    static card_value(cardList: card_list){
        if (this.is_one_card(cardList)) {
            console.log("isOneCard sucess")
            return this.CardsValue.one;
        }

        if(this.is_double_card(cardList)){
            console.log("IsDoubleCard sucess")
            return this.CardsValue.double
        }

        if(this.is_three(cardList)){
            console.log("Isthree sucess")
            return this.CardsValue.three
        }

        if(this.is_three_with_one(cardList)){
            console.log("IsThreeAndOne sucess")
            return this.CardsValue.threeWithOne
        }

        if(this.is_three_with_two(cardList)){
            console.log("IsThreeAndTwo sucess")
            return this.CardsValue.threeWithTwo
        }

        if(this.is_boom(cardList)){
            console.log("IsBoom sucess")
            return this.CardsValue.boom
        }

        if(this.is_king_boom(cardList)){
            console.log("IsKingBoom sucess")
            return this.CardsValue.kingboom
        }

        if(this.is_plan(cardList)){
            console.log("IsPlan sucess")
            return this.CardsValue.plane
        }

        if(this.is_plan_with_two_single(cardList)){
            console.log("IsPlanWithSing sucess")
            return this.CardsValue.planeWithOne
        }

        if(this.is_plan_with_two_double(cardList)){
            console.log("IsPlanWithDouble sucess")
            return this.CardsValue.planeWithTwo
        }
        
        if(this.is_shunzi(cardList)){
            console.log("IsShunzi sucess")
            return this.CardsValue.scroll
        }

        if(this.is_liandui(cardList)){
            console.log("IsLianDui sucess")
            return this.CardsValue.doubleScroll
        }
        //return false
        return undefined
    }

    //cardA上次出的牌
    //cardB本次出的牌
    //current_card_value当前牌型
    static compare(cardA,cardB,current_card_value){
        var result = false
        switch(current_card_value.name){
            case this.CardsValue.one.name:
                    result = this.compare_one(cardA,cardB)
                break
            case this.CardsValue.double.name:
                    result = this.compare_two(cardA,cardB)
                break    
            case this.CardsValue.three.name:
                    result = this.compare_three(cardA,cardB)
                break
            case this.CardsValue.boom.name:
                    result = this.compare_boom(cardA,cardB)
                break
            case this.CardsValue.kingboom.name:
                    result = this.compare_boom_king(cardA,cardB)
                break    
            case this.CardsValue.planeWithOne.name:
                    result = this.compare_plan_with_one(cardA,cardB)
                break 
            case this.CardsValue.planeWithTwo.name:
                    result = this.compare_three_with_two(cardA,cardB)
                break
            case this.CardsValue.plane.name:
                    result = this.compare_plan(cardA,cardB)
                break
            case this.CardsValue.planeWithOne.name:
                    result = this.compare_plan_with_one(cardA,cardB)
                break   
            case this.CardsValue.planeWithTwo.name:
                    result = this.compare_plan_with_double(cardA,cardB)
                break
            case this.CardsValue.scroll.name:
                    result = this.compare_scroll(cardA,cardB)
                break
            case this.CardsValue.doubleScroll.name:
                    result = this.compare_double_scroll(cardA,cardB)
                break               
            default:
                console.log("no found card value!")
                result = false
                break    
        }

        return result
    }

    /**@description 比较牌型 */
    static compare_card(last_cards:card_list,current_cards: card_list){
         console.log("last_cards"+JSON.stringify(last_cards))
         console.log("current_cards"+JSON.stringify(current_cards))
         const card_last_value = this.card_value(last_cards)
         const card_current_value = this.card_value(current_cards)
         if(card_last_value.value < card_current_value.value){
             console.log("compareWithCard less")
             return true
         }else if(card_last_value.value == card_current_value.value){
             //牌型必须相同
             if(card_last_value.name!=card_current_value.name){
                 return false
             }
             var result = this.compare(last_cards,current_cards,card_last_value)
             return result
         }else{
             return false
         }
    }

    static test(){
        const card3: LordCardInterface = {
            id: 3,
            card_type: LordCardType.clubs,
        }

        const card4: LordCardInterface = {
            id: 3,
            card_type: LordCardType.spade,
        }

        const card5: LordCardInterface = {
            id: 3,
            card_type: LordCardType.spade,
        }

        const card6: LordCardInterface = {
            id: 3,
            card_type: LordCardType.spade,
        }

        const card31: LordCardInterface = {
            id: 3,
            card_type: LordCardType.spade,
        }

        const card7: LordCardInterface = {
            id: 4,
            card_type: LordCardType.spade,
        }

        const card41: LordCardInterface = {
            id: 4,
            card_type: LordCardType.spade,
        }

        const card8: LordCardInterface = {
            id: 4,
            card_type: LordCardType.spade,
        }

        const card9: LordCardInterface = {
            id: 4,
            card_type: LordCardType.spade,
        }

        const card10: LordCardInterface = {
            id: 4,
            card_type: LordCardType.spade,
        }


        const card11: LordCardInterface = {
            id: 5,
            card_type: LordCardType.spade,
        }

        const card51: LordCardInterface = {
            id: 5,
            card_type: LordCardType.spade,
        }


        const card61: LordCardInterface = {
            id: 6,
            card_type: LordCardType.spade,
        }

        const card71: LordCardInterface = {
            id: 7,
            card_type: LordCardType.spade,
        }

        const card81: LordCardInterface = {
            id: 8,
            card_type: LordCardType.spade,
        }

        const card91: LordCardInterface = {
            id: 6,
            card_type: LordCardType.spade,
        }

        const card12: LordCardInterface = {
            id: 16,
            card_type: LordCardType.small_king,
        }

        const card13: LordCardInterface = {
            id: 17,
            card_type: LordCardType.big_king,
        }

        const card18: LordCardInterface = {
            id: 10,
            card_type: LordCardType.spade,
        }

        const card19: LordCardInterface = {
            id: 10,
            card_type: LordCardType.spade,
        }

        const card21: LordCardInterface = {
            id: 9,
            card_type: LordCardType.spade,
        }

        const card22: LordCardInterface = {
            id: 9,
            card_type: LordCardType.spade,
        }

        const card23: LordCardInterface = {
            id: 9,
            card_type: LordCardType.spade,
        }

        const card20: LordCardInterface = {
            id: 10,
            card_type: LordCardType.spade,
        }



        const three = [card3, card4, card5];
        const one = [card3];
        const two = [card3, card4];
        const two1 = [card3, card9];

        const three_with_one1 = [card3, card4, card5, card6];
        const three_with_one2 = [card3, card4, card5, card7];
        const three_with_two1 = [card3, card4, card5, card7,card7];
        const three_with_two2 = [card3, card4, card5, card6, card11];

        const boom1 = [card3, card4, card5, card6];
        const boom2 = [card3, card4, card5, card11];

        const king_boom1 = [card12, card13];
        const king_boom2 = [card12, card3];


        const plan1 = [card3, card4, card5, card8, card9, card10];
        const plan2 = [card3, card4, card5, card8, card9, card11];
        const plan3 = [card3, card4, card5, card18, card19, card20];

        const plan_with_two_one1 = [card3, card4, card5, card8, card9, card10, card18, card4];
        const plan_with_two_one2 = [card3, card4, card5, card8, card9, card10, card18, card13];

        const plan_with_two_double1 = [card3, card4, card5, card8, card9, card10, card18, card4, card21, card22];
        const plan_with_two_double2 = [card3, card4, card5, card8, card9, card10, card18, card19, card21, card22];


        const shunzi1 = [card31,card41,card51,card61,card71,card91];
        const shunzi2 = [card31,card41,card51,card61,card71,card81];

        const liandui1 = [card31,card31,card41,card41,card51,card51];
        const liandui2 = [card31,card31,card41,card41,card51,card61];
        const liandui3 = [card31,card31,card41,card41];


        console.log(one, " one = ",this.is_one_card(one));
        console.log(two, " two = ", this.is_double_card(two));
        console.log(two1, " two = ", this.is_double_card(two1));

        console.log(three,"当前的牌型是飞机 ", this.is_three(three));
        console.log(three_with_one1,"当前的牌型是三带1 ", this.is_three_with_one(three_with_one1));
        console.log(three_with_one2,"当前的牌型是三带1 ", this.is_three_with_one(three_with_one2));

        console.log(three_with_two1,"当前的牌型是三带1 ", this.is_three_with_two(three_with_two1));
        console.log(three_with_two2,"当前的牌型是三带2 ", this.is_three_with_two(three_with_two2));

        console.log(boom1,"当前的牌型是炸弹1 ", this.is_boom(boom1));
        console.log(boom2,"当前的牌型是炸弹2 ", this.is_boom(boom2));

        console.log(king_boom1,"当前的牌型是炸弹1 ", this.is_king_boom(king_boom1));
        console.log(king_boom2,"当前的牌型是炸弹2 ", this.is_king_boom(king_boom2));

        console.log(plan1,"当前的牌型是飞机1 ", this.is_plan(plan1));
        console.log(plan2,"当前的牌型是飞机2 ", this.is_plan(plan2));
        console.log(plan3,"当前的牌型是飞机3 ", this.is_plan(plan3));

        console.log(plan_with_two_one1,"当前的牌型是飞机带2张单只 1 ", this.is_plan_with_two_single(plan_with_two_one1));
        console.log(plan_with_two_one2,"当前的牌型是飞机带2张单只 2 ", this.is_plan_with_two_single(plan_with_two_one2));

        console.log(plan_with_two_double1,"当前的牌型是飞机带2对 1 ", this.is_plan_with_two_double(plan_with_two_double1));
        console.log(plan_with_two_double2,"当前的牌型是飞机带2对 2 ", this.is_plan_with_two_double(plan_with_two_double2));

        console.log(shunzi1,"当前的牌型是顺子 1 ", this.is_shunzi(shunzi1));
        console.log(shunzi2,"当前的牌型是顺子 2 ", this.is_shunzi(shunzi2));


        console.log(liandui1,"当前的牌型是连对 1 ", this.is_liandui(liandui1));
        console.log(liandui2,"当前的牌型是连对 2 ", this.is_liandui(liandui2));
        console.log(liandui3,"当前的牌型是连对 3 ", this.is_liandui(liandui3));


    }
}