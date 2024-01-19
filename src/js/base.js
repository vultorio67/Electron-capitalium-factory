const start = document.getElementById('start');
const percent = document.getElementById('percent');
const info = document.getElementById('info');

const fs = require('fs');

const gameVersion = "1.20.1-forge-47.2.20"
const type = "forge"


start.onclick = (e) => {
    console.log('-----------------------------')

    const launcherDir = datastorage.getLauncherDirectory()
    //console.log(datastorage.getSelectedAccount())

    if(directoryExists(launcherDir+"/version/"+gameVersion))
    {
      console.log("the version is already donwload")
    }
    else {
      command.install(gameVersion, launcherDir, type)
    }


    const selectedAccount = datastorage.getSelectedAccount()
    var token = ""
    if(datastorage.getType(selectedAccount) == "microsoft")
    {
      token = datastorage.getToken(selectedAccount)
    }
    else {
      token = "default"
    }

    console.log(token)

    const userName = datastorage.getUserName(selectedAccount)
    const uuid = datastorage.getuuid(selectedAccount)

    console.log(datastorage.getUserName(selectedAccount))
    command.launchMinecraft(gameVersion, launcherDir, userName, uuid, token, "default", "2", "3")
    
}



function directoryExists(path) {
  try {
    return fs.statSync(path).isDirectory();
  } catch (error) {
    if (error.code === 'ENOENT') {
      // The directory does not exist
      return false;
    } else {
      // Other errors (e.g., permission issues)
      throw error;
    }
  }
}
