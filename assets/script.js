// Assignment code here
var characters = {
  lower: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
  upper: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
  number: ["0","1","2","3","4","5","6","7","8","9"],
  special: [" ","!","\"","#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\","]","^","_","`","{","|","}","~"]
}

function generatePassword () {
  var pw = "";
  var numChar = window.prompt("How many characters long would you like your password to be? (please choose a number between 8 and 128)");
  charBools = [
    window.confirm("Would you like to use lowercase characters in your password? Choose 'OK' for Yes or 'Cancel' for No."),
    window.confirm("Uppercase characters?"),
    window.confirm("Numbers?"),
    window.confirm("Special characters?")
  ];
  console.log(charBools);
  window.alert("Okay. Generating your password now...");

  var selectedCharTypes = [];
  if (charBools[0]) {
    selectedCharTypes.push("lower");
  }
  if (charBools[1]) {
    selectedCharTypes.push("upper");
  }
  if (charBools[2]) {
    selectedCharTypes.push("number");
  }
  if (charBools[3]) {
    selectedCharTypes.push("special");
  }
  console.log(selectedCharTypes);

  for (i = numChar; i > 0; i--) {
    var charType = selectedCharTypes[Math.floor(Math.random() * selectedCharTypes.length)];
    var newChar = characters[charType][Math.floor(Math.random() * characters[charType].length)];
    pw += newChar;
  }

  return pw;
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
