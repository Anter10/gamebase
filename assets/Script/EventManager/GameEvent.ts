/**
 * @description 通用无参数事件
 */
class GameEvent {
    /**
     * @description 事件名称
     */
    name: string = ''
    /**
     * @description 事件是否已被吞掉
     */
    is_swallow: boolean = false

    constructor (name: string) {
        this.name = name;
    }
}
export {GameEvent}