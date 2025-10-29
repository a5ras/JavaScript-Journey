# Lesson 08: Objects

This lesson introduces objects, a fundamental data structure in JavaScript used for grouping related values together. We'll use objects to add a score to the Rock Paper Scissors game.

---

## What is an Object?

An **object** lets us group multiple related values together. Think of it like a container (similar to a variable) but capable of holding multiple pieces of information under named labels.

---

## Creating and Using Objects

### Syntax for Creating Objects

Objects are created using **curly braces {}**. Inside, we define **properties** (or **keys**) and their corresponding **values**.

```javascript
// Creating an object to represent a product
const product = {
  // Property: Value (separated by a colon)
  name: 'socks',
  price: 1090 // Using cents for money
}; // Semicolon after the object definition if saved in a variable

console.log(product); // Displays the entire object
````

  * **Property-Value Pair:** Each entry in an object consists of a property name (like *name*) and its associated value (like *'socks'*), separated by a colon *:*.
  * **Commas:** Property-value pairs are separated by commas *,*.
  * **Values:** Can be any JavaScript type (string, number, boolean, even other objects or functions).

### Accessing Properties: Dot Notation

We can access the value of a specific property using **dot notation**: **objectName.propertyName**.

```javascript
console.log(product.name); // Output: 'socks'
console.log(product.price); // Output: 1090
```

### Modifying Properties

You can change the value associated with a property using dot notation and the assignment operator =.

```javascript
product.name = 'cotton socks';
console.log(product.name); // Output: 'cotton socks'
console.log(product); // The 'name' property inside the 'product' object is updated
```

### Adding New Properties

You can add new properties to an object after it's created using dot notation and assignment.

```javascript
product.newProperty = true;
console.log(product); // Object now includes newProperty: true
```

### Removing Properties

The *delete* keyword removes a property from an object.

```javascript
delete product.newProperty;
console.log(product); // newProperty is now removed
```

### Objects as Values

Objects are just another type of value in JavaScript.

  * You can save them in variables (*const* or *let*).
  * You can check their type: *typeof product;* returns *'object'*.

**Why use objects?**

  * **Organization:** Group related data together (like all details of a product).
  * **Convenience:** Work with multiple values as a single unit (e.g., *console.log(product)* shows everything).

-----

## Project: Adding Score to Rock Paper Scissors

Objects are perfect for storing the RPS score (wins, losses, ties).

**Steps (Algorithm Update):**

1.  Computer picks move.
2.  Compare moves -\> Get result.
3.  **Update the score** based on the result.
4.  Display result **and score** in a popup/on the page.

**Implementation:**

1.  **Create Score Object:** Define the score object (usually outside functions, so it persists between games). Use *let* if using *localStorage* isn't implemented yet, otherwise *const* might be okay if loading/saving handles updates.
    ```javascript
    // (Inside <script> or your .js file, outside functions)
    let score = {
      wins: 0,
      losses: 0,
      ties: 0
    };
    ```
2.  **Update Score:** Inside the *playGame* function, after determining the *result*, update the score object using dot notation and increment operators.
    ```javascript
    // (Inside playGame function, after getting 'result')
    if (result === 'You win.') {
      score.wins += 1; // Or score.wins++;
    } else if (result === 'You lose.') {
      score.losses += 1;
    } else if (result === 'Tie.') {
      score.ties += 1;
    }
    ```
3.  **Display Score:** Modify the *alert()* (or page display) to include the score properties.
    ```javascript
    alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
    Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
    ```
4.  **Reset Score Button:** Add a button that resets the score object's properties back to zero.
    ```html
    <button onclick="
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      alert('Score was reset.');
    ">Reset Score</button>
    ```

-----

## More Object Details

### Accessing Properties: Bracket Notation

Besides dot notation, you can access properties using **square brackets *[]*** with the property name as a **string** inside.

```javascript
const product2 = {
  name: 'shirt'
};

console.log(product2['name']); // Output: 'shirt' (Equivalent to product2.name)

// When is bracket notation useful?
// 1. Properties with special characters (that don't work with dot notation):
product2['delivery-time'] = '1 day';
console.log(product2['delivery-time']); // Works! product2.delivery-time would NOT work.

// 2. Using variables to access properties:
let propertyName = 'name';
console.log(product2[propertyName]); // Output: 'shirt'
```

**Recommendation:** Use **dot notation** by default (cleaner). Use **bracket notation** when needed (special characters, dynamic property access).

### Nested Objects

Objects can contain other objects as values.

```javascript
const product3 = {
  name: 'shirt',
  rating: { // Nested object
    stars: 4.5,
    count: 87
  }
};

// Access nested properties using multiple dots:
console.log(product3.rating.count); // Output: 87
```

### Methods (Functions in Objects)

Functions can also be values within an object. When a function is part of an object, it's called a **method**.

```javascript
const product4 = {
  name: 'shirt',
  // Method definition (shorthand syntax)
  displayProduct() {
    console.log(`Product: ${this.name}`); // 'this' refers to the object itself
  }
};

