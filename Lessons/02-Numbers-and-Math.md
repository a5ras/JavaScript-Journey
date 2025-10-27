# Lesson 02: Numbers and Math

This lesson focuses on how JavaScript handles numbers and mathematical operations, using the Amazon cart project (`supersimple.dev/projects/amazon`) as a practical example.

---

## Basic Math Operations

JavaScript can perform standard mathematical calculations directly in the console or in scripts.

* **Addition (`+`):**
    ```javascript
    2 + 2; // Output: 4
    ```
* **Subtraction (`-`):**
    ```javascript
    10 - 3; // Output: 7
    ```
* **Multiplication (`*`):**
    ```javascript
    10 * 3; // Output: 30
    ```
* **Division (`/`):**
    ```javascript
    10 / 2; // Output: 5
    ```

---

##  Syntax Rules

* Math syntax in JavaScript is straightforward, similar to standard math notation.
* Calculations can involve more than two numbers:
    ```javascript
    2 + 2 + 2; // Output: 6
    ```
* JavaScript handles decimal numbers (also known as **floating-point numbers** or **floats**):
    ```javascript
    2.2 + 2.2; // Output: 4.4
    ```
* Whole numbers (like 2, 3, 4) are called **integers**.

---

##  Order of Operations (Operator Precedence)

JavaScript follows the standard mathematical order of operations (often remembered by acronyms like PEMDAS/BODMAS):

1.  **Brackets/Parentheses `()`** have the highest priority. Calculations inside brackets are done first.
2.  **Multiplication (`*`) and Division (`/`)** are done next, from left to right.
3.  **Addition (`+`) and Subtraction (`-`)** are done last, from left to right.

```javascript
1 + 1 * 3; // Output: 4 (Multiplication is done first: 1 * 3 = 3, then 1 + 3 = 4)

// Using brackets changes the order:
(1 + 1) * 3; // Output: 6 (Addition inside brackets is done first: 1 + 1 = 2, then 2 * 3 = 6)
````

**Syntax for Brackets:**

  * Requires a matching open `(` and close `)` bracket.
  * Must contain a complete calculation inside.

-----

##  Floating-Point Inaccuracy

Computers sometimes struggle to store decimal numbers (floats) perfectly due to their binary (0s and 1s) nature. This can lead to small inaccuracies in calculations.

```javascript
0.1 + 0.2; // Might output something like 0.30000000000000004 instead of exactly 0.3
```

**Best Practice for Money:** To avoid these inaccuracies when working with money:

1.  Perform all calculations in **cents** (using integers).
2.  Convert back to dollars only at the very end by **dividing by 100**.

<!-- end list -->

```javascript
// Instead of 20.95 + 7.99
(2095 + 799) / 100; // Output: 28.94 (Calculated accurately using cents)
```

-----

##  Rounding Numbers: `Math.round()`

JavaScript provides a built-in object `Math` with useful math functions. `Math.round()` rounds a number to the nearest integer.

```javascript
Math.round(2.2); // Output: 2
Math.round(2.8); // Output: 3
```

**Rounding Money:** When calculating money (like taxes), it's often necessary to round to the nearest cent. Combine the "calculate in cents" best practice with `Math.round()`:

```javascript
// Example: Calculate 10% tax on $28.94
// 1. Calculate cost in cents: 2894
// 2. Calculate tax in cents: 2894 * 0.1 = 289.4
// 3. Round to the nearest cent: Math.round(289.4) = 289
// 4. Convert back to dollars: 289 / 100 = 2.89

Math.round((2095 + 799) * 0.1) / 100; // Calculates 10% tax and rounds correctly
```

-----

##  Searching for Code: Using Google

Learning to code involves searching for solutions online.

  * Use Google (or other search engines/AI tools) to find how to do things in JavaScript.
  * Search for what you are trying to accomplish (e.g., "JavaScript how to round a number").
  * You don't need to understand *all* the code in the search results initially. Look for familiar pieces and examples you can adapt.

-----

##  Lesson 2 Exercises

  * **2a.** Calculate `1 + 2 * 3 + 4`.
  * **2b.** Calculate `(1 + 2) * (3 + 4)`.
  * **2c.** Calculate `1 + 2 * (3 + 4 / 2)`.
  * **2d.** Calculate `Math.round(2.2)`.
  * **2e.** Calculate `Math.round(8.7)`.
  * **2f.** A toaster costs $18.50 and a T-shirt costs $7.50. Calculate the total cost *in cents*.
  * **2g.** Calculate a 10% tax on the total cost from 2f *in cents*. Round to the nearest cent using `Math.round()`.
  * **2h.** Calculate a 20% tax on the total cost from 2f *in cents*. Don't round yet.
  * **2i.** Using the result from 2h, round it to the nearest cent using `Math.round()`.

-----

##  Challenge Exercises

  * **2j.** You order 1 coffee ($5.99) and 1 bagel ($2.95). Calculate the total cost before tax. Follow best practices for money.
  * **2k.** Calculate a 10% tax for the order in 2j. Round to the nearest cent.
  * **2l.** Calculate the total cost *including* tax for the order in 2j.

---
