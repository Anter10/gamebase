class BaseRecord{
    /** @description 自动更新存档的方法 */
    static update_data: Function = null;
    decode_json(json: any){
         for(let key in this){
             if(json.hasOwnProperty(key)){
                 this[key] = json[key];
             }
         }
    };

    init(param: any = {}){
        
    }
    
    /**@description 手动存储存档 */
    store(){
        BaseRecord.update_data && BaseRecord.update_data(self);
    }

    auto_call(){
        
    }

    // 自动存档根据自己的需要看是否每次更改都存储
    apply_auto_update () {
         const self = this;
         for (let key in this) {
             if (this.hasOwnProperty(key)) {
                 let _value = this[key];
                 Object.defineProperty(this, key, {
                     set: (value: any) => {
                         // 只有变化才会存储
                         let _origin_value_had_changed = true;
                         if((typeof(_value) == "number" || typeof(_value) == "string") && _value == value){
                             _origin_value_had_changed = false;
                         }
                         _value = value;
                         if(_origin_value_had_changed){
                            BaseRecord.update_data && BaseRecord.update_data(self);
                             self.auto_call && self.auto_call();
                         }
                     },
                     get: (): any => {
                         return _value;
                     }
                 });
             }
         }
  }
}

export default BaseRecord;