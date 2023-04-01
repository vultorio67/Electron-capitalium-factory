const microsoft    = document.getElementById('loginOptionMicrosoft')
const crack    = document.getElementById('loginOptionCrack')

microsoft.onclick = (e) => {
    switchView(getCurrentView(), VIEWS.wait)
    setTimeout(function(){
        console.log(ipc.sendSync("open"))
    }, 1000);
    
}