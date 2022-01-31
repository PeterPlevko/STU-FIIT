const {ipcRenderer} = require('electron');

ipcRenderer.on('datar',(event,data)=>{
    console.log('got data');
    var uint8array = new TextEncoder().encode("¢");
    var string = new TextDecoder().decode(data);
    document.getElementById('output').innerHTML = string;
});