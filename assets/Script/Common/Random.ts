
"use strict";
/**
 * 线性同余随机数生成器
 */
class Random {
    public seed : number = new Date().getTime();
    static seed : number = new Date().getTime();

    /**
     * 创建一个随机数生成器
     */
    constructor(seed) {
        this.seed = seed;
        if (!this.seed && this.seed != 0) {
            this.seed = new Date().getTime();
        }
    }
    /**
     * 返回一个随机数，在0.0～1.0之间
     */
    get value() {
        return this.range(0, 1);
    }
    /**
     * 返回半径为1的圆内的一个随机点
     */
    get insideUnitCircle() {
        var randomAngle = this.range(0, 360);
        var randomDis = this.range(1, 0);
        var randomX = randomDis * Math.cos(randomAngle * Math.PI / 180);
        var randomY = randomDis * Math.sin(randomAngle * Math.PI / 180);
        return { x: randomX, y: randomY };
    }
    /**
     * 返回半径为1的圆边的一个随机点
     */
    get onUnitCircle() {
        var randomAngle = this.range(0, 360);
        var randomX = Math.cos(randomAngle * Math.PI / 180);
        var randomY = Math.sin(randomAngle * Math.PI / 180);
        return { x: randomX, y: randomY };
    }
    /**
     * 返回一个在min和max之间的随机浮点数
     */
    range(min, max) {
        if (!this.seed && this.seed != 0) {
            this.seed = new Date().getTime();
        }
        max = max || 1;
        min = min || 0;
        this.seed = (this.seed * 9301 + 49297) % 233280;
        var rnd = this.seed / 233280.0;
        return min + rnd * (max - min);
    }
    /**
     * 返回一个随机数，在0.0～1.0之间
     */
    static get value() {
        return this.range(1, 0);
    }
    /**
     * 返回半径为1的圆内的一个随机点
     */
    static get insideUnitCircle() {
        var randomAngle = this.range(0, 360);
        var randomDis = this.range();
        var randomX = randomDis * Math.cos(randomAngle * Math.PI / 180);
        var randomY = randomDis * Math.sin(randomAngle * Math.PI / 180);
        return { x: randomX, y: randomY };
    }
    /**
     * 返回半径为1的圆边的一个随机点
     */
    static get onUnitCircle() {
        var randomAngle = this.range(0, 360);
        var randomX = Math.cos(randomAngle * Math.PI / 180);
        var randomY = Math.sin(randomAngle * Math.PI / 180);
        return { x: randomX, y: randomY };
    }
    /**
     * @description 返回一个在min和max之间的随机浮点数
     */
    static range(min = 0, max = 1) {
        if (!Random.seed && Random.seed != 0) {
            Random.seed = new Date().getTime();
        }
        max = max || 1;
        min = min || 0;
        Random.seed = (Random.seed * 9301 + 49297) % 233280;
        var rnd = Random.seed / 233280.0;
        return min + rnd * (max - min);
    }
    /**
     * 返回一个在min和max之间的随机整数,包括最大值
     */
    static rangeInt(min, max) {
        var Range = max - min;
        var Rand = Random.range(0, 1);
        return (min + Math.round(Rand * Range));
    }
    /**返回一个arr[0]到arr[1]之间的随机整数,包括最大值 */
    static rangeIntByArr(arr) {
        if (arr.length < 2) {
            return 0;
        }
        return Random.rangeInt(arr[0], arr[1]);
    }
    /**返回一个arr[0]到arr[1]之间的随机数,包括最大值 */
    static rangeByArr(arr) {
        if (arr.length < 2) {
            return 0;
        }
        return Random.range(arr[0], arr[1]);
    }
    /**从数组里随机一个元素 */
    static rangeFromArr(arr) {
        let idx = Random.rangeInt(0, arr.length - 1);
        return arr[idx];
    }
    /**根据权重数组的概率分布,随机抽取值数组里的元素 */
    static getValueByWeight(arrValue, arrWeight) {
        let random = Random.range();
        // cc.log("getValueByWeight  random range===>>> ", random)
        let temp = 0;
        for (let i = 0; i < arrValue.length; i++) {
            const weight = arrWeight[i] + temp;
            if (random <= weight) {
                // cc.log("getValueByWeight  随到了===>>> ", arrValue[i])
                return arrValue[i];
            }
            temp = weight;
        }
        // cc.log("getValueByWeight 没随到 ")
        return null;
    }
}


exports.Random = Random;
