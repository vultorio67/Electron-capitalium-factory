const currentDirectory = process.cwd();
const { spawn } = require('child_process');

const EventEmitter = require('events');

class ExeEmitter extends EventEmitter {}

exports.installVanilla = async function(callback, version, path) {
    console.log(version, path)
    // Chemin vers le fichier .exe à exécuter
const exePath = currentDirectory+"/main.exe";

// Arguments à passer au fichier .exe
// --install --version 1.20.1-47.2.20 --type forge --emplacement C:\Minecraft

const args = [
  '--install', 
  '--version', version,
  '--type', 'vanilla',
  '--emplacement', datastorage.getLauncherDirectory()
  // Ajoutez d'autres paires clé-valeur selon vos besoins
];

const exeEmitter = executerFichierExe(exePath, args);

// Écoutez l'événement pour chaque nouvelle ligne
exeEmitter.on('nouvelleLigne', (ligne) => {
    callback(ligne)
  //alert(ligne)
  // Ajoutez votre logique pour traiter chaque nouvelle ligne ici
});

// Écoutez l'événement de fin d'exécution
exeEmitter.on('finExecution', (resultat) => {
  console.log('Fin de l\'exécution :', resultat);
  // Ajoutez votre logique pour traiter la fin d'exécution ici
});

// Écoutez l'événement d'erreur
exeEmitter.on('erreur', (erreur) => {
  console.error('Erreur :', erreur);
  // Ajoutez votre logique pour traiter les erreurs ici
});


}

function executerFichierExe(cheminFichierExe, arguments) {
    const exeEmitter = new ExeEmitter();
  
    const childProcess = spawn(cheminFichierExe, arguments, { stdio: 'pipe', encoding: 'utf-8' });
  
    // Accumule la sortie standard
    let sortieStandard = '';
  
    // Événement pour la sortie standard
    childProcess.stdout.on('data', (data) => {
      sortieStandard += data;
      const lignes = sortieStandard.split('\n');
      sortieStandard = lignes.pop(); // La dernière ligne incomplète (si elle existe) est stockée pour la prochaine itération
  
      // Émet un événement pour chaque ligne complète
      lignes.forEach((ligne) => exeEmitter.emit('nouvelleLigne', ligne));
  
      //console.log(`Sortie de l'application : ${data}`);
    });
  
    // Événement pour la sortie d'erreur
    childProcess.stderr.on('data', (data) => {
      console.error(`Erreur de l'application : ${data}`);
      // Vous pouvez également émettre un événement d'erreur ici
    });
  
    // Événement de fin d'exécution
    childProcess.on('close', (code) => {
      console.log(`Processus fils terminé avec le code de sortie : ${code}`);
      exeEmitter.emit('finExecution', { sortieStandard, code });
    });
  
    // Gestion d'éventuelles erreurs
    childProcess.on('error', (error) => {
      console.error(`Erreur lors du lancement du processus : ${error.message}`);
      exeEmitter.emit('erreur', error);
    });
  
    return exeEmitter;
  }

async function installForge(version, path)
{
    
}