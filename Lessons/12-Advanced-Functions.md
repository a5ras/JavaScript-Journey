# Lesson 12: Advanced Functions 

This lesson explores advanced concepts related to functions, which allow us to write more powerful, efficient, and clean code. We will refactor our To-Do list to be more professional.

---

## 1. *document.addEventListener()*

In previous lessons, we used **onclick** attributes in HTML. The modern, standard, and cleaner way to handle events is to use **addEventListener()** in our JavaScript file.

* **It keeps our HTML clean:** No JavaScript code in the HTML.
* **It's more powerful:** It can handle more than just clicks.

>**Example: Search Button Project**


**HTML (12-rock-paper-scissors.html - at the bottom):**
```html
<body onkeydown="
  handleKeydown(event);
">
  ... (rest of the game) ...
</body>
````

**JavaScript (12-rock-paper-scissors.js):**

```javascript
// We can listen for events on the *entire document*
// This is better than 'onkeydown' in the <body>
document.body.addEventListener('keydown', (event) => {
  // 'event' is an object with info about the event
  if (event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissors');
  }
});
```

  * **event.key**: This property tells us *which* key was pressed (e.g., 'r', 'p', 's', 'Enter').

-----

## 2\. Functions are Values

In JavaScript, functions are just another type of value, like strings, numbers, or objects.

  * This means we can **save a function in a variable**.
  * We can **pass a function into another function** as an argument.
  * We can **return a function from another function**.

**Example:**

```javascript
// We save an anonymous function (a function without a name)
// in a variable called 'function1'.
const function1 = function() {
  console.log('hello');
};

console.log(function1); // Logs the function itself
console.log(typeof function1); // Output: 'function'

