const $                              = require('jquery')

const VIEWS = {
    welcome: "#welcome",
    login_ask: "#loginask",
    wait: "#wait",
    base: "#base",
    cracklogin: "#cracklogin"
}

// The currently shown view container.
let currentView

function switchView(current, next, currentFadeTime = 500, nextFadeTime = 500, onCurrentFade = () => {}, onNextFade = () => {}){
    currentView = next
    $(`${current}`).fadeOut(currentFadeTime, async () => {
        await onCurrentFade()
        $(`${next}`).fadeIn(nextFadeTime, async () => {
            await onNextFade()
        })
    })
}
/**
 * Get the currently shown view container.
 * 
 * @returns {string} The currently shown view container.
 */
function getCurrentView(){
    return currentView
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  



