const datastorage = require('./js/util/dataStorage')

const start = document.getElementById('start');

start.onclick = (e) => {
    console.log('-----------------------------')
    datastorage.defaultJavaConfig17();
    
}