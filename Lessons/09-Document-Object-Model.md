# Lesson 09: Document Object Model (DOM)

This lesson introduces the **DOM (Document Object Model)**, which is the "map" that connects JavaScript to our HTML. It allows us to use JavaScript to control the elements on our webpage and make them interactive.

---

## 🌎 What is the DOM?

The **DOM** is a JavaScript object called **document** that represents the entire HTML page.

* When the browser loads your HTML file, it creates this **document** object.
* This object models the HTML's tree-like structure.
* Every element (like **<body>**, **<button>**, **<p>**) is an object *inside* the **document** object.
* Because the **document** object is linked to the webpage, changing properties of this object will change what we see on the page.

We have already used this object:
* **document.body.innerHTML**: Accesses the **document** object, finds the **body** object inside it, and changes its HTML.
* **document.title**: Accesses the **document** object and changes its **title** property, which updates the browser tab text.

---

## Finding and Manipulating Elements

How do we control a *specific* element, not just the whole body?

### `document.querySelector()`

**document.querySelector()** is a built-in method (a function on an object) that lets us find *any* single element on the page using CSS selectors.

* **Syntax:** **document.querySelector('CSS-Selector')**
* It returns the **first** element that matches the selector as an object.

**Examples:**

1.  **Selecting by Tag Name:** (Selects the *first* matching tag)
    ```javascript
    // Finds the first <button> element on the page
    document.querySelector('button');
    ```

2.  **Selecting by Class Name:** (This is the most common and recommended way)
    * **HTML:** `<button class="js-button">Click</button>`
    * **JS:** You must include the dot (`.`) just like in CSS.
    ```javascript
    document.querySelector('.js-button');
    ```
    *(**Best Practice:** Use a prefix like **js-** for classes that are *only* used by JavaScript. This separates your JavaScript logic from your CSS styling logic.)*

### Saving Elements in Variables

It's standard practice to save the element object in a variable (usually a **const**) so you can use it easily.

```javascript
// Finds the button and saves it in a variable
const buttonElement = document.querySelector('.js-button');

// Now we can use this variable to interact with the button.
console.log(buttonElement); // Shows the <button class="js-button">...</button> element
````

### Manipulating Element Content

Once you have an element, you can change its content:

  * **.innerHTML**: Gets or sets the HTML *inside* an element.
    ```javascript
    // Changes the content of the first button on the page
    document.querySelector('button').innerHTML = 'Changed';
    ```
  * **.innerText**: Gets or sets only the *text* inside an element.
      * **Problem:** If your HTML has extra spaces or newlines (like `<button> Subscribe </button>`), **.innerHTML** will include them. Comparing **.innerHTML === 'Subscribe'** will fail.
      * **Solution:** **.innerText** ignores the extra spaces and newlines, giving you just the clean text.
    <!-- end list -->
    ```javascript
    // HTML: <button class="js-subscribe-button">
    //         Subscribe
    //       </button>
    const subscribeButton = document.querySelector('.js-subscribe-button');

    console.log(subscribeButton.innerText); // Output: 'Subscribe'
    console.log(subscribeButton.innerHTML); // Output: '
    //         Subscribe
    //       '

    // So, we should check the innerText:
    if (subscribeButton.innerText === 'Subscribe') {
      // ...
    }
    ```

-----

## Refactoring: Moving JS from HTML Attributes

So far, we've put all our JS code in **onclick** attributes in the HTML. This gets messy.

A cleaner way is to create a **function** in the **\<script\>** tag and *call* that function from the **onclick** attribute.

**HTML:**

```html
<button class="js-subscribe-button" onclick="
  subscribe();
">Subscribe</button>

<script>
  // All our logic is now cleanly inside a function
  function subscribe() {
    const buttonElement = document.querySelector('.js-subscribe-button');

    if (buttonElement.innerText === 'Subscribe') {
      buttonElement.innerHTML = 'Subscribed';
    } else {
      buttonElement.innerHTML = 'Subscribe';
    }
  }
</script>
```

-----

## DOM Project 1: Subscribe Button

This project demonstrates getting and setting an element's content.

**HTML:**

```html
<p>YouTube Subscribe Button</p>
<button class="js-subscribe-button" onclick="
  subscribe();
">Subscribe</button>
```

**JavaScript:**

```javascript
function subscribe() {
  const buttonElement = document.querySelector('.js-subscribe-button');

  // Check the .innerText to avoid whitespace issues
  if (buttonElement.innerText === 'Subscribe') {
    buttonElement.innerHTML = 'Subscribed';
  } else {
    // If it's not 'Subscribe', it must be 'Subscribed', so switch it back
    buttonElement.innerHTML = 'Subscribe';
  }
}
```

-----

## DOM Project 2: Rock Paper Scissors (RPS) Update

We will refactor our RPS game to display the results on the page instead of using **alert()**.

**HTML:**

```html
<p>Rock Paper Scissors</p>
<button onclick="playGame('Rock');">Rock</button>
<button onclick="playGame('Paper');">Paper</button>
<button onclick="playGame('Scissors');">Scissors</button>
<button onclick="resetScore();">Reset Score</button>

<p class="js-result"></p>
<p class="js-moves"></p>
<p class="js-score"></p>
```

**JavaScript:**

```javascript
// Global score object, loaded from localStorage
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

