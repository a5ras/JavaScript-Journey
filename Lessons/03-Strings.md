# Lesson 03: Strings

This lesson introduces strings, which are used to represent text in JavaScript.

---

## 🔡 What are Strings?

A **string** is a sequence of characters used to represent text. We've already seen strings used with the alert() command.

```javascript
'hello'; // This is a string

alert('hello'); // The text inside the alert popup is a string
````

-----

## Syntax Rules for Strings

1.  **Creating Strings:** Strings are typically created by surrounding text with **single quotes (' ')**.

    ```javascript
    'hello';
    'This is a string.';
    ```

2.  **Concatenation:** You can combine strings together using the **plus (+) operator**. This is called **concatenation**.

    ```javascript
    'some' + 'text'; // Output: 'sometext'
    'some' + ' ' + 'text'; // Output: 'some text'
    ```

3.  **Type Checking (typeof):** Strings are a different **type of value** than numbers. You can check the type using the typeof operator.

    ```javascript
    typeof 2; // Output: 'number'
    typeof 'hello'; // Output: 'string'
    ```

4.  **Type Coercion (String + Number):** When you use the *+* operator with a string and a number, JavaScript automatically converts the number into a string and concatenates them. This is called **type coercion**.

    ```javascript
    'hello' + 3; // Output: 'hello3'
    ```

-----

## Strings and Order of Operations

Strings also follow the order of operations, similar to math. Concatenation *(+)* happens from left to right. This can sometimes lead to unexpected results when mixing strings and math calculations.

```javascript
// Example: Creating '$28.94' from calculations (problematic way)
'$' + 20.95 + 7.99; // Output: '$20.957.99'
// Why? '$' + 20.95 becomes '$20.95' (string). Then '$20.95' + 7.99 becomes '$20.957.99' (string).

// Solution: Use brackets () to prioritize math
'$' + (20.95 + 7.99); // Output: '$28.939999999999998' (Still has float inaccuracy)

// Best Solution: Calculate money in cents first, then convert to dollars
'$' + ( (2095 + 799) / 100 ); // Output: '$28.94' (Correct)
```

**Remember:** Brackets () are calculated first, then multiplication/division * /, then addition/subtraction + - (including string concatenation +), from left to right.

-----

## Using Strings with Other Features

Once you create a string (either directly or through calculation), you can use it with other JavaScript features, like displaying it in a popup.

```javascript
let cartMessage = 'Items (' + (1 + 1) + '): $' + ( (2095 + 799) / 100 );
alert(cartMessage); // Displays a popup with 'Items (2): $28.94'
```

-----

## More Ways to Create Strings & Special Characters

### Double Quotes (" ")

You can also create strings using **double quotes (" ")**. They work exactly like single quotes.

```javascript
"hello"; // Same as 'hello'
```

**When to use double quotes:** They are useful if your string contains a single quote (*'*).

```javascript
// This causes an error because the ' ends the string early:
// 'I'm learning JavaScript';

// This works because the string is defined by double quotes:
"I'm learning JavaScript";
```

**Recommendation:** Use **single quotes** by default. Use double quotes if the string contains single quotes.

### Escape Characters (\)

An **escape character (\)** allows you to include special characters inside a string that would normally cause issues.

  * *\'*: Includes a single quote inside a single-quoted string.
    ```javascript
    'I\'m learning JavaScript'; // Works correctly
    ```
  * *\"*: Includes a double quote inside a double-quoted string.
    ```javascript
    "She said \"Hi!\""; // Works correctly
    ```
  * *\n*: Creates a **new line** within the string.
    ```javascript
    'line1\nline2'; // Displays as two separate lines
    alert('line1\nline2'); // Popup shows text on two lines
    ```
  * *\\*: Includes a literal backslash.

### Template Strings (Backticks ` )

A third way to create strings is using **backticks ( ` )**. These are called **template strings**.

```javascript
`hello`; // Same as 'hello'
```

Template strings have special features:

1.  **Interpolation (${...}):** This is an easier way to insert values (like variables or calculations) directly into a string, compared to concatenation (+).

    ```javascript
    // Using concatenation:
    'Items (' + (1 + 1) + '): $' + ( (2095 + 799) / 100 );

    // Using interpolation (cleaner):
    `Items (${1 + 1}): $${( (2095 + 799) / 100 )}`;
    ```

    The code inside **${...}** is evaluated, and its result is inserted into the string.

2.  **Multi-line Strings:** Template strings allow you to create strings that span multiple lines just by pressing Enter.

    ```javascript
    `This is
    a multi-line
    string.`;
    // This automatically includes '\n' characters.
    ```

**Recommendation:**

  * Use **single quotes (' ')** by default.
  * Use **template strings ( ` )** when you need **interpolation (${...})** or **multi-line strings**.

-----

## Lesson 3 Exercises

  * **3a.** Create the string 'My name is: ' and concatenate your name onto the end.
  * **3b.** You buy 1 coffee ($5) and 1 bagel ($3). Calculate the total cost using concatenation. Remember to calculate in cents first. Expected output: 'Total cost: $8'.
  * **3c.** Repeat 3b, but use a template string and interpolation instead. Expected output: 'Total cost: $8'.
  * **3d.** Repeat 3c, but use alert() to display the message in a popup.
  * **3e.** You buy 1 coffee ($5.99) and 1 bagel ($2.95). Calculate the total cost using a template string and interpolation. Remember cents. Expected output: 'Total cost: $8.94'.
  * **3f.** Repeat 3e, but display the message in a popup.
  * **3g.** Create the string 'Shipping & handling: $4.99'. Use alert() to display it.
  * **3h.** Add the shipping cost ($4.99) to the total from 3e. Calculate the final total using interpolation. Remember cents. Expected output: 'Total cost: $13.93'.
  * **3i.** Repeat 3h, but display the message in a popup.

-----

## Challenge Exercises

  * **3j.** Create the full receipt message using concatenation: 'Items (2): $8.94 Shipping & handling: $4.99 Total before tax: $13.93 Estimated tax (10%): $1.40'. Remember cents and rounding for tax.
  * **3k.** Repeat 3j using template strings and interpolation.
  * **3l.** How would you display the character ' in a string? Show 2 ways.
  * **3m.** How would you display the character \ in a string?
  * **3n.** Display the following message using a template string and \n:
    ```
    Items (2): $8.94
    Shipping & handling: $4.99
    Total before tax: $13.93
    Estimated tax (10%): $1.40
    ```

*(Exercise details adapted from video and common practice)*
