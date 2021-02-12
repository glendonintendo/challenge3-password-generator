/* 
  onclick of generate password button, 
  prompts user to choose password length and type of characters, 
  generates a password with those specifications,
  and displays it in the html textarea
*/

/* 
  character object holds arrays of acceptable characters and two methods:
    1. getCharTypes prompts user for each char type in keys of character objects, converts those booleans into the key names, and returns an array of those key names
    2. compilePassword takes the number of requested characters and an array of character types and randomly generates a password character by character and then validates that each character is present before returning password
*/
let characters = {
  lowercase: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
  uppercase: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
  number: ["0","1","2","3","4","5","6","7","8","9"],
  special: [" ","!","\"","#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\","]","^","_","`","{","|","}","~"],

  getCharTypes: function() {
    // function to title case a single-word string
    const toTitleCase = function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    
    // generates an array of available character types from character object
    let charArrayKeys = [];
    for (let i = 0; i < Object.keys(this).length; i++) {
      if (Array.isArray(this[Object.keys(this)[i]])) {
        charArrayKeys.push(Object.keys(this)[i]);
      }
    }

    // prompts user to schoose whether they want to include each character type in password
    let charBools = [];
    for (let i = 0; i < charArrayKeys.length; i++) {
      let charPrompt;
      if (i === 0) {
        charPrompt = `Would you like to use ${charArrayKeys[i]} characters in your password?\nClick 'OK' for YES or 'Cancel' for NO.`;
      } else {
        charPrompt = `${toTitleCase(charArrayKeys[i])} characters?\nClick 'OK' for YES or 'Cancel' for NO.`;
      }
      charBools.push(window.confirm(charPrompt));
    }
  
    // validates that at least one character type was chosen
    if (!charBools.includes(true)) {
      window.alert("You must select 'OK' for at least one of the character options in order to generate a password. Let's try again.");
      return this.getCharTypes();
    }
    
    // creates and returns an array of char types based on user inputs
    let charTypes = [];
    for (let i = 0; i < charBools.length; i++) {
      if (charBools[i]) {
        charTypes.push(Object.keys(this)[i]);
      }
    }
    return charTypes;
  },

  compilePassword: function(num, arr) {
    // creates an array from characters properties arrays that user selected
    let charArray = [];
    for (let i = 0; i < arr.length; i++) {
      charArray = charArray.concat(this[arr[i]]);
    }

    // randomly generates a password from the concatentated character array
    let password = "";
    for (let i = num; i > 0; i--) {
      const newChar = charArray[Math.floor(Math.random() * charArray.length)];
      password += newChar;
    }

    // validates that at least one character of each type is present in password, recurs if no, returns password if yes
    let validateCharTypesArray = [];
    let splitPassword = password.split("");
    for (let i = 0; i < arr.length; i++) {
      validateCharTypesArray.push(this[arr[i]].some(element => splitPassword.includes(element)));
    }

    if (validateCharTypesArray.every(i => i === true)) {
      return password;
    } else {
      return this.compilePassword(num, arr);
    }
  }
};


/* 
  getNumChar asks the user for a number between 8-128, parses it to an integer, and returns that integer
  validates that user input is a whole number between 8-128
  if 'Cancel' is chosen in the getNumChar prompt, the program will stop generating a password
*/
const getNumChar = function() {
  const numChar = window.prompt("How many characters would you like your password to be?\nPlease enter a whole number between 8 and 128 (inclusive). Then click 'OK'.");
  const numCharInt = parseInt(numChar);
  if (!numChar) {
    return false;
  } else if (
    !numChar.split("").every(i => characters.number.includes(i)) ||
    typeof numCharInt !== "number" ||
    numCharInt < 8 ||
    numCharInt > 128
  ) {
    window.alert("Please make sure to enter a whole number between 8 and 128 (inclusive). Then click 'OK'.");
    return getNumChar();
  } else {
    return numCharInt;
  }
};

/*
  takes in previous user inputs about password and creates a string of those inputs
*/
const getFinalValidate = function (num, arr) {
  let charTypesString = "";
  for (i = 0; i < arr.length; i++) {
    if (i === 0) {
      charTypesString += arr[i];
    } else if (i !== arr.length - 1) {
      charTypesString += ", " + arr[i];
    } else if (arr.length !== 2) {
      charTypesString += ", and " + arr[i];
    } else {
      charTypesString += " and " + arr[i];
    }
  }
  const validateString = `So, you would like a password that is ${num} characters long and contains ${charTypesString} characters?\nClick 'OK' to generate your password.\nClick 'Cancel' to start over.`;
  return validateString;
};

/* 
  creates a password using previously defined object methods and function expressions
*/
const generatePassword = function() {
  // calls getNumChar to get length of generated password; if numChar is falsy, passes undefined
  const numChar = getNumChar();
  if (!numChar) {
    return;
  }
  
  // calls getCharBools to get a list of booleans in the same position order as character object keys
  const charTypes = characters.getCharTypes();

  // validates choices a final time
  const finalValidate = window.confirm(getFinalValidate(numChar, charTypes));
  if (!finalValidate) {
    return generatePassword();
  }

  // calls compilePassword from the characters object to generate a password using data from user entries
  window.alert("Okay. Generating your password now...");
  const password = characters.compilePassword(numChar, charTypes);

  return password;
};

/* 
  Get references to the #generate element 
  Add event listener to generate button
*/
const generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", writePassword);

/* 
  Write password to the #password input
  if 'Cancel' is clicked in numChar prompt, textarea is not changed
*/
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");

  if (password) {
    passwordText.value = password;
  }
};