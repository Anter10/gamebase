let fs = require("fs");
const exec = require('child_process').execSync;
const exportdata = require("hs_export_data");

function execute(cmd) {
    exec(cmd, { stdio: 'inherit' });
}


function export_config() {
   exportdata("./../assets/resources/Config" ,"config.json","./../config", "./../assets/Script/GameDataConfig");
}

function main() {
    console.log("exportdata ", exportdata);
    export_config();
}

main();