interface DecorationConfig { 
    id : number; 
    name : string; 
    chinese_name : string; 
    upgrade : Array<number>; 
    growth : Array<number>; 
    description : string; 
} 

interface AudioConfig { 
    id : number; 
    name : string; 
    time : number; 
    loop : boolean; 
    info : string; 
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

interface MenuConfig { 
    id : number; 
    chinese_name : string; 
    sell_price : number; 
    ad_number : number; 
} 

interface ChatConfig { 
    id : number; 
    text : string; 
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

 
  

 export { DecorationConfig,AudioConfig,PeopleConfig,StoreUpgradeConfig,MenuConfig,ChatConfig,TableConfig,UnlockMenuRewardConfig, };