# Lesson 10: HTML, CSS, & JavaScript Project

This is a very important lesson that combines everything we've learned. The goals are:

1.  **Learn CSS (Cascading Style Sheets):** How to add styling (colors, fonts, layout) to our projects to make them look professional.
2.  **Refactor (Organize) Code:** How to separate our project into three files: **.html** (content), **.css** (style), and **.js** (logic). This is the standard, professional way to build all websites.

---

## 1. Introduction to CSS

* **CSS** is the language for styling HTML elements.
* We write CSS code inside a **<style>** tag, which goes in the **<head>** section of our HTML file.
* **CSS Syntax:** A rule consists of a **selector** and a **declaration block**.

    ```css
    /* 'button' is the selector (selects all <button> tags) */
    button {
      /* 'background-color: red;' is a declaration */
      /* 'background-color' is the CSS property */
      /* 'red' is the value */
      background-color: red;
      color: white; /* 'color' sets the text color */
    }
    ```
* **CSS Classes:** Styling every single **<button>** tag is usually a bad idea. We use **class** attributes in HTML to be more specific.

    * **HTML:** `<button class="subscribe-button">`
    * **CSS:** We use a dot (`.`) to select a class: `.subscribe-button { ... }`

---

## 2. Project 1: Styling the "Subscribe" Button

This project shows how to style a button and add interactive "hover" and "active" states.

### CSS Explanations:
* **background-color:** Sets the background color. **rgb(200, 0, 0)** is a specific shade of red.
* **border: none;**: Removes the default border from the button.
* **border-radius: 2px;**: Slightly rounds the corners (**px** stands for pixels).
* **cursor: pointer;**: Changes the mouse cursor to a clicking hand icon when you hover over the button.
* **padding: 10px 16px;**: Adds space *inside* the button (10px on top/bottom, 16px on left/right).
* **margin-right: 8px;**: Adds space *outside* the button (8px to the right).
* **transition: opacity 0.15s;**: This is an animation. It tells the browser to smoothly change the **opacity** over 0.15 seconds, instead of instantly.
* **:hover** (Pseudo-class): Styles the element *only* when the mouse is hovering over it. We make it slightly transparent (**opacity: 0.8;**).
* **:active** (Pseudo-class): Styles the element *only* while it's being clicked. We make it even more transparent (**opacity: 0.5;**).

