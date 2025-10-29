# Lesson 07: Functions (Based on SuperSimpleDev Course)

This lesson introduces functions, a fundamental concept for writing reusable and organized code. We'll refactor the Rock Paper Scissors game using functions.

---

## What is a Function?

A **function** is a block of code designed to perform a particular task. The key benefit of functions is that they allow us to **reuse code** without writing it multiple times.

---

## Creating and Calling Functions

### Syntax for Creating (Defining) a Function

```javascript
// 1. Use the 'function' keyword.
// 2. Give the function a descriptive name (use camelCase).
// 3. Add parentheses '()'. Parameters can go here (later).
// 4. Add curly braces '{}' for the code block (function body).
function functionName() {
  // Code to run goes inside the function body
  console.log('hello');
  console.log(2 + 2);
}
````

  * **Defining** a function just creates it; it **doesn't run** the code inside yet.
  * **Naming:** Follow variable naming rules (camelCase recommended, use verbs for actions like `calculateTax`, `displayResult`).

### Syntax for Calling (Running) a Function

To run the code inside a function, you **call** it by typing its name followed by parentheses `()`.

```javascript
// Call the function once
functionName(); // Output: hello, 4

// Call the function again to reuse the code
functionName(); // Output: hello, 4
```

-----

## Applying Functions to Rock Paper Scissors (RPS)

Our RPS game code had a lot of repetition, especially for picking the computer's move and calculating the result. Functions are perfect for cleaning this up.

### Refactoring `pickComputerMove`

1.  **Identify Repeated Code:** The logic for generating `computerMove` was repeated in each button's `onclick`.

2.  **Create a Function:** Move the repeated logic into a function defined in the `<script>` tag.

    ```javascript
    // (Inside <script> tag)
    function pickComputerMove() {
      const randomNumber = Math.random();
      let computerMove = ''; // Need to declare outside if statements

      if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'Rock';
      } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'Paper';
      } else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'Scissors';
      }
      // How do we get computerMove out? See 'return' below.
    }
    ```

3.  **Call the Function:** Replace the repeated code in each `onclick` with a call to the function.

    ```html
    <button onclick="
      pickComputerMove();
      // ... rest of the logic ...
    ">Rock</button>
    ```

-----

## Scope in Functions

Just like `if` statements, functions also create **scope**. Variables declared (`let` or `const`) inside a function **only exist within that function**.

  * **Problem:** If `computerMove` is created inside `pickComputerMove`, the code outside (in the `onclick`) can't access it.

  * **Old Solution (Global Variable - Not Recommended):** Declare `computerMove` outside the function. The function reassigns it. This works but pollutes the global scope and makes code harder to track.

    ```javascript
    let computerMove = ''; // Global variable

    function pickComputerMove() {
      // ... generates random number ...
      // Reassigns the global variable:
      if (randomNumber < 1/3) { computerMove = 'Rock'; } // etc.
    }

    // onclick:
    pickComputerMove(); // Modifies global variable
    console.log(computerMove); // Accesses global variable
    ```

  * **Better Solution (`return` statement):** Keep variables inside the function scope and use `return` to send the result *out*.

-----

## `return`: Getting Values Out of Functions

The `return` statement does two things:

1.  **Ends the function immediately.** Any code after `return` inside the function will not run.
2.  **Sends a value back** to where the function was called.

<!-- end list -->

```javascript
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

  // Return the calculated value
  return computerMove;
  // console.log('This will not run');
}
```

**Using the Return Value:** When you call a function that returns a value, the function call itself evaluates to that value. You can save it in a variable or use it directly.

```html
<script>
  // Call the function and save the returned value
  const computerMove = pickComputerMove(); // computerMove is now 'Rock', 'Paper', or 'Scissors'

  let result = '';
  // ... (Compare 'Rock' vs computerMove) ...

  alert(`You picked Rock. Computer picked ${computerMove}. ${result}`);
