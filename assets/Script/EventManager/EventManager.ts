import { GameEvent } from "./GameEvent";



class EventListener {
    event_name: string = ''
    target: Object = null
    cb: Function = null
    constructor (event_name: string, target: Object, cb: Function) {
        this.event_name = event_name;
        this.target = target;
        this.cb = cb;
    }

    trigger (...param: any[]) {
        this.cb.apply(this.target, param);
    }
}

export default class EventManager {
    private static _instance: EventManager
    static get_instance(): EventManager {
        if (!this._instance) {
            this._instance = new EventManager();
        }
        return this._instance;
    }

    _event_dict: Object = {}

    /**
     * @description 注册事件监听
     * @param event_name 
     * @param target 
     * @param cb 
     */
    listen (event_name: string, target: Object, cb: Function) {
        let listener_list = this._event_dict[event_name];
        if (listener_list) {
            this.cancel_listen(event_name, target, cb);
        }
        else {
            listener_list = [];
            this._event_dict[event_name] = listener_list;
        }
        let listener = new EventListener(event_name, target, cb);
        listener_list.push(listener);
    }

    /**
     * @description 注销事件监听
     * @param event_name 
     * @param handle 
     * @param cb 
     */
    cancel_listen (event_name: string, target: Object, cb: Function) {
        let listener_list = this._event_dict[event_name];
        if (listener_list) {
            for (let i = 0; i < listener_list.length; ++i) {
                let listener = listener_list[i];
                if (listener.target === target) {
                    listener_list.splice(i, 1)
                    break;
                }
            }
        }
    }

    /**
     * 分发事件
     * @param event 事件对象或者事件名
     */
    emit(event: GameEvent|string, ...param: any[]) {
        if (typeof event === 'string') {
            event = new GameEvent(event);
        }
        let listener_list = this._event_dict[event.name];
        if (listener_list) {
            for (let i = listener_list.length - 1; i >= 0; --i) {
                if (event.is_swallow) {
                    break;
                }
                let listener = listener_list[i];
                let real_param = [event];
                for (let i = 0; i < param.length; ++i) {
                    real_param.push(param[i]);
                }
                listener.trigger(...real_param);
            }
        }
    }

}