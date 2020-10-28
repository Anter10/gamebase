let fs = require("fs");
const exec = require('child_process').execSync;
const exportdata = require("hs_export_data");

// 需要传给服务器端的配置
const server_data_config =[
    "AudioConfig",
];

console.log("server_data_config ",server_data_config);


function execute(cmd) {
    exec(cmd, { stdio: 'inherit' });
}

function export_config() {
   exportdata("./../assets/resources/Config" ,"config.json","./../config", "./../assets/Script/GameDataConfig", server_data_config);
}

function export_server_config() {
    exportdata("./../assets/resources/ServerConfig" ,"server_config.json","./../config", "./../assets/Script/GameDataConfig");
 }

function main() {
    console.log("exportdata ", exportdata);
    export_config();
}

main();