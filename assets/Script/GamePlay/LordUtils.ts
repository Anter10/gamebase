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

    /**@description 发牌逻辑 */
    static deal_cards(deal_cards_type: LordDealCardsType): DealCardInterface {
        const t_cards: Array<LordCardInterface> = LordUtils.shuffle_card();
        let deal_cards: DealCardInterface = null;
        if (deal_cards_type == LordDealCardsType.none) {
            deal_cards = this.normal_deal_cards(t_cards);
        }
        return deal_cards;
    }
}