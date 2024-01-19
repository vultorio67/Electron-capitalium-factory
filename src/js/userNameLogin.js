const input    = document.getElementById('input-userNameLogin')
const button    = document.getElementById('button-userNameLogin')
const { v4: uuidv4 } = require('uuid');


button.onclick = (e) => {
   console.log(input.value)
   var username = input.value
   const currentDate = new Date();

   if(username == "")
   {
      alertOverlay("Veuillez entrer votre pseudo")
   }
   else {

      if (isUsernameAvailable(datastorage.getAuthDatabase(), username)) {
         console.log(`${username} is available.`);
               // Générer un UUID v4 et obtenir sa représentation hexadécimale
         const randomUuidHex = uuidv4();
         const uuid = randomUuidHex.replace(/-/g, '');
         console.log(uuid);

         datastorage.addUserNameAccount(username, uuid, currentDate)

       } else {
         console.log(`${username} is already taken.`);
       }

       switchView(getCurrentView(), VIEWS.base)

   }

}


function isUsernameAvailable(database, username) {
   for (const userId in database) {
     if (database.hasOwnProperty(userId)) {
       const entry = database[userId];
       if (entry.type === 'userName' && entry.username === username) {
         return false; // Username already exists
       }
     }
   }
   return true; // Username is available
 }