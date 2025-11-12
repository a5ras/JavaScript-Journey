const allButtons = document.querySelectorAll('.calculator form input[type="button"]');
// Make sure you have <input class="output"> in your HTML file!
const displayScreen = document.querySelector(".output");


function processInput(value) {
  if (value === "AC") {
    displayScreen.value = "";
  } 
  else if (value === "DE") {
    let currentDisplayValue = displayScreen.value;
    displayScreen.value = currentDisplayValue.slice(0, -1);
  } 
  
  else if (value === ".") {
    // If the screen is empty, start with "0."
    if (displayScreen.value === "") {
      displayScreen.value = "0.";
    } else {
      // Split the expression by operators
      const parts = displayScreen.value.split(/([+\-*/])/);
      
      // Get the last part (the current number being typed)
      const lastPart = parts[parts.length - 1];

      // Only add a "." if the *last number* doesn't already have one
      if (!lastPart.includes(".")) {
        
        // If the last key was an operator (e.g., "5+"),
        // then lastPart will be "" and we should add "0."
        if (lastPart === "") {
          displayScreen.value += "0.";
        } else {
          // Otherwise, just add the "."
          displayScreen.value += value;
        }
      }
    }
  } 

  else if (value === "=") {
    calculateResult();
  } 
  else {
    displayScreen.value += value;
  }
}


function calculateResult() {
  let expression = displayScreen.value; // Use 'let' so we can change it

  if (expression) {
    // Check if the last character is an operator or a dot
    const lastChar = expression[expression.length - 1];
    if (['+', '-', '*', '/', '.'].includes(lastChar)) {
      // If it is, remove it before calculating
      expression = expression.slice(0, -1);
    }

    // Now, we also need to check if the expression became empty
    if (expression === "") {
      displayScreen.value = "";
      return; // Exit the function
    }

    try {
      // We calculate the cleaned expression
      const result = new Function('return ' + expression)();
      displayScreen.value = result;
    } catch (error) {
      displayScreen.value = "Error";
    }
  } else {
    displayScreen.value = "";
  }
}


function handleButtonClick(event) {
  const clickedValue = event.target.value;
  processInput(clickedValue);
}

allButtons.forEach(function(button) {
  button.addEventListener('click', handleButtonClick);
});


function handleKeyDown(event) {
  const key = event.key;
  let value = null;

  if (key >= '0' && key <= '9') {
    value = key;
  } else if (key === "+" || key === "-" || key === "*" || key === "/" || key === ".") {
    value = key;  
  } else if (key === "Enter" || key === "=") {
    value = "=";
  } else if (key === "Backspace") {
    value = "DE";
  } else if (key === "A") {
    value = "AC";
  }

  if (value) {
    event.preventDefault(); 
    processInput(value);
  }
}

window.addEventListener('keydown', handleKeyDown);
