// Assignment code here
let characters = {
  lower: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
  upper: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
  number: ["0","1","2","3","4","5","6","7","8","9"],
  special: [" ","!","\"","#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\","]","^","_","`","{","|","}","~"],
  compilePassword: function(num, arr) {
    let pwProto = "";

    let charTypeCheck = [];
    for (let i = num; i > 0; i--) {
      let charTypeIndex = Math.floor(Math.random() * arr.length);
      let charType = arr[charTypeIndex];
      let newChar = this[charType][Math.floor(Math.random() * this[charType].length)];
      pwProto += newChar;
      charTypeCheck.push(arr[charTypeIndex]);
    }
    console.log(charTypeCheck);
    console.log(pwProto);
    
    if (arr.every(type => charTypeCheck.includes(type))) {
      console.log(pwProto);
      return(pwProto);
    } else {
      return this.compilePassword(num, arr);
    }
  }
};

var getNumChar = function() {
  var numChar = parseInt(window.prompt("How many characters long would you like your password to be? Please choose a whole number between 8 and 128 (inclusive). Then click 'OK'."));
  if (typeof numChar === "number" && numChar >= 8 && numChar <= 128) {
    return numChar;
  } else {
    window.alert("Please make sure to enter a whole number between 8 and 128 (inclusive). Then click 'OK'.");
    return getNumChar();
  }
};

var getCharBools = function() {
  var charBools = [
    window.confirm("Would you like to use lowercase characters in your password? Choose 'OK' for Yes or 'Cancel' for No."),
    window.confirm("Uppercase characters?"),
    window.confirm("Numbers?"),
    window.confirm("Special characters?")
  ];

  if (charBools.includes(true)) {
    return charBools;
  } else {
    window.alert("You must choose one 'OK' for one of the following options in order to generate a password. Let's try again.")
    return getCharBools();
  }
};

var generatePassword = function() {
  var numCharActual = getNumChar();
  var charBoolsActual = getCharBools();
  
  window.alert("Okay. Generating your password now...");

  var selectedCharTypes = [];
  for (var i = 0; i < charBoolsActual.length; i++) {
    if (charBoolsActual[i]) {
      selectedCharTypes.push(Object.keys(characters)[i]);
    }
  }

  let pw = characters.compilePassword(numCharActual, selectedCharTypes);

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
