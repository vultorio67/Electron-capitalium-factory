const start = document.getElementById('start');

const gameVersion = "1.20.1"

  // Fonction de callback
  function gestionResultat(resultat) {
    changerH1(resultat)
  }

start.onclick = (e) => {
    console.log('-----------------------------')
      // Utilisation de la fonction asynchrone avec le callback
  command.installVanilla(gestionResultat, gameVersion, datastorage.getDataDirectory());

    
}

function changerH1(inside) {
    // Accéder à l'élément h1 par son identifiant
    var monH1 = document.getElementById("monH1");
  
    // Vérifier si l'élément existe
    if (monH1) {
      // Changer le contenu de l'élément h1
      monH1.textContent = inside;
    } else {
      console.error("Élément h1 introuvable");
    }
  }