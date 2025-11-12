const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz"
const numbers = "0123456789"
const specifiCharacters = "!@#$%^&*"
const allCharacters = upperCaseChars + lowerCaseChars + numbers + specifiCharacters
const passwordBox = document.getElementById("password")
const generateButton = document.getElementById("generateBtn")
const copyBtn = document.querySelector(".display img")
const passwordLength = 18
function generatePassword() {
  let password = ""
  for (let i = 0; i < passwordLength; i++) {
    password += allCharacters[Math.floor(Math.random()*allCharacters.length)]
  }
  passwordBox.value = password
}
function copy(){
  passwordBox.select() 
  navigator.clipboard.writeText(passwordBox.value)
}
generateButton.addEventListener("click", generatePassword)
copyBtn.addEventListener("click",copy)


