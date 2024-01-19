const currentDirectory = process.cwd();
const { spawn } = require('child_process');
const dataStorage = require('./dataStorage');

const exePath = currentDirectory+"/main.exe";

exports.install = function(version, path, type) {

  var exec = require('child_process').exec;
  
  // Arguments à passer au fichier .exe
  // --install --version 1.20.1-47.2.20 --type forge --emplacement C:\Minecraft

  const args = [
    '--install', 
    '--version', version,
    '--type', type,
    '--emplacement', path,
    // Ajoutez d'autres paires clé-valeur selon vos besoins
  ];

  const argsString = args.join(' ');

  console.log(argsString);

  var result = '';

  let sortieStandard = '';

  console.log(exePath +" "+ argsString)

  var child = spawn(exePath, args);
  var result = ""

  child.stdout.on('data', function(data) {

    result = result+data

    sortieStandard += data;
    const lignes = sortieStandard.split('\n');
    sortieStandard = lignes.pop(); // La dernière ligne incomplète (si elle existe) est stockée pour la prochaine itération

    // Émet un événement pour chaque ligne complète
    lignes.forEach((ligne) => print(ligne));

  });

  child.stderr.on('data', (data) => {
    print("error")
    console.error(`Error Output: ${data}`);
  });

  child.on('close', function() {
      console.log('done');
      console.log(result);
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log('Child process finished correctly.');
    } else {
      console.error(`Child process exited with code ${code}. There might be an error.`);
      print("error")
    }
  });


}


exports.launchMinecraft = function(version, path, userName, uuid, token, javaExcutable, ram_min, ram_max)
{

  var exec = require('child_process').exec;
  
  // Arguments à passer au fichier .exe
  // --install --version 1.20.1-47.2.20 --type forge --emplacement C:\Minecraft

  const args = [
    '--launch', 
    '--version', version,
    '--emplacement', path,
    '--name', userName,
    '--uuid', uuid,
    '--token', token,
    '--javaExecutable', javaExcutable,
    '--ramMin', ram_min,
    '--ramMax', ram_max
    // Ajoutez d'autres paires clé-valeur selon vos besoins
  ];

  const argsString = args.join(' ');

  var result = '';

  let sortieStandard = '';

  console.log(exePath +" "+ argsString)

  var child = spawn(exePath, args);
  var result = ""

  child.stdout.on('data', function(data) {

    result = result+data

    sortieStandard += data;
    const lignes = sortieStandard.split('\n');
    sortieStandard = lignes.pop(); // La dernière ligne incomplète (si elle existe) est stockée pour la prochaine itération

    // Émet un événement pour chaque ligne complète
    //lignes.forEach((ligne) => executeCommand);

  });

  child.stderr.on('data', (data) => {
    print("error")
    console.error(`Error Output: ${data}`);
  });

  child.on('close', function() {
    executeCommand(result)
  });
    
}



function print(text)
{
  if(text.includes("percent"))
  {
    var ret = text.replace('percent:','');

    percent.textContent = ret
  }
  else{
      info.textContent = text;
  }
}

var sortieStandard

function executeCommand(command)
{

  //console.error(command)

  let validJsonString = command.replace(/'/g, '"');

  let args = JSON.parse(validJsonString);

  console.error(args)

  const javaEx = args[0]

  //delete the javaex from the list
  args.splice(0,1)
  //command[0].shift

  console.log(javaEx)
  console.log(args)

  const child = spawn(javaEx, args);
  var result = ""

  child.stdout.on('data', function(data) {

    result = result+data

    sortieStandard += data;
    const lignes = sortieStandard.split('\n');
    sortieStandard = lignes.pop(); // La dernière ligne incomplète (si elle existe) est stockée pour la prochaine itération

    // Émet un événement pour chaque ligne complète
    lignes.forEach((ligne) => console.log(`\x1b[31m[Minecraft]\x1b[0m ${ligne}`));

  });

  child.stderr.on('data', (data) => {
    print("error")
    console.error(`Error Output: ${data}`);
  });

  child.on('close', function() {
      console.log('done');
      console.log(result);
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log('Child process finished correctly.');
    } else {
      console.error(`Child process exited with code ${code}. There might be an error.`);
      print("error")
    }
  });

}