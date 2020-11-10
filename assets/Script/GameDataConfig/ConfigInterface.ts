interface AudioConfig { 
    id : number; 
    name : string; 
    time : number; 
    loop : boolean; 
    info : string; 
} 

interface DecorationConfig { 
    id : number; 
    name : string; 
    chinese_name : string; 
    upgrade : Array<number>; 
    growth : Array<number>; 
    description : string; 
} 

interface ChatConfig { 
    id : number; 
    text : string; 
} 

interface MenuConfig { 
    id : number; 
    chinese_name : string; 
    sell_price : number; 
    ad_number : number; 
} 

interface OfflineConfig { 
    id : number; 
    gold : number; 
    heart : number; 
} 

interface PeopleConfig { 
    id : number; 
    picture_name : string; 
    chinese_name : string; 
    type : number; 
    cook_gold_accelerate : Array<number>; 
    cook_speed_accelerate : Array<number>; 
    upgrade_need_coin : Array<number>; 
} 

interface StoreUpgradeConfig { 
    id : number; 
    name : string; 
    heart_number : number; 
    cash_number : number; 
    upgrade_need_table : Array<number>; 
    upgrade_need_decoration : Array<number>; 
    upgrade_need_cook_woman : Array<number>; 
} 

interface TableConfig { 
    id : number; 
    name : string; 
    chinese_name : string; 
    upgrade : number; 
    growth : number; 
    description : string; 
} 

interface UnlockMenuRewardConfig { 
    id : number; 
    unlock_menu : number; 
    reward_coin : number; 
    reward_heart : number; 
} 

 
  

 export { AudioConfig,DecorationConfig,ChatConfig,MenuConfig,OfflineConfig,PeopleConfig,StoreUpgradeConfig,TableConfig,UnlockMenuRewardConfig, };