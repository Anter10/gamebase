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
    cook_accelerate : Array<number>; 
    heart_accelerate : Array<number>; 
    upgrade_need_coin : Array<number>; 
} 

interface TableConfig { 
    id : number; 
    name : string; 
    chinese_name : string; 
    upgrade : number; 
    growth : number; 
    description : string; 
} 

interface DecorationConfig { 
    id : number; 
    name : string; 
    chinese_name : string; 
    upgrade : Array<number>; 
    growth : Array<number>; 
    description : string; 
} 

 
  

 export { AudioConfig,PeopleConfig,TableConfig,DecorationConfig, };