# Lesson 06: Booleans and If-Statements

This lesson introduces Boolean values (`true` and `false`) and `if` statements, which allow our code to make decisions. We'll use these to build a Rock Paper Scissors game.

---

## What are Booleans?

Besides numbers and strings, JavaScript has another type of value called a **Boolean**. Booleans represent truth values. There are only **two** Boolean values:

* `true`
* `false`

Booleans are often the result of **comparisons**.

```javascript
// Comparison using '<' (less than)
console.log(3 < 5); // Output: true

// Comparison using '>' (greater than)
console.log(3 > 5); // Output: false
````

-----

## Syntax Rules for Booleans & Comparisons

  * Type `true` or `false` directly, **without quotes**. `'true'` is a string, not a Boolean.

    ```javascript
    console.log(typeof true); // Output: 'boolean'
    console.log(typeof 'true'); // Output: 'string'
    ```

  * **Comparison Operators:** Used to compare values, resulting in a Boolean.

      * `>`: Greater than
      * `<`: Less than
      * `>=`: Greater than or equal to
      * `<=`: Less than or equal to
      * `===`: **Strict equality** (checks if values are equal *and* have the same type) - **Recommended**
      * `!==`: **Strict inequality** (checks if values are not equal *or* have different types) - **Recommended**
      * `==`: Loose equality (tries to convert types before comparing) - **Avoid**
      * `!=`: Loose inequality (tries to convert types) - **Avoid**

    <!-- end list -->

    ```javascript
    console.log(5 >= 5); // Output: true
    console.log(5 === '5.0'); // Output: false (different types)
    console.log(5 == '5.0'); // Output: true (Avoid! Type coercion happens)
    ```

    **Best Practice:** Always use **strict equality (`===`)** and **strict inequality (`!==`)** to prevent unexpected behavior from type coercion.

  * **Order of Operations:** Comparison operators have a lower priority than math operators (`+`, `-`, `*`, `/`). Math is done first, then comparisons.

    ```javascript
    console.log( 3 > 5 - 5 ); // Output: true (5-5=0, then 3>0 is true)
    ```

-----

## If-Statements: Making Decisions

An **`if` statement** allows us to run code only if a certain condition is `true`.

```javascript
if (true) {
  // This code runs because the condition is true
  console.log('hello');
}

if (false) {
  // This code does NOT run
  console.log('world');
}
```

  * **Condition:** The Boolean value (or expression that results in a Boolean) inside the parentheses `()`.
  * **Code Block / Branch:** The code inside the curly braces `{}` runs if the condition is `true`.

### `else`

The `else` statement provides an alternative block of code to run if the `if` condition is `false`.

```javascript
let age = 15;

if (age >= 16) {
  console.log('You can drive.');
} else {
  // This code runs because age < 16 is true
  console.log('You cannot drive.');
}
```

### `else if`

Allows checking multiple conditions in sequence.

```javascript
let age = 15;

if (age >= 16) {
  console.log('You can drive.');
} else if (age >= 14) {
  // This code runs because age >= 14 is true
  console.log('Almost there!');
} else {
  console.log('You cannot drive.');
}
```

  * The conditions are checked one by one from top to bottom.
  * As soon as a `true` condition is found, its code block runs, and the rest of the `else if`/`else` blocks are skipped.
  * The final `else` (optional) runs if *none* of the preceding `if` or `else if` conditions were `true`.

**Syntax Notes:**

  * Curly braces `{}` are optional if a branch contains only *one* line of code, but it's generally good practice to always include them for clarity.

-----

## Project: Rock Paper Scissors (Part 1)

Let's start building the game.

**Goal:**

1.  User clicks a button (Rock, Paper, or Scissors).
2.  Computer randomly picks a move.
3.  Compare the moves to determine the result (Win, Lose, Tie).
4.  Display the result in a popup.

**Algorithm (Steps):**

1.  Generate computer's move.
2.  Compare moves -\> Get result.
3.  Display result.

**HTML (`06-rock-paper-scissors.html` - Create this file):**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Rock Paper Scissors</title>
</head>
<body>
  <p>Rock Paper Scissors</p>
  <button onclick="">Rock</button>
  <button onclick="">Paper</button>
  <button onclick="">Scissors</button>
  <script>
    // JavaScript will go here
  </script>
</body>
</html>
```

