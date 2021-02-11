/* 
  onclick of generate password button, 
  prompts user to choose password length and type of characters, 
  and then generates a password with those specifications
*/

/* 
  character object holds arrays of acceptable characters and two methods:
    1. charType confirm takes an array of booleans, and creates a new array with their relation to characters keys
    2. compilePassword takes the number of requested characters and an array of character types and randomly generates a password character by character
*/
let characters = {
  lowercase: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
  uppercase: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
  number: ["0","1","2","3","4","5","6","7","8","9"],
  special: [" ","!","\"","#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\","]","^","_","`","{","|","}","~"],
  
  charTypeConfirm: function(arr) {
    var selectedCharTypes = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        selectedCharTypes.push(Object.keys(this)[i]);
      }
    }
    console.log(selectedCharTypes);
    return selectedCharTypes;
  },

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

    if (arr.every(type => charTypeCheck.includes(type))) {
      return(pwProto);
    } else {
      return this.compilePassword(num, arr);
    }
  }
};


/* 
  getNumChar asks the user for a number between 8-128, parses it to an integer, and returns that integer
  if 'Cancel' is chosen in the getNumChar prompt, the program will stop generating a password
*/
var getNumChar = function() {
  var numChar = window.prompt("How many characters long would you like your password to be? Please choose a whole number between 8 and 128 (inclusive). Then click 'OK'.");
  if (!numChar) {
    return numChar;
  }

  let numCharInt = parseInt(numChar);
  if (typeof numCharInt === "number" && numChar >= 8 && numChar <= 128) {
    return numCharInt;
  } else {
    window.alert("Please make sure to enter a whole number between 8 and 128 (inclusive). Then click 'OK'.");
    return getNumChar();
  }
};

/* 
  getCharBools prompts the user four times, once for each character type, and returns a list of booleans
  if user chooses 'Cancel' on each of the four prompts, the user will be asked to answer 'OK' on at least one of the prompts
*/
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

/* 
  creates a password using previously defined object properties, object methods, and function expressions
*/
var generatePassword = function() {
  // calls getNumChar to get length of generated password; if numCharActual is falsy, passes undefined
  var numCharActual = getNumChar();
  if (!numCharActual) {
    return;
  }
  
  // calls getCharBools to get a list of booleans in the same position order as character object keys
  var charBoolsActual = getCharBools();
  
  // calls charTypeConfirm method from the characters object to create a list of the character types selected
  var selectedCharTypesActual = characters.charTypeConfirm(charBoolsActual);

  // validates choices a final time
  let validateString;
  if (selectedCharTypesActual === 1) {
    validateString = `So, you would like a password that is ${numCharActual} characters long and contains only ${selectedCharTypesActual[0]}?`;
  } else {
    charTypeString = "";
    for (i = 0; i < selectedCharTypesActual.length; i++) {
      if (i !== selectedCharTypesActual - 1) {
        charTypeString += selectedCharTypesActual[i] + ", ";
      } else {
        charTypeString += "and " + selectedCharTypesActual[i];
      }
    }
    validateString = `So, you would like a password that is ${numCharActual} characters long and contains ${charTypeString} characters?`;
  }
  
  let finalValidate = window.confirm(validateString);
  if (!finalValidate) {
    return generatePassword();
  }
  

  // calls compilePassword from the characters object to generate a password using data from user entries
  window.alert("Okay. Generating your password now...");
  let pw = characters.compilePassword(numCharActual, selectedCharTypesActual);

  return pw;
};

/* Get references to the #generate element */
var generateBtn = document.querySelector("#generate");

/* 
  Write password to the #password input
  if 'Cancel' is clicked in numChar prompt, textarea is not changed
*/
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  if (password) {
    passwordText.value = password;
  }

};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
