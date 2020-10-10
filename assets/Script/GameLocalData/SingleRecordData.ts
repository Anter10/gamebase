import BaseRecord from "./BaseRecord";
import GameLocalData from "./GameLocalData";

 
export default class SingleRecordData extends BaseRecord{
    static _name = "SingleRecord";
    base_name = "SingleRecord";
    need_convert_class: Array<string> = [];
    decode_json(data){
        super.decode_json(data);
            for(let key in this){
                for(let i = 0; i < this.need_convert_class.length; i ++){
                    const key_type = this.need_convert_class[i].split("#");
                    if(key_type[0] == key){
                        if(key_type.length >= 2){
                            if(key_type[1] == "single"){
                                const store_data: any = this[key];
                                const object: any = new GameLocalData.all_convert_single_data[store_data.store_name](store_data);
                                for(let t_key in store_data){
                                    object[t_key] = store_data[t_key];
                                }
                                object.decode_json(store_data);
                                this[key] = object;
                            }else if(key_type[1] == "array"){
                                const store_data: any = this[key];
                                const all_object: any = [];
                                for(let t_i = 0; t_i < store_data.length; t_i ++){
                                    const t_store_data: any = store_data[t_i];
                                    const object: any = new GameLocalData.all_convert_single_data[t_store_data.store_name](t_store_data);
                                    for(let t_key in t_store_data){
                                        object[t_key] = t_store_data[t_key];
                                    }
                                    object.decode_json(t_store_data);
                                    all_object.push(object);
                                }
                                this[key] = all_object;
                            }else if(key_type[1] == "dic"){
                                const store_data: any = this[key];
                                const keys = Object.keys(store_data)
                                const all_object: any = {};
                                for(let t_i = 0; t_i < keys.length; t_i ++){
                                    let store_key: any = keys[t_i];
                                    if(key_type[2] == "number"){
                                        store_key = parseInt(store_key);
                                    }
                                    const t_store_data: any = store_data[store_key];
                                    const object: any = new GameLocalData.all_convert_single_data[t_store_data.store_name](t_store_data);
                                    for(let t_key in t_store_data){
                                        object[t_key] = t_store_data[t_key];
                                    }
                                    object.decode_json(t_store_data);
                                    all_object[store_key] = object;
                                }
                                this[key] = all_object;
                            }
                        }
                    }
                }
            }
    }
}