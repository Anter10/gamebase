import {Audio} from "./ConfigInterface";

class GameDataConfig{
    public static all_config_data:{[key: string]: any} = {};

    static init(){
         cc.resources.load("./Config/config", cc.JsonAsset, (error: Error, json: cc.JsonAsset) => {
             if(!error){
                const keys = Object.keys(json.json);
                this.all_config_data = json.json;
             }else{
             }
         })
    }
    
    // 实例用法
    // const config: Audio = this.get_data<Audio>("Audio", 1);
    // console.log("当前的json 数据  = ",config);
     /**@description 可以强制类型转化成想要的类型的来使用 如:GuideData */
    static get_data<T>(config_name: string, config_id: number): T {
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

};


export default GameDataConfig;