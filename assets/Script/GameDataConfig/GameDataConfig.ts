import CommonServerData from "../GameServerData/CommonServerData";

class GameDataConfig{
    public static all_config_data:{[key: string]: any} = {};
    
    static init(){
         cc.resources.load("./Config/config", cc.JsonAsset, (error: Error, json: cc.JsonAsset) => {
             if(!error){
                const keys = Object.keys(json.json);
                this.all_config_data = json.json;
                cc.log(`config:${JSON.stringify(json)}`)
                this.server_request_server_config();
             }else{
             }
         });
    }

    /**@description 得到服务器端的JSON数据配置 */
    static server_request_server_config(){
         CommonServerData.request_game_config_data((server_config: any)=>{
              if(server_config){
                 console.log("当前服务器返回的游戏配置数据 = ",server_config);
                 const keys = Object.keys(server_config);
                 for(const key of keys){
                     this.all_config_data[key] = server_config[key];
                 }
              }
         });
    }

    // 实例用法
    // const config: Audio = this.get_data<Audio>("Audio", 1);
    // console.log("当前的json 数据  = ",config);
     /**@description 可以强制类型转化成想要的类型的来使用 如:GuideData */
    static get_config_by_id<T>(config_name: string, config_id: number): T {
        const configs = this.all_config_data[config_name];
        if(configs){
            for(const config of configs){
                if(config.id == config_id){
                    return config;
                }
            }
        }else{
            console.error(`当前读取配置信息失败 ${config_name} ${config_id}`);
        }
    }

    /**@description 得到整个某个配置的所有数据的Array */
    static get_config_array<T>(config_name: string): T {
        const configs = this.all_config_data[config_name];
        if(configs){
           return configs;
        }else{
            console.error(`当前读取配置信息失败 ${config_name}`);
        }
    }

    

};


export default GameDataConfig;