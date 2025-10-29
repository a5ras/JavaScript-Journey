# Lesson 05: Variables

This lesson introduces variables, which allow us to save and reuse values in our code. We'll build a simple version of the Amazon cart quantity feature.

##  What is a Variable?

A **variable** is like a container where we can save a value (like a number or a string) and use it later.

---

## `let`: Creating Variables

We use the keyword `let` to create (or **declare**) a new variable.

```javascript
// 1. Declare the variable using 'let' and give it a name.
// 2. Assign a value using the assignment operator '='.
let variable1 = 3;

// Now we can use the variable instead of the value:
console.log(variable1); // Output: 3

// Variables can be used in calculations:
console.log(variable1 + 2); // Output: 5

// We can save calculations in variables:
let calculation = 2 + 2;
console.log(calculation); // Output: 4
console.log(calculation + 2); // Output: 6

// We can save the result of calculations involving variables:
let result = calculation + 2;
console.log(result); // Output: 6

// Variables can store any type of value, including strings:
let message = 'hello';
console.log(message); // Output: 'hello'
````

-----

## Syntax Rules for Variables

  * **Naming Restrictions:**
      * Cannot use reserved JavaScript keywords (like `let`, `function`, `if`, etc.).
      * Cannot start with a number (but can contain numbers elsewhere).
      * Cannot contain spaces or most special characters (except `$` and `_`).
  * **Assignment:** The equals sign (`=`) is the **assignment operator**, used to save a value into a variable.
  * **Semicolons (`;`):** Mark the end of an instruction (statement). While JavaScript can sometimes insert them automatically (**semicolon insertion**), it's best practice to include them to avoid potential issues.

-----

## Reassigning Variables

You can change the value stored inside a variable after it has been created. This is called **reassigning**.

```javascript
let variable1 = 3;
console.log(variable1); // Output: 3

// To reassign, just use the variable name and the assignment operator.
// Do NOT use 'let' again.
variable1 = 5;
console.log(variable1); // Output: 5

// You can reassign based on the variable's current value:
variable1 = variable1 + 1;
console.log(variable1); // Output: 6
```

-----

## Shortcuts for Reassigning

JavaScript provides shortcuts for common reassignment operations:

  * **`+=` Operator:** Adds a value to the variable.
    ```javascript
    let variable2 = 3;
    variable2 += 2; // Equivalent to: variable2 = variable2 + 2;
    console.log(variable2); // Output: 5
    ```
  * **`-=` Operator:** Subtracts a value.
  * **`*=` Operator:** Multiplies by a value.
  * **`/=` Operator:** Divides by a value.
  * **`++` Operator (Increment):** Adds exactly 1 to the variable.
    ```javascript
    let variable3 = 3;
    variable3++; // Equivalent to: variable3 = variable3 + 1;
    console.log(variable3); // Output: 4
    ```
  * **`--` Operator (Decrement):** Subtracts exactly 1.

-----

## Naming Conventions & Best Practices

  * **camelCase:** The standard convention for JavaScript variables. Combine multiple words, capitalize every word except the first one.
    ```javascript
    let cartQuantity = 0; // Correct camelCase
    ```
  * **Avoid Very Short Names:** Names like `x` or `c` are hard to understand.
  * **Avoid Very Long Names:** Names like `quantityOfProductsInTheShoppingCart` are hard to read.
  * **Balance:** Choose names that are descriptive but reasonably concise (like `cartQuantity`).

-----

## `const`: Variables That Don't Change

There's another way to create variables using the keyword `const` (short for constant).

```javascript
const variable4 = 3;
console.log(variable4); // Output: 3