**JavaScript (Step 1: Computer Move):**

We need a random number. `Math.random()` gives a random number between 0 (inclusive) and 1 (exclusive).

```javascript
// Inside the 'Rock' button's onclick attribute:
const randomNumber = Math.random(); // Example: 0.65

let computerMove = '';

if (randomNumber >= 0 && randomNumber < 1/3) {
  computerMove = 'Rock';
} else if (randomNumber >= 1/3 && randomNumber < 2/3) {
  computerMove = 'Paper';
} else if (randomNumber >= 2/3 && randomNumber < 1) {
  computerMove = 'Scissors';
}

console.log(computerMove); // Check the randomly generated move
```

-----

## Logical Operators

Logical operators combine multiple Boolean conditions.

  * **`&&` (AND):** Results in `true` only if **both** sides are `true`.
    ```javascript
    true && true;   // true
    true && false;  // false
    false && false; // false

    // Used in computer move logic:
    randomNumber >= 0 && randomNumber < 1/3 // Checks if number is in the first range
    ```
  * **`||` (OR):** Results in `true` if **at least one** side is `true`.
    ```javascript
    true || false;  // true
    false || false; // false
    true || true;   // true
    ```
  * **`!` (NOT):** Flips a Boolean value to its opposite.
    ```javascript
    !true;  // false
    !false; // true
    ```
  * **Order of Operations:** Logical operators have lower priority than comparisons (`===`, `>`, etc.) and math. `!` is done first, then `&&`, then `||`.

-----

## Scope

Variables created inside curly braces `{}` (like in an `if` statement) **only exist inside those braces**. This is called **scope**.

```javascript
if (true) {
  const variable1 = 'hello'; // variable1 only exists here
}
// console.log(variable1); // Error: variable1 is not defined outside the {}

// Solution: Declare the variable *outside* the scope if you need to access it later.
let computerMove = ''; // Declared outside
if (randomNumber >= 0 && randomNumber < 1/3) {
  computerMove = 'Rock'; // Reassigned inside
}
console.log(computerMove); // Works!
```

  * Scope helps prevent variable name conflicts in larger programs.
  * `let` and `const` follow these scope rules. (`var` behaves differently, another reason to avoid it).

-----

## Project: Rock Paper Scissors (Part 2 - Result & Display)

**JavaScript (Steps 2 & 3 - Inside `onclick` for 'Rock' button):**

```javascript
// ... (Computer move generation code from above) ...

let result = '';

if (computerMove === 'Rock') {
  result = 'Tie.';
} else if (computerMove === 'Paper') {
  result = 'You lose.';
} else if (computerMove === 'Scissors') {
  result = 'You win.';
}

alert(`You picked Rock. Computer picked ${computerMove}. ${result}`);
```

**Complete `onclick` for 'Rock' button:**

```javascript
// (Inside the <button> tag)
onclick="
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'Paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'Scissors';
  }

  let result = '';

  if (computerMove === 'Rock') {
    result = 'Tie.';
  } else if (computerMove === 'Paper') {
    result = 'You lose.';
  } else if (computerMove === 'Scissors') {
    result = 'You win.';
  }

  alert(`You picked Rock. Computer picked ${computerMove}. ${result}`);
"
```