function1(); // Runs the function -> Output: 'hello'
```

### Higher-Order Functions

A function that either takes *another function as an argument* or *returns a function* is called a **Higher-Order Function**.

We have already been using them\!

  * **setInterval(function() { ... }, 1000);**: **setInterval** is a higher-order function. We pass an anonymous function into it.
  * **element.addEventListener('click', function() { ... });**: **addEventListener** is a higher-order function. We pass an anonymous function (the "callback") into it.

-----

## 3\. Advanced Loops: `forEach`

We learned **for** loops and **while** loops. A more modern way to loop through an array is using the built-in **.forEach()** method.

  * **.forEach()** is a higher-order function.
  * It takes a function as an argument and runs that function *once for every item* in the array.

**Syntax:**

```javascript
array.forEach((item, index) => {
  // code to run for each item
});
```

The function you provide automatically gets two arguments:

1.  **item:** The value from the array (e.g., 'make dinner').
2.  **index:** The index of that item (e.g., 0, 1, 2).

**Example: Refactoring the To-Do List Render Function**

**Old way (for loop):**

```javascript
function renderTodoList() {
  let todoListHTML = '';
  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const { name, dueDate } = todoObject;
    const html = `...`;
    todoListHTML += html;
  }
  // ...
}
```

**New way (forEach loop):**

```javascript
function renderTodoList() {
  let todoListHTML = '';

  // todoList is the array.
  // We pass an anonymous function into .forEach()
  todoList.forEach((todoObject, index) => {
    // This code runs for each item in todoList
    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onclick="
        todoList.splice(${index}, 1);
        renderTodoList(); 
      " class="delete-todo-button">Delete</button>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;
}
```

This is much cleaner and easier to read.

-----

## 4\. Arrow Functions

An **Arrow Function** is a more compact way to write an anonymous function.

**Regular Anonymous Function:**

```javascript
function(parameter) {
  // code
}
```

**Arrow Function:**

```javascript
(parameter) => {
  // code
}
```

**Special Rules for Arrow Functions:**

1.  **One Parameter:** If you have *exactly one* parameter, you can remove the ():
    ```javascript
    parameter => {
      // code
    }
    ```
2.  **One Line of Code:** If your function has *exactly one line* and it *returns* a value, you can remove the `{}` and the **return** keyword:
    ```javascript
    // This function:
    const add = (a, b) => {
      return a + b;
    }

    // Can be shortened to this:
    const addShort = (a, b) => a + b;

    // This function:
    const double = num => {
      return num * 2;
    }

    // Can be shortened to this:
    const doubleShort = num => num * 2;
    ```
3.  **No Parameters:** If you have *no* parameters, you must use empty parentheses ():
    ```javascript
    () => {
      console.log('hello');
    }
    ```

**Example: Using an Arrow Function in addEventListener**

```javascript
// This:
buttonElement.addEventListener('click', function() {
  console.log('click');
});

// Becomes this (much cleaner):
buttonElement.addEventListener('click', () => {
  console.log('click');
});
```

-----

## 5\. Refactoring the To-Do List (Final Version)

We will now refactor the To-Do list to use **addEventListener()** and **forEach()** with arrow functions, removing all JavaScript from the HTML.

### File 1: `12-todo-list.html` (Final HTML)

  * All **onclick** and **onkeydown** attributes are **removed**.

<!-- end list -->

```html
<!DOCTYPE html>
<html>
<head>
  <title>Todo List</title>
  <link rel="stylesheet" href="styles/12-todo-list.css">
</head>
<body>
  <p>Todo List</p>

  <div class="todo-input-grid">
    <input placeholder="Todo name" class="js-name-input name-input">
    <input type="date" class="js-due-date-input due-date-input">
    <button class="js-add-todo-button add-todo-button">Add</button>
  </div>

  <div class="js-todo-list todo-grid"></div>

  <script src="scripts/12-todo-list.js"></script>
</body>
</html>
```

### File 2: styles/12-todo-list.css (No Change)

*(This file is the same as in Lesson 11)*

### File 3: scripts/12-todo-list.js (Final JavaScript)

```javascript
const todoList = [{
  name: 'make dinner',
  dueDate: '2022-12-22'
}, {
  name: 'wash dishes',
  dueDate: '2022-12-22'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  // Use forEach and an arrow function
  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="js-delete-todo-button delete-todo-button">Delete</button>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  // *NEW*: After the list is on the page, find ALL delete buttons
  // and add a click listener to each one.
  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      // For each button, add a listener
      deleteButton.addEventListener('click', () => {
        // Use the 'index' from the forEach loop to splice
        todoList.splice(index, 1);
        renderTodoList(); // Re-render the list
      });
    });
}

// --- Add Event Listeners for Adding Todos ---

// 1. Add listener for the 'Add' button
const addButton = document.querySelector('.js-add-todo-button');
addButton.addEventListener('click', () => {
  addTodo();
});

// 2. Add listeners for 'Enter' key
const nameInputElement = document.querySelector('.js-name-input');
const dateInputElement = document.querySelector('.js-due-date-input');

nameInputElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

dateInputElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});


function addTodo() {
  // We moved the element queries *inside* the function.
  // This is because the old 'nameInputElement' was a global const.
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;
  
  todoList.push({
    name: name,
    dueDate: dueDate
  });
  
  inputElement.value = '';
  dateInputElement.value = '';

  renderTodoList();
}
```

  * **document.querySelectorAll()**: This is new. It's like **document.querySelector()** but it returns *all* matching elements as an array-like list (called a NodeList). We can then loop through this list with **forEach**.

-----

## 6\. Advanced Array Methods: map and filter

These are powerful higher-order functions that *create a new array* (they don't modify the original).

### .filter()

  * **Purpose:** Creates a *new array* containing only the items that pass a test (i.e., where the function returns **true**).

**Example:**

```javascript
const numbers = [1, -3, 5, -2];

// Create a new array with only positive numbers
const positiveNumbers = numbers.filter((number) => {
  // If this returns true, the 'number' is kept
  return number > 0;
});

console.log(positiveNumbers); // Output: [1, 5]
console.log(numbers); // Output: [1, -3, 5, -2] (original is unchanged)
```

### .map()

  * **Purpose:** Creates a *new array* by taking each item from the original array and transforming it.

**Example:**

```javascript
const numbers = [1, 1, 3];

// Create a new array where each number is doubled
const doubledNumbers = numbers.map((number) => {
  // The 'return' value is put into the new array
  return number * 2;
});