### Full Code: `10a-youtube.html`
```html
<!DOCTYPE html>
<html>
<head>
  <title>Subscribe Button</title>
  <style>
    .subscribe-button {
      background-color: rgb(200, 0, 0);
      color: white;
      border: none;
      border-radius: 2px;
      cursor: pointer;
      margin-right: 8px;
      padding: 10px 16px;
      transition: opacity 0.15s;
    }

    .subscribe-button:hover {
      opacity: 0.8;
    }

    .subscribe-button:active {
      opacity: 0.5;
    }
  </style>
</head>
<body>
  <button class="subscribe-button js-subscribe-button" onclick="
    subscribe();
  ">Subscribe</button>

  <script>
    function subscribe() {
      const buttonElement = document.querySelector('.js-subscribe-button');
      if (buttonElement.innerText === 'Subscribe') {
        buttonElement.innerHTML = 'Subscribed';
      } else {
        buttonElement.innerHTML = 'Subscribe';
      }
    }
  </script>
</body>
</html>
````

-----

## 3\. Project 2: Styling the Amazon Shipping Calculator

This project shows how to style input fields and buttons to match.

### CSS Explanations:

  * **font-family: Arial;**: Sets the font for the whole page.
  * We create a **.cost-input** class for the **\<input\>** and a **.calculate-button** class for the **\<button\>**.
  * We set the button's **padding** (12px top/bottom) to be slightly larger than the input's (10px top/bottom). This is a common design trick to make them look the same height, as inputs and buttons render slightly differently.

### Full Code: `10b-amazon.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>Amazon Shipping Calculator</title>
  <style>
    body {
      font-family: Arial;
    }

    .cost-input {
      padding: 10px 12px;
      font-size: 15px;
    }

    .calculate-button {
      background-color: rgb(254, 189, 105);
      border: none;
      padding: 12px 15px;
      font-size: 15px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <p>Amazon Shipping Calculator</p>

  <input placeholder="Cost of order" class="js-cost-input cost-input" onkeydown="
    handleCostKeydown(event);
  ">

  <button class="calculate-button" onclick="
    calculateTotal();
  ">Calculate</button>

  <p class="js-total-cost"></p>

  <script>
    function handleCostKeydown(event) {
      if (event.key === 'Enter') {
        calculateTotal();
      }
    }

    function calculateTotal() {
      const inputElement = document.querySelector('.js-cost-input');
      let cost = Number(inputElement.value);
      
      let shippingCost;
      if (cost < 40) {
        shippingCost = 10;
      } else {
        shippingCost = 0;
      }
      
      const totalCost = cost + shippingCost;
      document.querySelector('.js-total-cost').innerHTML = `$${totalCost}`;
    }
  </script>
</body>
</html>
```

-----

## 4\. Project 3: Styling Rock Paper Scissors (RPS)

This is the main project where we combine everything and organize our files.

### Part 1: How to Add Images to HTML

First, we need to update our HTML to use images instead of text.

1.  **Download Images:** Get the emoji images (e.g., **rock-emoji.png**, **paper-emoji.png**, **scissors-emoji.png**).

2.  **Create `images` Folder:** In your project directory, create a new folder named **images**. Put your downloaded image files inside this folder.

3.  **Use the `<img>` Tag:** In your HTML, replace the text "Rock" with an **`<img>`** tag.

      * The **`<img>`** tag is a "void element" (it doesn't need a closing tag).
      * The **src** (source) attribute tells the browser where to find the image. The path **"images/rock-emoji.png"** means "Look in the **images** folder for the file **rock-emoji.png**".

    **Example (in `10-rock-paper-scissors.html`):**

    ```html
    <button class="js-rock-button">Rock</button>

    <button class="move-button js-rock-button">
      <img src="images/rock-emoji.png" class="move-icon">
    </button>
    ```

      * We also add new CSS classes: **move-button** for styling the button and **move-icon** for styling the image.

### Part 2: How to Separate (Refactor) Code

Our HTML file is now very large and mixes HTML, CSS, and JavaScript. This is messy and unprofessional. We will separate them.

**How to Move JavaScript:**

1.  **Create Folders/Files:** Create a **scripts** folder. Inside it, create a new file named **10-rock-paper-scissors.js**.
2.  **Cut and Paste:** Go to your HTML file. **Cut** *all* the JavaScript code from inside the **\<script\>** tag (e.g., **let score = ...**, **function playGame(...)**, etc.).
3.  **Paste** this code into your new **10-rock-paper-scissors.js** file. (Do *not* copy the **\<script\>** or **\</script\>** tags themselves).
4.  **Link the File:** In your HTML file, at the *end* of the **\<body\>**, replace your empty **\<script\>\</script\>** tags with a single tag that links to your new file:
    ```html
    <script src="scripts/10-rock-paper-scissors.js"></script>
    ```
      * This must be at the end of the **\<body\>** so the HTML elements (buttons, etc.) exist *before* the script tries to find them.

**How to Move CSS:**

1.  **Create Folders/Files:** Create a **styles** folder. Inside it, create a new file named **10-rock-paper-scissors.css**.
2.  **Cut and Paste:** Go to your HTML file. **Cut** *all* the CSS code from inside the **\<style\>** tag (e.g., **body { ... }**, **.title { ... }**, etc.).
3.  **Paste** this code into your new **10-rock-paper-scissors.css** file. (Do *not* copy the **\<style\>** or **\</style\>** tags themselves).
4.  **Link the File:** In your HTML file, *inside* the **\<head\>**, replace your empty **\<style\>\</style\>** tags with a **\<link\>** tag:
    ```html
    <link rel="stylesheet" href="styles/10-rock-paper-scissors.css">
    ```
      * **rel="stylesheet"** (relationship) is required and tells the browser this is a CSS file.
      * **href** (hyperlink reference) is the path to the file.

### Part 3: The Complete & Final Code

After refactoring and adding all styles, here are the three complete files for the project.

#### File 1: `10-rock-paper-scissors.html` (Full HTML)

```html
<!DOCTYPE html>
<html>
<head>
  <title>Rock Paper Scissors</title>
  <link rel="stylesheet" href="styles/10-rock-paper-scissors.css">
</head>
<body>
  <p class="title">Rock Paper Scissors</p>

  <button class="move-button js-rock-button">
    <img src="images/rock-emoji.png" class="move-icon">
  </button>

  <button class="move-button js-paper-button">
    <img src="images/paper-emoji.png" class="move-icon">
  </button>

  <button class="move-button js-scissors-button">
    <img src="images/scissors-emoji.png" class="move-icon">
  </button>

  <p class="js-result result"></p>
  <p class="js-moves"></p>
  <p class="js-score score"></p>

  <button class="reset-score-button js-reset-score-button">Reset Score</button>
  <button class="auto-play-button js-auto-play-button">Auto Play</button>

  <script src="scripts/10-rock-paper-scissors.js"></script>
</body>
</html>
```

#### File 2: `styles/10-rock-paper-scissors.css` (Full CSS)

```css
body {
  background-color: rgb(25, 25, 25);
  color: white;
  font-family: Arial;
}

.title {
  font-size: 30px;
  font-weight: bold;
}

.move-icon {
  height: 50px;
}

.move-button {
  background-color: transparent;
  border: 3px solid white;
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-right: 10px;
  cursor: pointer;
}

.result {
  font-size: 25px;
  font-weight: bold;
  margin-top: 50px;
}

.score {
  margin-top: 60px;
}

.reset-score-button,
.auto-play-button {
  background-color: white;
  border: none;
  font-size: 15px;
  padding: 8px 15px;
  cursor: pointer;
}
```

#### File 3: `scripts/10-rock-paper-scissors.js` (Full JavaScript)

```javascript
/* Load the score from localStorage or use a default */
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

/* Display the score when the page first loads */
updateScoreElement();

/* We use addEventListener for all our buttons now.
  This is the modern way and keeps our HTML clean.
*/

// Add listeners for the 3 move buttons
document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('Rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('Paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('Scissors');
  });

