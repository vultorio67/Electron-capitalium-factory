const start = document.getElementById('start');
const percent = document.getElementById('percent');
const info = document.getElementById('info');

const versionList = document.getElementById('version');
const typeElement = document.getElementById('type');

const fs = require('fs');

const axios = require('axios');

const xml2js = require('xml2js');

async function getForgeVersions() {
  const forgeUrl = 'https://files.minecraftforge.net/maven/net/minecraftforge/forge/maven-metadata.xml';

  try {
    // Effectuer une requête HTTP pour récupérer le contenu du fichier XML
    const response = await axios.get(forgeUrl);

    // Utiliser xml2js pour convertir le XML en un objet JavaScript
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);

    console.error(result)

    // Extraire les versions de l'objet JavaScript résultant
    const forgeVersions = result.metadata.versioning[0].versions[0].version;

    return forgeVersions;
  } catch (error) {
    console.error('Erreur lors de la récupération des versions de Forge :', error.message);
    throw error;
  }
}


async function obtenirToutesLesVersions() {
  const url = 'https://launchermeta.mojang.com/mc/game/version_manifest.json';

  try {
    const response = await axios.get(url);
    const versions = response.data.versions;

    console.log('Toutes les versions de Minecraft :');
    versions.forEach((version) => {
      if(version.type == "release")
      {
        var newVerison = document.createElement('option');
        
        // Définir la valeur et le texte de l'option (vous pouvez les adapter selon vos besoins)
        newVerison.value = version.id;
        newVerison.text = version.id;

        // Ajouter l'option à la combobox
        versionList.add(newVerison);
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des versions de Minecraft :', error.message);
  }
}


// Appel de la fonction pour obtenir toutes les versions
obtenirToutesLesVersions();


start.onclick = (e) => {
    console.log('-----------------------------')

    var gameVersion = versionList.value;
    const type = typeElement.value;

    if(type=="forge"){

      getTheForgeVersion(gameVersion).then((version) => {
        gameVersion = version;
        installGameVersion = gameVersion
        alert(gameVersion)
        gameVersion = gameVersion.replace('-', '-forge-')
      })
    

    }else{
      installGameVersion = gameVersion
    }

    const launcherDir = datastorage.getLauncherDirectory()
    //console.log(datastorage.getSelectedAccount())

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

    console.error(launcherDir+"/versions/"+gameVersion)

    if (fs.existsSync(launcherDir+"/version/"+gameVersion)) {
      command.launchMinecraft(gameVersion, launcherDir, userName, uuid, token, "default", "2", "3");
    }
    else{
      command.install(installGameVersion, launcherDir, type).then(() => {
        console.log("start mc")
        command.launchMinecraft(gameVersion, launcherDir, userName, uuid, token, "default", "2", "3");
      });
    }

    //command.launchMinecraft(gameVersion, launcherDir, userName, uuid, token, "default", "2", "3");

    //command.install(gameVersion, launcherDir, type)

    
    
}

function dossierExiste(cheminDuRepertoire, nomDuDossier) {
  try {
    // Lire le contenu du répertoire
    const fichiers = fs.readdir(cheminDuRepertoire);

    // Vérifier si le nom du dossier existe parmi les fichiers/dossiers
    const dossierExiste = fichiers.includes(nomDuDossier);

    return dossierExiste;
  } catch (err) {
    console.log(err)
  }
}


function getTheForgeVersion(vanillaVersion)
{
  getForgeVersions()
      .then((versions) => {
        console.log('Versions de Forge :', versions);
        
        var elementContenant121 = null;
        for (var i = 0; i < versions.length; i++) {
            if (versions[i].includes(vanillaVersion)) {
                elementContenant121 = versions[i];
                break; // Sortir de la boucle dès que l'élément est trouvé
            }
        }
        
        // Vérifier si un élément a été trouvé
        if (elementContenant121 !== null) {
            return elementContenant121
        } else {
            return("error")
        }


      })
      .catch((error) => {
        console.error('Erreur globale :', error.message);
      });
}
