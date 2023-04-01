const microsoft    = document.getElementById('loginOptionMicrosoft')
const crack    = document.getElementById('loginOptionCrack')

microsoft.onclick = (e) => {
    switchView(getCurrentView(), VIEWS.wait)
    setTimeout(function(){
        ipc.sendSync(MSFT_OPCODE.OPEN_LOGIN)
    }, 1000);
    
}