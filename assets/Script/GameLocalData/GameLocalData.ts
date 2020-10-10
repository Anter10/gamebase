import BaseRecord from "./BaseRecord";
import GameRecord from "./GameRecord";
import GuideData from "./GuideData";
import TurnTableData from "./TurnTableData";

class GameLocalData{
    static _instance: GameLocalData = null;
    private _game_data: {[key: string]: any} = {};
    private _store_key: string = "game_data";

    private _all_store_data: Array<any> = [
           GuideData,
           GameRecord,
           TurnTableData,
    ];

    
    public static all_convert_single_data: Object = {
          
    }

    static get_instance(): GameLocalData{
        if(!this._instance){
            this._instance = new GameLocalData();
        }

        return this._instance;
    }
    

    public init(){
        BaseRecord.update_data = this.store_data.bind(this);
        const local_cur_store_data = cc.sys.localStorage.getItem(this._store_key);
        var cur_store_data = {};

        if (local_cur_store_data) {
            cur_store_data = JSON.parse(local_cur_store_data);
        } 

        for (const store_type of this._all_store_data) {
            const store_key = store_type._name;
            const store_data = cur_store_data[store_key];
            if (!store_data) {
                this._game_data[store_key] = new store_type();
            } else {
                const record = new store_type();
                record.decode_json(store_data);
                this._game_data[store_key] = record
            }
        }

        console.log("当前玩家的存档数据  =" , this._game_data);

        this.store_data();
    }

    store_data(store_data?: any) {
        const keys = Object.keys(this._game_data)
        if (keys.length == 0) {
            return;
        }

        if(store_data){
           cc.sys.localStorage.setItem(this._store_key, JSON.stringify(store_data));
        }else{
           cc.sys.localStorage.setItem(this._store_key, JSON.stringify(this._game_data));
        }
   
    }
    
    clear_data(){
        this.store_data({});
    }

    /**@description 可以强制类型转化成想要的类型的来使用 如:GuideData */
    get_data<T>(store: { new(): T; _name: string }): T {
        return this._game_data[store._name];
    }

    /**@description 清空某个类型的数据 如:GuideData */
    remove_data<T>(store: { new(): T; _name: string }): boolean{
        if(this._game_data[store._name]){
            this._game_data[store._name] = new store();
            console.log(`清空数据成功${store._name}`);
            this.store_data();
            return true;
        }else{
            return false;
        }
    }
    
}


export default GameLocalData;