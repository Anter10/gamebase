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

interface TableConfig { 
    id : number; 
    name : string; 
    chinese_name : string; 
    upgrade : number; 
    growth : number; 
    description : string; 
} 

 
  

 export { AudioConfig,DecorationConfig,TableConfig, };