// Add listener for the Reset Score button
document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    // Show a confirmation popup before resetting
    const confirmation = confirm('Are you sure you want to reset the score?');
    
    if (confirmation) {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement(); // Update the page display
    }
  });

// Add listener for the Auto Play button
document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    autoPlay();
  });


/* --- Auto Play Feature --- */
let isAutoPlaying = false;
let intervalId; // This variable will store the ID of the setInterval

function autoPlay() {
  if (!isAutoPlaying) {
    // Start auto-playing
    // setInterval() runs the function repeatedly every 1000ms (1 second)
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    
    isAutoPlaying = true;
    // Update the button text
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';

  } else {
    // Stop auto-playing
    // clearInterval() stops the interval
    clearInterval(intervalId);
    isAutoPlaying = false;
    // Update the button text
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  }
}


/* --- Core Game Logic --- */

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie.';
    } else if (computerMove === 'Paper') {
      result = 'You lose.';
    } else if (computerMove === 'Scissors') {
      result = 'You win.';
    }
    
  } else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You win.';
    } else if (computerMove === 'Paper') {
      result = 'Tie.';
    } else if (computerMove === 'Scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You lose.';
    } else if (computerMove === 'Paper') {
      result = 'You win.';
    } else if (computerMove === 'Scissors') {
      result = 'Tie.';
    }
  }

  /* Update score */
  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  /* Save to localStorage */
  localStorage.setItem('score', JSON.stringify(score));

  /* Update the page display */
  updateScoreElement();
  updateResultElement(result);
  updateMovesElement(playerMove, computerMove);
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function updateResultElement(result) {
  document.querySelector('.js-result').innerHTML = result;
}

function updateMovesElement(playerMove, computerMove) {
  // This now displays the images instead of just text
  document.querySelector('.js-moves').innerHTML =
    `You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'Paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'Scissors';
  }
  
  return computerMove;
}