product4.displayProduct(); // Call the method using () -> Output: Product: shirt
```

  * ***this* Keyword:** Inside a method, *this* refers to the object the method was called on.
  * **Built-in Methods:** We've already used methods like *console.log()* (*log* is a method of the *console* object) and *Math.random()* (*random* is a method of the *Math* object).

### Built-in Objects: *JSON* and *localStorage*

  * **JSON (JavaScript Object Notation):**

      * A **syntax** similar to JavaScript objects but simpler (properties and strings **must** use double quotes *""*, no functions allowed).
      * Used for sending data between computers (universal format) and storing data.
      * ***JSON.stringify(object)*:** Converts a JavaScript object/value into a JSON **string**.
      * ***JSON.parse(jsonString)*:** Converts a JSON string back into a JavaScript object/value.
    

    ```javascript
    const product = { name: "socks", price: 1090 };
    const jsonString = JSON.stringify(product);
    console.log(jsonString); // Output: '{"name":"socks","price":1090}' (A string!)

    const parsedObject = JSON.parse(jsonString);
    console.log(parsedObject); // Output: {name: 'socks', price: 1090} (An object!)
    ```

  * ***localStorage*:**

      * A built-in browser object that allows saving data **permanently** (persists even after closing/refreshing the browser). Variables are temporary and reset on refresh.
      * **Only stores strings.** Use *JSON.stringify()* before saving objects/arrays and *JSON.parse()* after retrieving them.
      * ***localStorage.setItem('key', 'value')*:** Saves a string value under a specific key name.
      * ***localStorage.getItem('key')*:** Retrieves the string value associated with a key (returns *null* if the key doesn't exist).
      * ***localStorage.removeItem('key')*:** Removes a saved item.


    ```javascript
    // Save the score object to localStorage
    localStorage.setItem('score', JSON.stringify(score));

    // Load the score from localStorage when the page loads
    let score = JSON.parse(localStorage.getItem('score'));

    // Handle case where score isn't saved yet (first time visit)
    if (!score) { // null is falsy, !null is true
      score = { wins: 0, losses: 0, ties: 0 };
    }

    // Resetting score requires updating variable AND localStorage
    score.wins = 0; score.losses = 0; score.ties = 0;
    localStorage.removeItem('score'); // Or setItem with the reset score
    ```

-----

## Objects are References

Unlike simple values (numbers, strings, booleans), objects (and arrays) work differently when assigned or copied.

  * **Reference:** When you create an object, the variable doesn't hold the object itself, but a **reference** (like an address) pointing to where the object is stored in the computer's memory.
  * **Copying References:** Assigning an object variable to another variable copies the **reference**, not the object. Both variables now point to the **same object** in memory.
    ```javascript
    const object1 = { message: 'hello' };
    const object2 = object1; // object2 now points to the SAME object as object1

    object1.message = 'good job';
    console.log(object2.message); // Output: 'good job' (Changing via object1 affects object2)
    ```
  * **Comparison (===):** Compares references, not the actual contents of the objects. Two separate objects with identical content will *not* be equal.
    ```javascript
    const object3 = { message: 'good job' };
    console.log(object1 === object3); // Output: false (Different objects, different references)
    console.log(object1 === object2); // Output: true (Same reference)
    ```
  * ***const* with Objects:** *const* prevents reassigning the *variable* (changing which reference it holds), but it does **not** prevent changing the *properties inside* the object the reference points to.
    ```javascript
    const object1 = { message: 'hello' };
    object1.message = 'new value'; // This IS allowed with const objects
    // object1 = { message: 'another object' }; // This is NOT allowed (reassigning the reference)
    ```

-----

## Object Shortcuts

### Destructuring

A shortcut to extract property values into variables with the same name.

```javascript
const object4 = {
  message: 'good job',
  price: 799
};

// Instead of:
// const message = object4.message;
// const price = object4.price;

// Use destructuring:
const { message, price } = object4;
console.log(message); // Output: 'good job'
console.log(price);   // Output: 799
```

### Shorthand Property

If a variable name is the same as the property name you want to create, you can just type the name once when creating the object.

```javascript
const message = 'good job';
const price = 799;

const object5 = {
  // Instead of: message: message,
  message, // Shorthand property
  // Instead of: price: price,
  price // Shorthand property
};
console.log(object5); // { message: 'good job', price: 799 }
```

### Shorthand Method

A shorter syntax for defining methods inside an object literal.

```javascript
const object6 = {
  message: 'good job',
  // Instead of: method: function() { ... }
  method() { // Shorthand method syntax
    console.log('method');
  }
};
object6.method(); // Output: 'method'
```

-----

## Lesson 8 Exercises

* **8a.** Create an object **product** with **name: 'basketball'** and **price: 2095**. Log it.
* **8b.** Increase the price by 500 cents. Log the updated object.
* **8c.** Add a property **'delivery-time': '3 days'** using bracket notation. Log the object.
* **8d.** Create an object **product2** with **name: 'shirt'** and **price: 799**.
* **8e.** Create a function **comparePrice(product1, product2)** that returns the product object with the lower price. If prices are equal, return either one.
* **8f.** Create a function **isSameProduct(product1, product2)** that returns **true** if two products have the same **name** and **price**, **false** otherwise.
* **8g.** Convert 'Good Morning' to lowercase using a string method (Hint: search "javascript string to lower case"). Log the result.
* **8h.** Repeat 'test' 5 times using a string method (Hint: search "javascript string repeat"). Log the result.
* **8i.** In the RPS project, save the score to **localStorage** after updating it.
* **8j.** In the RPS project, load the score from **localStorage** when the page loads. Use a default score if nothing is saved.
* **8k.** In the RPS project, update the "Reset Score" button to also remove the score from **localStorage**.

---

## Challenge Exercises

* **8l.** Use **JSON.stringify()** to convert the score object to a string. Log it.
* **8m.** Use **JSON.parse()** to convert the string from 8l back to an object. Log it.
* **8n.** Explain why **JSON.parse(localStorage.getItem('score')) || { wins: 0, ... }** works for setting a default score. (Answer: **getItem** returns **null** if not found. **JSON.parse(null)** returns **null**. **null** is falsy, so the **||** operator uses the default object).
* **8o.** Modify the RPS score reset: use **confirm('Are you sure?')** before resetting. Only reset if the user clicks OK.

---