// Attempting to reassign a const variable causes an error!
// variable4 = 5; // Error: Assignment to constant variable.
```

  * **Use `const` by Default:** It's best practice to declare variables with `const` initially. This makes your code safer and easier to understand, as you know the variable's value won't change unexpectedly.
  * **Use `let` Only When Necessary:** Only change to `let` if you know you *need* to reassign the variable later in your code.

-----

## `var`: The Old Way (Avoid)

Before `let` and `const`, variables were created using `var`.

```javascript
var variable5 = 3; // Old way
```

  * **Issues:** `var` has some problematic behaviors (related to **scope**, which we'll learn later) that `let` and `const` fix.
  * **Recommendation:** **Avoid using `var`** in modern JavaScript. Stick to `let` and `const`. You might still see `var` in older codebases.

-----

## `typeof` with Variables

The `typeof` operator works with variables too, telling you the type of the *value currently stored* inside the variable.

```javascript
let variable1 = 3;
console.log(typeof variable1); // Output: 'number'

let message = 'hello';
console.log(typeof message); // Output: 'string'

const obj = { prop: 'value' };
console.log(typeof obj); // Output: 'object'
```

-----

## Project: Simple Cart Quantity

Let's apply variables to build a simple cart quantity tracker.

**HTML (`05-cart-quantity.html` - Create this file):**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Cart Quantity</title>
  </head>
  <body>
    <button onclick="
      console.log(`Cart quantity: ${cartQuantity}`);
    ">Show Quantity</button>

    <button onclick="
      cartQuantity = cartQuantity + 1; // Or cartQuantity++;
      console.log(`Cart quantity: ${cartQuantity}`);
    ">Add to Cart</button>

    <button onclick="
      cartQuantity = cartQuantity + 2; // Or cartQuantity += 2;
      console.log(`Cart quantity: ${cartQuantity}`);
    ">+2</button>

    <button onclick="
      cartQuantity = cartQuantity + 3; // Or cartQuantity += 3;
      console.log(`Cart quantity: ${cartQuantity}`);
    ">+3</button>

    <button onclick="
      cartQuantity = 0;
      console.log('Cart was reset.');
      console.log(`Cart quantity: ${cartQuantity}`);
    ">Reset Cart</button>

    <script>
      // Needs to be declared *before* the buttons try to use it.
      // Use 'let' because the quantity needs to change.
      let cartQuantity = 0;
    </script>
  </body>
</html>
```

  * We use a `let` variable `cartQuantity` to store the number of items.
  * Each button's `onclick` attribute contains JavaScript code that reads or modifies this variable.
  * `console.log()` displays the current quantity.

-----

## Lesson 5 Exercises

  * **5a.** Create a `const` variable `name` and set it to your name.
  * **5b.** Create a `let` variable `age` and set it to your age.
  * **5c.** Use `console.log()` to display the message 'My name is: [your name]'. Use interpolation.
  * **5d.** Calculate '10 + 5' and save it in a `const` variable `totalCost`.
  * **5e.** Calculate a 10% tax on `totalCost` (remember cents or use floats carefully) and save it in `const tax`.
  * **5f.** Calculate the total including tax (`totalCost + tax`) and save it in `const totalWithTax`.
  * **5g.** Display the message 'Total cost: $[totalWithTax]'.
  * **5h.** Display the message 'Tax (10%): $[tax]'.
  * **5i.** On the cart quantity page, what happens if you refresh the page? Why? (Answer: The variable resets to 0 because variables don't persist after refresh).
  * **5j.** On the cart quantity page, add a button '+4'.
  * **5k.** Add a button '+5'.
  * **5l.** Add a button 'Remove from cart' which decreases the quantity by 1 (use `--` or `-= 1`).

-----

## Challenge Exercises

  * **5m.** The Celsius to Fahrenheit formula is $F = C \times \frac{9}{5} + 32$. Create a variable `celsius` and calculate Fahrenheit. Display 'X degrees Celsius is Y degrees Fahrenheit'.
  * **5n.** The Fahrenheit to Celsius formula is $C = (F - 32) \times \frac{5}{9}$. Create a variable `fahrenheit` and calculate Celsius. Display 'X degrees Fahrenheit is Y degrees Celsius'.
  * **5o.** Modify the cart quantity page: prevent the quantity from going below 0. (Hint: Use an `if` statement).
  * **5p.** Modify the cart quantity page: prevent the quantity from going above 10. (Hint: Use an `if` statement).