**(Repeat similar logic for 'Paper' and 'Scissors' buttons, adjusting the player's move and the win/lose conditions accordingly).**

-----

## Truthy and Falsy Values

In JavaScript, values other than `true` and `false` can also behave like Booleans in conditions (like `if` statements).

  * **Falsy Values:** Behave like `false`.
      * `false`
      * `0` (the number zero)
      * `''` (empty string)
      * `NaN` (Not a Number, result of invalid math like `'text' / 5`)
      * `undefined` (value of a variable that hasn't been assigned)
      * `null` (represents intentional absence of value)
  * **Truthy Values:** All other values behave like `true` (including non-empty strings, numbers other than 0, objects, arrays).

**Usage:** Can be used as shortcuts in conditions.

```javascript
let cartQuantity = 5;

// Instead of: if (cartQuantity > 0)
if (cartQuantity) { // 5 is truthy
  console.log('Cart has products.');
}

let name = '';
// Instead of: if (name === '')
if (!name) { // '' is falsy, !'' is true
  console.log('Name is empty.');
}
```

Truthy/falsy values also work with logical operators (`&&`, `||`, `!`).

-----

## Shortcuts for If-Statements

### Ternary Operator (`? :`)

A compact way to write simple `if-else` statements, especially when assigning a value.

**Syntax:** `condition ? valueIfTrue : valueIfFalse`

```javascript
// Regular if-else:
let message;
if (true) {
  message = 'truthy';
} else {
  message = 'falsy';
}

// Ternary operator equivalent:
const messageTernary = true ? 'truthy' : 'falsy';
console.log(messageTernary); // Output: 'truthy'

const result = 0 ? 'truthy' : 'falsy'; // 0 is falsy
console.log(result); // Output: 'falsy'
```

### Guard Operator (`&&`)

Uses the short-circuiting behavior of `&&`. If the left side is falsy, the right side is **not evaluated**.

```javascript
false && console.log('hello'); // 'hello' is NOT logged

const messageGuard = 5 && 'hello'; // 5 is truthy, so result is the right side
console.log(messageGuard); // Output: 'hello'

const messageGuard2 = 0 && 'hello'; // 0 is falsy, so result is the left side
console.log(messageGuard2); // Output: 0
```

Useful for running code only if a condition is truthy.

### Default Operator (`||`)

Uses the short-circuiting behavior of `||`. If the left side is truthy, the right side is **not evaluated**.

```javascript
true || console.log('hello'); // 'hello' is NOT logged

const currency = 'EUR' || 'USD'; // 'EUR' is truthy, so result is the left side
console.log(currency); // Output: 'EUR'

const currency2 = undefined || 'USD'; // undefined is falsy, so result is the right side
console.log(currency2); // Output: 'USD'
```

Useful for setting default values when a value might be missing (falsy like `undefined`, `null`, `''`, `0`).

-----

## Lesson 6 Exercises

  * **6a.** Create an `hour` variable (0-23). Write an `if-else` statement: if hour is 6-12, log 'Good morning\!'. If 13-17, log 'Good afternoon\!'. Otherwise, log 'Good night\!'.
  * **6b.** Repeat 6a using `else if`.
  * **6c.** You have `age = 6` and `isHoliday = true`. Check if age is \<= 5 or \>= 65 (discount price). Log 'Discount'. Otherwise, log 'No discount'.
  * **6d.** Modify 6c: check if age is \<= 5 or \>= 65 *and* it's *not* a holiday. Log 'Discount'. Otherwise, log 'No discount'. (Hint: use `!` and `&&`).
  * **6e.** Generate a random number (0-1). If \< 0.5, log 'heads'. Else, log 'tails'.
  * **6f.** Create a variable `guess` ('heads' or 'tails'). Compare it to the result from 6e. Log 'You win\!' or 'You lose.'.
  * **6g.** Complete the Rock Paper Scissors `onclick` logic for the 'Paper' button.
  * **6h.** Complete the Rock Paper Scissors `onclick` logic for the 'Scissors' button.
  * **6i.** Test the truthiness/falsiness of: `''`, `0`, `NaN`, `undefined`, `null`, `'hello'`, `5`, `{}` (empty object), `[]` (empty array). Use `if(...) { console.log('truthy'); } else { console.log('falsy'); }`.
  * **6j.** Use the ternary operator to set a variable `resultMsg` to 'heads' if `Math.random() < 0.5`, otherwise 'tails'.
  * **6k.** Use the default operator (`||`) to set a variable `playerName` to 'Guest' if another variable `savedName` is falsy (e.g., `''` or `undefined`).
  * **6l.** Use the guard operator (`&&`) to log 'Product available' only if `productQuantity > 0`.

-----

## Challenge Exercises

  * **6m.** Modify Rock Paper Scissors: Use `confirm()` to ask "Play again?" after showing the result.
  * **6n.** Modify Rock Paper Scissors: Keep score using variables (`wins`, `losses`, `ties`). Update the score after each game. Display the score in the `alert()`.
  * **6o.** Modify Rock Paper Scissors: Add a "Reset Score" button that sets the score variables back to 0.
  * **6p.** Use the ternary operator to calculate the cost: If `isMember` is true, cost is $2, else cost is $10.
  * **6q.** Simulate a coin flip game. Ask the user to guess 'heads' or 'tails' using `prompt()`. Compare their guess to a random flip (`Math.random() < 0.5`). Alert 'You win\!' or 'You lose.'.