console.log(doubledNumbers); // Output: [2, 2, 6]
console.log(numbers); // Output: [1, 1, 3] (original is unchanged)
```

-----

## 7\. Closures

A **Closure** is a key JavaScript concept.

  * When you create a function, it gets "attached" to the variables that are available *outside* of it (in its "parent scope").
  * Even if the parent function finishes running, the inner function *remembers* those variables.

**Example:**

```javascript
function createGreeter(name) {
  // 'name' is a variable in the parent scope
  
  // We create and return a *new function*
  return () => {
    // This inner function "closes over" the 'name' variable
    // and remembers it.
    console.log('Hello, ' + name);
  };
}

// 1. We call createGreeter, passing in 'Alice'.
// 2. It creates an inner function that remembers 'name = Alice'.
// 3. It *returns* this inner function, which we save.
const greetAlice = createGreeter('Alice');

// 1. We call createGreeter, passing in 'Bob'.
// 2. It creates a *different* inner function that remembers 'name = Bob'.
const greetBob = createGreeter('Bob');

// When we call the functions, they use the variable they closed over:
greetAlice(); // Output: Hello, Alice
greetBob();   // Output: Hello, Bob
```

Our **addEventListener** callbacks are also closures\! They "close over" the **index** variable from the **forEach** loop.

-----

## 8\. Recursion

**Recursion** is a technique where a function calls *itself* to solve a problem. It's an alternative to loops.

  * **Base Case:** An **if** statement that stops the recursion (like the loop condition).
  * **Recursive Step:** The part where the function calls itself.

**Example: Factorial (e.g., 5\! = 5 \* 4 \* 3 \* 2 \* 1)**

```javascript
function factorial(n) {
  // 1. Base Case: stops the recursion
  if (n === 1) {
    return 1;
  }
  
  // 2. Recursive Step: calls itself with a smaller problem
  return n * factorial(n - 1);
}

console.log(factorial(5)); // Output: 120
```

-----

## Lesson 12 Exercises

  * **12a.** Create an arrow function that takes one parameter and returns the parameter + 1.
  * **12b.** Create an arrow function that adds 2 numbers.
  * **12c.** Create an arrow function that returns 'hello'.
  * **12d.** Change the function **add = function() { ... }** to an arrow function.
  * **12e.** Create **function(num) { return num \* 2; }** and pass it into **.map()** to double the numbers in **[1, 2, 3]**.
  * **12f.** Use **.filter()** to create a new array with all the strings from **['apple', 'orange', 'grape', 'apple']** that are not 'apple'.
  * **12g.** Use **.filter()** to create a new array with all the numbers from **[1, -3, 5]** that are \>= 0.
  * **12h.** Use **.map()** to add 1 to each number in **[1, 2, 3]**.
  * **12i.** In the RPS project, add an **'keydown'** listener to **document.body**. When 'r', 'p', or 's' is pressed, play the game.
  * **12j.** In the RPS project, modify the 'Auto Play' button so the text changes to 'Stop Playing' when auto playing.
  * **12k.** (Advanced) In the To-Do list, use **addEventListener()** on the "Add" button instead of **onclick**.
  * **12l.** (Advanced) In the To-Do list, when "Enter" is pressed, add the todo.
  * **12m.** (Advanced) Use **.forEach()** to render the To-Do list.
  * **12n.** (Advanced) Use **.forEach()** to add **addEventListener()** to the delete buttons.

-----

## Challenge Exercises

  * **12o.** In RPS, add a 'keydown' listener for 'a' to auto play and 'Backspace' to reset the score (with confirmation).
  * **12p.** Create a closure: create a function **multiply(num1)** that returns a function. The returned function takes **num2** and returns **num1 \* num2**.
  * **12q.** Create a **count** variable. Create a closure that increments and logs the **count**. Call it 3 times.
  * **12r.** (Hard) In the To-Do list, when we click 'Delete', save **todoList** to **localStorage**.
  * **12s.** (Hard) In **addTodo()**, save **todoList** to **localStorage**.
  * **12t.** (Hard) When the page loads, load **todoList** from **localStorage**.
  * **12u.** (Hard) Create a **factorial()** function using recursion.
