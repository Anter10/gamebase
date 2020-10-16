interface AudioConfig { 
    id : number; 
    name : string; 
    time : number; 
    loop : boolean; 
    info : string; 
} 

interface TableConfig { 
    id : number; 
    name : string; 
    chinese_name : string; 
    upgrade : number; 
    growth : number; 
    description : string; 
} 

 
  

 export { AudioConfig,TableConfig, };