// New function to update the score on the page
function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// Call it once when the page loads to show the score
updateScoreElement();

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  // ... (Your existing result logic) ...
  if (playerMove === 'Rock') {
    if (computerMove === 'Rock') { result = 'Tie.'; }
    // ... etc.
  } 
  // ... (etc.) ...

  // Update the score object
  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  // Save the updated score to localStorage
  localStorage.setItem('score', JSON.stringify(score));

  // Update the page with the result and moves
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You picked ${playerMove} - Computer picked ${computerMove}.`;
  
  // Update the score display on the page
  updateScoreElement();
}

// ... (Your existing pickComputerMove() function) ...

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement(); // Update the page after resetting
}
```

-----

## DOM Project 3: Amazon Shipping Calculator

This project demonstrates getting values from **\<input\>** fields and handling keyboard events.

**HTML:**

```html
<p>Amazon Shipping Calculator</p>

<input placeholder="Cost of order" class="js-cost-input" onkeydown="
  handleCostKeydown(event);
">

<button onclick="
  calculateTotal();
">Calculate</button>

<p class="js-total-cost"></p>
```

**JavaScript:**

```javascript
function handleCostKeydown(event) {
  // The 'event' object contains info about the event (like which key was pressed)
  // We check the .key property
  if (event.key === 'Enter') {
    calculateTotal();
  }
}

function calculateTotal() {
  // 1. Get the <input> element
  const inputElement = document.querySelector('.js-cost-input');
  
  // 2. Get the text *from* the <input> using the .value property
  let cost = inputElement.value;
  
  // 3. Problem: The .value is a STRING (e.g., '25')
  // '25' + 10 = '2510' (string concatenation)
  
  // 4. Solution: Convert the string to a Number
  cost = Number(cost); // Number('25') = 25
  
  let shippingCost;
  
  if (cost < 40) {
    shippingCost = 10;
  } else {
    shippingCost = 0;
  }
  
  const totalCost = cost + shippingCost;
  
  // 5. Display the result on the page
  document.querySelector('.js-total-cost').innerHTML = `$${totalCost}`;
}
```

-----

## More JavaScript Details

  * **Type Conversion Functions:**

      * **Number('25')**: Converts the string '25' to the number 25.
      * **String(25)**: Converts the number 25 to the string '25'.

  * **Type Coercion Quirk:** JavaScript automatically converts types for **-**, **\***, and **/**.

      * `'25' - 5` = `20` (works)
      * `'25' * 2` = `50` (works)
      * But **+** is used for both addition and string concatenation, so it defaults to concatenation.
      * `'25' + 5` = `'255'` (doesn't work)
      * **Best Practice:** Don't rely on automatic coercion. Always manually convert your types (e.g., use **Number()**) when doing math.

  * **The `window` Object:**

      * The **window** object represents the entire browser window.
      * It's the top-level, global object.
      * All global objects and functions are properties of **window**.
      * **window.document**, **window.console**, **window.alert**
      * The **window.** prefix is optional, which is why we can just write **document**, **console.log()**, and **alert()**.

-----

## Lesson 9 Exercises

  * **9a.** Create an HTML file with a **\<button\>** and a **\<p\>**.
  * **9b.** Give the button a class **js-button** and the paragraph a class **js-message**.
  * **9c.** In a **\<script\>** tag, use **document.querySelector()** to log the button element to the console.
  * **9d.** Use **document.querySelector()** to log the paragraph element to the console.
  * **9e.** Add an **id="test-id"** to the paragraph. Select it using its ID (e.g., **document.querySelector('\#test-id')**) and log it.
  * **9f.** Log the **innerText** of the paragraph.
  * **9g.** Change the **innerText** of the paragraph to 'Hello\!'.
  * **9h.** Create a "Subscribe" button. Add an **onclick** attribute that calls a function **subscribe()**.
  * **9i.** Create the **subscribe()** function. Inside, check the **innerText** of the button: if it's 'Subscribe', change its **innerHTML** to 'Subscribed'.
  * **9j.** Add an **else** block to 9i: if the text is 'Subscribed', change its **innerHTML** back to 'Subscribe'.
  * **9k.** Refactor your RPS game (or build a new one) to use **onclick** attributes that call the **playGame()** function.
  * **9l.** In your RPS game's HTML, create two **\<p\>** elements: one with class **js-result** and one with **js-moves**. Also create one for the score with class **js-score**.
  * **9m.** Modify **playGame()** so that instead of **alert()**, it updates the **innerHTML** of the **.js-result** and **.js-moves** elements.
  * **9n.** Create a function **updateScoreElement()** that updates the **.js-score** element. Call this function when the page loads and at the end of **playGame()** and **resetScore()**.
  * **9o.** Create the Amazon shipping calculator project (HTML with input, button, and paragraph).
  * **9p.** Create the **calculateTotal()** function.
  * **9q.** Inside **calculateTotal()**, get the **.value** from the input, convert it to a **Number()**, calculate shipping ($10 if cost \< $40), and display the total in the paragraph.
  * **9r.** Add an **onkeydown** attribute to the input that calls **handleCostKeydown(event)**.
  * **9s.** Create the **handleCostKeydown(event)** function.
  * **9t.** Inside **handleCostKeydown(event)**, check if **event.key === 'Enter'**. If it is, call **calculateTotal()**.
---