</script>
```

  * **Default Return:** If a function doesn't have a `return` statement, or just has `return;`, it implicitly returns `undefined`.

**Benefit:** Using `return` keeps variables within their function scope, making code cleaner and avoiding global variable conflicts.

-----

## Parameters: Putting Values Into Functions

Parameters allow you to pass values *into* a function, making the function more flexible and reusable.

  * **Defining Parameters:** List variable names inside the parentheses `()` when defining the function. These act like variables within the function's scope.
    ```javascript
    function calculateTax(cost, taxPercent = 0.1) { // taxPercent has a default value
      console.log(cost * taxPercent);
    }
    ```
  * **Calling with Arguments:** Provide values (called **arguments**) inside the parentheses `()` when calling the function. The values are assigned to the parameters in order.
    ```javascript
    calculateTax(2000, 0.2); // cost = 2000, taxPercent = 0.2 -> Output: 400
    calculateTax(5000);     // cost = 5000, taxPercent uses default 0.1 -> Output: 500
    ```
  * **Default Values:** You can provide a default value for a parameter using `= value`. If the argument is not provided when calling, the default value is used.
  * **Scope:** Parameters exist only within the function's scope.

-----

## Applying Parameters to RPS: `playGame` Function

The logic for determining the `result` and showing the `alert` is very similar for all three buttons (Rock, Paper, Scissors), only the player's move changes. This is ideal for a function with a parameter.

1.  **Create `playGame` Function with Parameter:**
    ```javascript
    // (Inside <script> tag)
    function playGame(playerMove) {
      // Get the computer move using the other function
      const computerMove = pickComputerMove();

      let result = '';

      // Determine result based on playerMove and computerMove
      if (playerMove === 'Scissors') {
        if (computerMove === 'Rock') { result = 'You lose.'; }
        // ... (other conditions for Scissors) ...
      } else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') { result = 'You win.'; }
        // ... (other conditions for Paper) ...
      } else if (playerMove === 'Rock') {
        if (computerMove === 'Rock') { result = 'Tie.'; }
        // ... (other conditions for Rock) ...
      }

      // Display the result
      alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}`);
    }
    ```
2.  **Call `playGame` from `onclick`:** Pass the specific move as an argument.
    ```html
    <button onclick="
      playGame('Rock');
    ">Rock</button>

    <button onclick="
      playGame('Paper');
    ">Paper</button>

    <button onclick="
      playGame('Scissors');
    ">Scissors</button>
    ```

**Benefits:**

  * Drastically reduces code duplication in the HTML.
  * Centralizes the game logic in one place, making it easier to update.

-----

## Functions Calling Functions

A function can call other functions. In our RPS example, `playGame` calls `pickComputerMove`. This is a standard way to break down complex tasks into smaller, manageable pieces.

-----

## Lesson 7 Exercises

  * **7a.** Create a function `greet()` that logs 'Hello\!'. Call it.
  * **7b.** Modify `greet()` to accept a `name` parameter. Make it log `Hello ${name}!`. Call it with your name.
  * **7c.** Modify `greet()`: If no name is provided (`name` is `undefined`), log `Hi there!`. Otherwise, log `Hello ${name}!`. (Hint: check if `name` is `undefined`).
  * **7d.** Create a function `convertToFahrenheit(celsius)` that takes degrees Celsius and returns the temperature in Fahrenheit ($F = C \times \frac{9}{5} + 32$).
  * **7e.** Create `convertToCelsius(fahrenheit)` that returns Celsius ($C = (F - 32) \times \frac{5}{9}$).
  * **7f.** Create `convertTemperature(degrees, unit)` that takes degrees and a unit ('C' or 'F'). If 'C', call `convertToFahrenheit`. If 'F', call `convertToCelsius`. Return the result as a string like `'X F'` or `'Y C'`.
  * **7g.** Refactor the RPS `playGame` function to determine the result more cleanly (maybe use nested `if`s or combine conditions).
  * **7h.** In RPS, can you simplify the `pickComputerMove` function logic slightly? (Hint: The last `else if` doesn't strictly need the `randomNumber < 1` check).
  * **7i.** What does `pickComputerMove()` return if something unexpected happened and `computerMove` remained `''`? How might you handle this? (Answer: returns `''`. Could add a check or default).

-----

##  Challenge Exercises

  * **7j.** Modify `convertTemperature`: If the unit is invalid, return 'Invalid unit'.
  * **7k.** Create a function `min(num1, num2)` that returns the smaller of two numbers.
  * **7l.** Create a function `max(num1, num2)` that returns the larger number.
  * **7m.** Modify RPS: Create separate functions for comparing moves, e.g., `getResult(playerMove, computerMove)`, which returns 'Win', 'Lose', or 'Tie'. Then call this inside `playGame`.
